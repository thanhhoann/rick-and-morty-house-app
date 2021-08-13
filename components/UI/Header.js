import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import Link from "next/link";
import Image from "next/image";

import Loader from "react-loader-spinner";

export default function MenuAppBar() {
  const [isLoading, setIsLoading] = useState(false);

  let loadingSpinner = (
    <Loader
      type="ThreeDots"
      color="orange"
      height={50}
      width={50}
      timeout={5000}
    />
  );

  const loadingHandler = (e) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  return (
    <div className="header-bar">
      <AppBar position="fixed" className="header-bar">
        <Toolbar>
          <IconButton edge="start" aria-label="menu">
            <Link href="/search">
              <a>
                <Image
                  src="https://www.freeiconspng.com/uploads/rick-and-morty-icon-png-26.png"
                  width={40}
                  height={30}
                  alt="Rick and morty icon png"
                />
              </a>
            </Link>
          </IconButton>
          <Link href="/search">
            <a onClick={loadingHandler}>
              {isLoading ? (
                loadingSpinner
              ) : (
                <h3 className="header-title">RicknMorty House</h3>
              )}
            </a>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
