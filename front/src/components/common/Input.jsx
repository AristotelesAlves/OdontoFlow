
export default function InputWithLabel ({ label, type = 'text', value, onChange, placeholder, error = false}) {
  return (
    <div className="flex w-full">
      <label className="flex gap-1 flex-col w-full">
        {label}
        <input className={`border rounded-md w-full px-2 py-1 ${error ? 'bg-red': null}`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      </label>
    </div>
  );
};
