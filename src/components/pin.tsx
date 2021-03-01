import { useState } from "react";
import { IconPin } from "./icon/icon-pin";

interface PinProps {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  onChange?: (isChecked: boolean) => void;
}

export const Pin = ({
  checked,
  onChange,
  disabled,
  ...restProps
}: PinProps) => {
  const [isChecked, toggleChecked] = useState(checked);
  const handleToggle = () => {
    if (disabled) return;
    if (onChange) onChange(!isChecked);
    toggleChecked(!isChecked);
  };

  return (
    <div {...restProps} onClick={handleToggle}>
      <IconPin
        className={
          `${isChecked ? "text-yellow-300 dark:text-yellow-200" : ""} ` +
          "fill-current w-full h-full text-gray-300 dark:text-gray-600"
        }
      />
    </div>
  );
};
