import { defineConfig } from "vite"; // vite 패키지에서 가져옴. Vite 빌드 설정 정의하는 데 사용됨.
import { resolve } from "node:path"; // resolve 함수는 파일 경로 해결에 사용됨

const env = process.env.NODE_ENV; // 현재 실행 중인 환경을 나타내는 환경 변수

// Vite 설정 정의
const viteConfig = defineConfig({
  build: {
    outDir: "docs", // 빌드된 파일의 출력 디렉토리 지정. "docs" 디렉토리로 설정.
  },
  server: {
    host: "localhost", // 개발 서버의 호스트 이름 지정. 로컬 머신에서만 접근할 수 있도록 함.
    port: 3000, // 개발 서버의 포트 번호 지정.
    cors: true, // 개발 서버에서 CORS를 허용하도록 설정.
    // 다른 도메인이나 포트에서 개발 서버에 액세스 할 때 필요함.
  },
  css: {
    devSourcemap: true, // 개발 모드에서 CSS 소스맵을 생성하도록 설정.
    modules: {
      // CSS 모듈 사용하도록 설정.
      // CSS 모듈은 스타일 충돌을 방지하기 위해 클래스 이름에 해시값을 추가함
      // 클래스 이름을 생성하는 함수 지정
      generateScopedName:
        env === "development" // 개발 모드일 때
          ? "[name]__[local]__[hash:base64:4]" // 더 자세한 클래스 이름 생성
          : "[local]__[hash:base64:2]", // 더 짧은 클래스 이름 생성
    },
  },
  resolve: {
    // 모듈 경로 해결 관련 설정 정의
    alias: { "@": resolve(__dirname, "src") },
    // alias: 별칭을 사용하여 모듈 경로 줄이도록 설정. @ 별칭을 src 디렉토리로 매핑함.
  },
});

console.log(resolve(__dirname, "src"));
// 현재 작업 디렉토리와 "src" 디렉토리를 결합하여 절대 경로 반환

export default viteConfig;
// Vite 설정 객체를 다른 파일에서 사용할 수 있도록 내보냄
