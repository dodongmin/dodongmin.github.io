---
layout: /src/layouts/ProjectLayout.astro
title: "Prometheus + Grafana 모니터링"
pubDate: 2025-01-03
description: "Prometheus와 Grafana를 활용한 시스템/DB/애플리케이션 통합 모니터링"
languages: ["prometheus", "grafana", "docker", "bash", "linux"]
image:
  url: "/images/projects/monitoring.png"
  alt: "Grafana 대시보드"
---

**Prometheus + Grafana 모니터링 시스템**은 서버, 데이터베이스, 애플리케이션 지표를 수집하고 시각화하는 통합 모니터링 시스템입니다.

---

## 🎯 핵심 목표

- **지표 수집**: exporter를 이용한 다양한 데이터 수집
- **대시보드 표준화**: 시스템/DB/애플리케이션별 표준 대시보드 제공
- **알림 최적화**: 심각도별 라우팅으로 대응 효율성 향상
- **자동화**: Docker Compose 기반 원클릭 배포

---

## 🏗️ 아키텍처

- **수집 레이어**: Prometheus + Exporters (Node, PostgreSQL, Custom)
- **저장 레이어**: Prometheus (로컬) + Remote Storage (장기 보관)
- **시각화 레이어**: Grafana + 표준 대시보드 템플릿
- **알림 레이어**: Alertmanager + Telegram 통합

---

## 📊 Exporter 기반 모니터링 대상

### 1️⃣ Node Exporter (서버/OS 지표)
**📌 핵심 목적**: 서버 자체 이상 여부를 가장 먼저 판단

**수집 범위**:
- CPU, Memory, Load Average, Disk/Filesystem 사용량
- Network 트래픽, 시스템 업타임 등

**활용 목적**: 서버 리소스 이상 징후(고부하/메모리 부족/디스크 임계치)를 조기에 감지하고, 장애 원인 분석의 기준 지표로 사용

**주요 지표**:
- **CPU Usage (%)**: 전체/코어별 사용률
- **Load Average (1m / 5m / 15m)**: CPU 코어 수 대비 부하 추이
- **Memory Usage / Available Memory**: 사용 중 메모리, available memory
- **Disk Usage (%)**: 디스크 임계치 알림 (80% / 90%)
- **Disk I/O (Read/Write IOPS, Latency)**: DB/로그 I/O 병목 원인 파악
- **Network Throughput (RX/TX)**: 인터페이스별 네트워크 병목/폭주 탐지

### 2️⃣ cAdvisor (컨테이너 지표)
**📌 핵심 목적**: 각각의 컨테이너에 대한 문제 즉시 식별

**수집 범위**:
- 컨테이너별 CPU/Memory 사용량
- Network I/O, Disk I/O
- 컨테이너 상태 (재시작/종료 등)

**활용 목적**: Docker 환경에서 서비스(컨테이너) 단위로 리소스 사용량을 추적하고, 특정 컨테이너의 리소스 과점유/메모리 누수 등을 빠르게 파악

**주요 지표**:
- **Container CPU Usage**: 컨테이너별 CPU 사용률
- **Container Memory Usage / Limit**: 메모리 사용량 / 제한값
- **Container Network I/O**: 컨테이너별 RX/TX
  - 트래픽 쏠림 분석
- **Container Disk I/O**: 읽기/쓰기량
  - 로그 폭증, 디스크 병목 원인 추적

### 3️⃣ PostgreSQL Exporter (DB 지표)
**📌 핵심 목적**: DB 성능 저하/복제 이슈를 지표로 즉시 판단

**수집 범위**:
- 연결 수, 트랜잭션 처리량
- 쿼리/락 대기, 캐시/버퍼 상태
- Vacuum/Analyze, WAL 상태
- Replication Lag 등

**활용 목적**: DB 병목(락/대기/커넥션 폭증) 및 성능 저하 원인을 지표로 확인하고, 복제 지연/상태를 함께 모니터링

