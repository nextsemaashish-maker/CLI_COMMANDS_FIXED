// Practice Labs Scenarios for Hands-On CLI Verification

export const LABS_DATA = [
  {
    id: 'lab-linux-forensics',
    title: 'Lab 1: Linux Log Forensics',
    category: 'Linux / Bash',
    difficulty: 'Beginner',
    xp: 200,
    summary: 'Search through application logs, locate error messages, and parse system events using grep and cat.',
    objectives: [
      'Navigate to logs directory using cd logs',
      'Search for "ERROR" in syslog.log using grep',
      'Inspect line numbers of error occurrences'
    ],
    hint: 'Try running `grep ERROR logs/syslog.log` or `grep -n "ERROR" /var/log/syslog` inside the interactive terminal.',
    allowedCommands: [
      'grep error logs/syslog.log',
      'grep "error" logs/syslog.log',
      'grep error syslog.log',
      'grep -n "error" /var/log/syslog',
      'grep error /var/log/syslog'
    ],
    expectedCommand: 'grep ERROR logs/syslog.log'
  },
  {
    id: 'lab-git-workflow',
    title: 'Lab 2: Git Feature Branching & Staging',
    category: 'Git VCS',
    difficulty: 'Intermediate',
    xp: 250,
    summary: 'Inspect repository status, list active branches, and practice staging commits.',
    objectives: [
      'Check working directory status with git status',
      'List all local and remote branches using git branch',
      'Inspect recent commit history with git log'
    ],
    hint: 'Run `git status` or `git log` in the terminal to inspect the simulated repository.',
    allowedCommands: [
      'git status',
      'git branch',
      'git log'
    ],
    expectedCommand: 'git status'
  },
  {
    id: 'lab-docker-deploy',
    title: 'Lab 3: Docker Container Deployment',
    category: 'Docker',
    difficulty: 'Intermediate',
    xp: 300,
    summary: 'List active Docker containers, inspect container ports, and view available images.',
    objectives: [
      'List all running containers using docker ps',
      'List available Docker images using docker images',
      'Execute commands inside containers using docker exec'
    ],
    hint: 'Type `docker ps` or `docker images` to inspect running container instances.',
    allowedCommands: [
      'docker ps',
      'docker images',
      'docker run'
    ],
    expectedCommand: 'docker ps'
  },
  {
    id: 'lab-sysadmin-probe',
    title: 'Lab 4: System Information Probe',
    category: 'SysAdmin',
    difficulty: 'Advanced',
    xp: 350,
    summary: 'Run neofetch to display system metrics, OS specifications, and hardware architecture.',
    objectives: [
      'Execute neofetch command in terminal',
      'View kernel version and uptime stats',
      'Verify green color block output'
    ],
    hint: 'Type `neofetch` or `fastfetch` in the live terminal prompt.',
    allowedCommands: [
      'neofetch',
      'fastfetch'
    ],
    expectedCommand: 'neofetch'
  }
];
