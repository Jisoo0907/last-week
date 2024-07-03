import '@/pages/login/login.css';
import { setDocumentTitle, getNode, getStorage, setStorage } from 'kind-tiger';
import pb from '@/api/pocketbase';
import gsap from 'gsap';

setDocumentTitle('29CM / 로그인');

const tl = gsap.timeline({
  // GSAP 타임라인 객체 생성
  defaults: {
    // 기본값으로 모든 요소의 투명도를 0으로 설정
    opacity: 0,
  },
});

tl.from('.container h1', { delay: 0.2, y: 30 }) // 0.2초 지연 후 30px 위에서부터 아래로 불투명하게
  .from('.container hr', { scaleX: 0 }) // 가로 스케일이 0인 상태부터 1(원래크기)로 확장되게
  .from('form > *', { y: 30, stagger: 0.1 }) // form의 모든 자식 요소 30px 위에서 아래로. 각 요소 사이에 0.1초 간격
  .from('.register', { y: -30 }, '-=0.2'); // 0.2초 지연 후 30px 아래에서부터 위로.

const loginButton = getNode('.login');

function handleLogin(e) {
  e.preventDefault();

  // const id = 'seonbeom2@gmail.com';
  // const pw = 'dkssud123'
  // jisoo@naver.com
  // kelly123

  const id = getNode('#idField').value;
  const pw = getNode('#pwField').value;

  pb.collection('users')
    .authWithPassword(id, pw)
    .then(
      async () => {
        const { model, token } = await getStorage('pocketbase_auth');

        setStorage('auth', {
          isAuth: !!model,
          user: model,
          token,
        });

        alert('로그인 완료! 메인페이지로 이동합니다.');
        location.href = '/index.html';
      },
      () => {
        alert('인증된 사용자가 아닙니다.');
      }
    );
}

loginButton.addEventListener('click', handleLogin);
