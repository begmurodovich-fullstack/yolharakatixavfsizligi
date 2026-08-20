'use client';

import React, { useState } from 'react';
import { ShieldCheck, MapPin, AlertTriangle, Activity } from 'lucide-react';
import { cn } from '@/lib/cn';

interface RegionNode {
  id: string;
  name: string;
  x: number;
  y: number;
  score: number;
  status: 'GREEN' | 'YELLOW' | 'RED';
  schoolCount: number;
  topSchool: string;
}

const REGION_NODES: RegionNode[] = [
  { id: 'tas', name: 'Toshkent shahri', x: 670, y: 160, score: 94, status: 'GREEN', schoolCount: 380, topSchool: '17-maktab' },
  { id: 'sam', name: 'Samarqand viloyati', x: 500, y: 260, score: 88, status: 'GREEN', schoolCount: 1250, topSchool: '9-maktab' },
  { id: 'bux', name: 'Buxoro viloyati', x: 380, y: 240, score: 84, status: 'GREEN', schoolCount: 540, topSchool: '24-maktab' },
  { id: 'fer', name: 'Farg‘ona vodiysi', x: 790, y: 180, score: 82, status: 'GREEN', schoolCount: 1670, topSchool: '11-maktab' },
  { id: 'nav', name: 'Navoiy viloyati', x: 420, y: 180, score: 71, status: 'YELLOW', schoolCount: 370, topSchool: '11-maktab' },
  { id: 'xor', name: 'Xorazm viloyati', x: 230, y: 160, score: 78, status: 'YELLOW', schoolCount: 530, topSchool: '1-maktab' },
  { id: 'qor', name: 'Qoraqalpog‘iston', x: 130, y: 110, score: 67, status: 'YELLOW', schoolCount: 720, topSchool: '3-maktab' },
  { id: 'qash', name: 'Qashqadaryo / Surxondaryo', x: 490, y: 340, score: 62, status: 'YELLOW', schoolCount: 1980, topSchool: '7-maktab' },
];

export function UzbekistanSafetyMapVisual() {
  const [activeNode, setActiveNode] = useState<RegionNode>(REGION_NODES[2]); // Default to Bukhara (24-maktab)

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background glow and frame */}
      <div className="relative rounded-2xl border border-slate-800/80 bg-slate-950 p-4 sm:p-6 shadow-2xl overflow-hidden text-slate-100">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
        
        {/* Header HUD */}
        <div className="relative z-10 flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-teal-400 font-semibold tracking-wider">RESPUBLIKA MONITORINGI</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Yashil: &ge;80
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> Sariq: 50-79
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> Qizil: &lt;50
            </span>
          </div>
        </div>

        {/* SVG Map Visualization */}
        <div className="relative z-10 w-full aspect-[9/5] min-h-[220px]">
          <svg
            viewBox="0 0 900 420"
            className="w-full h-full filter drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stylized Uzbekistan Outline Contours */}
            <path
              d="M 60,120 L 140,80 L 260,70 L 320,130 L 410,130 L 480,90 L 590,140 L 660,110 L 730,140 L 840,150 L 860,200 L 790,220 L 720,200 L 640,210 L 580,270 L 540,380 L 470,390 L 440,320 L 390,290 L 320,260 L 240,230 L 170,240 L 90,210 Z"
              className="fill-slate-900/90 stroke-slate-700/80 stroke-[1.5]"
            />

            {/* Connecting network lines between major hubs */}
            <line x1="670" y1="160" x2="500" y2="260" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="500" y1="260" x2="380" y2="240" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="380" y1="240" x2="420" y2="180" stroke="#0d9488" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <line x1="380" y1="240" x2="230" y2="160" stroke="#0d9488" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <line x1="670" y1="160" x2="790" y2="180" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="500" y1="260" x2="490" y2="340" stroke="#0d9488" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <line x1="230" y1="160" x2="130" y2="110" stroke="#0d9488" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />

            {/* Regional nodes */}
            {REGION_NODES.map((node) => {
              const isSelected = activeNode.id === node.id;
              let dotColor = '#10b981';
              if (node.status === 'YELLOW') dotColor = '#f59e0b';
              if (node.status === 'RED') dotColor = '#ef4444';

              return (
                <g
                  key={node.id}
                  className="cursor-pointer transition-transform duration-200 hover:scale-125"
                  onClick={() => setActiveNode(node)}
                >
                  {/* Radar pulse for selected / important node */}
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      fill={dotColor}
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}
                  {/* Outer circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? "11" : "8"}
                    fill="#0f172a"
                    stroke={dotColor}
                    strokeWidth={isSelected ? "3" : "2"}
                  />
                  {/* Core dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? "5" : "3.5"}
                    fill={dotColor}
                  />
                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + 20}
                    textAnchor="middle"
                    fill={isSelected ? "#38bdf8" : "#94a3b8"}
                    fontSize="10"
                    fontWeight={isSelected ? "700" : "500"}
                    className="select-none font-sans"
                  >
                    {node.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Hub Interactive Information Panel */}
        <div className="relative z-10 mt-3 pt-3 border-t border-slate-800/80 bg-slate-900/90 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-950 border border-teal-800 text-teal-400 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Tanlangan hudud:</div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{activeNode.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">({activeNode.schoolCount} maktab)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="text-right">
              <div className="text-[10px] text-slate-400">O‘rtacha ko‘rsatkich:</div>
              <div className={cn(
                'text-sm font-extrabold font-mono',
                activeNode.score >= 80 ? 'text-emerald-400' : activeNode.score >= 50 ? 'text-amber-400' : 'text-rose-400'
              )}>
                {activeNode.score} ball / 100
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Namunaviy maktab:</div>
              <div className="text-xs font-semibold text-teal-300">
                {activeNode.topSchool}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle footer caption */}
        <div className="relative z-10 mt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
          <Activity className="w-3 h-3 text-teal-500" />
          <span>Xaritadagi nuqtalarni tanlab hududlar bo‘yicha ko‘rsatkichlarni ko‘rishingiz mumkin</span>
        </div>
      </div>
    </div>
  );
}
