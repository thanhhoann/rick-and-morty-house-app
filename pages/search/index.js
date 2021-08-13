import React, { useState, useEffect, useRef } from "react";

import ScrollRestoration from "../../components/UI/ScrollRestore";
import Layout from "../../components/UI/Layout";
import SearchForm from "../../components/Search/SearchForm";

import { motion, useAnimation } from "framer-motion";

import tinyRick, { getCharacter } from "rickmortyapi";

export default function RickAndMortyHomePage({ initialCharacters }) {
  // auto scroll to top when enter the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Layout title="Home">
        <section style={{ marginBottom: "100px" }}>.</section>

        <SearchForm initialCharacters={initialCharacters} />

        <ScrollRestoration />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const initialCharacters = await getCharacter();
  return {
    props: { initialCharacters },
  };
}
