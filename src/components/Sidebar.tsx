import React from 'react';
import { 
  ShieldAlert, 
  Search, 
  Box, 
  Zap, 
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
  key?: string;
}

function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 transition-all duration-200 group text-left",
        active 
          ? "border-l-2 border-security-accent bg-security-accent-dim text-security-text" 
          : "text-security-text-dim hover:text-security-text hover:bg-security-border/20"
      )}
    >
      <Icon size={16} className={cn(active ? "text-security-accent" : "text-security-text-dim")} />
      <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
      {active && <ChevronRight size={12} className="ml-auto opacity-50" />}
    </button>
  );
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tactical Overview' },
    { id: 'threat-hunter', icon: Search, label: 'AI Threat Hunter' },
    { id: 'arch-blueprints', icon: Box, label: 'Isolation Blueprints' },
    { id: 'heuristics', icon: ShieldAlert, label: 'Behavioral Analysis' },
    { id: 'remediation', icon: Zap, label: 'Auto-Remediation' },
  ];

  const pillars = [
    { title: 'Strategy', val: 'Assume Breach' },
    { title: 'Telemetry Focus', val: 'Heuristic Behavioral' },
    { title: 'Observability', val: 'Tetragon Runtime' },
    { title: 'Isolation', val: 'Micro-Segmentation' },
  ];

  return (
    <aside className="bg-security-panel p-6 flex flex-col gap-6 overflow-hidden">
      <div className="flex flex-col gap-3">
        {pillars.map((p, idx) => (
          <div key={idx} className="pillar-card font-sans">
            <div className="pillar-title">{p.title}</div>
            <div className="pillar-val">{p.val}</div>
          </div>
        ))}
      </div>

      <nav className="flex-1 flex flex-col gap-1 pt-6 border-t border-security-border">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeSection === item.id}
            onClick={() => setActiveSection(item.id)}
          />
        ))}
        <div className="tag self-start mt-4">Track 3: Protection</div>
      </nav>
    </aside>
  );
}
