import { useState } from "react";

import MessageCardContainer from "../MessageCardContainer/MessageCardContainer";
import MessageCardModal from "../MessageCardModal/MessageCardModal";

import CreatedAt from "./CreatedAt/CreatedAt";
import styles from "./MessageCard.module.css";
import SenderInfo from "./SenderInfo/SenderInfo";

const MessageCard = ({ message, isEditing, onDelete }) => {
  const [messageCardModalOpen, setMessageCardModalOpen] = useState(false);

  const handleClick = () => {
    if (!isEditing) {
      setMessageCardModalOpen(true);
    }
  };

  return (
    <MessageCardContainer onClick={handleClick}>
      <SenderInfo message={message} isEditing={isEditing} onDelete={onDelete} />
      <div className={styles.DividingLine}></div>
      <div className={styles.CardContent}>{message.content}</div>
      <CreatedAt createdAt={message.createdAt} />
      {messageCardModalOpen && (
        <MessageCardModal
          message={message}
          setMessageCardModalOpen={setMessageCardModalOpen}
        />
      )}
    </MessageCardContainer>
  );
};

export default MessageCard;