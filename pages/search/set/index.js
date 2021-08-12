import React, { useState } from "react";
import Recommend from "../../../components/Search/Recommend";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";

import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import tinyRick, { getCharacter } from "rickmortyapi";
import Layout from "../../../components/UI/Layout";

export default function RickAndMortyHomePage() {
  const [search, setSearch] = useState(""); // manipulate forms and searches
  // get data from searches
  const [characters, setCharacters] = useState("");
  const [characterByStatus, setCharacterByStatus] = useState("");

  const searchHandler = async (e) => {
    let searchName = e.target.value;
    setSearch(searchName);

    const charactersSearchByName = await getCharacter({
      name: `${search}`,
    });
    setCharacters(charactersSearchByName);
  };

  // reccomendation
  const recommendByNameHandler = async () => {
    const charactersSearchByName = await getCharacter({
      name: `rick`,
    });
    setSearch("rick");
    setCharacters(charactersSearchByName);
  };

  const recommendByStatusHandler = async () => {
    const characterSearchByStatus = await getCharacter({ status: `alive` });
    setSearch("alive");
    setCharacters(characterSearchByStatus);
  };

  const recomendBySetHandler = async () => {};

  let alive = <p style={{ color: "#4cd137" }}>Alive</p>;
  let dead = <p style={{ color: "#e74c3c" }}>Dead</p>;
  let unknown = <p style={{ color: "#95a5a6" }}>Unknown</p>;

  return (
    <>
      <Layout title="Rick and Morty">
        <header className="header">
          <h1>Rick and Morty</h1>
        </header>

        <div className="form">
          <form noValidate autoComplete="off">
            <TextField
              className="text-field"
              type="search"
              value={search}
              id="standard-basic"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={searchHandler}
            />
          </form>
          {search.length === 0 && (
            <h2>
              Try{" "}
              <span className="span" onClick={recommendByNameHandler}>
                &nbsp; "rick"
              </span>
              ,{" "}
              <span className="span" onClick={recommendByStatusHandler}>
                &nbsp; "alive" &nbsp;
              </span>
              or you can{" "}
              <span className="span" onClick={recomendBySetHandler}>
                &nbsp; browse by set
              </span>
            </h2>
          )}
        </div>

        <main className="main">
          {characters.results &&
            characters.results.map((e) => (
              <Link href={`/character/${e.id}`} key={e.id}>
                <a>
                  <div className="card">
                    <Image
                      className="img"
                      src={e.image}
                      alt={e.name}
                      width={450}
                      height={450}
                    />
                    <section className="card-info">
                      <h2>
                        {e.name}
                        &nbsp;{" "}
                        <span style={{ color: "#a29bfe" }}>{e.species}</span>
                      </h2>
                      <section className="card-status">
                        <p>
                          {e.status === "Alive"
                            ? alive
                            : e.status === "Dead"
                            ? dead
                            : unknown}
                        </p>
                      </section>
                    </section>
                  </div>
                </a>
              </Link>
            ))}
        </main>
      </Layout>
    </>
  );
}
