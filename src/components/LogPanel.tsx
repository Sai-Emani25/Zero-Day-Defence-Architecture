import React from 'react';

export function LogPanel() {
  const logs = [
    { time: '14:22:01.442', msg: '[Cilium] Blocked egress to unauthorized CIDR.', type: 'normal' },
    { time: '14:22:03.119', msg: '[Falco] Suspicious file write in /usr/bin/ detected.', type: 'alert' },
    { time: '14:22:05.901', msg: '[ML-MODEL] Anomaly score: 0.12 (Normal)', type: 'normal' },
    { time: '14:22:08.225', msg: '[Tetragon] Execve monitoring process: 2210', type: 'normal' },
  ];

  return (
    <aside className="bg-security-panel p-5 font-mono text-[11px] overflow-hidden flex flex-col gap-4">
      <h3 className="text-[12px] font-bold mb-4 uppercase tracking-widest text-security-text">Real-Time Threat Hunt</h3>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {logs.map((log, idx) => (
          <div 
            key={idx} 
            className="border-l-2 pl-[10px] py-1"
            style={{ borderLeftColor: log.type === 'alert' ? 'var(--color-security-danger)' : 'var(--color-security-accent)' }}
          >
            <div className="text-security-text-dim">{log.time}</div>
            <div className="text-security-text mt-1 leading-tight">{log.msg}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
