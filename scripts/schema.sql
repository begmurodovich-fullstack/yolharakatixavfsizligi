-- Complete Schema matching seed_data.sql and Next.js API
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS evidence CASCADE;
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS criteria CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS districts CASCADE;
DROP TABLE IF EXISTS regions CASCADE;

-- 1. Regions
CREATE TABLE regions (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50)
);

-- 2. Districts
CREATE TABLE districts (
    id VARCHAR(100) PRIMARY KEY,
    region_id VARCHAR(100) NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL
);

-- 3. Schools
CREATE TABLE schools (
    id VARCHAR(100) PRIMARY KEY,
    school_number VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    region_id VARCHAR(100) NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
    district_id VARCHAR(100) NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
    director_name VARCHAR(255),
    student_count INTEGER DEFAULT 0,
    latitude DOUBLE PRECISION DEFAULT 40.1032,
    longitude DOUBLE PRECISION DEFAULT 64.6756,
    coordinate_status VARCHAR(50) DEFAULT 'PENDING',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    current_score INTEGER DEFAULT 0,
    address_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Users
CREATE TABLE users (
    id VARCHAR(100) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    region_id VARCHAR(100) REFERENCES regions(id) ON DELETE SET NULL,
    district_id VARCHAR(100) REFERENCES districts(id) ON DELETE SET NULL,
    school_id VARCHAR(100) REFERENCES schools(id) ON DELETE SET NULL,
    is_first_login BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Criteria
CREATE TABLE criteria (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    sort_order INTEGER DEFAULT 1,
    max_score INTEGER NOT NULL,
    number INTEGER DEFAULT 1,
    legal_basis TEXT
);

-- 6. Questions
CREATE TABLE questions (
    id VARCHAR(100) PRIMARY KEY,
    criterion_id VARCHAR(100) NOT NULL REFERENCES criteria(id) ON DELETE CASCADE,
    code VARCHAR(50),
    text TEXT NOT NULL,
    description TEXT,
    points INTEGER NOT NULL,
    max_score INTEGER DEFAULT 10,
    requires_evidence BOOLEAN DEFAULT FALSE,
    evidence_instructions TEXT,
    options JSONB NOT NULL DEFAULT '[]',
    rubric_options JSONB DEFAULT '[]'
);

-- 7. Assessments
CREATE TABLE assessments (
    id VARCHAR(100) PRIMARY KEY,
    school_id VARCHAR(100) NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    period_id VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'DRAFT',
    total_score INTEGER DEFAULT 0,
    max_score INTEGER DEFAULT 100,
    percentage INTEGER DEFAULT 0,
    score_status VARCHAR(50) DEFAULT 'RED',
    answers JSONB NOT NULL DEFAULT '{}',
    criterion_scores JSONB NOT NULL DEFAULT '{}',
    submitted_at TIMESTAMP WITH TIME ZONE,
    submitted_by VARCHAR(100) REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by VARCHAR(100) REFERENCES users(id) ON DELETE SET NULL,
    reviewer_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Evidence
CREATE TABLE evidence (
    id VARCHAR(100) PRIMARY KEY,
    school_id VARCHAR(100) NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    question_id VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    uploaded_by VARCHAR(100) REFERENCES users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_by VARCHAR(100) REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    review_reason TEXT
);

-- 9. Audit Logs
CREATE TABLE audit_logs (
    id VARCHAR(100) PRIMARY KEY,
    actor_id VARCHAR(100),
    actor_name VARCHAR(255),
    actor_role VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    target VARCHAR(255),
    target_id VARCHAR(100),
    old_value JSONB,
    new_value JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for ultra-fast queries across 10,110 schools
CREATE INDEX idx_schools_region ON schools(region_id);
CREATE INDEX idx_schools_district ON schools(district_id);
CREATE INDEX idx_schools_coord_status ON schools(coordinate_status);
CREATE INDEX idx_schools_current_score ON schools(current_score);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_school_id ON users(school_id);
