import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TermIcon, Copy, Trash2, Sparkles, Volume2, VolumeX,
  Maximize2, Minimize2, Palette, ArrowUp, ArrowDown, CornerDownLeft
} from 'lucide-react';
import { playKeyClickSound, playSuccessBeep } from '../utils/audioSynth';
import { LABS_DATA } from '../data/labsData';

// Terminal themes configuration
const TERMINAL_THEMES = {
  matrix: { name: 'Cyber Matrix', text: '#00ff66', prompt: '#00ff66', bg: '#000000', border: 'rgba(0, 255, 102, 0.4)' },
  cyber: { name: 'Neon Cyan', text: '#00f0ff', prompt: '#00f0ff', bg: '#020b12', border: 'rgba(0, 240, 255, 0.4)' },
  amber: { name: 'Hacker Amber', text: '#fbbf24', prompt: '#fbbf24', bg: '#0c0a02', border: 'rgba(251, 191, 36, 0.4)' },
  ubuntu: { name: 'Ubuntu Purple', text: '#e9d5ff', prompt: '#a855f7', bg: '#17061f', border: 'rgba(168, 85, 247, 0.4)' },
  dracula: { name: 'Dracula Dark', text: '#f8f8f2', prompt: '#ff79c6', bg: '#1e1e2e', border: 'rgba(255, 121, 198, 0.4)' }
};

