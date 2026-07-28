const FormField = ({ label, type = "text", value, onChange, placeholder, required = true }) => (
  <label className="block">
    <span className="field-label">{label}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="field-input"
    />
  </label>
);

export default FormField;
