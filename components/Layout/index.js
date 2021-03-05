import React from "react";

const Layout = ({ children }) => {
  return (
    <section className="hero has-background-ligjt">
      <div className="hero-body">
        <div className="container">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