export default function Terminal({
  activeCommandPreset,
  onClearPreset,
  soundEnabled,
  setSoundEnabled,
  activeLabId,
  activeLabReward,
  onSolveLab
}) {
  const [history, setHistory] = useState([
    { type: 'system', content: 'NextSem Academy Cyber Shell v3.5.0 Professional Edition' },
    { type: 'system', content: 'Type "help" or "neofetch", or tap [Tab] for command auto-completion!' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [currentPath, setCurrentPath] = useState('/root');
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1);
  const [userCmds, setUserCmds] = useState([]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [activeTheme, setActiveTheme] = useState('matrix');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Dynamic Virtual File System State
  const [vfsState, setVfsState] = useState({
    '/root': {
      'readme.txt': { type: 'file', content: 'Welcome to NextSem Academy Interactive Terminal!\nPractice real-life commands, manage files, and solve labs.' },
      'deploy.sh': { type: 'file', content: '#!/bin/bash\necho "Building release bundle..."\ndocker build -t app:v1 .\nkubectl apply -f deploy.yaml' },
      'secrets.env': { type: 'file', content: 'DATABASE_URL="postgres://admin:pass@localhost:5432/main"\nAPI_KEY="sk_live_nextsem_9921"' },
      'projects': { type: 'dir' },
      'logs': { type: 'dir' }
    },
    '/root/projects': {
      'app.js': { type: 'file', content: 'console.log("Welcome to NextSem Academy!");' },
      'package.json': { type: 'file', content: '{\n  "name": "cli-app",\n  "version": "1.0.0"\n}' }
    },
    '/root/logs': {
      'syslog.log': { type: 'file', content: '2026-08-13 21:00:01 [INFO] System booted.\n2026-08-13 21:05:00 [ERROR] Database connection timeout.' },
      'access.log': { type: 'file', content: '127.0.0.1 - GET /api/v1/health 200' }
    }
  });

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const theme = TERMINAL_THEMES[activeTheme] || TERMINAL_THEMES.matrix;

  // Auto populate if preset passed
  useEffect(() => {
    if (activeCommandPreset) {
      setInputVal(activeCommandPreset);
      if (inputRef.current) inputRef.current.focus();
      if (onClearPreset) onClearPreset();
    }
  }, [activeCommandPreset]);

  // Scroll to bottom on new history
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Matrix canvas animation
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!isMatrixMode || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 160;

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = theme.text;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isMatrixMode, theme]);

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    if (soundEnabled) {
      playKeyClickSound();
    }
  };

  const availableCmds = [
    'neofetch', 'ls', 'cd', 'pwd', 'cat', 'mkdir', 'touch', 'rm',
    'echo', 'grep', 'git', 'docker', 'kubectl', 'whoami', 'date',
    'help', 'matrix', 'clear', 'theme', 'history'
  ];

  // Tab Auto-Completion
  const handleTabCompletion = () => {
    playKeyClickSound();
    const trimmed = inputVal.trim();
    if (!trimmed) {
      setInputVal('ls ');
      return;
    }
    const parts = trimmed.split(' ');
    if (parts.length === 1) {
      const match = availableCmds.find((c) => c.startsWith(parts[0]));
      if (match) setInputVal(match + ' ');
    } else if (parts.length === 2 && ['cat', 'cd', 'rm', 'grep'].includes(parts[0])) {
      const dirContents = vfsState[currentPath] ? Object.keys(vfsState[currentPath]) : [];
      const match = dirContents.find((f) => f.startsWith(parts[1]));
      if (match) setInputVal(`${parts[0]} ${match}`);
    }
  };

  const handleHistoryNav = (direction) => {
    playKeyClickSound();
    if (userCmds.length === 0) return;

    if (direction === 'up') {
      const nextIndex = cmdHistoryIndex + 1;
      if (nextIndex < userCmds.length) {
        setCmdHistoryIndex(nextIndex);
        setInputVal(userCmds[userCmds.length - 1 - nextIndex]);
      }
    } else {
      if (cmdHistoryIndex > 0) {
        const nextIndex = cmdHistoryIndex - 1;
        setCmdHistoryIndex(nextIndex);
        setInputVal(userCmds[userCmds.length - 1 - nextIndex]);
      } else if (cmdHistoryIndex === 0) {
        setCmdHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const getTypoSuggestion = (inputCmd) => {
    const commonMap = {
      gti: 'git',
      dokcer: 'docker',
      mkidr: 'mkdir',
      toch: 'touch',
      clea: 'clear',
      hepl: 'help',
      projct: 'projects',
      log: 'logs'
    };
    return commonMap[inputCmd] || null;
  };

  const runCommandString = (cmdString) => {
    if (soundEnabled) playKeyClickSound();

    const trimmed = cmdString.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', path: currentPath, content: trimmed }];
    setUserCmds((prev) => [...prev, trimmed]);
    setCmdHistoryIndex(-1);

    // Strict Lab Verification Check
    if (activeLabId && activeLabReward && onSolveLab) {
      const activeLabObj = LABS_DATA.find((l) => l.id === activeLabId);
      const isAllowed =
        activeLabObj?.allowedCommands?.some((ac) => ac.toLowerCase() === trimmed.toLowerCase()) ||
        (activeLabObj?.expectedCommand &&
          activeLabObj.expectedCommand.toLowerCase() === trimmed.toLowerCase());

      if (isAllowed) {
        playSuccessBeep();
        onSolveLab(activeLabId, activeLabReward);
        newHistory.push({
          type: 'system',
          content: `🎉 LAB CHALLENGE VERIFIED! +${activeLabReward} XP awarded to your profile!`
        });
      } else {
        newHistory.push({
          type: 'system',
          content: `💡 Active Lab Requirement: Try running "${activeLabObj?.expectedCommand || activeLabObj?.hint}"`
        });
      }
    }

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Command Interpreter
    switch (cmd) {
      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'neofetch':
      case 'fastfetch':
        newHistory.push({
          type: 'output',
          content: `
   .----------------.   root@nextsem-academy
  | .--------------. |  -------------------
  | |   ________   | |  OS: NextSem Academy OS x86_64
  | |  |  ___  |   | |  Kernel: 6.8.0-cyber-pro
  | |  | |   | |   | |  Uptime: 4 hours 12 mins
  | |  | |___| |   | |  Shell: bash 5.2.21-pro
  | |  |______/    | |  Theme: ${theme.name}
  | '--------------' |  Memory: 2048MiB / 32768MiB
   '----------------'   CPU: Cyber Core v9 @ 4.80GHz
                        [████████████████████] 100% Active`
        });
        break;

      case 'help':
        newHistory.push({
          type: 'output',
          content: `Available Simulated Commands (Dynamic VFS Active):
  - neofetch             : Display system specs & ASCII banner
  - ls [-la]             : List virtual directory files & folders dynamically
  - cd <dir>             : Navigate directories (cd projects, cd logs, cd ..)
  - pwd                  : Print working directory
  - cat <file>           : View file contents dynamically
  - mkdir <dir>          : Create new dynamic directory
  - touch <file>         : Create new dynamic file
  - rm <file/dir>        : Delete file or directory from VFS
  - echo "text" > <file> : Create or write text to file
  - grep <text> <file>   : Filter text pattern matching keyword
  - theme                : Switch terminal color palette (matrix, cyber, amber, ubuntu, dracula)
  - git status|log|branch: Practice git commands
  - docker ps|images|run : Practice docker commands
  - whoami / date        : User identity & system timestamp
  - history              : Show executed command history
  - clear / cls          : Clear terminal screen`
        });
        break;

      case 'theme':
        if (!args[0]) {
          newHistory.push({
            type: 'output',
            content: `Current Theme: ${theme.name}\nAvailable Themes: matrix, cyber, amber, ubuntu, dracula\nUsage: theme <name>`
          });
        } else if (TERMINAL_THEMES[args[0].toLowerCase()]) {
          setActiveTheme(args[0].toLowerCase());
          newHistory.push({
            type: 'system',
            content: `Terminal theme updated to ${TERMINAL_THEMES[args[0].toLowerCase()].name}`
          });
        } else {
          newHistory.push({
            type: 'error',
            content: `Unknown theme: ${args[0]}. Choose from: matrix, cyber, amber, ubuntu, dracula`
          });
        }
        break;

      case 'history':
        newHistory.push({
          type: 'output',
          content: userCmds.map((c, i) => `  ${i + 1}  ${c}`).join('\n') || 'No commands in history yet.'
        });
        break;

      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        newHistory.push({
          type: 'output',
          content: isMatrixMode ? 'Matrix mode disabled.' : 'Matrix digital rain initialized...'
        });
        break;

      case 'pwd':
        newHistory.push({ type: 'output', content: currentPath });
        break;

      case 'whoami':
        newHistory.push({ type: 'output', content: 'root@cli-mastermind' });
        break;

      case 'date':
        newHistory.push({ type: 'output', content: new Date().toString() });
        break;

      case 'ls': {
        const dirEntries = vfsState[currentPath] || {};
        const isLong = args.includes('-la') || args.includes('-l');
        if (Object.keys(dirEntries).length === 0) {
          newHistory.push({ type: 'output', content: '(empty directory)' });
        } else if (isLong) {
          const formatted = Object.entries(dirEntries)
            .map(([name, item]) => {
              const isDir = item.type === 'dir';
              const perm = isDir ? 'drwxr-xr-x 2 root root 4096' : '-rw-r--r-- 1 root root  142';
              return `${perm} Aug 18 13:20 ${name}${isDir ? '/' : ''}`;
            })
            .join('\n');
          newHistory.push({ type: 'output', content: formatted });
        } else {
          const names = Object.entries(dirEntries).map(([name, item]) => (item.type === 'dir' ? `${name}/` : name));
          newHistory.push({ type: 'output', content: names.join('   ') });
        }
        break;
      }

      case 'cd': {
        const targetDir = args[0];
        if (!targetDir || targetDir === '~' || targetDir === '/root' || targetDir === '/') {
          setCurrentPath('/root');
        } else if (targetDir === '..') {
          if (currentPath !== '/root') {
            const parent = currentPath.split('/').slice(0, -1).join('/') || '/root';
            setCurrentPath(parent);
          }
        } else {
          const cleanTarget = targetDir.replace(/\/$/, '');
          const fullPath = cleanTarget.startsWith('/') ? cleanTarget : `${currentPath}/${cleanTarget}`;
          if (vfsState[fullPath]) {
            setCurrentPath(fullPath);
          } else if (
            vfsState[currentPath] &&
            vfsState[currentPath][cleanTarget] &&
            vfsState[currentPath][cleanTarget].type === 'dir'
          ) {
            setCurrentPath(fullPath);
          } else {
            const suggestion = getTypoSuggestion(cleanTarget);
            newHistory.push({
              type: 'error',
              content: `cd: no such file or directory: ${targetDir}${
                suggestion ? ` (💡 Did you mean "cd ${suggestion}"?)` : ''
              }`
            });
          }
        }
        break;
      }

      case 'mkdir': {
        const newDirName = args[0];
        if (!newDirName) {
          newHistory.push({ type: 'error', content: 'mkdir: missing operand' });
        } else {
          const targetPath = `${currentPath}/${newDirName}`;
          setVfsState((prev) => ({
            ...prev,
            [currentPath]: {
              ...(prev[currentPath] || {}),
              [newDirName]: { type: 'dir' }
            },
            [targetPath]: {}
          }));
          newHistory.push({ type: 'output', content: `Directory '${newDirName}' created dynamically in VFS!` });
        }
        break;
      }

      case 'touch': {
        const newFileName = args[0];
        if (!newFileName) {
          newHistory.push({ type: 'error', content: 'touch: missing file operand' });
        } else {
          setVfsState((prev) => ({
            ...prev,
            [currentPath]: {
              ...(prev[currentPath] || {}),
              [newFileName]: { type: 'file', content: '' }
            }
          }));
          newHistory.push({ type: 'output', content: `File '${newFileName}' created dynamically in VFS!` });
        }
        break;
      }

      case 'rm': {
        const targetRm = args[0];
        if (!targetRm) {
          newHistory.push({ type: 'error', content: 'rm: missing operand' });
        } else {
          setVfsState((prev) => {
            const copy = { ...prev };
            if (copy[currentPath] && copy[currentPath][targetRm]) {
              const updatedCurrent = { ...copy[currentPath] };
              delete updatedCurrent[targetRm];
              copy[currentPath] = updatedCurrent;
            }
            return copy;
          });
          newHistory.push({ type: 'output', content: `Removed '${targetRm}' from ${currentPath}` });
        }
        break;
      }

      case 'cat': {
        const fileName = args[0];
        if (!fileName) {
          newHistory.push({ type: 'error', content: 'cat: missing file operand' });
        } else {
          const currentFiles = vfsState[currentPath] || {};
          if (currentFiles[fileName] && currentFiles[fileName].type === 'file') {
            newHistory.push({ type: 'output', content: currentFiles[fileName].content || '(empty file)' });
          } else if (fileName.includes('/')) {
            const pathParts = fileName.split('/');
            const subDir = pathParts[0];
            const fileInSub = pathParts[1];
            const targetPath = `${currentPath}/${subDir}`;
            if (vfsState[targetPath] && vfsState[targetPath][fileInSub]) {
              newHistory.push({ type: 'output', content: vfsState[targetPath][fileInSub].content });
            } else {
              newHistory.push({ type: 'error', content: `cat: ${fileName}: No such file or directory` });
            }
          } else {
            newHistory.push({ type: 'error', content: `cat: ${fileName}: No such file or directory` });
          }
        }
        break;
      }

      case 'echo': {
        const echoText = args.join(' ');
        if (echoText.includes('>')) {
          const [textPart, filePart] = echoText.split('>').map((s) => s.trim());
          const cleanText = textPart.replace(/^['"]|['"]$/g, '');
          setVfsState((prev) => ({
            ...prev,
            [currentPath]: {
              ...(prev[currentPath] || {}),
              [filePart]: { type: 'file', content: cleanText }
            }
          }));
          newHistory.push({ type: 'output', content: `Wrote output to '${filePart}'` });
        } else {
          newHistory.push({ type: 'output', content: echoText.replace(/^['"]|['"]$/g, '') });
        }
        break;
      }

      case 'grep': {
        if (args.length < 2) {
          newHistory.push({ type: 'error', content: 'usage: grep <pattern> <file>' });
        } else {
          const pattern = args[0].replace(/['"]/g, '');
          const targetFile = args[args.length - 1];
          let fileContent = '';
          const currentFiles = vfsState[currentPath] || {};
          if (currentFiles[targetFile]) {
            fileContent = currentFiles[targetFile].content || '';
          } else if (targetFile.includes('syslog.log')) {
            fileContent = vfsState['/root/logs']['syslog.log'].content;
          }

          if (fileContent) {
            const lines = fileContent.split('\n');
            const matches = lines.filter((l) => l.toLowerCase().includes(pattern.toLowerCase()));
            newHistory.push({
              type: 'output',
              content: matches.length > 0 ? matches.join('\n') : `No pattern match for "${pattern}"`
            });
          } else {
            newHistory.push({ type: 'error', content: `grep: ${targetFile}: No such file or directory` });
          }
        }
        break;
      }

      case 'git': {
        if (args[0] === 'status') {
          newHistory.push({
            type: 'output',
            content: `On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update)\n\tmodified:   src/App.jsx\n\nno changes added to commit`
          });
        } else if (args[0] === 'branch') {
          newHistory.push({ type: 'output', content: `* main\n  feature/vfs-terminal\n  release/v3.5` });
        } else if (args[0] === 'log') {
          newHistory.push({
            type: 'output',
            content: `commit a8f9e12 (HEAD -> main)\nAuthor: Mastermind <dev@cli-mastermind.io>\nDate:   Thu Aug 13 21:15:00 2026\n\n    feat: professional interactive terminal overhaul`
          });
        } else {
          newHistory.push({ type: 'output', content: `git: '${args[0] || 'help'}' executed successfully.` });
        }
        break;
      }

      case 'docker': {
        if (args[0] === 'ps') {
          newHistory.push({
            type: 'output',
            content: `CONTAINER ID   IMAGE          COMMAND                  CREATED        STATUS        PORTS                  NAMES\n9a8f12c4b01e   nginx:alpine   "/docker-entrypoint.…"   3 hours ago    Up 3 hours    0.0.0.0:8080->80/tcp   cyber-web`
          });
        } else if (args[0] === 'images') {
          newHistory.push({
            type: 'output',
            content: `REPOSITORY   TAG       IMAGE ID       CREATED        SIZE\nnginx        alpine    5f7c32e19a8b   2 days ago     23.4MB\nnode         20-alpine 8b1c43f2a10d   1 week ago     184MB`
          });
        } else {
          newHistory.push({ type: 'output', content: `docker: '${args[0] || 'ps'}' command completed.` });
        }
        break;
      }

      default: {
        const typo = getTypoSuggestion(cmd);
        newHistory.push({
          type: 'error',
          content: `command not found: ${cmd}${typo ? ` (💡 Did you mean "${typo}"?)` : ''}. Press Tab or type "help".`
        });
      }
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommandString(inputVal);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleHistoryNav('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleHistoryNav('down');
    }
  };

  const copyTerminalOutput = () => {
    playKeyClickSound();
    const fullText = history.map((h) => h.content).join('\n');
    navigator.clipboard.writeText(fullText);
  };

  return (
    <div
      className="glass-panel"
      style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        height: isFullscreen ? '100vh' : '100%',
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        right: isFullscreen ? 0 : 'auto',
        bottom: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 9999 : 1,
        background: theme.bg,
        border: `1px solid ${theme.border}`,
        borderRadius: isFullscreen ? 0 : 'var(--radius-md)',
        overflow: 'hidden'
      }}
    >
      {/* Titlebar Header */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.45)',
          borderBottom: `1px solid ${theme.border}`,
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#27c93f' }} />
          </div>
          <span
            style={{
              color: theme.prompt,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <TermIcon size={13} /> root@cli:~ ({currentPath})
          </span>
        </div>

        {/* Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {/* Theme Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              background: 'rgba(255,255,255,0.05)',
              padding: '2px 5px',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <Palette size={12} color={theme.prompt} />
            <select
              value={activeTheme}
              onChange={(e) => {
                playKeyClickSound();
                setActiveTheme(e.target.value);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: theme.text,
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {Object.entries(TERMINAL_THEMES).map(([k, t]) => (
                <option key={k} value={k} style={{ background: '#0b0f17', color: '#fff' }}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn-ghost"
            style={{ padding: '3px 6px', fontSize: '0.72rem', color: soundEnabled ? theme.prompt : 'var(--text-muted)' }}
            title="Toggle Typing Sound"
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          {/* Matrix Screen Toggle */}
          <button
            onClick={() => {
              playKeyClickSound();
              setIsMatrixMode(!isMatrixMode);
            }}
            className="btn-ghost"
            style={{ padding: '3px 6px', fontSize: '0.72rem', color: isMatrixMode ? theme.prompt : 'var(--text-muted)' }}
            title="Toggle Matrix Digital Rain"
          >
            <Sparkles size={13} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="btn-ghost"
            style={{ padding: '3px 6px', fontSize: '0.72rem', color: theme.text }}
            title="Toggle Fullscreen Mode"
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          <button
            onClick={copyTerminalOutput}
            className="btn-ghost"
            style={{ padding: '3px 6px', fontSize: '0.72rem', color: theme.text }}
            title="Copy All Terminal Output"
          >
            <Copy size={13} />
          </button>

          <button
            onClick={() => {
              playKeyClickSound();
              setHistory([]);
            }}
            className="btn-ghost"
            style={{ padding: '3px 6px', fontSize: '0.72rem', color: '#ef4444' }}
            title="Clear Terminal Screen"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Active Lab Objective Banner */}
      {activeLabId && (
        <div
          style={{
            background: `${theme.prompt}18`,
            borderBottom: `1px solid ${theme.border}`,
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: theme.prompt, fontWeight: 700 }}>ACTIVE LAB:</span>
            <span>Execute required lab command to verify solution & earn +{activeLabReward} XP</span>
          </div>
        </div>
      )}

      {/* Matrix Canvas */}
      {isMatrixMode && (
        <div style={{ height: '140px', width: '100%', background: '#000000', borderBottom: `1px solid ${theme.border}` }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      )}

      {/* Terminal Output Screen */}
      <div
        onClick={() => inputRef.current && inputRef.current.focus()}
        style={{
          flex: 1,
          padding: '14px 16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.86rem',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          color: theme.text,
          background: theme.bg
        }}
      >
        {history.map((item, idx) => (
          <div key={idx} style={{ lineHeight: 1.45, wordBreak: 'break-word' }}>
            {item.type === 'input' && (
              <div style={{ color: '#ffffff', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ color: theme.prompt, fontWeight: 'bold' }}>root@cli:{item.path}$</span>
                <span style={{ color: theme.text }}>{item.content}</span>
              </div>
            )}
            {item.type === 'output' && (
              <pre
                style={{
                  color: theme.text,
                  margin: '2px 0 4px 0',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                  opacity: 0.92,
                  fontSize: 'inherit'
                }}
              >
                {item.content}
              </pre>
            )}
            {item.type === 'system' && (
              <div style={{ color: theme.prompt, fontWeight: 600 }}>
                [SYS] {item.content}
              </div>
            )}
            {item.type === 'error' && (
              <div
                style={{
                  color: '#ffffff',
                  background: 'rgba(239, 68, 68, 0.15)',
                  borderLeft: '3px solid #ef4444',
                  padding: '3px 7px',
                  margin: '3px 0'
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Mobile Virtual Terminal Keys & Quick Command Bar */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.55)',
          borderTop: `1px solid ${theme.border}`,
          padding: '8px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
      >
        {/* Mobile & Touch Virtual Control Keys Bar */}
        <div
          className="terminal-mobile-keys"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '2px'
          }}
        >
          {/* Virtual Tab Key */}
          <button
            onClick={handleTabCompletion}
            style={{
              padding: '4px 9px',
              borderRadius: '5px',
              border: `1px solid ${theme.border}`,
              background: 'rgba(255, 255, 255, 0.08)',
              color: theme.prompt,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            title="Auto-complete command with Tab"
          >
            ⇥ Tab
          </button>

          {/* History Up */}
          <button
            onClick={() => handleHistoryNav('up')}
            style={{
              padding: '4px 7px',
              borderRadius: '5px',
              border: `1px solid ${theme.border}`,
              background: 'rgba(255, 255, 255, 0.08)',
              color: theme.prompt,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Previous command in history"
          >
            <ArrowUp size={13} />
          </button>

          {/* History Down */}
          <button
            onClick={() => handleHistoryNav('down')}
            style={{
              padding: '4px 7px',
              borderRadius: '5px',
              border: `1px solid ${theme.border}`,
              background: 'rgba(255, 255, 255, 0.08)',
              color: theme.prompt,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Next command in history"
          >
            <ArrowDown size={13} />
          </button>

          {/* Quick chips */}
          {[
            { label: 'ls -la', cmd: 'ls -la' },
            { label: 'pwd', cmd: 'pwd' },
            { label: 'neofetch', cmd: 'neofetch' },
            { label: 'cat secrets.env', cmd: 'cat secrets.env' },
            { label: 'grep ERROR logs/syslog.log', cmd: 'grep ERROR logs/syslog.log' },
            { label: 'git status', cmd: 'git status' },
            { label: 'docker ps', cmd: 'docker ps' },
            { label: 'help', cmd: 'help' },
            { label: 'clear', cmd: 'clear' }
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => runCommandString(chip.cmd)}
              className="quick-chip"
              style={{ borderColor: theme.border, color: theme.prompt }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Prompt Input Line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              color: theme.prompt,
              fontWeight: 'bold',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.86rem',
              whiteSpace: 'nowrap'
            }}
          >
            root@cli:{currentPath}$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="off"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              caretColor: theme.prompt,
              minWidth: 0
            }}
          />
          {/* Mobile Enter Button */}
          <button
            onClick={() => runCommandString(inputVal)}
            style={{
              background: theme.prompt,
              color: '#000000',
              border: 'none',
              borderRadius: '5px',
              padding: '4px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Execute Command"
          >
            <CornerDownLeft size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
