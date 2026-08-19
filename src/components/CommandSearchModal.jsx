import React, { useState, useEffect } from 'react';
import { Search, X, Copy, Check, Bookmark, Terminal } from 'lucide-react';
import { COMMANDS_DATA } from '../data/commandsData';
import { playKeyClickSound } from '../utils/audioSynth';

export default function CommandSearchModal({
  isOpen,
  onClose,
  bookmarks,
  onToggleBookmark,
  onTryInTerminal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', name: 'All Commands' },
    { id: 'linux-bash', name: 'Linux / Bash' },
    { id: 'windows-powershell', name: 'Windows / PWSH' },
    { id: 'git-vcs', name: 'Git VCS' },
    { id: 'docker-containers', name: 'Docker' },
    { id: 'k8s-cloud', name: 'Kubernetes' },
    { id: 'security-networking', name: 'Security & Net' }
  ];

  const filteredCommands = COMMANDS_DATA.filter((cmd) => {
    const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
    const matchesSearch =
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.syntax.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.flags?.some(
        (f) =>
          f.flag.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id, text) => {
    playKeyClickSound();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRun = (cmdStr) => {
    playKeyClickSound();
    onTryInTerminal(cmdStr);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '20px 12px',
        paddingTop: 'clamp(20px, 8vh, 70px)'
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '780px',
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--accent-green)',
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.25)',
          overflow: 'hidden',
          borderRadius: 'var(--radius-md)',
          background: '#05080e'
        }}
      >
        {/* Search Bar Input Header */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#000000'
          }}
        >
          <Search size={18} color="var(--accent-green)" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search 100+ commands, flags, syntax..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '0.98rem',
              fontFamily: 'var(--font-mono)',
              minWidth: 0
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="btn-ghost"
              style={{ padding: '4px', color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>
          )}
          <button onClick={onClose} className="btn-ghost" style={{ padding: '4px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>ESC</span>
          </button>
        </div>

        {/* Category Pills Ribbon */}
        <div
          style={{
            padding: '10px 16px',
            background: '#070a08',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playKeyClickSound();
                setSelectedCategory(cat.id);
              }}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: selectedCategory === cat.id ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                background: selectedCategory === cat.id ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === cat.id ? '#000000' : 'var(--text-secondary)',
                fontWeight: selectedCategory === cat.id ? 700 : 400,
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Commands Results List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            padding: '14px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {filteredCommands.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No commands found matching "{searchQuery}".
            </div>
          ) : (
            filteredCommands.map((cmd) => {
              const isBookmarked = bookmarks.includes(cmd.id);
              const isCopied = copiedId === cmd.id;

              return (
                <div
                  key={cmd.id}
                  style={{
                    background: '#090d14',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <code
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--accent-green)',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {cmd.name}
                      </code>
                      <span
                        style={{
                          fontSize: '0.66rem',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {cmd.category}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <button
                        onClick={() => onToggleBookmark(cmd.id)}
                        className="btn-ghost"
                        style={{ padding: '4px', color: isBookmarked ? 'var(--accent-green)' : 'var(--text-muted)' }}
                        title="Bookmark command"
                      >
                        <Bookmark size={15} fill={isBookmarked ? 'var(--accent-green)' : 'none'} />
                      </button>
                      <button
                        onClick={() => handleCopy(cmd.id, cmd.example || cmd.syntax)}
                        className="btn-ghost"
                        style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                      >
                        {isCopied ? <Check size={13} color="var(--accent-green)" /> : <Copy size={13} />}
                        {isCopied ? 'Copied' : 'Copy'}
                      </button>
                      <button
                        onClick={() => handleRun(cmd.example || cmd.name)}
                        className="btn-secondary"
                        style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                      >
                        <Terminal size={11} /> Try
                      </button>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', margin: 0, lineHeight: 1.45 }}>
                    {cmd.summary}
                  </p>

                  <div
                    style={{
                      background: '#000000',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      padding: '6px 10px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--accent-green)',
                      wordBreak: 'break-all'
                    }}
                  >
                    Syntax: {cmd.syntax}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
