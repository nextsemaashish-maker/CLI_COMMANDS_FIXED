import React, { useState } from 'react';
import { Copy, Check, Terminal, Bookmark, Search, Grid, Sparkles } from 'lucide-react';
import { COMMANDS_DATA } from '../data/commandsData';
import { playKeyClickSound } from '../utils/audioSynth';

export default function CheatSheetView({ bookmarks, onToggleBookmark, onTryInTerminal }) {
  const [filterText, setFilterText] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { id: 'all', name: 'All Commands' },
    { id: 'bookmarked', name: '⭐ Bookmarked' },
    { id: 'linux-bash', name: 'Linux / Bash' },
    { id: 'windows-powershell', name: 'Windows PWSH' },
    { id: 'git-vcs', name: 'Git VCS' },
    { id: 'docker-containers', name: 'Docker' },
    { id: 'k8s-cloud', name: 'Kubernetes' },
    { id: 'security-networking', name: 'Security & Net' }
  ];

  const filteredList = COMMANDS_DATA.filter((cmd) => {
    let matchesCat = activeCategory === 'all';
    if (activeCategory === 'bookmarked') {
      matchesCat = bookmarks.includes(cmd.id);
    } else if (activeCategory !== 'all') {
      matchesCat = cmd.category === activeCategory;
    }

    const matchesSearch =
      cmd.name.toLowerCase().includes(filterText.toLowerCase()) ||
      cmd.summary.toLowerCase().includes(filterText.toLowerCase()) ||
      cmd.example.toLowerCase().includes(filterText.toLowerCase());

    return matchesCat && matchesSearch;
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
  };

  return (
    <div
      className="glass-panel"
      style={{
        flex: 1,
        minWidth: 0,
        height: '100%',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              fontWeight: 800,
              color: '#ffffff',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-display)'
            }}
          >
            <Grid color="var(--accent-green)" size={22} /> CLI Command Reference Cheat Sheet
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.88rem' }}>
            Instant search, flag breakdowns, and one-click execution for developer workflows.
          </p>
        </div>

        {/* Filter Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
          <Search
            size={14}
            color="var(--accent-green)"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search commands & flags..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '7px 12px 7px 34px',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Category Nav Pills Ribbon */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '4px'
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              playKeyClickSound();
              setActiveCategory(cat.id);
            }}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              border: activeCategory === cat.id ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
              background: activeCategory === cat.id ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.04)',
              color: activeCategory === cat.id ? '#00ff88' : 'var(--text-secondary)',
              fontWeight: activeCategory === cat.id ? 700 : 400,
              fontSize: '0.76rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              boxShadow: activeCategory === cat.id ? '0 0 10px rgba(16, 185, 129, 0.25)' : 'none'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Cheat Sheet Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '14px'
        }}
      >
        {filteredList.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No commands match your search criteria.
          </div>
        ) : (
          filteredList.map((cmd) => {
            const isBookmarked = bookmarks.includes(cmd.id);
            const isCopied = copiedId === cmd.id;

            return (
              <div
                key={cmd.id}
                style={{
                  background: 'var(--bg-dark-obsidian)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  transition: 'border-color 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <code
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-green)'
                    }}
                  >
                    {cmd.name}
                  </code>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <button
                      onClick={() => onToggleBookmark(cmd.id)}
                      className="btn-ghost"
                      style={{ padding: '4px', color: isBookmarked ? 'var(--accent-green)' : 'var(--text-muted)' }}
                      title="Bookmark command"
                    >
                      <Bookmark size={15} fill={isBookmarked ? 'var(--accent-green)' : 'none'} />
                    </button>
                    <button
                      onClick={() => handleCopy(cmd.id, cmd.example)}
                      className="btn-ghost"
                      style={{ padding: '4px 7px', fontSize: '0.72rem' }}
                      title="Copy example"
                    >
                      {isCopied ? <Check size={13} color="var(--accent-green)" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', margin: 0, lineHeight: 1.45 }}>
                  {cmd.summary}
                </p>

                {/* Example Command Box */}
                <div
                  style={{
                    background: '#090d14',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '7px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px'
                  }}
                >
                  <code
                    style={{
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      wordBreak: 'break-all'
                    }}
                  >
                    $ {cmd.example}
                  </code>
                  <button
                    onClick={() => handleRun(cmd.example)}
                    className="btn-secondary"
                    style={{ padding: '3px 7px', fontSize: '0.7rem', flexShrink: 0 }}
                  >
                    <Terminal size={11} /> Run
                  </button>
                </div>

                {/* Flags Breakdown */}
                {cmd.flags && cmd.flags.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '2px' }}>
                    {cmd.flags.slice(0, 3).map((f, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-muted)',
                          display: 'flex',
                          gap: '5px'
                        }}
                      >
                        <span style={{ color: 'var(--accent-green)', fontWeight: 600, minWidth: '45px' }}>{f.flag}</span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>- {f.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
