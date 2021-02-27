import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { IdSelect } from "./id-select";
jest.useFakeTimers();

describe("IdSelect", () => {
  it("should render defaultOptionName", () => {
    render(
      <IdSelect
        defaultOptionName="please select"
        value={"3"}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("please select")).toBeInTheDocument();
  });

  it("should render option items", async () => {
    const { container, getByText } = render(
      <IdSelect
        defaultOptionName="please select"
        value={"1"}
        options={[
          {
            id: 1,
            name: "vf",
          },
          {
            id: 2,
            name: "bb",
          },
        ]}
        onChange={() => {}}
      />
    );

    expect(getByText("vf")).toBeInTheDocument();

    jest.runAllTimers();
    fireEvent.mouseDown(getByText("vf"));

    await waitFor(() => {
      expect(getByText("bb")).toBeInTheDocument();
    });
  });
});
