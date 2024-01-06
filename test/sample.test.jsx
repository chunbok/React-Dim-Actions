import React from "react";
// eslint-disable-next-line react/no-deprecated
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { DimArea } from "../src/";

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

it("renders with or without a name", () => {
  act(() => {
    render(<DimArea dim={{ active: false }} />, container);
  });
  expect(container.textContent).toBe("Hey, stranger");

  act(() => {
    render(<DimArea dim={{ active: false }} />, container);
  });
  expect(container.textContent).toBe("Hello, Jenny!");

  act(() => {
    render(<DimArea dim={{ active: false }} />, container);
  });
  expect(container.textContent).toBe("Hello, Margaret!");
});
