---
layout: /src/layouts/ProjectLayout.astro
title: "Prometheus + Grafana 모니터링 스택"
pubDate: 2024-06-01
description: "Prometheus와 Grafana를 활용한 시스템 모니터링 스택 구축."
languages: ["prometheus", "grafana", "docker", "bash", "linux", "python"]
image:
  url: "/images/projects/sample.webp"
  alt: "Grafana 대시보드 스크린샷"
---

**Prometheus + Grafana 모니터링 스택**은 서버, 데이터베이스, 애플리케이션 지표를 수집하고 시각화하는 모니터링 시스템입니다.  
**표준화된 대시보드**와 **알림 규칙**을 통해 장애 예측 및 대응 능력을 향상시켰습니다.

---

## 🧩 핵심 기능

- **지표 수집**: Node Exporter, PostgreSQL Exporter, Custom Metrics 수집
- **대시보드 표준화**: 팀 공통 템플릿으로 일관된 모니터링 환경 제공
- **알림 최적화**: 노이즈 감소 및 심각도별 라우팅으로 대응 효율성 향상
- **자동화**: Docker Compose 기반 원클릭 배포 및 설정 관리
- **확장성**: 새로운 서비스/지표 추가 시 표준 프로세스 제공

---

## 🏗️ 아키텍처 개요

- **수집 레이어**: Prometheus Server + Exporters (Node, PostgreSQL, Custom)
- **저장 레이어**: Prometheus TSDB (로컬) + Remote Storage (장기 보관)
- **시각화 레이어**: Grafana + 표준 대시보드 템플릿
- **알림 레이어**: Alertmanager + Slack/Email 통합
- **배포 레이어**: Docker Compose + 환경별 설정 분리

---

## 📊 모니터링 대상

### 시스템 지표
- CPU, Memory, Disk, Network 사용률
- 프로세스 상태 및 리소스 소비
- 로그 파일 크기 및 로테이션 상태

### 데이터베이스 지표
- PostgreSQL 연결 수, 쿼리 성능, 복제 지연
- 테이블 크기, 인덱스 효율성
- 백업 상태 및 복구 시간

### 애플리케이션 지표
- HTTP 응답 시간, 에러율
- 비즈니스 메트릭 (사용자 수, 트랜잭션 수)
- 외부 API 호출 상태

---

## 🚨 알림 전략

### 심각도별 분류
- **Critical**: 서비스 다운, 데이터 손실 위험
- **Warning**: 성능 저하, 용량 부족 예상
- **Info**: 정상 범위 내 변화, 유지보수 알림

### 알림 채널
- **Slack**: 실시간 알림, 팀 공유
- **Email**: 중요 알림, 장기 보관
- **PagerDuty**: 24/7 대응 (Critical만)

---

## 📈 대시보드 표준

### 시스템 대시보드
- **Overview**: 전체 시스템 상태 요약
- **Infrastructure**: 서버별 상세 지표
- **Performance**: 성능 트렌드 분석

### 데이터베이스 대시보드
- **PostgreSQL Health**: 연결, 쿼리, 복제 상태
- **Performance**: 슬로우 쿼리, 인덱스 효율성
- **Capacity**: 디스크 사용량, 테이블 크기

### 애플리케이션 대시보드
- **API Metrics**: 응답 시간, 에러율, 처리량
- **Business Metrics**: 사용자 활동, 트랜잭션
- **Dependencies**: 외부 서비스 상태

---

## 🔧 운영 자동화

### 배포 자동화
- **Docker Compose**: 원클릭 배포 및 업그레이드
- **환경 분리**: dev/staging/prod 설정 관리
- **백업/복원**: 설정 및 데이터 백업 자동화

### 설정 관리
- **Terraform**: 인프라 코드화
- **Ansible**: 서버 설정 자동화
- **Git**: 설정 변경 추적 및 롤백

---

## 📊 성과 및 결과

- **MTTR 단축**: 평균 장애 대응 시간 50% 감소
- **예방적 대응**: 용량 부족 사전 감지로 다운타임 방지
- **운영 효율성**: 표준화된 대시보드로 온보딩 시간 단축
- **비용 절감**: 불필요한 리소스 사용량 최적화

---

## 🧪 모니터링 테스트

### 부하 테스트
- CPU/메모리 부하 시뮬레이션
- 디스크 I/O 스트레스 테스트
- 네트워크 대역폭 제한 테스트

### 장애 시뮬레이션
- 서비스 다운 시나리오
- 데이터베이스 연결 실패
- 외부 API 타임아웃

---

## 🧰 기술 스택

- **Monitoring**: Prometheus, Grafana, Alertmanager
- **Exporters**: Node Exporter, PostgreSQL Exporter
- **Container**: Docker, Docker Compose
- **Automation**: Bash, Python, Terraform
- **Integration**: Slack, Email, PagerDuty

---

## 📌 향후 계획

- **ML 기반 이상 탐지**: Prometheus + ML 모델 통합
- **분산 추적**: Jaeger/Zipkin 연동으로 마이크로서비스 모니터링
- **SLO/SLI**: 서비스 수준 목표 설정 및 추적
- **자동 스케일링**: 메트릭 기반 자동 리소스 조정

---

🚀 *Developed by dodongmin.*
