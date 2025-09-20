export interface Language {
  name: string;
  iconName: string;
  className?: string;
}

export const languages: Record<string, Language> = {
  angular: {
    name: "Angular",
    iconName: "angular",
  },
  astro: {
    name: "Astro",
    iconName: "astro",
  },
  bootstrap: {
    name: "Bootstrap",
    iconName: "bootstrap",
  },
  cloudflare: {
    name: "Cloudflare",
    iconName: "cloudflare",
  },
  html: {
    name: "HTML 5",
    iconName: "html",
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
    iconName: "sass",
  },
  git: {
    name: "Git",
    iconName: "git",
  },
  vercel: {
    name: "Vercel",
    iconName: "vercel",
  },
  windsurf: {
    name: "Windsurf",
    iconName: "windsurf-logo",
  },
  cursor: {
    name: "Cursor",
    iconName: "cursor-ia",
  },
  python: {
    name: "Python",
    iconName: "python",
  },
};

export const getLanguage = (lang: string): Language => {
  return languages[lang] || languages.html;
}; 