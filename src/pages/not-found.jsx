// import React from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found.module.css';
import pageNotFound from "../images/burger_404.gif";

export default function NotFound404() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img alt="page not found" src={pageNotFound} className={styles.image}/>
        <br />
        <Link to='/' className="text text_type_main-medium">Создать самый вкусный бургер</Link>
      </div>
    </div>
  );
}; 