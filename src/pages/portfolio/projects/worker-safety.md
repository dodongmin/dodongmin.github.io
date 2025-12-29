---
layout: /src/layouts/ProjectLayout.astro
title: "건설 현장 작업자 안전 관리 시스템"
pubDate: 2023-12-01
description: "YOLOv4와 OpenPose를 활용한 실시간 작업자 감지, 삭제 및 골격 추적 시스템"
languages: ["python", "yolov4", "openpose", "opencv", "rtsp"]
image:
  url: "/images/projects/yolo-comparison.png"
  alt: "YOLOv4 작업자 감지 시스템"
---

**건설 현장 작업자 안전 관리 시스템**은 **YOLOv4** 객체 감지와 **OpenPose** 골격 추적 기술을 결합하여 건설 현장의 작업자를 실시간으로 감지하고, 영상에서 작업자를 제거하거나 스켈레톤으로 시각화하는 컴퓨터 비전 시스템입니다.

---

## 🎯 핵심 목표

- **실시간 감지**: YOLOv4로 높은 정확도의 작업자 감지
- **배경 복구**: 작업자 제거 후 자연스러운 배경 복원
- **자세 분석**: OpenPose로 작업자의 골격 및 자세 추적

---

## 🏗️ 시스템 아키텍처

![시스템 플로우차트](/images/projects/yolo-flowchart.png)

```
입력 (RTSP/비디오)
    ↓
YOLOv4 객체 감지
    ↓
인물 있음? ──Yes──→ 병렬 처리 ──┐
    │                         │
    No                        ├→ 인물 박스 제거 (Inpainting)
    │                         │
    ↓                         └→ OpenPose 골격화
배경 스택 저장
    ↓
결과 영상 출력
```

---

## 🔧 핵심 기능

### 1. 실시간 작업자 감지 - YOLOv4

- **모델**: YOLOv4
- **성능**: 약 30 FPS
- **최적화**: 416x416 입력, Confidence 0.5, NMS

### 2. 작업자 제거 및 배경 복구
![작업자 제거](/images/projects/yolo-removal.png)

- **동적 배경 모델**: 최근 30프레임 중간값 사용
- **Inpainting**: Telea 알고리즘으로 경계 스무딩
- **Margin**: 바운딩 박스 주변 10px 확장

### 3. OpenPose 골격 추적

- **Body25 모델**: 25개 관절점 감지
- **실시간 처리**: 368x368 해상도에서 약 20 FPS
- **활용**: 작업 자세 분석 가능

### 4. 통합 파이프라인
![최종 비교](/images/projects/yolo-comparison.png)


---

## 🧰 기술 스택

| 분류 | 기술 | 역할 |
|-----|------|-----|
| **객체 감지** | YOLOv4 | 작업자 실시간 감지 |
| **자세 추정** | OpenPose | 골격 추출 및 추적 |
| **영상 처리** | OpenCV 4.5+ | 프레임 처리, Inpainting |
| **배열 연산** | NumPy | 배경 모델 생성 |
| **가속** | CUDA/cuDNN | GPU 가속 추론 |

---

🚀 **Developed by 냉면육회대게** | 2023.12
