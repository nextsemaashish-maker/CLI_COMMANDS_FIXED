import fs from 'fs';
import path from 'path';
import { LESSONS_DATA } from '../src/data/lessonsData.js';

const docsDir = path.resolve(process.cwd(), 'docs');

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

console.log('Generating Markdown (.md) documentation files...');

let masterContent = `# 🚀 COMPLETE CLI MASTERMIND ACADEMY CURRICULUM

Welcome to the complete CLI Mastermind Academy Documentation Vault. Below is the full compiled curriculum featuring 700+ interactive lessons across 7 core modules.

---

`;

LESSONS_DATA.forEach((module, idx) => {
  const fileNum = String(idx + 1).padStart(2, '0');
  const fileName = `${fileNum}_${module.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
  const filePath = path.join(docsDir, fileName);

  let moduleMd = `# ${module.title}\n\n`;
  moduleMd += `> ${module.description}\n\n`;
  moduleMd += `**Total Lessons**: ${module.lessons.length} | **Theme Color**: \`${module.color}\`\n\n`;
  moduleMd += `---\n\n`;

  module.lessons.forEach((lesson) => {
    moduleMd += `## ${lesson.title}\n\n`;
    moduleMd += `* **Subtopic**: \`${lesson.subtopic}\` | **XP Reward**: \`+${lesson.xp} XP\` | **Est. Time**: \`${lesson.estimatedMinutes} mins\`\n`;
    moduleMd += `* **Summary**: ${lesson.summary}\n\n`;
    moduleMd += `${lesson.content}\n\n`;

    if (lesson.interactiveCommand) {
      moduleMd += `### Interactive Command Flag Builder\n\n`;
      moduleMd += `\`\`\`bash\n$ ${lesson.interactiveCommand.defaultArgs}\n\`\`\`\n\n`;
      moduleMd += `#### Available Flags:\n`;
      lesson.interactiveCommand.flags.forEach(f => {
        moduleMd += `- \`${f.flag}\` (${f.name}): ${f.desc}\n`;
      });
      moduleMd += `\n`;
    }

    if (lesson.quiz && lesson.quiz.questions) {
      moduleMd += `### 🎯 10-Question Knowledge Challenge Quiz\n\n`;
      lesson.quiz.questions.forEach((q, qIdx) => {
        moduleMd += `**Q${qIdx + 1}: ${q.question}**\n`;
        q.options.forEach((opt, oIdx) => {
          const isCorrect = oIdx === q.correctIndex ? ' (CORRECT ✓)' : '';
          moduleMd += `- [${String.fromCharCode(65 + oIdx)}] ${opt}${isCorrect}\n`;
        });
        moduleMd += `\n*Explanation*: ${q.explanation}\n\n`;
      });
    }

    moduleMd += `---\n\n`;
  });

  fs.writeFileSync(filePath, moduleMd, 'utf-8');
  console.log(`[CREATED] ${filePath}`);

  masterContent += moduleMd + '\n\n';
});

const masterPath = path.join(docsDir, 'COMPLETE_CLI_ACADEMY_CURRICULUM.md');
fs.writeFileSync(masterPath, masterContent, 'utf-8');
console.log(`[CREATED MASTER] ${masterPath}`);

console.log('Successfully generated all .md documentation files!');
