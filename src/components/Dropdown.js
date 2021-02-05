export default Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  return (
    <select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
