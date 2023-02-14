// DOM
// 실제 문서 객체 모델
// const containerElement = document.createElement('div');
// containerElement.setAttribute('class', 'container container--md');
// containerElement.textContent = '컨테이너 요소';

// console.dir(containerElement);

// const divElement = document.createElement('div'); 그럼 이게 DOM이고,
// const articleReactElement = React.createElement('article'); 이게 virtual dom 인거죠?
// => 맞음

/* virtualDOM 이란건 기존 DOM 오브젝트에서 필요한 속성만 갖고와서 
리엑트 상에서 비슷하게 만든 오브젝트이고 
이를 DOM 오브젝트처럼 사용할 수 있다라는 것인가요? => 맞음 (우리가 해야하는게 아니라 React가 해줌) */

/* 리액트가 가상으로 열심히 만들다가 내용이 확정됐을 때 랜더링? 하는 방식인건가요 => 맞음 */

/* -------------------------------------------------------------------------- */

// Virtual DOM
// 실제의 것을 추상화 한 것
// 가상 문서 객체 모델

const guideHTML = /* html */ `
  <div class="container container--md">
    <h1>웹브라우저 환경에서 React 라이브러리 시작하기</h1>
    <p>React 라이브러리 코드가 웹 브라우저 환경에서 어떻게 해석되고 작동되는 지 살펴봅니다.</p>
    <ul>
      <li>React 및 ReactDOM API 활용</li>
      <li>가상(Virtual) 노드 vs. 실제(Actual) DOM 노드</li>
    </ul>
  </div>
`;

// React API
// Creating React Element

// alias (별칭) 함수
// 구조 분해 할당
const { createElement: h /* hyperscript */ } = React;

// 가상 DOM 구성 (동적 마크업)
// design pattern: composite pattern
const virtualElement = h(
  "div",
  { className: "container container--md" },
  h("h1", null, "웹브라우저 환경에서 React 라이브러리 시작하기"),
  h(
    "p",
    null,
    "React 라이브러리 코드가 웹 브라우저 환경에서 어떻게 해석되고 작동되는 지 살펴봅니다."
  ),
  h(
    "ul",
    {},
    h("li", null, "React 및 ReactDOM API 활용"),
    h("li", null, "가상(Virtual) 노드 vs. 실제(Actual) DOM 노드")
  ),
  h(
    "button",
    {
      type: "button",
    },
    "unmount React App"
  )
);

// React가 만들어낸 가상 DOM 루트 노드
// console.log(virtualElement); // App

const actualElement = document.getElementById("root");

// React v17
// ReactDOM 렌더링 해줘
// React가 만든 가상 노드를 실제 DOM 노드 안에 마운트(mount) 해줘
// ReactDOM.render(virtualElement, actualElement);

// React v18
// ReactDOM! 문서에 실제 존재하는 요소노드를 React 트리의 뿌리로 만들어줘
// 생성된 React 트리의 뿌리 요소(객체)의 렌더링 메서드를 사용해
// React가 만든 가상 노드를 렌더링 해줘
const reactDomRoot = ReactDOM.createRoot(actualElement);

// React가 하는 일 (pure)
reactDomRoot.render(virtualElement);

// 마운트 (React 가상 요소가 실제 DOM 요소 안에 렌더링 되었다)
// 언마운트 (실제 DOM 요소 안에 렌더링 된 React 가상 요소가 제어되었다)
// mount vs. unmount (마운트는 붙이기, 어마운트가 떼기)

// React가 할 수 없는 일 (side effects)
setTimeout(() => {
  const button = document.querySelector("[type=button]");
  button.addEventListener("click", () => {
    reactDomRoot.unmount();
  });
}, 1000);
