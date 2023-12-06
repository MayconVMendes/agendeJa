import React from "react";
import { useState, useEffect } from "react";
import useDisplayEnterpriseJobById from "../../hooks/display/enterpriseJob/useDisplayEnterpriseJobById";
import { useParams } from "react-router-dom";
import useDisplayHours from "../../hooks/display/hours/useDisplayHours";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import "./Catalogo.scss";

export default function Catalogo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isData, setIsData] = useState(false);
  const [isDataValue, setIsDataValue] = useState(false);
  const { displayEnterpriseJobById } = useDisplayEnterpriseJobById();
  const tokenStorage = JSON.parse(localStorage.getItem("token"));
  const { displayHours } = useDisplayHours();
  const userData = useSelector((state) => state?.userDados?.role);
  const { id } = useParams();

  useEffect(() => {
    if (!isData) {
      searchJob();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  async function searchJob() {
    let resultCategory = await displayEnterpriseJobById(id);
    setIsData(resultCategory);
  }

  async function searchHours(event) {
    setIsDataValue(event.target.value);

    let resultHours = await displayHours(
      isDataValue,
      isData.id,
      tokenStorage.token
    );
  }

  return (
    <>
      <div className="boxCatalog">
        <div className="catalogHeader">
          <div className="heading">
            <h2 className="job">{isData?.name}</h2>
            <p className="description">{isData?.description}</p>
          </div>
          <div className="values">
            <div className="box btns">
              {userData === "ENTERPRISE" ? <button>Editar serviço</button> : ""}
              {userData === "ENTERPRISE" ? (
                <button>Remover serviço</button>
              ) : (
                ""
              )}
            </div>
            <div className="box prices">
              <h2 className="price">{formatter.format(isData?.price)}</h2>
            </div>
            <div className="box timers">
              <p>Tempo médio:</p>
              <p className="timer">{isData?.duration}</p>
            </div>
          </div>
        </div>

        <div className="boxAgendar">
          <button className="primaryBtn" onClick={() => onOpen()}>
            Agendar um horário
          </button>
        </div>
      </div>

      <Modal
        blockScrollOnMount={true}
        size={"xl"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            onClick={() => {
              onClose();
              setIsDataValue(false);
            }}
          />
          <ModalBody className="bodyChakra"></ModalBody>
          <div className="boxAgendaServico">
            <h2>Agendamento de serviço</h2>

            <div className="infosJob">
              <div className="info">
                <p>Profissional: </p>
                <p className="textBlue">name</p>
              </div>
              <div className="info">
                <p>Serviço: </p>
                <p className="textBlue">name</p>
              </div>
              <div className="info">
                <p>Tempo médio: </p>
                <p className="textBlue">name</p>
              </div>
            </div>
            <div className="infoData">
              <div className="infoDt">
                <p>Data de Agendamento:</p>
                <input
                  type="date"
                  value={isDataValue}
                  placeholder="Data de nascimento"
                  onChange={(event) => {
                    searchHours(event);
                  }}
                />
              </div>
            </div>
            <div className="Horarios Disponiveis"></div>
          </div>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                onClose();
                setIsDataValue(false);
              }}
            >
              Cancelar
            </Button>
            <Button colorScheme="blue">Solicitar agendamento</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
