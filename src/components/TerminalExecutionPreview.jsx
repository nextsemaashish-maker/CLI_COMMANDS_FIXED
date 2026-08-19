import React, { useState } from 'react';
import { Terminal as TermIcon, Copy, Check, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { getCommandTerminalOutput } from '../utils/commandOutputs';
import { playKeyClickSound } from '../utils/audioSynth';

export default function TerminalExecutionPreview({
  command,
  baseCmd,
  moduleTitle,
  themeColor = '#10b981',
  onTryInTerminal
}) {
  const [copied, setCopied] = useState(false);

  const displayCommand = command || baseCmd || 'ls -la';
  const simulatedOutput = getCommandTerminalOutput(baseCmd, displayCommand, moduleTitle);

  const handleCopy = () => {
    playKeyClickSound();
    const fullSnippet = `$ ${displayCommand}\n${simulatedOutput}`;
    navigator.clipboard.writeText(fullSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTry = () => {
    playKeyClickSound();
    if (onTryInTerminal) {
      onTryInTerminal(displayCommand);
    }
  };

  return (
    <div
      style={{
        background: '#04060b',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.65), 0 0 20px rgba(16, 185, 129, 0.12)',
        margin: '16px 0',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Terminal Titlebar */}
      <div
        style={{
          background: '#0a0f1d',
          padding: '8px 14px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* macOS / Linux Window Dots */}
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
          </div>

          <span
            style={{
              fontSize: '0.76rem',
              fontFamily: 'var(--font-mono)',
              color: '#cbd5e1',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <TermIcon size={13} color={themeColor} />
            <span>terminal — bash (80×24)</span>
          </span>

          <span
            style={{
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              color: '#00ff88',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              padding: '1px 6px',
              borderRadius: '4px'
            }}
          >
            EXECUTION PREVIEW
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={handleCopy}
            className="btn-ghost"
            style={{ padding: '3px 8px', fontSize: '0.72rem', color: '#cbd5e1' }}
            title="Copy command and output"
          >
            {copied ? <Check size={12} color="#00ff88" /> : <Copy size={12} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {onTryInTerminal && (
            <button
              onClick={handleTry}
              className="btn-primary"
              style={{ padding: '3px 10px', fontSize: '0.72rem' }}
              title="Run this command in the Live Terminal"
            >
              <Play size={11} fill="#ffffff" />
              <span>Live Run</span>
            </button>
          )}
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div
        style={{
          padding: '16px 18px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.86rem',
          lineHeight: 1.55,
          color: '#e2e8f0',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {/* Command Input Prompt Line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ color: '#00ff88', fontWeight: 700 }}>
            student@nextsem:~$
          </span>
          <span style={{ color: '#ffffff', fontWeight: 700, letterSpacing: '0.2px' }}>
            {displayCommand}
          </span>
          {/* Animated Blinking Cursor */}
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '15px',
              background: '#00ff88',
              animation: 'pulseDot 1s infinite'
            }}
          />
        </div>

        {/* Output Block */}
        <pre
          style={{
            margin: '4px 0 0 0',
            fontFamily: 'inherit',
            fontSize: '0.84rem',
            color: '#a7f3d0',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: 1.5,
            opacity: 0.95
          }}
        >
          {simulatedOutput}
        </pre>
      </div>

      {/* Terminal Status Footer Bar */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderTop: '1px solid var(--border-subtle)',
          padding: '5px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00ff88' }}>
          <CheckCircle2 size={12} />
          <span>Exit Code: 0 (SUCCESS)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>PID: 4892</span>
          <span>Time: 12ms</span>
        </div>
      </div>
    </div>
  );
}