**주요 지표**:
- **Active Connections / Max Connections**: 현재 연결 수
  - 커넥션 폭증/풀 고갈 감지
- **Transactions per Second (TPS)**: Commit / Rollback 수
  - 트래픽 변화 감지
- **Query Duration / Slow Queries**: 평균/상위 쿼리 지연
  - 성능 저하 원인 파악
- **Lock / Wait Events**: 락 대기 건수
  - Deadlock/Blocking 분석
- **Cache Hit Ratio**: Shared Buffer 적중률
  - 메모리 튜닝 필요 여부 판단
- **Replication Lag (초)**: Primary ↔ Standby 지연
  - 장애 전환 시 데이터 유실 위험 판단
- **WAL Generation Rate**: WAL 생성량
  - 디스크/복제 부하 예측

### 4️⃣ Blackbox Exporter (가용성/외부 체크)
**📌 핵심 목적**: 사용자 관점에서 살아있는지 확인

**수집 범위**:
- HTTP/HTTPS 응답 코드, 응답 시간
- TCP 포트 체크, ICMP(Ping) 등 (설정한 Probe 기준)

**활용 목적**: 서비스 프로세스는 살아있지만 실제 접속이 안 되는 상황을 외부 관점에서 조기 감지하고, URL/포트 단위 가용성을 지속 점검

**주요 지표**:
- **Endpoint Availability (UP/DOWN)**: HTTP/TCP 성공 여부
  - 서비스 가용성 판단의 최우선 지표
- **HTTP Response Time**: 응답 지연
  - 체감 성능 저하 감지
- **HTTP Status Code Distribution**: 2xx / 4xx / 5xx 비율
  - 에러 유형 구분
- **SSL Certificate Expiry**: 인증서 만료 잔여 일수
  - 만료 사고 사전 차단
- **DNS / TCP Probe Latency**: 네트워크 레벨 문제 감지

### 5️⃣ JMX Exporter (JVM/Tomcat 지표)
**📌 핵심 목적**: Java 애플리케이션 내부 병목 확인

**수집 범위**:
- JVM Heap/Non-Heap, GC, Thread, Class 로딩
- Tomcat 스레드/요청 처리 관련 JMX 지표

**활용 목적**: Java/Tomcat 기반 애플리케이션의 GC 이슈, 스레드 고갈, 메모리 누수 등 애플리케이션 레벨 병목을 정량적으로 파악

**주요 지표**
- **JVM Heap Usage (Used / Max)**: 메모리 누수, GC 과부하 판단
- **GC Count / GC Time**: Minor / Full GC 횟수 및 시간
  - Full GC 폭증 시 즉시 대응
- **Thread Count (Runnable / Blocked)**: 스레드 고갈/데드락 감지
- **Tomcat Thread Pool Usage**: Busy Threads / Max Threads
  - 요청 처리 한계 도달 여부
- **Request Count / Error Rate**: 처리량 및 에러율
  - 애플리케이션 장애 감지
- **Response Time (P95 / P99)**: 사용자 체감 성능 지표

---

## 🚨 알림 전략

### 심각도별 분류
- **Critical**: 서비스 다운, 데이터 손실 위험
- **Warning**: 성능 저하, 용량 부족 예상
- **Info**: 정상 범위 내 변화

### 알림 채널
- **Telegram**: 실시간 알림, 팀 공유

---

## 📈 성과

- **장애 대응 시간 단축**
- **예방적 대응**: 사전 감지로 다운타임 방지
- **운영 효율성**: 표준화된 대시보드로 온보딩 시간 단축
- **비용 절감**: 오픈소스 기반 무료 모니터링

---

## 🧰 기술 스택

- **Monitoring**: Prometheus, Grafana, Alertmanager
- **Exporters**: Node, cAdvisor, PostgreSQL, JMX, Blackbox
- **Container**: Docker, Docker Compose
- **Integration**: Telegram Bot API

---

🚀 **Developed by 냉면육회대게**
