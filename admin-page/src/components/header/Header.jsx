import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.mudole.scss";
const cx = classNames.bind(styles);
const Header = () => {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("logo")}>
        <img src="" alt="Lolo" />
      </div>
      <div className={cx("info_admin")}>info</div>
    </header>
  );
};

export default Header;
