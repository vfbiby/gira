import { useState } from "react";
import { IconPin } from "./icon/icon-pin";

interface PinProps {
  checked: boolean;
  className?: string;
  onChange?: (isChecked: boolean) => void;
}

export const Pin = ({ checked, onChange, ...restProps }: PinProps) => {
  const [isChecked, toggleChecked] = useState(checked);
  const handleToggle = () => {
    if (onChange) onChange(isChecked);
    toggleChecked(!isChecked);
  };

  return (
    <div {...restProps} onClick={handleToggle}>
      <IconPin
        className={
          `${isChecked ? "text-yellow-200" : ""} ` +
          "fill-current w-full h-full"
        }
      />
    </div>
  );
};
