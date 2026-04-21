import React from 'react';
import { Shield, Lock, Network, Maximize2, AlertCircle, Box } from 'lucide-react';
import { motion } from 'motion/react';

interface Blueprint {
  id: string;
  title: string;
  description: string;
  level: string;
  pillar: string;
  details: string[];
  tools: string[];
}

const BLUEPRINTS: Blueprint[] = [
  {
    id: '1',
    title: 'Zero-Trust Microsegmentation',
    description: 'Enforce principle of least privilege at the workload level using Cilium identity-based policies.',
    level: 'High',
    pillar: 'Isolation',
    details: [
      'Layer 7 protocol visibility and filtering',
      'Identity-aware observability with Tetragon',
      'Encryption in transit with mTLS via Service Mesh'
    ],
    tools: ['Cilium', 'Hubble', 'Istio']
  },
  {
    id: '2',
    title: 'Ephemeral Sandbox Architectures',
    description: 'Dynamic isolation for untrusted third-party code execution using Firecracker micro-VMs.',
    level: 'Medium',
    pillar: 'Isolation',
    details: [
      'Micro-VM isolation for serverless functions',
      'Immutable root file systems',
      'Strict IO limits per sandboxed instance'
    ],
    tools: ['Firecracker', 'AWS Lambda', 'gVisor']
  },
  {
    id: '3',
    title: 'eBPF Behavioral Observability',
    description: 'Kernel-level event monitoring to detect anomalous system calls and file system access.',
    level: 'Critical',
    pillar: 'Heuristics',
    details: [
      'Real-time syscall interception',
      'Network flow visibility without sidecars',
      'Automated kill signals for drifted processes'
    ],
    tools: ['Falco', 'Tetragon', 'Pixie']
  }
];

export function IsolationBlueprints() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-security-text flex items-center gap-2 leading-none tracking-tight">
          <Lock className="text-security-accent" size={24} /> Isolation Blueprints
        </h2>
        <p className="text-security-text-dim text-sm mt-1">Infrastructure patterns for blast radius limitation and zero-day containment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLUEPRINTS.map((bp) => (
          <motion.div
            key={bp.id}
            whileHover={{ y: -2 }}
            className="pillar-card flex flex-col h-full group cursor-pointer hover:border-security-accent transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-1.5 bg-security-accent-dim rounded-[2px] text-security-accent">
                {bp.id === '1' ? <Network size={18} /> : bp.id === '2' ? <Box size={18} /> : <Shield size={18} />}
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase shadow-sm ${
                bp.level === 'Critical' ? 'bg-security-danger text-white' : 
                bp.level === 'High' ? 'bg-security-accent text-white' : 
                'bg-security-border text-security-text-dim'
              }`}>
                {bp.level} Priority
              </span>
            </div>

            <h3 className="text-sm font-bold mb-2 group-hover:text-security-accent transition-colors uppercase tracking-tight">{bp.title}</h3>
            <p className="text-[11px] text-security-text-dim mb-4 flex-1 font-mono leading-relaxed">{bp.description}</p>

            <div className="space-y-2 mb-6 border-t border-security-border pt-4">
              <p className="text-[9px] font-black text-security-text-dim uppercase tracking-[2px] mb-2">Key Controls</p>
              {bp.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[10px] text-security-text font-mono">
                   <div className="mt-1 w-1 h-1 bg-security-accent shrink-0" />
                   {detail}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mt-auto">
              {bp.tools.map((tool) => (
                <span key={tool} className="text-[9px] font-mono px-1.5 py-0.5 bg-security-panel border border-security-border rounded-[2px] uppercase text-security-text-dim">
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="sharp-panel p-8 bg-security-panel border-l-4 border-l-security-accent relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
               <div className="flex items-center gap-2 text-security-accent uppercase font-mono text-[10px] tracking-[2px] font-bold">
                 <AlertCircle size={12} /> Design Advisory
               </div>
               <h3 className="text-xl font-bold uppercase tracking-tight">Blast Radius Limitation Pattern</h3>
               <p className="text-security-text-dim text-[11px] max-w-2xl leading-relaxed font-mono">
                 Traditional architectures focus on perimeter defense. Proactive Zero-Day research assumes the perimeter is already compromised. 
                 By implementing <strong>strict network segmentation</strong> at the container level, we ensure lateral movement is inhibited at the point of origin.
               </p>
               <div className="flex gap-6 pt-2">
                  <div className="flex flex-col">
                     <span className="text-lg font-bold text-security-text font-mono">40%</span>
                     <span className="text-[9px] text-security-text-dim uppercase font-bold tracking-widest">Latency</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-lg font-bold text-security-accent font-mono">98%</span>
                     <span className="text-[9px] text-security-text-dim uppercase font-bold tracking-widest">Efficiency</span>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-32 aspect-square border border-security-border flex items-center justify-center relative group">
                <div className="w-16 h-16 border border-dashed border-security-accent/50 rounded-full animate-spin flex items-center justify-center">
                   <Shield size={24} className="text-security-accent" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
