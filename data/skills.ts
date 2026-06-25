export interface Skill {
  category: string;
  items: string[];
}

export const SKILLS: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    category: 'Mobile',
    items: ['Flutter', 'Dart', 'BLoC', 'Android SDK', 'Firebase'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'REST API', 'MySQL', 'Firebase Auth'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman'],
  },
];
