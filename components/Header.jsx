import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../assets/logo.png";

function Header(props) {
  return (
    <header className="page-header">
      <div className="logo">
        <Link href="/">
          <a>
            <Image src={logo} alt="logo" />
          </a>
        </Link>
      </div>
      <div className="title">
        <h2>রিলায়েন্স ইনসুরেন্স লিমিটেড</h2>
        <h2>Reliance Insurance Limited</h2>
      </div>
    </header>
  );
}

export default Header;
