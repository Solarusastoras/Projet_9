import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
//Pour éviter l'erreur de module introuvable, utilisez l'importation correcte :
import "@testing-library/jest-dom";
import Button, { BUTTON_TYPES } from "./index";

describe("When a button is created", () => {
  it("the button must include a title", () => {
    render(<Button title="my-button" type={BUTTON_TYPES.DEFAULT} />);
    const buttonElement = screen.getByTitle("my-button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("the button must display a label", () => {
    render(<Button>label</Button>);
    const buttonElement = screen.getByText(/label/);
    expect(buttonElement).toBeInTheDocument();
  });

  describe("and it's clicked", () => {
    it("an event onClick is executed", () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick} />);
      const buttonElement = screen.getByTestId("button-test-id");
      fireEvent(
        buttonElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
      expect(onClick.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe("and selected type is submit", () => {
    it("an input submit is created", () => {
      render(<Button type={BUTTON_TYPES.SUBMIT}>label</Button>);
      const buttonElement = screen.getByTestId("button-test-id");
      expect(buttonElement.type).toEqual("submit");
    });
  });
});
