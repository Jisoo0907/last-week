import "@/styles/global.css";
import { getNode as $ } from "kind-tiger";
// import classes from "/src/styles/main.module.css";
import { btn } from "@/styles/main.module.css";

import img from "@/assets/8b.jpg";
// img 상수에는 이미지 소스의 URL이 저장됨

const app = $("#app");

const h1 = document.createElement("h1"); // h1 요소 생성
h1.textContent = "빛 보다 빠른 Vite"; // h1 텍스트 콘텐츠 설정
h1.classList.add = "heading";

const figure = document.createElement("figure");
figure.innerHTML = `
  <img src="${img}" style="width: 50px"/>
  <button class="${btn}" type="button">버튼</button>
  <figcaption>로고</figcaption>
`;

const fragment = document.createDocumentFragment(); // 문서 조각 생성
// 여러 요소 그룹핑하는 데 사용

fragment.appendChild(h1);
fragment.appendChild(figure);

app.appendChild(fragment);
