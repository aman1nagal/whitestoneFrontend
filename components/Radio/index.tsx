import clsx from "clsx";

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

export const Radio: React.FC<CustomInputProps> = ({
  className,
  label,
  ...rest
}) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <input
        type="radio"
        checked={rest.checked}
        name={rest.name}
        value={rest?.value}
        id="radio"
        readOnly={rest.readOnly}
        disabled={rest.disabled}
        onChange={rest.onChange}
        className={clsx(
          `w-4 h-4 text-blue-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2`,
          className
        )}
      />
      <label
        className={clsx((rest.disabled || rest.readOnly) && "text-gray-400")}
        htmlFor="radio"
      >
        {label}
      </label>
    </div>
  );
};
