/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { LogPanel } from './components/LogPanel';
import { Dashboard } from './components/Dashboard';
import { ThreatHunter } from './components/ThreatHunter';
import { IsolationBlueprints } from './components/IsolationBlueprints';
import { ShieldCheck, Database } from 'lucide-react';

export default function App() {
  const [activeSegment, setActiveSegment] = useState('dashboard');

  const stats = [
    { label: 'Blast Radius Limitation', value: '94.2%', tag: 'Optimized' },
    { label: 'Detection Heuristics', value: '4,102', tag: 'ML-Powered' },
    { label: 'Self-Healing Cycles', value: '12ms', tag: 'Proactive' },
    { label: 'Infrastructure Health', value: 'Nominal', tag: 'Segmented' },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden geometric-grid grid-cols-[280px_1fr_280px] grid-rows-[64px_1fr_180px]">
      {/* Header */}
      <header className="col-span-3 bg-security-panel flex items-center justify-between px-6 border-b border-security-border">
        <div className="flex items-center gap-3 font-bold text-[14px] tracking-wider text-security-accent">
          <div className="w-6 h-6 border-2 border-security-accent" />
          ZERO-DAY DEFENSE ARCHITECT
        </div>
        <div className="flex gap-6 font-mono text-[12px] text-security-text">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-security-accent" />
            eBPF_ACTIVE
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-security-danger shadow-[0_0_8px_rgba(248,81,73,0.5)]" />
            BREACH_SIMULATION
          </div>
          <div>CILIUM_MESH: ENABLED</div>
        </div>
      </header>

      {/* Left Sidebar */}
      <Sidebar activeSection={activeSegment} setActiveSection={setActiveSegment} />

      {/* Main Content */}
      <main className="bg-security-bg p-8 overflow-y-auto relative custom-scrollbar">
        {activeSegment === 'dashboard' && <Dashboard />}
        {activeSegment === 'threat-hunter' && <ThreatHunter />}
        {activeSegment === 'arch-blueprints' && <IsolationBlueprints />}
        {activeSegment === 'heuristics' && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 border border-dashed border-security-border rounded-[4px] min-h-[500px]">
            <div className="w-16 h-16 bg-security-accent-dim rounded flex items-center justify-center text-security-accent mb-4">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold">Heuristic Behavioral Lab</h3>
            <p className="text-security-text-dim max-w-md text-center">Module offline for security sync. Re-deploying eBPF monitoring agents...</p>
          </div>
        )}
        {activeSegment === 'remediation' && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 border border-dashed border-security-border rounded-[4px] min-h-[500px]">
            <div className="w-16 h-16 bg-security-danger/10 rounded flex items-center justify-center text-security-danger mb-4">
              <Database size={32} />
            </div>
            <h3 className="text-xl font-bold">Auto-Remediation Engine</h3>
            <p className="text-security-text-dim max-w-md text-center">Self-healing infrastructure disabled. Automated patching cycles require architect override.</p>
          </div>
        )}
      </main>

      {/* Right Column: Logs */}
      <LogPanel />

      {/* Footer / Stats Panel */}
      <footer className="col-span-3 bg-security-panel border-t border-security-border px-8 py-5 grid grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="text-[10px] uppercase text-security-text-dim tracking-wider font-bold">{stat.label}</div>
            <div className="text-[20px] font-mono text-security-accent font-light">{stat.value}</div>
            <div className="tag self-start">{stat.tag}</div>
          </div>
        ))}
      </footer>
    </div>
  );
}
