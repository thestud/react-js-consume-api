import React, { useEffect, useState } from "react";
import "./App.css";
import StateDropdown from "./components/StateDropdown.js";

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
          	<label for="cars">Filter By State: </label>
		  	<StateDropdown />
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
