## 📋 Overview

Bus Reservation System은 버스 예약 서비스를 위한 완벽한 솔루션입니다. 
- **고객용 웹 애플리케이션**: 버스 노선 검색, 예약, 견적서 작성
- **관리자 대시보드**: 버스 운영 관리, 일정 관리, 견적서 조회
- **RESTful API**: Spring Boot 기반의 안정적인 백엔드

---

## ✨ Features

### 고객 기능
- 🚌 버스 노선 검색 및 조회
- 📅 버스 일정 확인 및 예약
- 📝 3단계 예약 입력 폼 (출발지, 도착지, 버스 선택)
- 💬 연락처 정보 입력
- 📄 견적서 생성 및 조회
- 🔍 실시간 검색 기능

### 관리자 기능
- 🎛️ 대시보드: 통계 및 모니터링
- 🚌 버스 정보 관리
- 📅 버스 일정 관리
- 💰 견적서 관리 및 조회
- 🔐 역할 기반 접근 제어 (RBAC)

---

## 🛠️ Tech Stack

### Backend
- **Language**: Java 17
- **Framework**: Spring Boot 4.0.1
- **Database**: PostgreSQL
- **ORM**: JPA/Hibernate
- **Security**: Spring Security + JWT Authentication
- **Build Tool**: Gradle
- **Additional Libraries**:
  - Lombok (Boilerplate reduction)
  - JWT (jjwt 0.11.5)
  - Validation

### Frontend (Customer)
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **State Management**: Zustand
- **UI Components**: React Bootstrap
- **Styling**: Bootstrap 5, Tailwind CSS
- **HTTP Client**: Axios

### Frontend Admin (Management)
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **HTTP Client**: Axios

---

## 📦 Installation

### Prerequisites
- Java 17 이상
- Node.js 18 이상
- PostgreSQL 14 이상
- Gradle (자동으로 포함됨)

### Backend Setup

```bash
# 1. 백엔드 폴더로 이동
cd backend

# 2. 데이터베이스 설정 (application.properties)
# - PostgreSQL 연결 정보를 수정하세요

# 3. 의존성 설치 및 빌드
./gradlew build

# 4. 서버 실행
./gradlew bootRun
