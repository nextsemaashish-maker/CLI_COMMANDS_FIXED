// Badges and Achievements Data

export const BADGES_DATA = [
  {
    id: 'first-step',
    title: 'Terminal Initiate',
    description: 'Complete your first CLI lesson.',
    icon: 'Terminal',
    xpRequired: 100,
    requiredLessonsCount: 1
  },
  {
    id: 'bash-hero',
    title: 'Linux Kernel Hacker',
    description: 'Complete all Linux & Bash modules.',
    icon: 'Cpu',
    xpRequired: 500,
    moduleCompleted: 'linux-bash'
  },
  {
    id: 'git-wizard',
    title: 'Git Time Traveler',
    description: 'Master Git branching, rebasing, and reflog.',
    icon: 'GitBranch',
    xpRequired: 800,
    moduleCompleted: 'git-vcs'
  },
  {
    id: 'docker-captain',
    title: 'Docker Captain',
    description: 'Master containerization and multi-container stacks.',
    icon: 'Box',
    xpRequired: 1100,
    moduleCompleted: 'docker-containers'
  },
  {
    id: 'streak-master',
    title: 'Terminal Streak Master',
    description: 'Maintain a 3-day learning streak.',
    icon: 'Zap',
    requiredStreak: 3
  },
  {
    id: 'nextsem-mastermind',
    title: 'NextSem Mastermind',
    description: 'Reach 2000 total XP points across all modules.',
    icon: 'Award',
    xpRequired: 2000
  }
];
