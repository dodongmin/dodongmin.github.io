export interface Language {
  name: string;
  iconName?: string;
  className?: string;
}

export const languages: Record<string, Language> = {
  astro: {
    name: "Astro",
    iconName: "astro",
  },
  bootstrap: {
    name: "Bootstrap",
    iconName: "bootstrap",
  },
  javascript: {
    name: "JavaScript",
    iconName: "javascript",
  },
  mongo: {
    name: "MongoDb",
    iconName: "mongo",
  },
  mysql: {
    name: "MySQL",
    className: "bg-[#f6ece1]!",
    iconName: "mysql",
  },
  node: {
    name: "Node.js",
    iconName: "node",
  },
  firebase: {
    name: "Firebase",
    iconName: "firebase",
  },
  sass: {
    name: "Sass",
  },
  git: {
    name: "Git",
    iconName: "git",
  },
  vercel: {
    name: "Vercel",
    iconName: "vercel",
  },
  python: {
    name: "Python",
    iconName: "python",
  },
  postgresql: {
    name: "PostgreSQL",
  },
  linux: {
    name: "Linux",
  },
  docker: {
    name: "Docker",
  },
  prometheus: {
    name: "Prometheus",
  },
  grafana: {
    name: "Grafana",
  },
  mariadb: {
    name: "MariaDB",
  },
  java: {
    name: "Java",
    iconName: "code",
  },
  aws: {
    name: "AWS",
  },
  gcp: {
    name: "GCP",
  },
  azure: {
    name: "Azure",
  },
};

export const getLanguage = (lang: string): Language => {
  return languages[lang] || languages.html;
}; 