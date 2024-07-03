import PocketBase from 'pocketbase';
// pocketbase 패키지에서 PocketBase 클래스를 가져옴
// PocketBase 데이터베이스와 상호 작용하는 데 사용됨

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
// import.meta.env.VITE_PB_URL환경 변수에 저장된 URL을 사용하여 새로운 PocketBase 인스턴스 생성
// 이 인스턴스는 PocketBase 데이터베이스와 연결하는 데 사용됨
// pb변수에 할당

export default pb;
