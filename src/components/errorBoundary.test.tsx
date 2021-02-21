import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { useState } from "react";
import { ErrorBoundary } from "./error-boundary";

describe("Error boundary", () => {
  beforeEach(() => {
    //console.error = jest.fn();
    //console.log = jest.fn();
    jest.spyOn(global.console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    //@ts-ignore
    global.console.error.mockRestore();
  });

  it("should calls render that there was a problem", () => {
    //Arrange
    const Bomb = () => {
      // @ts-ignore
      return <div>{undefined.throwAnError()}</div>;
    };

    const BombButton = () => {
      const [renderBomb, setRenderBomb] = useState(false);

      return renderBomb ? (
        <Bomb />
      ) : (
        <button onClick={() => setRenderBomb(true)}>Bomb</button>
      );
    };

    const ErrorFallBack = ({ error }: { error: Error | null }) => {
      return (
        <div>
          <span>There was a problem</span>
          {error?.name}
        </div>
      );
    };

    //Act
    const { getByText, container } = render(
      <ErrorBoundary fallbackRender={ErrorFallBack}>
        <BombButton />
      </ErrorBoundary>
    );
    fireEvent.click(getByText("Bomb"));

    //Assert
    expect(container).toHaveTextContent("There was a problem");
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  it("should calls reporter that there was a problem", function () {});
  it("should give a handler to recover error ", function () {});
});
