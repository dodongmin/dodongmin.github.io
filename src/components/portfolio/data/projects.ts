export type FeaturedProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAltText: string;
  categoryText: string;
  tags?: string[];
};

const featuredProjects: FeaturedProject[] = [
  {
    id: 'PostgreSQL11 HA',
    slug: 'pgsql-ha-pacemaker',
    title: 'PostgreSQL11 HA (Pacemaker + VIP)',
    description:
      'Pacemaker 기반 VIP 장애조치 구성과 pgAgent 클러스터링으로 고가용성 데이터베이스 환경 구축.',
    imageUrl: '/images/imagedefault.webp',
    imageAltText: 'PostgreSQL HA project preview image',
    categoryText: '데이터베이스/인프라',
    tags: ['PostgreSQL', 'Pacemaker', 'VIP'],
  },
  {
    id: 'Monitoring',
    slug: 'monitoring-stack',
    title: 'Prometheus + Grafana 모니터링',
    description:
      '지표 수집·알림·대시보드를 표준화해 운영 효율을 높이는 모니터링 스택 구성.',
    imageUrl: '/images/imagedefault.webp',
    imageAltText: 'Monitoring stack project preview image',
    categoryText: '운영/모니터링',
    tags: ['Prometheus', 'Grafana', 'Alerting'],
  },
  {
    id: 'Infra',
    slug: 'docker-backup-ops',
    title: 'Docker 백업 컨테이너 & 운영 표준화',
    description:
      '백업 컨테이너 설계 및 스크립트 표준화로 일관된 운영 체계 수립.',
    imageUrl: '/images/imagedefault.webp',
    imageAltText: 'Infra project preview image',
    categoryText: 'DevOps',
    tags: ['Docker', 'Bash'],
  },
];

export function getFeaturedProjects(): FeaturedProject[] {
  return featuredProjects;
}
