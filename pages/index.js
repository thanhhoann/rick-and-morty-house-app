import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { motion } from "framer-motion";
import { useMedia } from "use-media";

export default function RickAndMortyHomePage(props) {
  // check if its wide enough
  const isDesktopScreen = useMedia({ minWidth: 900 });

  const easing = [0.6, -0.05, 0.01, 0.99];
  const title = {
    initial: {
      opacity: 0,
      scale: 0.3,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: [0, -50, 0],
      transition: { duration: 1, ease: easing },
    },
  };

  const button = {
    initial: {
      opacity: 0,
      scale: 0.3,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: [0, -50, 0],
      transition: { duration: 1, ease: easing },
    },
  };

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
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
              <motion.h1 variants={title} initial="initial" animate="animate">
                RicknMorty House
              </motion.h1>
              <p>
                <span className="content-main">
                  &quot;The encyclopedia for Rick and Morty&quot;
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
          <div className="content">
            <section className="title">
              <motion.h1 variants={title} initial="initial" animate="animate">
                RicknMorty House
              </motion.h1>
            </section>
            <motion.div
              variants={button}
              initial="initial"
              animate="animate"
              className="button"
            >
              <Link href="/search">
                <a>Get started</a>
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
