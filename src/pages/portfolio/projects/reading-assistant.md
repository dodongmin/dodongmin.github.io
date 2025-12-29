---
layout: /src/layouts/ProjectLayout.astro
title: "북키즈 - AI 독서 도우미"
pubDate: 2024-01-16
description: "Stable Diffusion, STT, TTS를 활용한 어린이 맞춤형 인터랙티브 독서 학습 플랫폼"
languages: ["python", "django", "stable-diffusion", "azure", "chatgpt", "tailwind"]
image:
  url: "/images/projects/reading-assistant.jpg"
  alt: "북키즈 AI 독서 도우미 메인 화면"
---

**북키즈**는 **Stable Diffusion** 이미지 생성, **Azure STT/TTS API**, **ChatGPT API**를 결합하여 어린이의 독서 이해도와 어휘력을 향상시키는 인터랙티브 학습 플랫폼입니다.

---

## 🎯 핵심 목표

- **시각적 몰입**: Stable Diffusion으로 동화 속 장면을 실시간 이미지로 생성
- **음성 인터랙션**: TTS로 동화 읽어주기, STT로 퀴즈 음성 답변
- **학습 효과 측정**: ChatGPT 기반 맞춤형 퀴즈로 이해도 검증

---

## 🏗️ 시스템 아키텍처

```
┌───────────────────────────────────────────────────┐
│            Django Web Application                 │
│  메인 홈 | 동화보기 | 퀴즈 | 갤러리                      │
└──────────────────────┬────────────────────────────┘
                       ▼
┌───────────────────────────────────────────────────┐
│            Backend Services                       │
│  Image (SD) | Speech (TTS/STT) | Quiz (ChatGPT)   │
└──────────────────────┬────────────────────────────┘
                       ▼
┌───────────────────────────────────────────────────┐
│            External APIs                          │
│  Stable Diffusion | Azure Speech | ChatGPT        │
└───────────────────────────────────────────────────┘
```

### 데이터 흐름

**동화 읽기 모드**:
```
텍스트 → ChatGPT 장면 분석 → Stable Diffusion 이미지 생성
                              ↓
         Azure TTS 음성 변환 ← 텍스트 청크 분리
```

**퀴즈 모드**:
```
동화 내용 → ChatGPT 퀴즈 생성 → TTS 문제 읽기
                                ↓
           STT 음성 인식 ← 사용자 답변
               ↓
          정답 판정 & 피드백
```

---

## 🔧 핵심 기능

### 1. 동화 갤러리
![동화 갤러리](/images/projects/reading-gallery.png)

- 다양한 주제의 동화 컬렉션
- Stable Diffusion으로 생성된 대표 이미지
- Tailwind CSS 반응형 그리드 레이아웃

### 2. 실시간 이미지 생성
![생성된 동화 이미지](/images/projects/reading-story.png)

- **모델**: Stable Diffusion v1.5
- **최적화**: Seed 값 고정으로 캐릭터 일관성 유지, CUDA GPU 활용

### 3. 텍스트 음성 변환 (TTS)
- **음성**: Azure `ko-KR-SunHiNeural` (어린이 친화적)
- **기능**: 문단별 재생, 속도 조절 (0.7x ~ 1.3x)

### 4. 음성 인식 퀴즈
![퀴즈 화면](/images/projects/reading-quiz.png)

- **ChatGPT**: 동화 기반 퀴즈 자동 생성
- **Azure STT**: 실시간 마이크 입력 처리
- **핸즈프리**: 음성으로 답변 입력


## 🧰 기술 스택

| 분류 | 기술 | 역할 |
|-----|------|-----|
| **웹 프레임워크** | Django 4.2 | MVC 아키텍처 |
| **이미지 생성** | Stable Diffusion v1.5 | 실시간 일러스트 |
| **음성 인식** | Azure STT | 음성 → 텍스트 |
| **음성 합성** | Azure TTS | 텍스트 → 음성 |
| **AI 모델** | ChatGPT (GPT-3.5) | 퀴즈 생성 |
| **프론트엔드** | Tailwind CSS, Alpine.js | 반응형 UI |
| **비동기 처리** | Celery + Redis | 이미지 생성 작업 큐 |
| **데이터베이스** | PostgreSQL 14 | 관계형 데이터 |
| **스토리지** | AWS S3 | 이미지/음성 파일 |


---

🚀 **Developed by 냉면육회대게** | 2024.01
