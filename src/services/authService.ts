import { User, LoginCredentials, UserRole } from '@/types';
import { repositories } from '@/repositories';
import { DEMO_ACCOUNTS } from '@/lib/constants';
import { apiClient } from '@/lib/apiClient';

const SESSION_STORAGE_KEY = 'uz_road_safety_auth_user';
const STANDARD_DEMO_PASSWORD = 'Demo@1234';

export class AuthService {
  /**
   * Dual-mode authentication:
   * 1. Attempts real PostgreSQL backend authentication via /api/auth/login
   * 2. Falls back to prototype mock authentication if offline or running in mock mode.
   */
  async login(credentials: LoginCredentials): Promise<User> {
    const rawEmail = credentials.email?.trim() || '';
    const rawPassword = credentials.password?.trim() || '';

    if (!rawEmail || !rawPassword) {
      throw new Error('Login va parol kiritilishi shart.');
    }

    // Attempt real PostgreSQL database login via API
    try {
      const response: any = await apiClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: rawEmail, password: rawPassword }),
      });

      if (response?.user) {
        const authenticatedUser = response.user;

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(
              SESSION_STORAGE_KEY,
              JSON.stringify({ ...authenticatedUser, token: response.token })
            );
          } catch (e) {
            console.warn('Failed to save session to localStorage', e);
          }
        }

        return authenticatedUser;
      }
    } catch (apiErr: any) {
      // If server returned a 401 Unauthorized from real database, rethrow invalid credentials
      if (apiErr?.status === 401) {
        throw new Error(apiErr.message || 'Login yoki parol noto‘g‘ri.');
      }
      // If network issue or fallback required, proceed to mock verification below
    }

    // Mock fallback for demo accounts
    const user = await repositories.user.getByEmail(rawEmail.toLowerCase());
    const isPasswordValid = rawPassword === STANDARD_DEMO_PASSWORD;

    if (!user || !isPasswordValid) {
      throw new Error('Login yoki parol noto‘g‘ri.');
    }

    if (!user.isActive) {
      throw new Error('Ushbu foydalanuvchi hisobi faol emas.');
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      } catch (e) {
        console.warn('Failed to save session to localStorage', e);
      }
    }

    return user;
  }

  async logout(user?: User): Promise<void> {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      } catch (e) {
        console.warn('Failed to remove session from localStorage', e);
      }
    }

    if (user) {
      await repositories.auditLog.logAction({
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role,
        action: 'USER_LOGOUT' as any,
        target: 'Tizimdan chiqish',
      });
    }
  }

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!stored) return null;
      return JSON.parse(stored) as User;
    } catch (e) {
      console.warn('Failed to parse session from localStorage', e);
      return null;
    }
  }

  async switchDemoAccount(roleOrEmail: UserRole | string): Promise<User> {
    const demo = DEMO_ACCOUNTS.find(
      (acc) => acc.role === roleOrEmail || acc.email.toLowerCase() === roleOrEmail.toLowerCase()
    );

    if (!demo) {
      throw new Error(`Demo hisob topilmadi: ${roleOrEmail}`);
    }

    return this.login({
      email: demo.email,
      password: STANDARD_DEMO_PASSWORD,
    });
  }
}

export const authService = new AuthService();
