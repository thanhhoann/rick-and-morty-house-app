import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";

import Link from "next/link";
import Image from "next/image";
export default function MenuAppBar() {
  return (
    <div className="header-bar">
      <AppBar position="fixed" className="header-bar">
        <Toolbar>
          <IconButton edge="start" aria-label="menu">
            <Link href="/rick-and-morty">
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
            <h3>RicknMorty House</h3>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
