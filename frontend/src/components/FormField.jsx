function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  options = [],
  placeholder = "",
  min,
  max,
  step,
}) {
  const isSelect = type === "select";

  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {isSelect ? (
        <select className="field__input" name={name} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="field__input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          required
        />
      )}
    </label>
  );
}

export default FormField;

