import React from "react";
// eslint-disable-next-line react/no-deprecated
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { DimArea } from "../src/";

// TOBE transation 관련 테스트가 가능한지 찾은 후 가능하면 delay와 duration을 테스트 해야 한다.

let container = null;
beforeEach(() => {
  // DOM 엘리먼트를 렌더링 대상으로 설정
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // 종료시 정리
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("Dim 영역이 제대로 동작하는지 확인한다.", () => {
  act(() => {
    render(<DimArea active={false} />, container);
  });
  expect(container.querySelector("#dimArea").style.display).toEqual("none");

  act(() => {
    render(<DimArea active={true} />, container);
  });
  expect(container.querySelector("#dimArea").style.display).toEqual("block");
});

test("설정으로 재정의하는 zIndex가 적용되는지 확인한다.", () => {
  act(() => {
    render(<DimArea active={false} />, container);
  });
  expect(container.querySelector("#dimArea").style.zIndex).toEqual("150");

  act(() => {
    render(<DimArea active={false} zIndex={777} />, container);
  });
  expect(container.querySelector("#dimArea").style.zIndex).toEqual("777");
});

test("Dim영역 자체의 클릭이벤트가 정상작동하는지 확인한다.", () => {
  const clearAction = jest.fn();

  act(() => {
    render(<DimArea active={true} clearAction={clearAction} />, container);
  });
  expect(container.querySelector("#dimArea").style.display).toEqual("block");

  act(() => {
    container
      .querySelector("#dimArea")
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(clearAction).toHaveBeenCalledTimes(1);
});

test("Dim 영역의 spread(left와 top)가 정상작동하는지 확인한다.", () => {
  // 방향이 지정되어 있으면 제원으로만 통제
  act(() => {
    render(
      <DimArea active={false} spread={{ direction: "left" }} />,
      container
    );
  });
  expect(container.querySelector("#dimArea").style.display).toEqual("block");
  expect(container.querySelector("#dimArea").style.width).toEqual("0vw");
  expect(container.querySelector("#dimArea").style.height).toEqual("100vh");

  act(() => {
    render(<DimArea active={true} spread={{ direction: "left" }} />, container);
  });
  expect(container.querySelector("#dimArea").style.display).toEqual("block");
  expect(container.querySelector("#dimArea").style.width).toEqual("100vw");
  expect(container.querySelector("#dimArea").style.height).toEqual("100vh");

  act(() => {
    render(<DimArea active={false} spread={{ direction: "top" }} />, container);
  });
  expect(container.querySelector("#dimArea").style.display).toEqual("block");
  expect(container.querySelector("#dimArea").style.width).toEqual("100vw");
  expect(container.querySelector("#dimArea").style.height).toEqual("0vh");

  act(() => {
    render(<DimArea active={true} spread={{ direction: "left" }} />, container);
  });
  expect(container.querySelector("#dimArea").style.display).toEqual("block");
  expect(container.querySelector("#dimArea").style.width).toEqual("100vw");
  expect(container.querySelector("#dimArea").style.height).toEqual("100vh");
});
