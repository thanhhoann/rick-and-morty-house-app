import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Loader from "react-loader-spinner";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export default function Character(props) {
  const [isLoading, setIsLoading] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  // status content
  let alive = <p style={{ color: "#4cd137" }}>Alive</p>;
  let dead = <p style={{ color: "#e74c3c" }}>Dead</p>;
  let unknown = <p style={{ color: "#95a5a6" }}>Unknown</p>;

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  let loadingSpinner = (
    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
  );

  const easing = [0.6, -0.05, 0.01, 0.99];
  const item = {
    initial: {
      x: 200,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: easing },
    },
  };

  const hoverHandler = {
    scale: 0.9,
  };

  const tapHandler = {
    scale: 1.8,
  };

  return (
    <Link href={`/search/set/character/${props.id}`} key={props.id}>
      <motion.div
        variants={item}
        initial="initial"
        animate={controls}
        ref={ref}
        className="card"
        whileHover={hoverHandler}
        whileTap={tapHandler}
      >
        <div className="img-container">
          <Image
            src={props.image}
            alt={props.name}
            layout="fill"
            objectFit="fit"
          />
        </div>

        <section className="card-info">
          <h2>{props.name}</h2>
          <section className="card-status">
            <h4>
              {props.status === "Alive"
                ? alive
                : props.status === "Dead"
                ? dead
                : unknown}
            </h4>
          </section>
        </section>
      </motion.div>
    </Link>
  );
}
