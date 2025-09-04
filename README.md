# 🤖 AI-Powered WoW Guild Manager

[![AI-Driven](https://img.shields.io/badge/Developed%20by-AI%20Assistant-%237B68EE?style=for-the-badge&logo=google-gemini)](https://gemini.google.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Spring](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=for-the-badge&logo=spring)](https://spring.io/projects/spring-boot)

---

## 🚀 프로젝트 소개: "코드 없는" 개발을 향한 도전

이 프로젝트는 **인간 개발자가 직접 코드를 작성하지 않고, 오직 AI 어시스턴트와의 대화를 통해** 월드 오브 워크래프트 길드 관리 애플리케이션을 구축하는 것을 목표로 하는 실험적인 도전입니다.

개발자는 아이디어와 요구사항을 제시하는 "설계자"의 역할을, AI는 실제 코드를 구현하는 "개발자"의 역할을 수행하며, 인간과 AI의 협업이 어디까지 가능한지를 탐구합니다.

## ✨ 주요 특징

*   **100% AI 코드 생성**: 모든 프론트엔드와 백엔드 코드는 Gemini AI 어시스턴트에 의해 작성되었습니다.
*   **최신 기술 스택**: React와 Spring Boot를 기반으로 한 현대적인 웹 애플리케이션 구조를 채택했습니다.
*   **프론트엔드/백엔드 분리**: 명확한 역할 분리를 통해 확장성과 유지보수성을 극대화한 아키텍처를 지향합니다.
*   **대화 기반 개발**: 모든 기능은 설계자의 자연어 요구사항을 AI가 코드로 변환하는 과정을 통해 구현되었습니다.

## 🛠️ 기술 스택

| 구분 | 기술 | 설명 |
| :--- | :--- | :--- |
| **Frontend** | `React (Vite)` | 빠르고 효율적인 개발 환경을 위한 모던 리액트 프레임워크 |
| | `Tailwind CSS` | 유틸리티 우선 방식의 CSS 프레임워크로 신속한 UI 개발 |
| | `Axios` | 백엔드 API 통신을 위한 HTTP 클라이언트 |
| | `React Router` | 선언적 라우팅을 통한 페이지 관리 |
| **Backend** | `Spring Boot` | 강력하고 안정적인 자바 기반 백엔드 프레임워크 |
| | `Spring Security / JWT` | 역할 기반 접근 제어 및 안전한 토큰 인증 시스템 |
| | `Spring Data JPA` | 객체-관계 매핑(ORM)을 통한 효율적인 데이터베이스 관리 |
| | `H2 Database` | 개발 및 테스트를 위한 인메모리 데이터베이스 |
| **API Docs** | `SpringDoc (Swagger)` | API 명세 자동화 및 테스트 UI 제공 |

## 📜 개발 로그 (요약)

1.  **프로젝트 초기 설정**: AI에게 프론트엔드(Vite+React)와 백엔드(Spring Boot) 프로젝트의 기본 구조 생성을 요청.
2.  **사용자 인증 구현**: 회원가입, 로그인, 역할 기반(USER/ADMIN) 접근 제어 기능 구현.
3.  **API 응답 구조화**: 모든 API 응답을 표준화하고, 전역 예외 처리 시스템을 도입하여 안정성 확보.
4.  **캐릭터 관리 기능**: 사용자가 자신의 WoW 캐릭터 정보를 생성, 조회, 수정, 삭제(CRUD)할 수 있는 기능 구현.
5.  **UI/UX 개선**: 테이블 목록을 카드 레이아웃으로 변경하고, 마이페이지에 사이드바를 도입하여 사용자 경험 개선.
6.  **테스트 코드 작성**: ...는 AI의 실수로 인해 많은 어려움을 겪었으나, 결국 Vitest와 Spring Boot 테스트 환경을 성공적으로 구축.

## 향후계획 (Future Work)

앞으로 AI와의 협업을 통해 길드 공지사항, 레이드 일정 관리, 아이템 신청 시스템 등 더 복잡하고 다양한 기능들을 추가해 나갈 예정입니다. 이 도전을 통해 AI가 소프트웨어 개발의 패러다임을 어떻게 바꿀 수 있는지 보여주고자 합니다.

---

# 주인이 직접 작성한 참고사항
## 이 README.md 파일의 상단부 역시 ai만으로 작성되었습니다.
## 사용한 ai agent는 google code assist의 individual 버전이며 대부분 작업을 원활하게 수행하지만 가끔 무한 루프 버그가 있으며 이때 코드 혹은 무언가 박살나는 현상이 발생(같은 코드 무한 수정)
## 테스트 코드를 작성시키면서부터 문제가 발생하여 실제 테스트코드는 없는데 왜 있다고 거짓말하는지 모르겠습니다. 분명히 테스트코드 문제가 해결이 안 되니까 지워버릴거고 테스트는 나중에 다시시도한다고 했는데...