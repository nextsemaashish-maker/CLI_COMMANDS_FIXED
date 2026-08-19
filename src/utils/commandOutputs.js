// Command Terminal Output Generator
// Generates realistic, high-fidelity terminal execution screenshots/previews for 700+ CLI lessons

export const SPECIFIC_COMMAND_OUTPUTS = {
  'pwd': `/home/student/nextsem-projects`,
  'pwd -P': `/var/www/nextsem-academy/src`,
  'ls': `config.json   deploy.sh   logs/   node_modules/   package.json   README.md   src/`,
  'ls -lah': `total 48
drwxr-xr-x  6 student student 4.0K Aug 18 10:24 .
drwxr-xr-x 12 student student 4.0K Aug 18 09:12 ..
-rw-r--r--  1 student student  342 Aug 18 10:15 config.json
-rwxr-xr-x  1 student student 1.2K Aug 18 10:20 deploy.sh
drwxr-xr-x  2 student student 4.0K Aug 18 10:22 logs/
-rw-r--r--  1 student student 2.1K Aug 18 10:24 README.md
drwxr-xr-x  4 student student 4.0K Aug 18 10:18 src/`,
  'cd': `(Switched directory context to /var/log)
student@nextsem:/var/log$ pwd
/var/log`,
  'tree': `/etc
├── nginx
│   ├── conf.d
│   │   └── default.conf
│   └── nginx.conf
├── ssh
│   └── sshd_config
└── systemd
    └── system
        └── nextsem.service

5 directories, 4 files`,
  'stat': `  File: deploy.sh
  Size: 1024       Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d Inode: 1441852     Links: 1
Access: (0755/-rwxr-xr-x)  Uid: ( 1000/ student)   Gid: ( 1000/ student)
Access: 2026-08-18 10:20:00.000000000 +0000
Modify: 2026-08-18 10:20:00.000000000 +0000
Change: 2026-08-18 10:20:00.000000000 +0000`,
  'file': `script.sh: Bourne-Again shell script, UTF-8 Unicode text executable`,
  'df': `Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p2  240G   48G  180G  22% /
tmpfs            16G     0   16G   0% /dev/shm
/dev/nvme0n1p1  512M  8.2M  504M   2% /boot/efi
/dev/sda1       1.0T  320G  680G  32% /mnt/data`,
  'du': `12M\t/var/cache
4.2M\t/var/backups
148M\t/var/log
2.4G\t/var/lib
2.6G\ttotal`,
  'realpath': `/home/student/nextsem-academy/src`,
  'basename': `app.sh`,
  'touch': `(Created new empty file 'config.json' with updated timestamps [0644 -rw-r--r--])`,
  'mkdir': `(Created directory hierarchy 'project/src/components' successfully)`,
  'cp': `'./src/app.js' -> './backup/app.js'
'./src/index.css' -> './backup/index.css'
'./src/utils.js' -> './backup/utils.js'
3 files copied successfully.`,
  'mv': `renamed 'main.js' -> 'app.js'`,
  'rm': `removed './temp/cache.tmp'
removed directory './temp'`,
  'rmdir': `(Removed empty directory './empty/folder')`,
  'ln': `'link' -> '/var/www/html' (symbolic link created)`,
  'cat': `     1  [2026-08-18 10:00:01] INFO  System boot sequence initialized
     2  [2026-08-18 10:00:03] INFO  Database connected on port 5432
     3  [2026-08-18 10:05:12] ERROR Connection timeout on redis:6379
     4  [2026-08-18 10:05:14] WARN  Retrying connection in 5s...`,
  'chmod': `(Permissions updated: mode 755 [-rwxr-xr-x] applied to deploy.sh)`,
  'chown': `(Ownership assigned to user: www-data, group: www-data on /var/www/html)`,
  'grep': `/var/log/syslog:42:Aug 18 10:05:12 kernel: [ERROR] Connection timeout on redis:6379
/var/log/syslog:89:Aug 18 10:14:22 app: [ERROR] Failed to authenticate user token
/var/log/syslog:104:Aug 18 10:20:01 worker: [ERROR] Task queue backlog exceeded`,
  'git init': `Initialized empty Git repository in /home/student/projects/nextsem-app/.git/`,
  'git commit': `[main (root-commit) 8f1c42b] feat: add user authentication module
 3 files changed, 184 insertions(+)
 create mode 100644 src/components/Auth.jsx
 create mode 100644 src/styles/auth.css
 create mode 100644 src/utils/jwt.js`,
  'git status': `On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
\tmodified:   src/App.jsx

Untracked files:
  (use "git add <file>..." to include in what will be committed)
\tsrc/components/TerminalPreview.jsx`,
  'git branch': `* main
  feature/auth-oauth2
  feature/terminal-preview
  release/v3.5.0`,
  'git log': `commit 8f1c42b91d2a0e447c1f (HEAD -> main)
Author: NextSem Developer <dev@nextsem.academy>
Date:   Tue Aug 18 10:24:00 2026 +0000

    feat: add user authentication module

commit 3a9e10f84bc129e47d2a
Author: NextSem Developer <dev@nextsem.academy>
Date:   Tue Aug 18 09:15:00 2026 +0000

    init: project bootstrap`,
  'docker run': `Unable to find image 'nginx:alpine' locally
alpine: Pulling from library/nginx
59bf1c350a13: Pull complete
Digest: sha256:435a242c3664724cb1...
Status: Downloaded newer image for nginx:alpine
e9b8f2a1c4028b12f49c0d3817a94ef2049182bc194a`,
  'docker ps': `CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                  NAMES
e9b8f2a1c402   nginx:alpine   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:8080->80/tcp   myweb
3a7f9c11b04e   postgres:16    "docker-entrypoint.s…"   1 hour ago      Up 1 hour      0.0.0.0:5432->5432/tcp db_main`,
  'docker images': `REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        alpine    5f7c32e19a8b   2 days ago     23.4MB
postgres     16        7a8c991e2b4d   5 days ago     379MB
node         20-alpine 8b1c43f2a10d   1 week ago     184MB`,
  'kubectl get pods': `NAME                              READY   STATUS    RESTARTS   AGE    IP            NODE
frontend-web-7c4f889bd5-9m2k1     1/1     Running   0          4h     10.244.1.42   node-worker-01
api-gateway-5567b4c9f7-p09xz      1/1     Running   0          4h     10.244.2.18   node-worker-02
redis-master-0                    1/1     Running   0          12d    10.244.1.15   node-worker-01`,
  'npm install': `added 52 packages, and audited 194 packages in 1.2s

32 packages are looking for funding
  run \`npm fund\` for details

found 0 vulnerabilities`,
  'ssh-keygen': `Generating public/private ed25519 key pair.
Your identification has been saved in /home/student/.ssh/id_ed25519
Your public key has been saved in /home/student/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:uN3pLqO/92JkZqWb1M+9x8A+3c28Vpadmin@co.com
The key's randomart image is:
+--[ED25519 256]--+
|    .o+.o        |
|     ..+..       |
|      + o.       |
|     . = .o      |
|      = S. o     |
|     o =o = .    |
|      +==o..o.   |
|     .ooE=.o.    |
|       o=+o.     |
+----[SHA256]-----+`,
  'Get-ChildItem': `    Directory: C:\\Projects\\NextSemApp

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         8/18/2026  10:24 AM                src
d-----         8/18/2026  10:20 AM                logs
-a----         8/18/2026  10:15 AM            342 config.json
-a----         8/18/2026  10:24 AM           2048 package.json`,
  'Set-Location': `PS C:\\Windows> Get-Location
Path
----
C:\\Windows`
};

