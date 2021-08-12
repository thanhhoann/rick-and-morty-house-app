import React, { useState, useEffect } from "react";
import Recommend from "../../components/Search/Recommend";
import Layout from "../../components/UI/Layout";
import Link from "next/link";
import Image from "next/image";
import ScrollToTopImg from "../../public/willpower.svg";

import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import InfiniteLoader from "react-infinite-loader";
import ScrollToTop from "react-scroll-to-top";
import tinyRick, { getCharacter } from "rickmortyapi";

export default function RickAndMortyHomePage(props) {
  let defaultStatus = ["Alive", "Dead", "Unknown", "alive", "dead", "unknown"];
  const [userInput, setUserInput] = useState("");
  // set current page to 1, scroll down to increase
  const [currentPage, setCurrentPage] = useState(1);
  // get data from searches
  const [characters, setCharacters] = useState("");
  // check if recommend "alive" is selected or not
  const [isSearchByStatus, setIsSearchByStatus] = useState(false);

  // auto scroll to top when enter the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get initial data for the first render
  useEffect(async () => {
    const charactersSearchByName = await getCharacter();
    setCharacters(charactersSearchByName.results);
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (defaultStatus.includes(userInput)) {
      const searchCharactersByStatus = await getCharacter({
        status: `${userInput}`,
      });
      setCharacters(searchCharactersByStatus.results);
    } else {
      const searchCharacters = await getCharacter({ name: `${userInput}` });
      setCharacters(searchCharacters.results);
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
    const characterSearchByStatus = await getCharacter({ status: `${data}` });
    setUserInput(data);
    setCharacters(characterSearchByStatus.results);
  };

  // infinite loader
  let visitStyle = { marginBottom: "-400px" };
  let loaderStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    border: "5px solid orange",
  };

  const infiniteLoaderHandler = async () => {
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
        console.log("No more data !");
      }
    } else {
      const moreCharacters = await getCharacter({ page: `${currentPage}` });
      let combinedData = [...characters, ...moreCharacters.results];
      setCharacters(combinedData);
    }
  };

  // status content
  let alive = <p style={{ color: "#4cd137" }}>Alive</p>;
  let dead = <p style={{ color: "#e74c3c" }}>Dead</p>;
  let unknown = <p style={{ color: "#95a5a6" }}>Unknown</p>;

  return (
    <>
      <Layout title="Rick&Morty House">
        <section style={{ marginBottom: "100px" }}>.</section>

        <div className="form">
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
        </div>

        <ScrollToTop
          style={{
            backgroundColor: "transparent",
            width: "70px",
            height: "70px",
          }}
          smooth
          component={<img style={{ width: "70px" }} src={ScrollToTopImg} />}
        />

        <main className="main">
          {characters &&
            characters.map((e, i) => (
              <Link href={`/character/${e.id}`} key={i}>
                <a>
                  <div className="card">
                    <div className="img-container">
                      <Image
                        src={e.image}
                        alt={e.name}
                        layout="fill"
                        objectFit="fit"
                      />
                    </div>
                    <section className="card-info">
                      <h2>{e.name}</h2>
                      <section className="card-status">
                        <h4>
                          {e.status === "Alive"
                            ? alive
                            : e.status === "Dead"
                            ? dead
                            : unknown}
                        </h4>
                      </section>
                    </section>
                  </div>
                </a>
              </Link>
            ))}
        </main>
        {characters && (
          <InfiniteLoader
            visitStyle={visitStyle}
            loaderStyle={loaderStyle}
            onVisited={() => infiniteLoaderHandler()}
          />
        )}
      </Layout>
    </>
  );
}
