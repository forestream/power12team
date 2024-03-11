import styles from "./RecipientInfoBar.module.css";
import CopyToClipboard from "react-copy-to-clipboard";
import Picker from "@emoji-mart/react";
import emojiListData from "@emoji-mart/data";
import MessageSummaryRecipientPage from "components/RecipientPage/RecipientInfoBar/MessageSummaryRecipientPage/MessageSummaryRecipientPage";

import { useState, useRef, useEffect } from "react";
import fetchGetEmoji from "../../api/fetchGetEmoji";
import fetchPostEmoji from "../../api/fetchPostEmoji";
import arrowDown from "assets/arrow_down.png";
import addEmoji from "assets/add-emoji.svg";
import shareIcon from "assets/share.svg";
import divider from "assets/divider.svg";
import TopReactions from "components/common/TopReactions/TopReactions";
import useAsync from "hooks/useAsync";
import Toast from "./Toast/Toast";

function RecipientInfoBar({ recipientData }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEmojiListOpen, setIsEmojiListOpen] = useState(false);
  const [isEmojiAddOpen, setIsEmojiAddOpen] = useState(false);
  const [emojiData, setEmojiData] = useState({});
  const [copiedToastUp, setCopiedToastUp] = useState(false);
  const [emojiToastup, setEmojiToastUp] = useState(false);

  const shareRef = useRef();
  const emojiListRef = useRef();
  const emojiAddRef = useRef();
  const currentUrl = window.location.href;
  const { results, count } = emojiData;
  const { id, name, messageCount, recentMessages } = recipientData;
  const isPostPage = true;

  const [postEmojiPending, postEmojiError, postEmojiAsync] =
    useAsync(fetchPostEmoji);
  const [getEmojiPending, getEmojiError, getEmojiAsync] =
    useAsync(fetchGetEmoji);
  /**
   * 이모지 토스트 실행 함수
   */
  let emojiPostToastUp;
  const emojiToast = () => {
    clearTimeout(emojiPostToastUp);
    setEmojiToastUp(true);
    emojiPostToastUp = setTimeout(setEmojiToastUp, 5000, false);
  };
  /**
   * 이모지 입력 시 post 함수
   * @param {string} 입력 이모지
   */
  const emojiPost = async (emoji) => {
    const emojiData = { emoji: `${emoji}`, type: "increase" };
    const result = await postEmojiAsync(id, emojiData);
    if (result) emojiToast();
  };
  /**
   * 이모지 정보 로딩함수
   */
  const emojiGet = async () => {
    if (id) {
      const response = await getEmojiAsync(id);
      setEmojiData(response);
    }
  };
  /**
   * 카카오톡 공유하기 실행 함수
   */
  const handleKakaoClick = () => {
    window.Kakao.Share.sendScrap({
      requestUrl: currentUrl,
    });
  };
  /**
   * 메세지 순서 역순 정리 함수
   */
  const reverseMessages = () => {
    recentMessages.reverse();
    if (recentMessages.length < 2) recentMessages.push(null);
    if (recentMessages.length < 3) recentMessages.push(null);
  };
  /**
   * 이모지 정보 로딩
   */
  useEffect(() => {
    emojiGet();
    reverseMessages();
  }, [id]);
  /**
   * 모달 외부 클릭 시 모달 창 닫힘
   */
  useEffect(() => {
    const closeModal = (e) => {
      if (
        isShareModalOpen &&
        shareRef.current &&
        !shareRef.current.contains(e.target)
      ) {
        setIsShareModalOpen(false);
      }
      if (
        isEmojiListOpen &&
        emojiListRef.current &&
        !emojiListRef.current.contains(e.target)
      ) {
        setIsEmojiListOpen(false);
      }
      if (
        isEmojiAddOpen &&
        emojiAddRef.current &&
        !emojiAddRef.current.contains(e.target)
      ) {
        setIsEmojiAddOpen(false);
      }
    };
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [isShareModalOpen, isEmojiListOpen, isEmojiAddOpen]);
  /**
   * 이모지 등록 핸들 함수
   * @param {*} e
   */
  const handleEmojiClick = async (e) => {
    setIsEmojiAddOpen(false);
    await emojiPost(e.native);
    await emojiGet();
  };
  /**
   * 모달 열림 여부에 따른 버튼 스타일 조정
   */
  const ShareButton = isShareModalOpen
    ? `${styles.Button} ${styles.ModalOpen}`
    : styles.Button;
  const EmojiButton = isEmojiAddOpen
    ? `${styles.Button} ${styles.ModalOpen}`
    : styles.Button;
  const emojiListTop3 = results?.slice(0, 3);
  const emojiListRest = results?.slice(3);

  /* URL 복사 성공 토스트 */
  const toastUp = useRef();

  useEffect(() => {
    if (copiedToastUp) {
      toastUp.current = setTimeout(setCopiedToastUp, 5000, false);
    }

    return () => {
      clearTimeout(toastUp.current);
    };
  }, [copiedToastUp]);

  const showCopyToast = () => {
    setCopiedToastUp(true);
  };

  return (
    <div className={styles.RecipientInfoBarWrapper}>
      <div className={styles.RecipientInfoBar}>
        <div className={styles.Name}>To. {name}</div>
        <div className={styles.InfoWrapper}>
          <MessageSummaryRecipientPage
            messageCount={messageCount}
            recentMessages={recentMessages}
            isPostPage={isPostPage}
          />
          <img
            src={divider}
            alt="divider"
            className={styles.MessageSummaryDivider}
          />
          <div className={styles.RestWrapper}>
            {!!count && (
              <>
                {getEmojiPending ? (
                  <div className={styles.ReactionContainer}>
                    <div className={styles.ReactionLoading}></div>
                    <div className={styles.ReactionLoading}></div>
                    <div className={styles.ReactionLoading}></div>
                  </div>
                ) : (
                  <TopReactions datas={emojiListTop3} />
                )}
                {!!(count - 3) && (
                  <>
                    <button
                      onClick={() => {
                        setIsEmojiListOpen(!isEmojiListOpen);
                      }}
                      className={styles.MoreEmojiButton}
                    >
                      <img src={arrowDown} alt="more emoji" />
                    </button>
                    {isEmojiListOpen && (
                      <div className={styles.EmojiListModal} ref={emojiListRef}>
                        {emojiListRest?.map((reaction) => (
                          <div key={reaction.id} className={styles.Reaction}>
                            {reaction.emoji}{" "}
                            {reaction.count > 99 ? "+99" : reaction.count}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            <button
              className={EmojiButton}
              onClick={() => setIsEmojiAddOpen(true)}
            >
              <img
                src={addEmoji}
                alt="add reaction"
                className={styles.ButtonIcon}
              />
              추가
            </button>
            {isEmojiAddOpen && (
              <div className={styles.EmojiPicker} ref={emojiAddRef}>
                <Picker data={emojiListData} onEmojiSelect={handleEmojiClick} />
              </div>
            )}
            {emojiToastup && (
              <Toast setState={setEmojiToastUp}>반응이 추가되었습니다.</Toast>
            )}
            <img src={divider} alt="divider" />
            <button
              className={ShareButton}
              onClick={() => {
                setIsShareModalOpen(true);
              }}
            >
              <img
                src={shareIcon}
                alt="share icon"
                className={styles.ButtonIcon}
              />
            </button>
            {isShareModalOpen && (
              <div className={styles.ShareModal} ref={shareRef}>
                <button
                  className={styles.ShareButton}
                  onClick={handleKakaoClick}
                >
                  카카오톡 공유
                </button>
                <CopyToClipboard text={currentUrl} onCopy={showCopyToast}>
                  <button className={styles.ShareButton}>URL 공유</button>
                </CopyToClipboard>
              </div>
            )}
            {copiedToastUp && (
              <Toast setState={setCopiedToastUp}>URL이 복사되었습니다.</Toast>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipientInfoBar;
