// CampusLink — Layer 7: Semantic Skill Aliases & Normalization Dictionary

export const SKILL_ALIASES = {
  javascript: ['js', 'ecmascript', 'es6', 'es6+', 'modern javascript'],
  react: ['reactjs', 'react.js', 'react native'],
  nodejs: ['node', 'node.js', 'express', 'expressjs'],
  python: ['python3', 'py', 'django', 'flask', 'fastapi'],
  java: ['core java', 'java se', 'java 8', 'java 11', 'java 17', 'j2se'],
  sql: ['mysql', 'postgresql', 'postgres', 'sqlite', 'rdbms', 'oracle sql', 'tsql'],
  aws: ['amazon web services', 'aws cloud', 'ec2', 's3', 'lambda'],
  docker: ['containerization', 'containers', 'dockerfile', 'docker compose'],
  kubernetes: ['k8s', 'container orchestration'],
  git: ['github', 'gitlab', 'git version control', 'version control'],
  'data structures': ['dsa', 'data structures and algorithms', 'algorithms', 'problem solving'],
  'rest apis': ['rest', 'restful apis', 'restful services', 'api design', 'restful web services'],
  'machine learning': ['ml', 'machinelearning', 'deep learning', 'scikit-learn', 'tensorflow', 'pytorch'],
  'spring boot': ['springboot', 'spring', 'spring framework', 'spring mvc'],
  mongodb: ['mongo', 'nosql', 'document db'],
  cpp: ['c++', 'c/c++', 'modern c++'],
  c: ['c programming', 'ansi c'],
  html: ['html5'],
  css: ['css3', 'styling', 'sass', 'scss'],
  linux: ['unix', 'bash', 'shell scripting']
};

// Maps a raw skill string to its canonical normalized form
export function getCanonicalSkillName(skillName) {
  if (!skillName || typeof skillName !== 'string') return '';
  const clean = skillName.trim().toLowerCase();

  for (const [canonical, aliases] of Object.entries(SKILL_ALIASES)) {
    if (canonical === clean || aliases.includes(clean)) {
      return canonical;
    }
  }
  return clean;
}
