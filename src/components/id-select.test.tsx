import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { IdSelect } from "./id-select";

describe("IdSelect", () => {
  let options: { id: number; name: string }[];

  beforeEach(() => {
    options = [
      {
        id: 1,
        name: "vf",
      },
      {
        id: 2,
        name: "bb",
      },
    ];
  });

  it("should render defaultOptionName", () => {
    render(
      <IdSelect
        defaultOptionName="please select"
        value={"3"}
        onChange={() => {}}
      />
    );
    expect(screen.getByDisplayValue("please select")).toBeInTheDocument();
    expect(screen.queryByText("bb")).not.toBeInTheDocument();
  });

  it("should render option items", async () => {
    const { getByText } = render(
      <IdSelect
        defaultOptionName="please select"
        value={"1"}
        options={options}
        onChange={() => {}}
      />
    );
    expect(getByText("vf")).toBeInTheDocument();
    expect(getByText("bb")).toBeInTheDocument();
  });

  it("should call onChange callback when clicking a item", async () => {
    const onChange = jest.fn();
    const { getByText, getByRole } = render(
      <IdSelect
        defaultOptionName="please select"
        value={"1"}
        options={options}
        onChange={onChange}
      />
    );
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(getByText("bb")).toBeInTheDocument();

    fireEvent.change(getByRole("combobox"), { target: { value: 2 } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  describe("default selection", function () {
    let rerender: any, getByDisplayValue: any, queryByDisplayValue: any;

    beforeEach(() => {
      const rendered = render(
        <IdSelect
          defaultOptionName="please select"
          value={2}
          options={options}
          onChange={() => {}}
        />
      );

      rerender = rendered.rerender;
      getByDisplayValue = rendered.getByDisplayValue;
      queryByDisplayValue = rendered.queryByDisplayValue;
    });

    it("should select second item when value is specify to 2", () => {
      expect(getByDisplayValue("bb")).toBeInTheDocument();
      expect(queryByDisplayValue("please select")).not.toBeInTheDocument();
    });

    it("should select default item if value is undefined", () => {
      rerender(
        <IdSelect
          defaultOptionName="please select"
          value={null}
          options={options}
          onChange={() => {}}
        />
      );
      expect(getByDisplayValue("please select")).toBeInTheDocument();
      expect(queryByDisplayValue("bb")).not.toBeInTheDocument();
    });

    it("should select default item if value is null", () => {
      rerender(
        <IdSelect
          defaultOptionName="please select"
          value={undefined}
          options={options}
          onChange={() => {}}
        />
      );
      expect(getByDisplayValue("please select")).toBeInTheDocument();
      expect(queryByDisplayValue("bb")).not.toBeInTheDocument();
    });
  });
});
