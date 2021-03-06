import React from "react";

const Layout = ({ children }) => {
  return (
    <section className="hero has-background-light">
      <div className="hero-body">
        <div className="container">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
