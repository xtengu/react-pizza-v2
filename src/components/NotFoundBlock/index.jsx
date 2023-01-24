import React from "react";

import styles from "./NotFoundBlock.module.scss";

console.log(styles);

const NotFoundBlock = () => {
  return (
    <>
      <h1 className={styles.root}>
        <span>😀 </span>
        <span> &#128520; </span>
        <br />
        NotFound ...
      </h1>
      <p className={styles.description}> I am so sorry too...</p>
    </>
  );
};

export default NotFoundBlock;