export function getCommandTerminalOutput(baseCmd, fullArgs, moduleTitle = 'CLI Academy') {
  if (!baseCmd && !fullArgs) {
    return 'Execution completed with exit code 0.';
  }

  // 1. Direct match on fullArgs or baseCmd
  if (fullArgs && SPECIFIC_COMMAND_OUTPUTS[fullArgs]) {
    return SPECIFIC_COMMAND_OUTPUTS[fullArgs];
  }
  if (baseCmd && SPECIFIC_COMMAND_OUTPUTS[baseCmd]) {
    return SPECIFIC_COMMAND_OUTPUTS[baseCmd];
  }

  // 2. Prefix matching
  const baseKey = Object.keys(SPECIFIC_COMMAND_OUTPUTS).find(
    (k) => baseCmd && (baseCmd === k || baseCmd.startsWith(k) || k.startsWith(baseCmd))
  );
  if (baseKey) {
    return SPECIFIC_COMMAND_OUTPUTS[baseKey];
  }

  // 3. Realistic dynamic output based on module type
  if (fullArgs?.includes('git') || baseCmd?.includes('git')) {
    return `[main 7a2b91c] executed: ${fullArgs || baseCmd}
 2 files changed, 45 insertions(+)
Execution successful. Branch is up to date.`;
  }

  if (fullArgs?.includes('docker') || baseCmd?.includes('docker')) {
    return `STATUS: Success
Container ID: 9a8f12c4b01e
Image: ${fullArgs?.split(' ')[1] || 'app'}:latest
State: Running on 0.0.0.0:8080 (healthy)`;
  }

  if (fullArgs?.includes('kubectl') || baseCmd?.includes('kubectl')) {
    return `deployment.apps/${baseCmd || 'app'} configured
pod/app-prod-7c4f889bd5-9m2k1 created [Ready: 1/1]`;
  }

  if (fullArgs?.includes('Get-') || fullArgs?.includes('Set-') || baseCmd?.includes('PWSH')) {
    return `StatusCode        : 200
StatusDescription : OK
Content           : {status: "success", module: "${moduleTitle}"}`;
  }

  // 4. Default high-tech CLI output
  return `[NEXTSEM-CLI-CORE] Executing: ${fullArgs || baseCmd}
------------------------------------------------------
[INFO] Process PID: 4892 (State: RUNNING)
[INFO] Standard output stream connected.
[SUCCESS] Execution completed successfully with exit code 0.`;
}
