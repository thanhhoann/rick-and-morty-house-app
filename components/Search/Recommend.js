import React from "react";
import Link from "next/link";

export default function Recommend(props) {
  const recommendNameHandler = () => {
    props.recommendedByName("rick");
  };

  const recommendStatusHandler = () => {
    props.recommendedByStatus("alive");
  };

  return (
    <>
      <div className="recommendBox">
        <h2>
          Try &nbsp;"
          <span className="span" onClick={recommendNameHandler}>
            rick
          </span>
          ", &nbsp;"
          <span className="span" onClick={recommendStatusHandler}>
            alive
          </span>
          "&nbsp; or you can &nbsp;
          <span className="span">
            <Link href="/search/set">
              <a>browse by set</a>
            </Link>
          </span>
        </h2>
      </div>
    </>
  );
}
