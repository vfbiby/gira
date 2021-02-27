import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { IdSelect } from "./id-select";

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
    const { getByText } = render(
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

    fireEvent.mouseDown(getByText("vf"));

    await waitFor(() => {
      expect(getByText("bb")).toBeInTheDocument();
    });
  });

  it("should call onChange callback when clicking a item", async () => {
    const onChange = jest.fn();
    const { getByText } = render(
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
        onChange={onChange}
      />
    );

    expect(onChange).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.mouseDown(getByText("vf"));
    });

    await waitFor(() => {
      expect(getByText("bb")).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(getByText("bb"));
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
