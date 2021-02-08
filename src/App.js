import React, { useEffect, useState } from "react";
import "./App.css";
import StateDropdown from "./components/StateDropdown.js";
import GenreDropdown from "./components/GenreDropdown.js";

function App() {
  const [apiList, setList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const filterState = (state) => {
    if (state !== "ALL") {
      setList(originalList.filter((item) => item.state === state));
    } else {
      setList(originalList);
    }
  };

  const filterGenre = (genre) => {
    if (genre !== "ALL") {
      setList(
        originalList.filter(
          (item) => item.genre.toUpperCase().indexOf(genre.toUpperCase()) > -1
        )
      );
    } else {
      setList(originalList);
    }
  };

  const filterText = (event) => {
    // console.log("this is the keyup event");
    // console.log(event);

    if (event.keyCode == 13) {
      // match either the name,  city, or genree

      setList(originalList.filter((item) => {}));
    }
  };

  const sortname = (a, b) => {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1; //nameA comes first
    }
    if (nameA > nameB) {
      return 1; // nameB comes first
    }
    return 0; // names must be equal
  };

  const getGenres = (tempList) => {
    var genresRaw = "";
    // creating a long list of all the genres used for everything
    tempList.forEach((item) => (genresRaw = genresRaw + item.genre + ","));
    // splits the string by commas then uses the set to make unique.
    var genres = [...new Set(genresRaw.split(","))];
    // there is an empty space that gets created, this gets rid of it.
    genres = genres.filter((item) => item !== "");
    // this sorts the list
    genres = genres.sort((a, b) => {
      var nameA = a.toUpperCase(); // ignore upper and lowercase
      var nameB = b.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1; //nameA comes first
      }
      if (nameA > nameB) {
        return 1; // nameB comes first
      }
      return 0; // names must be equal
    });
    // console.log(genres);
    return genres;
  };

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
          data = data.sort(sortname);

          setList(data);
          setOriginalList(data);
          console.log(data);
          setGenreList(getGenres(data));
        });
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <label>search by text: </label>
      <input type="text" id="search" name="search" onKeyUp={filterText}></input>
      <table>
        <tr>
          <td></td>
          <td></td>
          <td>
            <label>Filter By State: </label>
            <StateDropdown filterState={filterState} />
          </td>
          <td></td>
          <td>
            <GenreDropdown filterGenre={filterGenre} options={genreList} />
          </td>
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
