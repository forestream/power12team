import styles from "components/common/Nav/Nav.module.css";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import logo from "assets/logo.png";

const Nav = () => {
  const location = useLocation();
  const params = useParams();
  const { recipientId } = params;

  const noButtonRendering = [
    `/post/${recipientId}/message`,
    `/post/${recipientId}`,
    `/post`,
  ];

  return (
    <div className={styles.NavBar}>
      <div className={styles.Container}>
        <Link to="/">
          <button className={styles.LogoBtn}>
            <img src={logo} alt="네브바 로고" />
          </button>
        </Link>
        {!noButtonRendering.includes(location.pathname) && (
          <Link to="/post">
            <button className={styles.GoToPostPage}>
              <span>롤링 페이퍼 만들기</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
