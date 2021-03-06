import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <section className="hero has-background-light mb-2rem">
      <div className="hero-body">
        <div className="columns is-mobile is-multiline is-centered">
          <Link href="/">
            <a className="column m-auto">Anasayfa</a>
          </Link>
          <Link href="/about">
            <a className="column">Hakkımızda</a>
          </Link>
          <Link href="/login">
            <a className="column">Giriş</a>
          </Link>
        </div>
        <div className="wrapper">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
