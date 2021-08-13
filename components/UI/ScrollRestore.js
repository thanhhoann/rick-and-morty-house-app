import React from "react";
import ScrollToTopImg from "../../public/willpower.svg";
import ScrollToTop from "react-scroll-to-top";
import Image from "next/image";

export default function ScrollRestoration() {
  return (
    <ScrollToTop
      style={{
        backgroundColor: "transparent",
        width: "70px",
        height: "70px",
      }}
      smooth
      component={<Image src={ScrollToTopImg} layout="fill" objectFit="fit" />}
    />
  );
}
