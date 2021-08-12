import React, { useState, useEffect } from "react";
import Recommend from "../components/Search/Recommend";
import Layout from "../components/UI/Layout";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import tinyRick, { getCharacter } from "rickmortyapi";
import { useMedia } from "use-media";

export default function RickAndMortyHomePage(props) {
  // check if its wide enough
  const isDesktopScreen = useMedia({ minWidth: 900 });

  return (
    <>
      <Head>
        <title>RicknMorty House</title>
        <link rel="icon" href="/ricknmorty.ico" />
      </Head>
      {isDesktopScreen ? (
        <div className="home-container">
          <Image
            className="image"
            src="https://images5.alphacoders.com/876/876590.png"
            layout="fill"
            objectFit="cover"
          />
          <section>
            <div className="home-content">
              <h1>RicknMorty House</h1>
              <p>
                <span className="content-main">
                  "The encyclopedia for Rick and Morty"
                </span>
                <span className="content-sub">
                  Or whatever you wanna call it.
                </span>
              </p>
              <div className="home-button">
                <Link href="/search">
                  <a>Get started</a>
                </Link>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="mobile-container">
          <Image
            className="image"
            src="https://images.alphacoders.com/876/876589.jpg"
            layout="fill"
            objectFit="cover"
          />
          <div className="content">
            <section className="title">
              <h1>RicknMorty House</h1>
            </section>
            <div className="button">
              <Link href="/search">
                <a>Get started</a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
