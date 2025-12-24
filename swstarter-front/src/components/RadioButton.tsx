interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const RadioButton = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
}: RadioButtonProps) => {
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
      <label htmlFor={id} className="flex items-center cursor-pointer my-2">
        <div className="mr-2">
          {checked ? (
            <div className="w-3.5 h-3.5 rounded-full bg-[#0094ff] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          ) : (
            <div className="w-3.5 h-3.5 rounded-full border border-gray-300 bg-white" />
          )}
        </div>
        <span className="text-[10px] font-bold text-black mr-4">{label}</span>
      </label>
    </div>
  );
};
