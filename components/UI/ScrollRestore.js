import React, { useEffect, useState } from "react";

export default function ScrollRestore() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  //scroll-to-top classes: fixed, bottom:0, right:0
  return (
    <div clasName="scroll-to-top">
      {isVisible && (
        <div onClick={scrollToTop}>
          <h3 style={{ color: "white" }}>Go up!</h3>
        </div>
      )}
    </div>
  );
}
