import React, { useState } from "react";
import Layout from "../../../../../components/UI/Layout";

import Image from "next/image";
import Link from "next/link";

import tinyRick, { getCharacter } from "rickmortyapi";
import Loader from "react-loader-spinner";
import { motion } from "framer-motion";

export default function CharacterId({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const { name, image, status, species, gender, origin, location, episode } =
    data;

  const loadingSpinner = (
    <Loader
      type="Puff"
      color="orange"
      height={100}
      width={100}
      timeout={9000}
    />
  );

  let genderTranslated = "";
  if (gender === "Male") {
    genderTranslated = "He";
  } else if (gender === "Female") {
    genderTranslated = "She";
  } else {
    genderTranslated = "It";
  }

  return (
    <>
      <Layout title={name}>
        <div className="characterId-card">
          <div className="img-container">
            <Image src={image} alt={name} width="300" height="300" />
          </div>
          <main className="main">
            <section>
              <h2>
                {name} ({gender})
              </h2>
            </section>
            <section>
              <h3>
                {genderTranslated} was seen in {episode.length} episodes.
              </h3>
            </section>
            <section>
              <h4>
                A {species} was last seen on {location.name} and was born on{" "}
                {origin.name}.
              </h4>
            </section>
            <Link href="/search">
              {isLoading ? (
                loadingSpinner
              ) : (
                <button onClick={() => setIsLoading(true)}>Back to home</button>
              )}
            </Link>
          </main>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const data = await getCharacter(Number(query.id));
  return { props: { data } };
}
