import { useState, useEffect } from "react";
import CreateService from "./CreateService/CreateService";
import { Link } from "react-router-dom";

export default function BusinessHeader() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ul>
        <li
          onClick={() => {
            setIsExpanded(!isExpanded);
            handleOpenModal();
          }}
        >
          Cadastrar Serviço
        </li>
      </ul>
      <CreateService
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
