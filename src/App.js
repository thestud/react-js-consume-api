import React, { useEffect, useState } from "react";
import "./App.css";
import StateDropdown from "./components/StateDropdown.js";
import GenreDropdown from "./components/GenreDropdown.js";

function App() {
  const [apiList, setList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  // const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);


  // may not need this 
  // const [paginationList, setPaginationList] = useState([]);

  const setupPaginationList = (theList) => {
  
    let tempList = [...theList];
    let possibleLastPage = 0;

    if(tempList.length % 10 > 0 ) {
      possibleLastPage = 1;
    }

    setPages((tempList.length - (tempList.length % 10))  / 10 + possibleLastPage); 

    //setList(theList);
    setPagnationData(1);
  }
  

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
    if (event.keyCode === 13) {
      filterByOptions();
    }
  };

  const filterTextByButton = (event) => {
    filterByOptions();
  }

  const filterByOptions = () => {
    // match either the name,  city, or genre
    var textField = document.getElementById("filterTextField");
    setList(
      originalList.filter((item) => {
        return (
          item.name.toUpperCase().indexOf(textField.value.toUpperCase()) >
            -1 ||
          item.genre.toUpperCase().indexOf(textField.value.toUpperCase()) >
            -1 ||
          item.city.toUpperCase().indexOf(textField.value.toUpperCase()) >
            -1
        );
      })
    );
  }

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

          //setList(data);
          setOriginalList(data);
          // console.log(data);
          setupPaginationList(data);
          setGenreList(getGenres(data));
        });
    };

    fetchData();
  }, []);

  const outPutButtons = () => {
    let content = [];
    for(let i = 0; i < pages; i++) {
      content.push(<button type="button" key={"button" + i.toString()} onClick={setPagnationData.bind(this, i+1)}>Page {i+1}</button>);
    }
    return content;
  };

  const setPagnationData = (xyz) => {
    let pageData = [];

    let iStart = (xyz * 10 - 10);
    let iEnd =  (xyz * 10 - 1);

    for (let i= iStart; i <= iEnd; i++) {
      if(i < apiList.length) pageData.push(apiList[i]);
    }

    setList(pageData);
  };

  return (
    <div className="App">
      <label>search by text: </label>
      <input type="text" id="filterTextField" name="filterTextField" onKeyUp={filterText}></input>
      <button type="button" onClick={filterTextByButton}>Filter</button>
      <table>
        <tbody>
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
        </tbody>
      </table>
      { outPutButtons() }

    </div>
  );
}

export default App;
