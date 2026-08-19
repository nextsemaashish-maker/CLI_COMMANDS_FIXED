import React, { useState, useEffect } from 'react';
import { X, Folder, GitBranch, Layers, Cpu, ArrowRight } from 'lucide-react';
import { playKeyClickSound } from '../utils/audioSynth';

export default function VisualDiagramModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('filesystem');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTabChange = (tabId) => {
    playKeyClickSound();
    setActiveTab(tabId);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.86)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          background: '#05080e',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '85vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,0.95)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers color="#10b981" size={20} />
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
              Architecture & Mental Model Visualizer
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs Ribbon */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            padding: '10px 16px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(0, 0, 0, 0.35)',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <button
            onClick={() => handleTabChange('filesystem')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: activeTab === 'filesystem' ? '#10b981' : 'transparent',
              background: activeTab === 'filesystem' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              color: activeTab === 'filesystem' ? '#10b981' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <Folder size={14} /> Linux File System Tree
          </button>

          <button
            onClick={() => handleTabChange('git')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: activeTab === 'git' ? '#3b82f6' : 'transparent',
              background: activeTab === 'git' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: activeTab === 'git' ? '#60a5fa' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <GitBranch size={14} /> Git Staging & Flow
          </button>

          <button
            onClick={() => handleTabChange('docker')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: activeTab === 'docker' ? '#a855f7' : 'transparent',
              background: activeTab === 'docker' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
              color: activeTab === 'docker' ? '#c084fc' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <Cpu size={14} /> Docker Container Lifecycle
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '20px' }}>
          {activeTab === 'filesystem' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
                Linux organizes all system resources hierarchically under a single root directory denoted by{' '}
                <code style={{ color: '#10b981' }}>/</code>.
              </p>

              <div
                style={{
                  background: '#020b12',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: '#e2e8f0',
                  lineHeight: 1.8,
                  overflowX: 'auto'
                }}
              >
                <div>📁 <strong style={{ color: '#10b981' }}>/ (Root Directory)</strong></div>
                <div style={{ paddingLeft: '16px' }}>├── 📁 <strong style={{ color: '#3b82f6' }}>bin/</strong> — Essential user command binaries (ls, cat, cp)</div>
                <div style={{ paddingLeft: '16px' }}>├── 📁 <strong style={{ color: '#3b82f6' }}>etc/</strong> — Host system configuration files</div>
                <div style={{ paddingLeft: '16px' }}>├── 📁 <strong style={{ color: '#3b82f6' }}>home/</strong> — User personal home directories (/home/student)</div>
                <div style={{ paddingLeft: '16px' }}>├── 📁 <strong style={{ color: '#ef4444' }}>root/</strong> — Superuser home directory</div>
                <div style={{ paddingLeft: '32px' }}>│   ├── 📁 <strong>projects/</strong> — Application code</div>
                <div style={{ paddingLeft: '32px' }}>│   └── 📁 <strong>logs/</strong> — System application logs</div>
                <div style={{ paddingLeft: '16px' }}>├── 📁 <strong style={{ color: '#eab308' }}>var/</strong> — Variable data files (var/log/syslog)</div>
                <div style={{ paddingLeft: '16px' }}>└── 📁 <strong style={{ color: '#94a3b8' }}>tmp/</strong> — Temporary files cleared on reboot</div>
              </div>
            </div>
          )}

          {activeTab === 'git' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
                Git tracks changes across 3 primary states: Working Directory ➔ Staging Area (Index) ➔ Commit Repository.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid #ef4444',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center'
                  }}
                >
                  <h4 style={{ color: '#f87171', margin: '0 0 6px 0', fontSize: '0.92rem' }}>1. Working Directory</h4>
                  <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: 0 }}>Unstaged files & modified code.</p>
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#f87171' }}>
                    git add &lt;file&gt; ↓
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(234, 179, 8, 0.08)',
                    border: '1px solid #eab308',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center'
                  }}
                >
                  <h4 style={{ color: '#facc15', margin: '0 0 6px 0', fontSize: '0.92rem' }}>2. Staging Area</h4>
                  <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: 0 }}>Indexed & ready for commit.</p>
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#facc15' }}>
                    git commit -m "..." ↓
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid #10b981',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center'
                  }}
                >
                  <h4 style={{ color: '#34d399', margin: '0 0 6px 0', fontSize: '0.92rem' }}>3. Local Repository</h4>
                  <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: 0 }}>Permanently committed snapshots.</p>
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#34d399' }}>
                    git push origin main
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'docker' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
                Docker transforms build instructions into containerized running software instances.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    background: 'rgba(59, 130, 246, 0.08)',
                    border: '1px solid #3b82f6',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center'
                  }}
                >
                  <h4 style={{ color: '#60a5fa', margin: '0 0 6px 0', fontSize: '0.92rem' }}>Dockerfile</h4>
                  <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: 0 }}>Blueprint containing build steps.</p>
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>
                    docker build -t app .
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(168, 85, 247, 0.08)',
                    border: '1px solid #a855f7',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center'
                  }}
                >
                  <h4 style={{ color: '#c084fc', margin: '0 0 6px 0', fontSize: '0.92rem' }}>Docker Image</h4>
                  <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: 0 }}>Read-only executable snapshot.</p>
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#c084fc' }}>
                    docker run -d -p 8080:80
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid #10b981',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center'
                  }}
                >
                  <h4 style={{ color: '#34d399', margin: '0 0 6px 0', fontSize: '0.92rem' }}>Running Container</h4>
                  <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: 0 }}>Isolated live process running code.</p>
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#34d399' }}>
                    docker ps
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
