import styles from "./DeleteIcon.module.css";

import { useState } from "react";
import DeleteCardModal from "../../../DeleteCardModal/DeleteCardModal";

const DeleteIcon = ({ id, onDelete }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClose = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <button
        className={styles.DeleteIcon}
        onClick={() => setDeleteModalOpen(true)}
      ></button>
      {deleteModalOpen && (
        <DeleteCardModal onClose={handleClose} onDelete={onDelete} id={id} />
      )}
    </>
  );
};

export default DeleteIcon;
