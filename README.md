# Younghwan Portfolio

## PROJECTS 카드 관리 방법

`PROJECTS` 섹션 카드는 `script.js`의 `projects` 배열을 기준으로 렌더링됩니다.

### 데이터 구조
각 프로젝트는 아래 필드를 사용합니다.

- `title`: 프로젝트 제목
- `period`: 기간 문자열
- `roles`: 역할 목록(문자열 배열)
- `results`: 주요 성과
- `industryClient`: 산업 · 클라이언트
- `tags`: 하단 뱃지 2개(산업, 역할 레벨)

### 수정/추가 방법
1. `script.js`의 `projects` 배열에서 항목을 수정합니다.
2. 새 카드를 추가할 때는 동일한 객체 구조로 배열에 push(또는 항목 추가)합니다.
3. HTML(`index.html`)은 컨테이너(`#project-cards`)만 유지하므로, 카드 마크업을 직접 복사/붙여넣기 할 필요가 없습니다.

### 공통 마크업 생성 함수
아래 함수가 카드 공통 구조를 단일 소스로 관리합니다.

- `createProjectHead(period)`
- `createProjectFacts({ roles, results, industryClient })`
- `createCardMeta(tags)`
- `createProjectCard(project)`
- `renderProjects(projectList, container)`
