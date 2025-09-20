---
layout: /src/layouts/ProjectLayout.astro
title: "PostgreSQL 11 HA (Pacemaker + VIP)"
pubDate: 2024-04-01
description: "Pacemaker+Corosync 기반 PostgreSQL 11 HA."
languages: ["postgresql", "linux", "docker", "bash", "prometheus", "grafana"]
image:
  url: "/images/projects/sample.webp"
  alt: "PostgreSQL HA 아키텍처 다이어그램"
---

**PostgreSQL 11 HA**는 **Pacemaker + Corosync**를 이용해 장애 시에도 서비스 중단 없이 **VIP 자동 전환**이 이뤄지도록 설계한 이중화 프로젝트입니다.  
데이터 레벨은 **Streaming Replication(Async)**로 동기화하고, 배치/잡은 **pgAgent 클러스터**로 단일 실행을 보장했습니다.  
관측성은 **Prometheus + Grafana**로 표준화하고, 운영은 **런북/스크립트**로 자동화했습니다.

---

## 🧩 핵심 기능

- **VIP 페일오버**: 장애 발생 시 가상 IP가 자동 이전되어 **클라이언트 연결 중단 최소화**
- **클러스터 매니징**: **Pacemaker/Corosync**로 자원(start/stop/monitor) 및 의존성 제어
- **데이터 동기화**: **Streaming Replication**(Primary→Standby) 구성, 재동기화 스크립트 제공
- **잡 단일 실행**: **pgAgent 클러스터**로 배치/스케줄 작업의 **중복 실행 방지**
- **헬스 체크 & 알림**: Prometheus Exporter 지표 수집, Grafana 대시보드·Alert Rule 표준화
- **런북/자동화**: 장애 시나리오별 **Runbook**과 **복구 스크립트**로 MTTR 단축

---

## 🏗️ 아키텍처 개요

- **노드 구성**: Primary 1대, Standby 1대 (확장 고려)
- **클러스터**: Pacemaker + Corosync (Quorum/STONITH 정책은 환경에 맞춰 옵션)
- **IP 레이어**: Floating VIP (ARP 갱신 지연 최소화 튜닝)
- **데이터 레이어**: PostgreSQL 11 + Streaming Replication
- **스케줄러**: pgAgent 클러스터 (Leader 노드에서만 실행)
- **관측성**: postgres exporter, node exporter → Prometheus → Grafana

> 네트워크 단절/프로세스 다운/디스크 이슈 등 **장애 시나리오별**로 페일오버 동작과 롤백 절차를 문서화했습니다.

---

## 🔧 운영 자동화 & 표준화

- **Failover/Switchover 스크립트**: 안전 가드(사전 체크) 포함
- **복구 스크립트**: 로그 기반 재동기화(리커버리) 자동화
- **Backup/Rotate**: Docker 기반 백업 컨테이너 + 보존 정책
- **런북**: 장애 유형별 체크리스트(의심 지표 → 조치 순서 → 검증 포인트)

---

## 📈 관측/모니터링

- **주요 지표**: 복제 지연, 연결 수, 체크포인트/워커 상태, 디스크/IO, VIP 상태
- **대시보드**: 팀 공통 템플릿(Overview / Replication / Storage / Alerts)
- **알림 튜닝**: 노이즈 감소(예: 지연 임계 다단계) + 심각도 라우팅(Ops/DBA)

---

## 🔒 신뢰성 & 결과

- 계획된 점검/스위치오버 시 **다운타임 무중단 또는 수 초 수준**
- **MTTR 단축**: 표준 런북/스크립트 도입으로 인지→대응→복구 시간 단축
- **운영 일관성**: 온보딩/핸드오버 비용 감소, 변경 추적 용이

---

## 🧪 테스트 시나리오 (발췌)

1. Primary 프로세스 다운 → VIP 이전 → Standby 승격 → 서비스 정상
2. 네트워크 단절(Primary 고립) → VIP 보호 → Standby 활성화
3. 디스크 고갈/IO 지연 → 임계 감지 → 알림 → 수동 스위치오버

---

## 🧰 기술 스택

- **Database**: PostgreSQL 11, pgAgent  
- **Cluster**: Pacemaker, Corosync, VIP  
- **Ops/Auto**: Bash, Docker  
- **Observability**: Prometheus, Grafana, Exporters

---

## 📌 비고

- 운영 환경 정책에 따라 **동기식 복제(Sync)**, **STONITH**, **Quorum** 등은 선택/조합 가능합니다.  
- 애플리케이션 레벨에서 **커넥션 재시도/프락시**(예: HAProxy/pgBouncer)와 함께 쓰면 복구 체감이 더 좋아집니다.

---

🚀 *Developed by dodongmin.*
