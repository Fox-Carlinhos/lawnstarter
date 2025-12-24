interface SWRadioButtonProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const SWRadioButton = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
}: SWRadioButtonProps) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <label htmlFor={id} className="flex items-center cursor-pointer group">
        <div className="mr-2 relative">
          <div
            className={`
              w-4 h-4 rounded-full border-2 transition-all duration-300
              ${
                checked
                  ? "border-[#ffd700] bg-[#ffd700]/20 shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                  : "border-[#4a9eff]/50 bg-transparent group-hover:border-[#4a9eff]"
              }
            `}
          >
            {checked && (
              <div className="absolute inset-1 rounded-full bg-[#ffd700] animate-pulse" />
            )}
          </div>
        </div>
        <span
          className={`
            text-sm font-medium tracking-wide transition-colors duration-300
            ${checked ? "text-[#ffd700]" : "text-[#8892b0] group-hover:text-white"}
          `}
        >
          {label}
        </span>
      </label>
    </div>
  );
};
