import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>{props.title} | RicknMorty House</title>
        <link rel="icon" href="/ricknmorty.ico" />
        <meta
          name="description"
          content="The best Rick and Morty wiki outthere !"
        />
      </Head>
      <Header />
      <main className="container">{props.children}</main>
      <Footer />
    </>
  );
}
