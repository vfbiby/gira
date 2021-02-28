import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Pin } from "./pin";

describe("Pin", () => {
  it("should be empty content when rendering", () => {
    const { container } = render(<Pin checked={false} />);
    expect(container.textContent).toBe("");
  });

  it("should not show checked color when it is not checked", () => {
    const { container } = render(<Pin checked={false} />);
    expect(container.querySelector("svg")?.classList).not.toContain(
      "text-yellow-200"
    );
  });

  it("should show checked color when it is checked", () => {
    const { container } = render(<Pin checked={true} />);
    expect(container.querySelector("svg")?.classList).toContain(
      "text-yellow-200"
    );
  });

  it("should toggle checked when clicked", () => {
    const { container } = render(<Pin checked={false} />);

    expect(container.querySelector("svg")?.classList).not.toContain(
      "text-yellow-200"
    );
    fireEvent.click(container.querySelector("div") as Element);

    expect(container.querySelector("svg")?.classList).toContain(
      "text-yellow-200"
    );
    fireEvent.click(container.querySelector("div") as Element);

    expect(container.querySelector("svg")?.classList).not.toContain(
      "text-yellow-200"
    );
  });

  it("should call callback when click", () => {
    const onChange = jest.fn().mockImplementation(()=>{});
    const { container } = render(<Pin checked={false} onChange={onChange} />);

    fireEvent.click(container.querySelector("svg") as Element);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(false);
  })

  it("should be inactive when set to disabled", function(){
    const onChange = jest.fn().mockImplementation(()=>{});
    const { container } = render(<Pin checked={false} disabled={true} onChange={onChange} />);

    expect(container.querySelector("svg")?.classList).not.toContain(
      "text-yellow-200"
    );

    fireEvent.click(container.querySelector("svg") as Element);

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onChange).not.toHaveBeenCalled();
    expect(container.querySelector("svg")?.classList).not.toContain(
      "text-yellow-200"
    );
  })

});
