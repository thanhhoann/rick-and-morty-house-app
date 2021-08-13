import React, { useState, useEffect, useRef } from "react";

import Recommend from "./Recommend";
import CharacterList from "./CharacterList";

import { motion, useAnimation } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";

import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import tinyRick, { getCharacter } from "rickmortyapi";

export default function SearchForm(props) {
  // get user input
  const [userInput, setUserInput] = useState("");

  // set current page to 1, scroll down to increase
  const [currentPage, setCurrentPage] = useState(1);

  // main data
  const [characters, setCharacters] = useState(props.initialCharacters.results);

  let defaultStatus = ["Alive", "Dead", "Unknown", "alive", "dead", "unknown"];

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (defaultStatus.includes(userInput)) {
      const searchCharactersByStatus = await getCharacter({
        status: `${userInput}`,
      });
      setCharacters(searchCharactersByStatus.results);
    } else {
      const searchCharactersByName = await getCharacter({
        name: `${userInput}`,
      });
      setCharacters(searchCharactersByName.results);
    }
  };

  // reccomendation
  const recommendByNameHandler = async (data) => {
    const charactersSearchByName = await getCharacter({
      name: `rick`,
    });
    setUserInput(data);
    setCharacters(charactersSearchByName.results);
  };

  const recommendByStatusHandler = async (data) => {
    const charactersSearchByStatus = await getCharacter({ status: `alive` });
    setUserInput(data);
    setCharacters(charactersSearchByStatus.results);
  };

  // infinite scroll
  const infiniteScrollHandler = async () => {
    setCurrentPage(currentPage + 1);
    if (defaultStatus.includes(userInput)) {
      const moreCharactersByStatus = await getCharacter({
        page: `${currentPage}`,
        status: `${userInput}`,
      });
      if (moreCharactersByStatus) {
        let combinedDataByStatus = [
          ...characters,
          ...moreCharactersByStatus.results,
        ];
        setCharacters(combinedDataByStatus);
      } else {
        alert("No more characters for you !");
      }
    } else {
      const moreCharacters = await getCharacter({ page: `${currentPage}` });
      let combinedData = [...characters, ...moreCharacters.results];
      setCharacters(combinedData);
    }
  };

  return (
    <>
      <motion.div
        className="form"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { scale: 0.8, opacity: 0 },
          visible: {
            scale: [1, 0.8, 1],
            opacity: 1,
            transition: { delay: 1 },
          },
        }}
      >
        <form onSubmit={onSubmitHandler} noValidate autoComplete="off">
          <TextField
            className="text-field"
            type="search"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            id="standard-basic"
            InputProps={{
              style: {
                color: "white",
                fontSize: "2rem",
                fontFamily: "Courier",
                letterSpacing: "3px",
                textUnderlineOffset: "10px",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>

        {userInput.length === 0 && (
          <Recommend
            recommendedByName={recommendByNameHandler}
            recommendedByStatus={recommendByStatusHandler}
          />
        )}
      </motion.div>

      <InfiniteScroll
        dataLength={characters.length}
        next={infiniteScrollHandler}
        hasMore={true}
      >
        <main className="main">
          {characters &&
            characters.map((e, i) => <CharacterList key={i} {...e} />)}
        </main>
      </InfiniteScroll>
    </>
  );
}
