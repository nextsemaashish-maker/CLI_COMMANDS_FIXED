// Global Commands Dictionary & Encyclopedia
// Fast searchable database for Ctrl+K modal & quick reference cheat sheets.

export const COMMANDS_DATA = [
  // LINUX / BASH
  {
    id: 'ls',
    name: 'ls',
    category: 'linux-bash',
    os: ['linux', 'macos'],
    syntax: 'ls [options] [path]',
    summary: 'List directory contents with file metadata, hidden files, and modification times.',
    description: 'Displays files and directories in the current folder or target path. Supports detailed long format (-l), hidden dotfiles (-a), human-readable sizes (-h), and sorting.',
    flags: [
      { flag: '-l', desc: 'Long listing format (permissions, owner, size, date)' },
      { flag: '-a', desc: 'Include hidden files (starting with a dot)' },
      { flag: '-h', desc: 'Print human readable sizes (K, M, G)' },
      { flag: '-t', desc: 'Sort by modification time (newest first)' },
      { flag: '-R', desc: 'List subdirectories recursively' }
    ],
    example: 'ls -lah /var/log'
  },
  {
    id: 'cd',
    name: 'cd',
    category: 'linux-bash',
    os: ['linux', 'macos', 'windows'],
    syntax: 'cd [directory]',
    summary: 'Change the shell working directory.',
    description: 'Navigates through system folders. Use `cd ~` for home, `cd ..` to go up one directory, and `cd -` to return to previous location.',
    flags: [
      { flag: '..', desc: 'Move to parent directory' },
      { flag: '~', desc: 'Jump to user home directory' },
      { flag: '-', desc: 'Switch to previous working directory' }
    ],
    example: 'cd /etc/nginx'
  },
  {
    id: 'pwd',
    name: 'pwd',
    category: 'linux-bash',
    os: ['linux', 'macos'],
    syntax: 'pwd',
    summary: 'Print full path of current working directory.',
    description: 'Outputs absolute filesystem path where current terminal session is executing.',
    flags: [
      { flag: '-P', desc: 'Avoid all symlinks and show physical directory' }
    ],
    example: 'pwd'
  },
  {
    id: 'grep',
    name: 'grep',
    category: 'linux-bash',
    os: ['linux', 'macos'],
    syntax: 'grep [options] PATTERN [FILE...]',
    summary: 'Search text files using regular expressions.',
    description: 'Scans files or standard input streams for lines matching target regex patterns.',
    flags: [
      { flag: '-i', desc: 'Case-insensitive search' },
      { flag: '-r', desc: 'Recursive directory search' },
      { flag: '-n', desc: 'Show line numbers of matches' },
      { flag: '-v', desc: 'Invert match (show non-matching lines)' },
      { flag: '-C <N>', desc: 'Show N lines of context around match' }
    ],
    example: 'grep -rin "connection error" /var/log/'
  },
  {
    id: 'chmod',
    name: 'chmod',
    category: 'linux-bash',
    os: ['linux', 'macos'],
    syntax: 'chmod [options] MODE FILE',
    summary: 'Change file mode bits (read, write, execute permissions).',
    description: 'Modifies access permissions for User, Group, and Others using octal numeric modes (755, 644) or symbolic operators (+x, -w).',
    flags: [
      { flag: '755', desc: 'Owner: rwx, Group/Others: r-x (Executable scripts)' },
      { flag: '644', desc: 'Owner: rw-, Group/Others: r-- (Standard text files)' },
      { flag: '600', desc: 'Owner: rw-, Group/Others: --- (Private SSH keys)' },
      { flag: '-R', desc: 'Apply changes recursively to directories' }
    ],
    example: 'chmod +x deploy.sh'
  },
  {
    id: 'chown',
    name: 'chown',
    category: 'linux-bash',
    os: ['linux', 'macos'],
    syntax: 'chown [options] USER[:GROUP] FILE',
    summary: 'Change file owner and group assignments.',
    description: 'Reassigns file system ownership to target system users and group accounts.',
    flags: [
      { flag: '-R', desc: 'Recursively change ownership of subdirectories' }
    ],
    example: 'sudo chown -R www-data:www-data /var/www/html'
  },
  {
    id: 'find',
    name: 'find',
    category: 'linux-bash',
    os: ['linux', 'macos'],
    syntax: 'find [path] [expression]',
    summary: 'Search for files in a directory hierarchy.',
    description: 'Locates files by name, type, size, owner, or modification date across disk drives.',
    flags: [
      { flag: '-name "*.log"', desc: 'Match file name pattern' },
      { flag: '-type f', desc: 'Filter regular files only' },
      { flag: '-mtime -7', desc: 'Modified within last 7 days' },
      { flag: '-exec', desc: 'Execute shell command on matched files' }
    ],
    example: 'find /var/log -type f -name "*.log" -mtime -30'
  },
  {
    id: 'curl',
    name: 'curl',
    category: 'linux-bash',
    os: ['linux', 'macos', 'windows'],
    syntax: 'curl [options] [URL]',
    summary: 'Transfer data to or from a server via HTTP, HTTPS, FTP, SSH.',
    description: 'Command line tool for API requests, downloading web files, and probing network endpoints.',
    flags: [
      { flag: '-I', desc: 'Fetch HTTP headers only' },
      { flag: '-X POST', desc: 'Specify custom HTTP request method' },
      { flag: '-d "data"', desc: 'Send POST request payload' },
      { flag: '-H "Header: Val"', desc: 'Pass custom request headers' },
      { flag: '-v', desc: 'Verbose output showing SSL handshake & request headers' }
    ],
    example: 'curl -Iv -H "Content-Type: application/json" https://api.github.com'
  },
  {
    id: 'tar',
    name: 'tar',
    category: 'linux-bash',
    os: ['linux', 'macos'],
    syntax: 'tar [options] [archive-file] [file or directory to archive]',
    summary: 'Archive and compress directory trees into .tar, .tar.gz, .tgz archives.',
    description: 'Bundles multiple files into a single archive file and applies gzip or bzip2 compression.',
    flags: [
      { flag: '-c', desc: 'Create a new archive' },
      { flag: '-x', desc: 'Extract files from archive' },
      { flag: '-z', desc: 'Compress/decompress using gzip (.tar.gz)' },
      { flag: '-v', desc: 'Verbose listing of processed files' },
      { flag: '-f', desc: 'Specify archive filename' }
    ],
    example: 'tar -czvf project_backup.tar.gz ./src'
  },

  // WINDOWS POWERSHELL & CMD
  {
    id: 'Get-ChildItem',
    name: 'Get-ChildItem (dir/ls)',
    category: 'windows-powershell',
    os: ['windows'],
    syntax: 'Get-ChildItem [-Path] [string] [-Recurse]',
    summary: 'PowerShell cmdlet to list files and folders in directory.',
    description: 'Retrieves objects in one or more specified locations. Standard replacement for cmd `dir` or bash `ls`.',
    flags: [
      { flag: '-Recurse', desc: 'Include files in subdirectories' },
      { flag: '-Hidden', desc: 'Include hidden system files' },
      { flag: '-Filter <string>', desc: 'Wildcard file filter (e.g. *.ps1)' }
    ],
    example: 'Get-ChildItem -Path C:\\Logs -Recurse -Filter *.txt'
  },
  {
    id: 'ipconfig',
    name: 'ipconfig',
    category: 'windows-powershell',
    os: ['windows'],
    syntax: 'ipconfig [/all] [/flushdns]',
    summary: 'Display current TCP/IP network configuration and flush DNS.',
    description: 'Diagnostic tool for Windows network settings, IP address, gateway, subnet mask, and DNS cache.',
    flags: [
      { flag: '/all', desc: 'Show detailed adapter details and MAC addresses' },
      { flag: '/flushdns', desc: 'Clear local Windows DNS resolver cache' },
      { flag: '/release', desc: 'Release current DHCP IP configuration' },
      { flag: '/renew', desc: 'Request new DHCP IP address from router' }
    ],
    example: 'ipconfig /flushdns'
  },
  {
    id: 'netstat',
    name: 'netstat',
    category: 'windows-powershell',
    os: ['windows', 'linux', 'macos'],
    syntax: 'netstat [-a] [-n] [-o]',
    summary: 'Display active network connections, listening ports, and owning PID.',
    description: 'Utility for inspecting active TCP connections, listening sockets, and process identifiers.',
    flags: [
      { flag: '-a', desc: 'Display all listening ports and active sockets' },
      { flag: '-n', desc: 'Show numerical IP addresses instead of resolving names' },
      { flag: '-o', desc: 'Display owning Process ID (PID)' }
    ],
    example: 'netstat -ano | findstr 8080'
  },
  {
    id: 'winget',
    name: 'winget',
    category: 'windows-powershell',
    os: ['windows'],
    syntax: 'winget install [app-id]',
    summary: 'Official Windows Package Manager CLI.',
    description: 'Installs, upgrades, configures, and removes software packages on Windows 10/11.',
    flags: [
      { flag: 'install --id <ID>', desc: 'Install software package by exact ID' },
      { flag: 'upgrade --all', desc: 'Upgrade all installed Windows applications' },
      { flag: 'search <query>', desc: 'Find application in package index' }
    ],
    example: 'winget install --id Git.Git'
  },

  // GIT VERSION CONTROL
  {
    id: 'git-status',
    name: 'git status',
    category: 'git-vcs',
    os: ['linux', 'macos', 'windows'],
    syntax: 'git status [options]',
    summary: 'Show the working tree status.',
    description: 'Displays paths that have differences between index file and current HEAD commit.',
    flags: [
      { flag: '-s / --short', desc: 'Give output in short-format' },
      { flag: '-b', desc: 'Show branch information even in short format' }
    ],
    example: 'git status -sb'
  },
  {
    id: 'git-add',
    name: 'git add',
    category: 'git-vcs',
    os: ['linux', 'macos', 'windows'],
    syntax: 'git add <pathspec>',
    summary: 'Add file contents to the staging index.',
    description: 'Updates staging area using current content found in working directory to prepare next commit.',
    flags: [
      { flag: '.', desc: 'Stage all modified, new, and deleted files in current directory' },
      { flag: '-p', desc: 'Interactively review and select code hunks to stage' },
      { flag: '-u', desc: 'Stage modified and deleted files only (ignore new untracked files)' }
    ],
    example: 'git add -p'
  },
  {
    id: 'git-commit',
    name: 'git commit',
    category: 'git-vcs',
    os: ['linux', 'macos', 'windows'],
    syntax: 'git commit -m "msg"',
    summary: 'Record changes to the repository.',
    description: 'Stores current contents of staging index in a new commit node with log message.',
    flags: [
      { flag: '-m "msg"', desc: 'Log message string' },
      { flag: '-a', desc: 'Automatically stage all tracked modified files' },
      { flag: '--amend', desc: 'Replace tip of current branch with new commit' }
    ],
    example: 'git commit -am "fix: resolve memory leak in worker thread"'
  },
  {
    id: 'git-rebase',
    name: 'git rebase',
    category: 'git-vcs',
    os: ['linux', 'macos', 'windows'],
    syntax: 'git rebase [upstream]',
    summary: 'Reapply commits on top of another base tip.',
    description: 'Changes branch baseline to create linear commit history without merge commits.',
    flags: [
      { flag: '-i HEAD~3', desc: 'Interactive mode to squash, edit, reorder commits' },
      { flag: '--continue', desc: 'Restart rebasing process after conflict resolution' },
      { flag: '--abort', desc: 'Cancel rebase operation and reset HEAD' }
    ],
    example: 'git rebase -i main'
  },
  {
    id: 'git-stash',
    name: 'git stash',
    category: 'git-vcs',
    os: ['linux', 'macos', 'windows'],
    syntax: 'git stash [push|pop|list|drop]',
    summary: 'Stash changes in a dirty working directory away.',
    description: 'Shelves uncommitted working changes into dirty stack so you can switch branches cleanly.',
    flags: [
      { flag: 'save "msg"', desc: 'Save stash with descriptive comment' },
      { flag: 'pop', desc: 'Apply top stashed changes and remove from stash list' },
      { flag: 'list', desc: 'List all currently stored stashes' }
    ],
    example: 'git stash pop'
  },

  // DOCKER
  {
    id: 'docker-run',
    name: 'docker run',
    category: 'docker-containers',
    os: ['linux', 'macos', 'windows'],
    syntax: 'docker run [options] IMAGE [command]',
    summary: 'Run a command in a new isolated container.',
    description: 'Allocates container layer, binds ports, mounts volume paths, and executes process.',
    flags: [
      { flag: '-d', desc: 'Run container in background (detached mode)' },
      { flag: '-p 8080:80', desc: 'Map host port 8080 to container port 80' },
      { flag: '-v /host:/container', desc: 'Bind mount directory volume' },
      { flag: '--name app-name', desc: 'Assign custom name to container' },
      { flag: '--rm', desc: 'Automatically remove container when it exits' }
    ],
    example: 'docker run -d -p 3000:3000 --name node-server node:18-alpine'
  },
  {
    id: 'docker-exec',
    name: 'docker exec',
    category: 'docker-containers',
    os: ['linux', 'macos', 'windows'],
    syntax: 'docker exec [options] CONTAINER COMMAND',
    summary: 'Run a command inside an active container.',
    description: 'Spawns subshell or utility binary inside running Docker container environment.',
    flags: [
      { flag: '-it', desc: 'Interactive mode with pseudo-TTY allocation' }
    ],
    example: 'docker exec -it postgres-db psql -U postgres'
  },
  {
    id: 'docker-compose',
    name: 'docker-compose',
    category: 'docker-containers',
    os: ['linux', 'macos', 'windows'],
    syntax: 'docker-compose [command]',
    summary: 'Define and run multi-container Docker applications.',
    description: 'Reads docker-compose.yml configuration to launch networks, containers, and volumes together.',
    flags: [
      { flag: 'up -d', desc: 'Start all orchestrated services in detached mode' },
      { flag: 'down -v', desc: 'Stop containers and wipe assigned volumes' },
      { flag: 'logs -f', desc: 'Stream live container stack output logs' }
    ],
    example: 'docker-compose up -d --build'
  },

  // KUBERNETES
  {
    id: 'kubectl-get',
    name: 'kubectl get',
    category: 'k8s-cloud',
    os: ['linux', 'macos', 'windows'],
    syntax: 'kubectl get RESOURCE [NAME]',
    summary: 'Display one or many Kubernetes resources.',
    description: 'Lists pods, deployments, services, namespaces, nodes, or secrets in cluster.',
    flags: [
      { flag: '-n <namespace>', desc: 'Filter by specific K8s namespace' },
      { flag: '-o wide', desc: 'Include extra details like Pod IP and Node ID' },
      { flag: '-w', desc: 'Watch for live status state changes' },
      { flag: '-o json/yaml', desc: 'Export full manifest format' }
    ],
    example: 'kubectl get pods -n production -o wide'
  },

  // SECURITY & NETWORKING
  {
    id: 'ssh',
    name: 'ssh',
    category: 'security-networking',
    os: ['linux', 'macos', 'windows'],
    syntax: 'ssh [options] user@host',
    summary: 'OpenSSH SSH client for encrypted remote shell access.',
    description: 'Establishes secure encrypted terminal session to remote Linux server.',
    flags: [
      { flag: '-i /path/key', desc: 'Select identity key file (private key)' },
      { flag: '-p 2222', desc: 'Connect to non-standard SSH port' },
      { flag: '-L 8080:localhost:80', desc: 'Set up local port forwarding tunnel' }
    ],
    example: 'ssh -i ~/.ssh/id_ed25519 root@192.168.1.100 -p 22'
  }
];
