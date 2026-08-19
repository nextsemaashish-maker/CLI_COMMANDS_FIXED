import React from 'react';
import {
  Terminal, Search, Award, Monitor, Layers, FileText, Cpu,
  Volume2, VolumeX, Sparkles, Flame, Menu, X
} from 'lucide-react';
import NSLogo from './NSLogo';
import { playKeyClickSound } from '../utils/audioSynth';

export default function Navbar({
  activeTab,
  setActiveTab,
  userStats,
  onOpenSearch,
  scanlinesEnabled,
  setScanlinesEnabled,
  bgMatrixEnabled,
  setBgMatrixEnabled,
  soundEnabled,
  setSoundEnabled,
  onOpenVisuals,
  isMobileDrawerOpen,
  onToggleMobileDrawer
}) {
  let levelTitle = 'CLI Novice';
  let nextRankXP = 400;
  let prevRankXP = 0;

  if (userStats.xp >= 2000) {
    levelTitle = 'CLI Mastermind';
    prevRankXP = 2000;
    nextRankXP = 3000;
  } else if (userStats.xp >= 1000) {
    levelTitle = 'Shell Specialist';
    prevRankXP = 1000;
    nextRankXP = 2000;
  } else if (userStats.xp >= 400) {
    levelTitle = 'Terminal Warrior';
    prevRankXP = 400;
    nextRankXP = 1000;
  }

  const xpInCurrentRank = userStats.xp - prevRankXP;
  const rankRange = nextRankXP - prevRankXP;
  const progressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentRank / rankRange) * 100)));

  const handleTabSelect = (tabId) => {
    if (soundEnabled) playKeyClickSound();
    setActiveTab(tabId);
  };

  return (
    <header
      className="main-navbar-header"
      style={{
        width: '100%',
        maxWidth: '100vw',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        zIndex: 100,
        background: 'rgba(5, 8, 14, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0
      }}
    >
      {/* Brand & Mobile Curriculum Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>


        {/* Brand Logo & Name */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          onClick={() => handleTabSelect('lessons')}
        >
          <NSLogo size={28} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '0.96rem',
                fontWeight: 800,
                letterSpacing: '-0.2px',
                fontFamily: 'var(--font-display)',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}
            >
              NEXTSEM
            </span>
            <span
              style={{
                fontSize: '0.58rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: '#00ff88',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                padding: '1px 5px',
                borderRadius: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              ACADEMY
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Main Navigation Tabs */}
      <nav
        className="desktop-nav-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(0, 0, 0, 0.65)',
          padding: '3px',
          borderRadius: '10px',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.5)'
        }}
      >
        {[
          { id: 'lessons', label: 'Lessons', icon: Layers, color: '#10b981' },
          { id: 'terminal', label: 'Live Terminal', icon: Terminal, color: '#06b6d4' },
          { id: 'labs', label: 'Practice Labs', icon: Cpu, color: '#a855f7' },
          { id: 'cheatsheet', label: 'Cheat Sheet', icon: FileText, color: '#f97316' },
          { id: 'profile', label: 'Profile', icon: Award, color: '#f59e0b' }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabSelect(tab.id)}
              title={tab.label}
              style={{
                padding: '6px 11px',
                fontSize: '0.78rem',
                fontWeight: isActive ? 700 : 500,
                fontFamily: 'var(--font-mono)',
                borderRadius: '7px',
                border: isActive ? '1px solid #10b981' : '1px solid transparent',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(0, 255, 136, 0.15) 100%)'
                  : 'transparent',
                color: isActive ? '#00ff88' : '#cbd5e1',
                boxShadow: isActive ? '0 0 12px rgba(16, 185, 129, 0.35)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <IconComponent size={14} color={isActive ? '#00ff88' : tab.color} />
              <span className="desktop-nav-labels">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Tools & Rank Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {/* Quick Search Button */}
        <button
          onClick={onOpenSearch}
          title="Search Commands (Ctrl + K)"
          style={{
            padding: '6px 9px',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            color: '#cbd5e1',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <Search size={14} color="#00ff88" />
          <span className="desktop-only-element" style={{ fontFamily: 'var(--font-mono)' }}>Search</span>
          <kbd
            className="desktop-only-element"
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              padding: '1px 5px',
              borderRadius: '3px',
              fontSize: '0.62rem',
              color: '#00ff88',
              fontFamily: 'var(--font-mono)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            Ctrl K
          </kbd>
        </button>

        {/* Visual Diagrams Button */}
        <button
          onClick={onOpenVisuals}
          className="btn-ghost"
          style={{
            padding: '6px 8px',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#10b981',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.1)'
          }}
          title="Open Architecture & Visual Diagrams"
        >
          <Layers size={14} color="#10b981" />
          <span className="desktop-only-element">Diagrams</span>
        </button>

        {/* Sound Toggle (Desktop) */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="btn-ghost desktop-only-element"
          style={{ padding: '6px 7px', color: soundEnabled ? '#00ff88' : 'var(--text-muted)' }}
          title={soundEnabled ? 'Audio Sound: ON' : 'Audio Sound: OFF'}
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>

        {/* Matrix Rain Toggle (Desktop) */}
        <button
          onClick={() => setBgMatrixEnabled(!bgMatrixEnabled)}
          className="btn-ghost desktop-only-element"
          style={{ padding: '6px 7px', color: bgMatrixEnabled ? '#06b6d4' : 'var(--text-muted)' }}
          title="Toggle Ambient Cyber Rain"
        >
          <Sparkles size={15} />
        </button>

        {/* CRT Scanlines Toggle (Desktop) */}
        <button
          onClick={() => setScanlinesEnabled(!scanlinesEnabled)}
          className="btn-ghost desktop-only-element"
          style={{ padding: '6px 7px', color: scanlinesEnabled ? '#8b5cf6' : 'var(--text-muted)' }}
          title="Toggle CRT Scanlines"
        >
          <Monitor size={15} />
        </button>

        {/* Streak Chip */}
        <div
          title={`Active Streak: ${userStats.streak || 1} day`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 7px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '8px',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-mono)',
            color: '#f59e0b',
            fontWeight: 700,
            whiteSpace: 'nowrap'
          }}
        >
          <Flame size={13} color="#f59e0b" fill="#f59e0b" />
          <span>{userStats.streak || 1}d</span>
        </div>

        {/* User Rank & XP Progress Pill */}
        <div
          onClick={() => handleTabSelect('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 8px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            fontSize: '0.76rem',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
          title={`Rank: ${levelTitle} (${userStats.xp} XP - ${progressPercent}% to next level)`}
        >
          <Award size={15} color="#f59e0b" />
          <div style={{ minWidth: '70px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', gap: '4px' }}>
              <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.72rem' }}>{userStats.xp} XP</span>
              <span className="desktop-only-element" style={{ color: '#00ff88', fontSize: '0.62rem', fontWeight: 700 }}>{levelTitle}</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '3px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981, #00ff88)',
                  borderRadius: '2px',
                  transition: 'width 0.3s'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
