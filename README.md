# 🧑‍💻 Bible25-admin 가이드라인

### `pnpm install`

프로젝트 실행 이전 관련 라이브러리 다운로드 

### `pnpm dev`

Runs the app in the development mode.

### `pnpm build`

Builds the app for production to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

터미널에 `pnpm` 를 입력해서 package.json에 있는 라이브러리를 다운 받은 후, \
yarn dev를 개발 모드 실행 & yarn build 를 하여 build 실행 -> .next 폴더가 build 폴더, \
build error 발생시 `pnpm re-build` 로 재실행 

### `pnpm start`

port:3000으로 build 된 파일 실행 


<br/>
<br/>

# 🚀 Quick Start

```bash
cd <Project Name>
pnpm or yarn install
pnpm dev or yarn run dev
```

your site is now running at `http://localhost:3000`  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# 🔧 Build Project

```bash
cd <Project Name>
pnpm or yarn install
pnpm build or yarn run build
pnpm re-build
```

`.next` folder = `build` folder
<br/>

# 📁 Folder Structure

A quick look at the directories you'll see in this project.

## root

    .
    ├── .github             # CI/CD
    ├── .husky              # git action
    ├── .next               # build folder
    ├── node_modules        # modules folder
    ├── public              # static asset (img, robots, webGL source)
    ├── src                 # project main source
    ├── .env                # secret key
    ├── next.config.js      # nextjs setting file
    ├── tsconfig.json       # typescript setting file
    └── ...

<br/>

## src

모든 메인 소스 코드를 담당하고 있는 폴더입니다.

    .
    ├── ...
    ├── app                 # nextjs 13 app route / component -> app/folder/page.tsx 로 페이지 결합 
    ├── components          # react function component
    ├── constants           # static data / 주로 url, style 정의 등
    ├── hooks               # react custom hook
    ├── lib                 # 앱(도메인)과 관련된 모듈
    ├── ui                  # 기본 컴포넌트
    └── utils               # 기본 유틸 함수들
    └── ...

<br/>

## app 

페이지를 생성하기 위한 모든 소스 코드를 담당하고 있습니다. 
폴더의 경로가 path deps를 의미하고 page.tsx는 해당 페이지 경로의 ui를 의미합니다. 

    .
    ├── ...
    ├── [column]            # 바이블 컨텐츠 관련
    │   └── [bible-content]   # 라우팅 
    ├── [form-page]         # 인터넷 신청 관련 
    │   ├── [admin]           # 그리드 페이지
    │   ├── [detail]          # 신청 페이지
    │   └── [member-ship]     # 신청 페이지
    ├── [manager]           # 바이블 광고 관련 
    │   └── [ads]             # 그리드 페이지 
    ├── api                 # api
    │   ├── auth              # 로그인
    │   └── logout            # 로그아웃
    ├── signin              # 로그인 페이지
    │   └── page.tsx
    ├── layout.tsx          # meta tag / sdk 등 head 부분 담당 
    ├── page.tsx            # root page
    ├── ...

## public

img, favicon 등 변하지 않는 파일들을 담당하고 있는 폴더입니다.

    .
    ├── ...
    ├── images               # 모든 img 파일들이 들어있는 폴더
    └── ...

<br/>

## Commit-Convention

husky + mrm-lint + eslint + commitlint 조합해서 사용
해당 규칙 중 위반 되는 것이 있을시에 code (commit, push) 반영이 안됩니다.  

```bash
pnpm pre-commit
git commit -m "<type>: <name> <message>
git push origin <branch name>

```

## Tech-Stack
사용 라이브러리 정리 (./package.json 에서 보시면 좀 더 자세히 보실 수 있습니다.)\
기획의 변경으로 화면이 변하여 현재 사용하지 않는 라이브러리가 있을 수 있습니다.

  ```json
  "dependencies": {
		"@tanstack/react-table": "^8.10.7",
    "autoprefixer": "10.4.15",
    "chart.js": "^4.4.0",       // 현재 사용안함
    "file-saver": "^2.0.5",
    "jotai": "^2.4.3",
    "next": "^13.5.5",
    "nprogress": "^0.2.0",
    "postcss": "8.4.29",
    "react": "^18.2.0",
    "react-chartjs-2": "^5.2.0", // 현재 사용안함
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.47.0",
    "react-hot-toast": "^2.4.1",
    "woxios": "^0.0.8",
    "xlsx": "^0.18.5"
	},
  ```

<br/>
