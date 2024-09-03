# Next.js 14+, Tailwind CSS 3.4+, MSW 2.4, Typescript 등과 Admin 작업을 위한 보일러 플레이트.


## 특징
기존의 보일러 플레이트는 무겁습니다.

실제 Admin 을 빠르게 구현하고자 할 때 필요한 필수 기능만을 포함하고 있습니다.


## 기능

### Next.js
[Next.js](https://nextjs.org/) 를 활용하여 SSR 을 구현합니다.

App router 를 활용하여 브랜치 / 언어별 라우팅을 지원합니다.

### TypeScript
TypeScript 를 활용하여 타입을 관리합니다.

### husky & lint-staged
husky 와 lint-staged 를 활용하여 커밋 전에 코드 포맷팅을 진행합니다.

### eslint & prettier
eslint 와 prettier 를 활용하여 코드 포맷팅을 진행합니다.

### i18n
i18n 라이브러리를 활용하여 다국어를 지원합니다.

다국어에 전체 배포를 위한 Matser 브랜치와 각 국가에 해당하는 브랜치로 구성되어 있습니다.

### Mock Service Worker
[MSW 라이브러리](https://mswjs.io/)를 활용하여 API 테스트를 진행합니다.

SSR 지원을 위해 instrumentationHook 을 활용하여 서버에서도 동작하도록 설정합니다.

### tanstack-query (v5)
[tanstack-query 라이브러리](https://tanstack.com/query/latest)를 활용하여 비동기 상태관리를 진행합니다.

### fetch 라이브러리 활용

[ky 라이브러리](https://github.com/sindresorhus/ky)를 활용하여 fetch 를 진행합니다.

### lodash 대신 es-tookit 으로 대체
lodash 를 대체하기 위해 [es-toolkit 라이브러리](https://github.com/toss/es-toolkit)를 활용합니다.

### Next-auth
[Next-auth 라이브러리](https://next-auth.js.org/)를 활용하여 인증을 진행합니다.

### Tailwind CSS
[Tailwind CSS](https://tailwindcss.com/) 를 활용하여 스타일링을 진행합니다.

### MUI
[mui-datatables](https://github.com/gregnb/mui-datatables) 를 활용하여 벌크 테이블을 구성합니다.

mui-datatables 에서 export / import / image uploader 를 쉽게 할 수 있도록 구현하였습니다.

더 상세한 테이블 구현을 위한다면 [@mui/x-data-grid-pro](https://mui.com/x/api/data-grid/data-grid-pro/) 를 활용합니다. (라이센스 필요)


## 시작하기

### 요구 사항

- Node.js 21.7+ (npm 10.7+)

### 설치
```bash
git clone https://github.com/jadenspace/Next-js-Admin-Boilerplate.git
cd nextjs-admin-boilerplate
npm install
```

### https 서버 구동
`sh init-https.sh`

다음을 실행하여 pem 파일을 생성합니다.

이후 `npm run local` 명령어를 통해 `server.js` 를 통한 https 서버를 구동합니다.


### FAQ

- 로컬환경에서 next-auth 가 작동 안하는 경우

  - .env `NEXT_PUBLIC_NEXTAUTH_URL` 확인
  - https 서버 재구동 (pem 발급 당시와 다른 경우 문제 발생 가능)
