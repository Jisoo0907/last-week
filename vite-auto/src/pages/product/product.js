import defaultAuthData from '@/api/defaultAuthData';
import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pocketbase';
import '@/pages/product/product.css';
import gsap from 'gsap';
import {
  comma,
  getStorage,
  insertLast,
  setDocumentTitle,
  setStorage,
} from 'kind-tiger';

setDocumentTitle('29CM / 상품목록'); // 페이지 제목 설정

if (!localStorage.getItem('auth')) {
  // 로컬 스토리지에 'auth' 키가 없으면
  setStorage('auth', defaultAuthData); //
}

async function renderProductItem() {
  // collection - PB에서 제공하는 메서드. 데이터베이스 내의 특정 컬렉션을 나타내는 객체를 생성함.
  // 이 객체는 해당 컬렉션과 상호 작용하는 데 사용할 수 있는 메서드 제공. ex. getFullList, getList, create 등...
  const productData = await pb.collection('products').getFullList({
    // getFullList() - 지정된 컬렉션의 모든 레코드를 가져옴
    sort: '-created', // 레코드가 내림차순 정렬
  }); // SDK

  // const response = await tiger.get(`${import.meta.env.VITE_PB_API}/collections/products/records`) // Fetch API
  // const productsData = response.data.items;

  const { isAuth } = await getStorage('auth'); // 브라우저 스토리지에서 비동기적으로 데이터 검색
  // 구조 분해 할당 => getStorage 반환 값에서 isAuth라는 특정 속성 추출
  // isAuth 속성이 추출되어 isAuth 상수 변수에 할당됨

  productData.forEach((item) => {
    const discount = item.price * (item.ratio * 0.01);

    const template = `
      <li class="product-item">
          <div>
            <figure>
              <a href="${isAuth ? `/src/pages/detail/index.html?product=${item.id}` : '/src/pages/login/'}"></a>
              <img src="${getPbImageURL(item)}" alt="" />
            </figure>
            <span class="brand">${item.brand}</span>
            <span class="desc">${item.description}</span>
            <span class="price">${comma(item.price)}원</span>
            <div>
              <span class="discount">${item.ratio}%</span>
              <span class="real-price">${comma(item.price - discount)}원</span>
            </div>
          </div>
        </li>
    `;
    insertLast('.container > ul', template);
    // container 내부에 직접적으로 위치한 ul 요소의 마지막에 template 변수의 내용 전달
  });
  gsap.from('.product-item', { y: 30, opacity: 0, stagger: 0.1 });
} // product-item 요소들이 하단으로 30px 이동, 투명도가 0에서 1로 변화
// 각 요소의 애니메이션은 0.1초 간격으로 순차적으로 시작됨

renderProductItem();

// setStorage(key, value)
// - key라는 이름으로 데이터를 브라우저 저장소에 저장
// - 비동기 방식으로 작동. 작업 성공 여부 나타내는 Promise 반환
// key 값이 유효하면 value를 JSON 문자열로 변환
// 변환된 JSON 문자열을 key와 함께 브라우저 저장소에 저장

// getStorage(key)
// 브라우저의 로컬/세션 스토리지에 저장된 데이터 비동기적으로 검색
// key가 문자열이면 파싱된 JSON 값 반환

// insertLast(node, text)
// node가 문자열 => getNode로 DOM 노드 객체 가져옴
// node의 insertAdjacentHTML 메서드로 beforeend 위치에 text 삽입
