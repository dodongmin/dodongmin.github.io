---
layout: /src/layouts/ProjectLayout.astro
title: "PostgreSQL 11 HA (Pacemaker + VIP)"
pubDate: 2025-04-05
description: "Pacemaker+Corosync 기반 PostgreSQL 11 HA 시스템 구축 및 Streaming Replication을 활용한 무중단 고가용성 데이터베이스 아키텍처"
languages: ["postgresql", "linux", "docker", "bash", "prometheus", "grafana"]
image:
  url: "/images/projects/dbstreaming.png"
  alt: "PostgreSQL HA 아키텍처 다이어그램"
---

PostgreSQL HA 시스템은 **Pacemaker + Corosync**와 **Streaming Replication(Async)**을 결합해, 장애 감지부터 VIP 재할당까지 **10초 이내 자동 전환**을 목표로 설계했습니다. 애플리케이션은 VIP로 접속하므로 코드 수정 없이 자동 재연결됩니다.

---

## 🎯 핵심 목표

- **자동 페일오버**: Primary 노드 장애 시 10초 이내 Standby 노드로 자동 전환
- **VIP 기반 자동 재연결**: VIP를 통한 애플리케이션 자동 재연결 (코드 변경 불필요)
- **복제 지연 최소화**: 비동기 복제 방식에서도 평시 지연 1초 이하 목표
- **표준화된 운영**: 장애 시나리오별 런북 및 자동화 스크립트 제공

---

## 🏗️ 시스템 아키텍처

### 교차 이중화(Cross HA) 구성

**2개의 데이터베이스(DB-A, DB-B)를 2대의 서버에 교차 이중화**

```
┌──────────────────────────────┐   ┌──────────────────────────────┐
│      Server 1 (node1)        │   │      Server 2 (node2)        │
├──────────────────────────────┤   ├──────────────────────────────┤
│  ┌────────────────────────┐  │   │  ┌────────────────────────┐  │
│  │  DB-A (Primary)        │  │   │  │  DB-A (Standby)        │  │
│  │  • VIP-A: Active       │──┼───┼─▶│  • VIP-A: Standby      │  │
│  │  • pgAgent: Active     │  │   │  │  • pgAgent: Stopped    │  │
│  └────────────────────────┘  │   │  └────────────────────────┘  │
│             │                │   │             ▲                │
│             └────────────────┼───┼─────────────┘                │
│        Streaming Replication │   │  (Async, WAL-based)          │
│                              │   │                              │
│  ┌────────────────────────┐  │   │  ┌────────────────────────┐  │
│  │  DB-B (Standby)        │  │   │  │  DB-B (Primary)        │  │
│  │  • VIP-B: Standby      │◀─┼───┼──│  • VIP-B: Active       │  │
│  │  • pgAgent: Stopped    │  │   │  │  • pgAgent: Active     │  │
│  └────────────────────────┘  │   │  └────────────────────────┘  │
│             ▲                │   │             │                │
│             └────────────────┼───┼─────────────┘                │
│                              │   │  Streaming Replication       │
│  Pacemaker + Corosync        │   │  Pacemaker + Corosync        │
└──────────────────────────────┘   └──────────────────────────────┘
```

### 핵심 컴포넌트

**1️⃣ Pacemaker + Corosync 클러스터**
- **Pacemaker**: 리소스(PostgreSQL, VIP, pgAgent) 생명주기 관리 및 장애 감지
- **Corosync**: 노드 간 하트비트(1초 간격) 및 멤버십 관리
- **Split-Brain 방지**: Quorum 정책 + STONITH 활성화

**2️⃣ Streaming Replication (비동기)**
- **WAL 기반 실시간 복제**: Primary → Standby WAL 전송
- **Hot Standby**: Standby 노드에서 읽기 전용 쿼리 실행 가능
- **Replication Slot**: WAL 파일 자동 삭제 방지

**3️⃣ VIP (Virtual IP) 페일오버**
- Primary 노드 장애 감지 → VIP 이동 → ARP 갱신 → 서비스 재개
- 애플리케이션은 동일 VIP로 신규 Primary에 자동 재연결

**4️⃣ pgAgent 클러스터**
- pgAgent를 Primary 노드에만 실행 (Colocation)
- Failover 시 자동 이동으로 배치 작업 중복 실행 방지

---

## 📊 성과

- **MTTR**: 평균 복구 시간 10초 이내
- **복제 지연**: 평시 1초 미만 (Async 특성상 장애 시 RPO>0)
- **배치 작업**: Primary에서만 실행으로 데이터 정합성 보장

---

## 🧰 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| **Database** | PostgreSQL | 11.x |
| **Cluster** | Pacemaker + Corosync | 2.x + 3.x |
| **Scheduler** | pgAgent | 4.x |
| **OS** | Rocky Linux | 9.x |
| **Monitoring** | Prometheus + Grafana | — |

---

🚀 **Developed by 냉면육회대게**
