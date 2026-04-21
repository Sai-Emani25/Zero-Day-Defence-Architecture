import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-security-text mb-2 tracking-tight">Tactical Command Center</h2>
        <p className="text-security-text-dim text-sm">Real-time heuristics and AI deployment status across multi-cloud clusters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 sharp-panel p-6 flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-[12px] font-bold uppercase tracking-widest flex items-center gap-2 text-security-text">
                  <Activity size={16} className="text-security-accent" /> Anomaly Behavior Stream
               </h3>
               <button className="text-[10px] text-security-accent hover:underline flex items-center gap-1 font-mono uppercase font-bold">
                  View Full Logs <ExternalLink size={10} />
               </button>
            </div>
            
            <div className="flex-1 space-y-4 font-mono">
               {[
                 { time: '18:52:10', type: 'SYS_CALL', entity: 'svc-proxy-4', desc: 'Unexpected ioctl() on sensitive device path', severity: 'High' },
                 { time: '18:51:42', type: 'NET_FLOW', entity: 'db-master-0', desc: 'Outbound egress detected to blacklisted IP: 103.24.xx.xx', severity: 'Critical' },
                 { time: '18:50:05', type: 'AUTH_EVENT', entity: 'admin-console', desc: 'MFA bypass attempt flagged by behavioral model', severity: 'Medium' },
                 { time: '18:48:59', type: 'PROC_DRIFT', entity: 'webapp-frontend', desc: 'Process "unknown_bin" mapped to executable memory', severity: 'Critical' },
               ].map((log, idx) => (
                 <div key={idx} className="flex items-start gap-4 p-3 border border-security-border bg-security-bg hover:border-security-accent/50 transition-all cursor-crosshair">
                   <span className="text-[10px] text-security-text-dim mt-1">{log.time}</span>
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] uppercase font-bold text-security-text-dim bg-security-panel px-1.5 py-0.5 rounded-[2px]">{log.type}</span>
                        <span className="text-[11px] font-bold text-security-text">{log.entity}</span>
                      </div>
                      <p className="text-[11px] text-security-text-dim leading-normal">{log.desc}</p>
                   </div>
                   <span className={cn(
                     "text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase",
                     log.severity === 'Critical' ? 'bg-security-danger text-white' : 
                     log.severity === 'High' ? 'bg-security-accent-dim text-security-accent' : 'bg-security-border text-security-text-dim'
                   )}>
                      {log.severity}
                   </span>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <div className="sharp-panel p-6">
              <h3 className="text-[12px] font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-security-text">
                  <ShieldAlert size={16} className="text-security-accent" /> Security Health Index
              </h3>
              <div className="space-y-6">
                {[
                  { label: 'Egress Filtering', value: 85 },
                  { label: 'Workload Isolation', value: 42 },
                  { label: 'Patch Compliance', value: 92 },
                  { label: 'Service Mesh mTLS', value: 78 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-security-text-dim">{item.label}</span>
                        <span className="text-security-text font-mono">{item.value}%</span>
                      </div>
                      <div className="h-1 w-full bg-security-border overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          className={cn("h-full transition-all duration-1000", item.value < 50 ? "bg-security-danger" : "bg-security-accent")} 
                        />
                      </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pillar-card bg-security-accent-dim border-security-accent/20">
               <p className="text-[10px] text-security-accent font-bold uppercase tracking-widest mb-2 font-mono">Architect Alert</p>
               <p className="text-[11px] text-security-text leading-relaxed">
                 Infrastructure drift detected in <strong>Cluster-B</strong>. Tetragon reporting unauthorized capability escalations in sandboxed environments.
               </p>
               <div className="tag bg-security-accent text-white mt-4 cursor-pointer hover:bg-green-600 transition-all">Resolve Drift</div>
            </div>
         </div>
      </div>
    </div>
  );
}
