import React, { useState } from "react";

const GenreDropdown = (props) => {
  const [selectedOption, setSelectedOption] = useState('');
  return (
    <select
      value={selectedOption}
      onChange={(e) => {
		if(e.target.value !== 'CLEAR') {
			setSelectedOption(e.target.value);
		} else {
			setSelectedOption(null);
			// e.target.selectedIndex = -1.
			// e.target.selected 
		}
		
        props.filterGenre(e.target.value);
      }}
    >
	<option value="ALL">All</option>
      {props.options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
};

export default GenreDropdown