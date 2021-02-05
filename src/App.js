import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [apiList, setList] = useState([]);

  /*

  useEffect(() => {
  const fetchData = async () => {
     const data = await getData(1);
     setData(data);
  }

  fetchData();
}, []);
  */

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://code-challenge.spectrumtoolbox.com/api/restaurants",
        {
          headers: {
            Authorization: "Api-Key q3MNxtfep8Gt",
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          data = data.sort((a, b) => {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1; //nameA comes first
            }
            if (nameA > nameB) {
              return 1; // nameB comes first
            }
            return 0; // names must be equal
          });

          setList(data);
          console.log(data);
        });
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <table>
        <tr>
          <td></td>
          <td></td>
          <td>

          <label for="cars">Filter By State</label>

          <select>
	<option value="AL">Alabama</option>
	<option value="AK">Alaska</option>
	<option value="AZ">Arizona</option>
	<option value="AR">Arkansas</option>
	<option value="CA">California</option>
	<option value="CO">Colorado</option>
	<option value="CT">Connecticut</option>
	<option value="DE">Delaware</option>
	<option value="DC">District Of Columbia</option>
	<option value="FL">Florida</option>
	<option value="GA">Georgia</option>
	<option value="HI">Hawaii</option>
	<option value="ID">Idaho</option>
	<option value="IL">Illinois</option>
	<option value="IN">Indiana</option>
	<option value="IA">Iowa</option>
	<option value="KS">Kansas</option>
	<option value="KY">Kentucky</option>
	<option value="LA">Louisiana</option>
	<option value="ME">Maine</option>
	<option value="MD">Maryland</option>
	<option value="MA">Massachusetts</option>
	<option value="MI">Michigan</option>
	<option value="MN">Minnesota</option>
	<option value="MS">Mississippi</option>
	<option value="MO">Missouri</option>
	<option value="MT">Montana</option>
	<option value="NE">Nebraska</option>
	<option value="NV">Nevada</option>
	<option value="NH">New Hampshire</option>
	<option value="NJ">New Jersey</option>
	<option value="NM">New Mexico</option>
	<option value="NY">New York</option>
	<option value="NC">North Carolina</option>
	<option value="ND">North Dakota</option>
	<option value="OH">Ohio</option>
	<option value="OK">Oklahoma</option>
	<option value="OR">Oregon</option>
	<option value="PA">Pennsylvania</option>
	<option value="RI">Rhode Island</option>
	<option value="SC">South Carolina</option>
	<option value="SD">South Dakota</option>
	<option value="TN">Tennessee</option>
	<option value="TX">Texas</option>
	<option value="UT">Utah</option>
	<option value="VT">Vermont</option>
	<option value="VA">Virginia</option>
	<option value="WA">Washington</option>
	<option value="WV">West Virginia</option>
	<option value="WI">Wisconsin</option>
	<option value="WY">Wyoming</option>
</select>	

          </td>
          <td></td>
          <td></td>
        </tr>
        {apiList.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.city}</td>
            <td>{item.state}</td>
            <td>{item.telephone}</td>
            <td>{item.genre}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
