import { Raw } from "types";

//type SelectProps = React.ComponentProps<typeof select>;

interface IdSelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "value" | "onChange"
  > {
  value?: Raw | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <select
      value={options?.length ? toNumber(value) : 0}
      onChange={(e) => onChange?.(toNumber(e.target.value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <option value={0}>{defaultOptionName}</option>
      ) : null}
      {options?.map((option) => (
        <option key={option.id} value={option?.id}>
          {option?.name}
        </option>
      ))}
    </select>
  );
};

export const toNumber = (value: unknown) =>
  isNaN(Number(value)) ? 0 : Number(value);
