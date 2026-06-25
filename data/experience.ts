export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies?: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    id: 'milestone-1',
    company: 'Learning Journey',
    role: 'Cross-Platform Mobile Development',
    period: '2024 - Present',
    description: 'Focusing on building responsive mobile applications using Flutter and Dart. Actively implementing Clean Architecture, BLoC state management pattern, Dio network configuration, and external API integrations.',
    technologies: ['Flutter', 'Dart', 'BLoC', 'Firebase', 'Dio', 'REST API'],
  },
  {
    id: 'milestone-2',
    company: 'Learning Journey',
    role: 'Modern Frontend Development',
    period: '2023 - 2024',
    description: 'Deep-dived into the React ecosystem, TypeScript, Next.js, and modern styling solutions. Developed custom layouts, workspace models, command palettes, and responsive web components.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'milestone-3',
    company: 'Learning Journey',
    role: 'Core Programming Foundations',
    period: '2020 - 2022',
    description: 'Built basic web applications, self-taught in core HTML, CSS, JavaScript, and logic foundations. Focused on understanding fundamental coding patterns, data structures, and DOM manipulation.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Git'],
  },
];
