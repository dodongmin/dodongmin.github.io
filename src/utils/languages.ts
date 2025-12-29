export interface Language {
  name: string;
  iconName?: string;
  className?: string;
}

export const languages: Record<string, Language> = {
  astro: {
    name: "Astro",
  },
  bootstrap: {
    name: "Bootstrap",
  },
  javascript: {
    name: "JavaScript",
  },
  mongo: {
    name: "MongoDb",
  },
  mysql: {
    name: "MySQL",
    className: "bg-[#f6ece1]!",
  },
  node: {
    name: "Node.js",
  },
  firebase: {
    name: "Firebase",
  },
  sass: {
    name: "Sass",
  },
  git: {
    name: "Git",
  },
  vercel: {
    name: "Vercel",
  },
  python: {
    name: "Python",
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