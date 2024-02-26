import { useState } from "react";

import styles from "./PostPage.module.css";

const PostPage = () => {
  const [color, setColor] = useState();
  const [image, setImage] = useState();
  return (
    <div className={styles.PostPageBody}>
      <div className={styles.InputPost}>
        <span className={styles.InputPostText}>To.</span>
        <input placeholder="받는 사람 이름을 입력해 주세요"></input>
      </div>
      <div className={styles.Center}>
        <div className={styles.ChooseText}>
          <div className={styles.ChooseView}>배경화면을 선택해 주세요.</div>
          <div className={styles.ChooseColorImage}>
            컬러를 선택하거나, 이미지를 선택할 수 있습니다.
          </div>
        </div>
        <div className={styles.ChooseOptionButton}>
          <button
            className={styles.ChooseButton}
            value={color}
            setColor={setColor}
          >
            컬러
          </button>
          <button
            className={styles.ChooseButton}
            value={image}
            setImage={setImage}
          >
            이미지
          </button>
        </div>
      </div>
      <div className={styles.Colors}>
        <div className={styles.Color}></div>
        <div className={styles.Color}></div>
        <div className={styles.Color}></div>
        <div className={styles.Color}></div>
      </div>
      <div className={styles.ButtonSpace}>
        <button className={styles.CreateButton}>생성하기</button>
      </div>
    </div>
  );
};

export default PostPage;
