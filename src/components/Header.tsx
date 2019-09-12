import React from "react";

const Header = (props: any) => {
  const { appVersion } = props;

  return (
    <header className="header">
      <div className="app-logo">
        <span className="app-logo__icon"> >=</span>
        <span className="app-logo__name">Pardal</span>

        <span className="app-logo__version">
          <a href="https://github.com/gilesv/pardal" target="_blank">v{appVersion}</a>
        </span>
      </div>
    </header>
  );
}

export default Header;
