import React, { useState } from 'react';
import { Terminal, CheckCircle2, HelpCircle, Sparkles, Award } from 'lucide-react';
import { LABS_DATA } from '../data/labsData';
import { playKeyClickSound } from '../utils/audioSynth';

export default function PracticeLabsView({
  onStartLabInTerminal,
  completedLabs,
  onCompleteLab
}) {
  const [selectedLabId, setSelectedLabId] = useState(LABS_DATA[0].id);

  const currentLab = LABS_DATA.find((l) => l.id === selectedLabId) || LABS_DATA[0];

  const handleSelectLab = (labId) => {
    playKeyClickSound();
    setSelectedLabId(labId);
  };

  const handleLaunchLab = () => {
    playKeyClickSound();
    onStartLabInTerminal(currentLab.expectedCommand, currentLab.id, currentLab.xp);
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
        gap: '20px'
      }}
    >
      {/* Header */}
      <div>
        <div
          style={{
            fontSize: '0.78rem',
            color: 'var(--accent-green)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            letterSpacing: '1px',
            marginBottom: '4px'
          }}
        >
          PRACTICE LABS & CHALLENGES
        </div>
        <h2
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.7rem)',
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            fontFamily: 'var(--font-display)'
          }}
        >
          Hands-On Interactive Terminal Labs
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.9rem' }}>
          Complete real-world CLI scenario objectives inside the live terminal to verify solutions and earn XP!
        </p>
      </div>

      {/* Responsive Grid / Flex: Left Selector Cards, Right Active Lab */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '18px',
          flex: 1,
          minHeight: 0
        }}
      >
        {/* Left Labs Selector List */}
        <div
          style={{
            flex: '1 1 280px',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {LABS_DATA.map((lab) => {
            const isSelected = selectedLabId === lab.id;
            const isCompleted = completedLabs.includes(lab.id);

            return (
              <div
                key={lab.id}
                onClick={() => handleSelectLab(lab.id)}
                style={{
                  background: isSelected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(5, 8, 14, 0.7)',
                  border: isSelected ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  boxShadow: isSelected ? '0 0 16px rgba(16, 185, 129, 0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-green)',
                      background: 'rgba(16, 185, 129, 0.12)',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontWeight: 700
                    }}
                  >
                    {lab.category}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {lab.difficulty}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)'
                  }}
                >
                  {lab.title}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    +{lab.xp} XP
                  </span>
                  {isCompleted ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: 'var(--accent-green)', fontWeight: 700 }}>
                      <CheckCircle2 size={13} /> Solved
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Lab Objective Workspace */}
        <div
          className="glass-panel"
          style={{
            flex: '2 1 360px',
            minWidth: 0,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#05080e',
            border: '1px solid var(--accent-green)',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.12)'
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: 'var(--font-display)' }}>
                {currentLab.title}
              </h3>
              <div
                style={{
                  padding: '4px 12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid var(--accent-green)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--accent-green)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem'
                }}
              >
                REWARD: +{currentLab.xp} XP
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '18px', lineHeight: 1.5 }}>
              {currentLab.summary}
            </p>

            {/* Objectives Box */}
            <div
              style={{
                background: '#090d14',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                marginBottom: '18px'
              }}
            >
              <h4
                style={{
                  color: 'var(--accent-green)',
                  fontSize: '0.85rem',
                  margin: '0 0 10px 0',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={14} /> LAB OBJECTIVES & CRITERIA
              </h4>
              <ul
                style={{
                  paddingLeft: '18px',
                  margin: 0,
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                {currentLab.objectives.map((obj, idx) => (
                  <li key={idx} style={{ fontSize: '0.86rem' }}>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hint Box */}
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px dashed var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '0.84rem',
                color: 'var(--text-secondary)'
              }}
            >
              <HelpCircle color="var(--accent-green)" size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--accent-green)' }}>Lab Hint: </strong>
                {currentLab.hint}
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '16px',
              marginTop: '18px',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Launch lab in terminal and execute the solution command to verify.
            </div>

            <button
              onClick={handleLaunchLab}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.86rem' }}
            >
              <Terminal size={16} /> Launch Lab in Terminal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
