import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PhasesServices from "./phasesServices.js";
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
import "./CreateService.scss";
import useRegisterPortifolio from "../../../hooks/register/useRegisterPortifolio.js";
import useRegisterPortifolioJob from "../../../hooks/register/useRegisterPortfolioJob.js";
import useDisplayCompanyPortiByUserId from "../../../hooks/display/company/useDisplayCompanyPortiByUserId.js";
import useDisplayCategory from "../../../hooks/display/category/useDisplayCategory.js";
import useDisplaySubCategoryById from "../../../hooks/display/subcategory/useDisplaySubCategoryById.js";
import { useNavigate } from "react-router-dom";
import FileToBase64 from "react-file-base64";

export default function CreateService({ openModal, handleCloseModal }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [isFilial, setIsFilial] = useState(false);
  const [isFilialSelect, setIsFilialSelect] = useState(false);
  const [isDisplayCompany, setDisplayCompany] = useState(false);
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [subCategorySelect, setSubCategorySelect] = useState(false);
  const [isJobCategoryName, setIsJobCategoryName] = useState("");
  const [isDescription, setIsDescription] = useState("");
  const [isPrice, setIsPrice] = useState("");
  const [isDuracao, setIsDuracao] = useState("");
  const [image1, setImage1] = useState(null);
  const [base64ImageData1, setBase64ImageData1] = useState("");
  const [image2, setImage2] = useState(null);
  const [base64ImageData2, setBase64ImageData2] = useState("");
  const [image3, setImage3] = useState(null);
  const [base64ImageData3, setBase64ImageData3] = useState("");
  const userData = useSelector((state) => state?.userDados);
  const dadosJson = localStorage.getItem("registrarPort");
  const dados = JSON.parse(dadosJson);
  const { registerPortifolio } = useRegisterPortifolio();
  const { registerPortifolioJob } = useRegisterPortifolioJob();
  const { displayCompanyPortiByUserId } = useDisplayCompanyPortiByUserId();
  const { displayCategory } = useDisplayCategory();
  const { displaySubCategoryById } = useDisplaySubCategoryById();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (userData?.role !== "ENTERPRISE") {
      navigate("/");
    }
  }, [userData, navigate]);

  useEffect(() => {
    if (openModal === true) {
      onOpen();
      searchDisplayCompanyPortiByUserId();
      const dados = {
        portifolio: "criar_portifolio",
      };
      localStorage.setItem("registrarPort", JSON.stringify(dados));
    } else {
      onClose();
      setPage(1);
      setDisplayCompany(false);
      setIsSubCategory(false);
      setSubCategorySelect(false);
      setIsFilial(false);
      setIsFilialSelect(false);
      localStorage.removeItem("registrarPort");
    }
  }, [openModal, onOpen, onClose]);

  async function searchDisplayCompanyPortiByUserId() {
    let resultCategory = await displayCompanyPortiByUserId(userData?.id);
    setDisplayCompany(resultCategory);
    console.log(resultCategory);
  }

  function btnNext() {
    setPage(page + 1);
    document.querySelector("#action").classList.value = page;
  }

  function btnBack() {
    setPage(page - 1);
    document.querySelector("#action").classList.value = page;
  }

  function selectSubCategory(name) {
    const btn = document.getElementById(name.id);

    if (name === subCategorySelect) {
      setSubCategorySelect(false);
      btn.classList.remove("selected");
      setIsSubCategory("");
      dados.category = "";

      localStorage.setItem("registrarPort", JSON.stringify(dados));
    } else {
      setSubCategorySelect(name);
      btn.classList.add("selected");
      dados.category = name.id;
      dados.subCategories = [];

      localStorage.setItem("registrarPort", JSON.stringify(dados));
    }
  }

  function selectJobCategory(name) {
    const btn = document.getElementById(name.id + 10);

    if (dados.subCategories.indexOf(name.id) < 0) {
      dados.subCategories.push(name.id);
      btn.classList.add("selected");
      setSubCategorySelect(true);
    } else {
      dados.subCategories.splice(dados.subCategories.indexOf(name.id), 1);
      btn.classList.remove("selected");

      if (dados.subCategories.length < 1) {
        setSubCategorySelect(false);
      }
    }

    localStorage.setItem("registrarPort", JSON.stringify(dados));
  }

  function mascaraMoeda(event) {
    const onlyDigits = event.target.value
      .split("")
      .filter((s) => /\d/.test(s))
      .join("")
      .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
    event.target.value = maskCurrency(digitsFloat);
  }

  function maskCurrency(valor, locale = "pt-BR", currency = "BRL") {
    setIsPrice(
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(valor)
    );
  }

  function submit() {
  }

  return (
    <>
      <Modal
        blockScrollOnMount={true}
        size={"xl"}
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={handleCloseModal} />
          <ModalBody className="bodyChakra">
            <div className="createService">
              <div className="content">
                {page === 1 ? (
                  <div className="secondStepContainer">
                    <div className="containerCentral">
                      <div className="textInfos">
                        <h2>Qual a categoria do serviço?</h2>

                        <p>
                          Selecione a <b>categoria</b> do seu negócio{" "}
                        </p>
                      </div>
                      <div className="categoryInfos">
                        {isDisplayCompany?.data?.map((subCategory) => {
                          return (
                            <>
                              {subCategory?.subCategories?.map(
                                (nameSubCategory) => {
                                  return (
                                    <button
                                      className="ghostBtn"
                                      id={nameSubCategory.id + 10}
                                      key={nameSubCategory.id}
                                      disabled={false}
                                      onClick={() => {
                                        selectSubCategory(nameSubCategory)
                                        console.log(nameSubCategory);
                                      }

                                      }
                                    >
                                      {nameSubCategory?.name}
                                    </button>
                                  );
                                }
                              )}
                            </>
                          );
                        })}
                      </div>

                      {isSubCategory ? (
                        <div className="subCategorieTitle">
                          <p>
                            Selecione a <b>subcategoria</b> do seu negócio{" "}
                            <b>(máx. {subCategorySelect ? 0 : 1})</b>
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      {isSubCategory ? (
                        <div className="subCategoryInfos">
                          {isDisplayCompany?.data?.map((subCategory) => {
                            return (
                              <>
                                {subCategory?.subCategories?.map(
                                  (nameSubCategory) => {
                                    return (
                                      <button
                                        className="ghostBtn"
                                        id={nameSubCategory.id + 10}
                                        key={nameSubCategory.id}
                                        disabled={false}
                                        onClick={() =>
                                          selectJobCategory(nameSubCategory)
                                        }
                                      >
                                        {nameSubCategory?.name}
                                      </button>
                                    );
                                  }
                                )}
                              </>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {page === 2 ? (
                  <div className="boxPageTwo">
                    <h2>Informações básicas</h2>
                    <label className="labelNameJob">
                      <input
                        type="text"
                        value={isJobCategoryName}
                        onChange={(event) =>
                          setIsJobCategoryName(event.target.value)
                        }
                        placeholder="Nome do serviço"
                      />
                    </label>
                    <label className="labelValueTemp">
                      <input
                        type="text"
                        value={isPrice}
                        placeholder="Valor (R$)"
                        onChange={(event) => {
                          mascaraMoeda(event);
                        }}
                      />
                      <select
                        value={isDuracao}
                        onChange={(event) => setIsDuracao(event.target.value)}
                      >
                        <option disabled={isDuracao}>Duração</option>
                        <option value={1}>1 hora</option>
                        <option value={2}>2 horas</option>
                        <option value={3}>3 horas</option>
                        <option value={4}>4 horas</option>
                      </select>
                    </label>
                    <label className="labelDescription">
                      <input
                        type="text"
                        value={isDescription}
                        placeholder="Descrição do serviço (opcional)"
                        onChange={(event) =>
                          setIsDescription(event.target.value)
                        }
                      />
                    </label>
                  </div>
                ) : (
                  ""
                )}
                {page === 3 ? (
                  <div className="boxPageThree">
                    <h2>Adicionar fotos (Máx. 3)</h2>
                    <div className="boxsImages">
                      <div>
                        <FileToBase64
                          value={image1}
                          onDone={(base64Data) => {
                            setBase64ImageData1(base64Data);
                          }}
                        />
                      </div>
                      <div>
                        <FileToBase64
                          value={image2}
                          onDone={(base64Data) => {
                            setBase64ImageData2(base64Data);
                          }}
                        />
                      </div>
                      <div>
                        <FileToBase64
                          value={image3}
                          onDone={(base64Data) => {
                            setBase64ImageData3(base64Data);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {page === 4 ? (
                  <div className="boxPageFour">
                    <h2>Revisão de dados</h2>
                    <div className="boxDados">
                      <div className="boxCategService">
                        <p className="title">Categoria do Serviço</p>
                        <div className="display">
                          <p>Categoria do serviço:</p>
                          <p>{subCategorySelect?.name}</p>
                        </div>
                        <div className="display">
                          <p>Tipo de serviço:</p>
                          <p>{isJobCategoryName}</p>
                        </div>
                      </div>
                      <Divider className="divider" />
                      <div className="boxInfoBasic">
                        <p className="title">Informações básicas</p>
                        <div className="display">
                          <p>Valor (R$):</p>
                          <p>{isPrice}</p>
                        </div>
                        <div className="display">
                          <p>Duração:</p>
                          <p>valor aqui</p>
                        </div>
                        <div className="display">
                          <p>Descrição (opcional):</p>
                          <p>{isDescription}</p>
                        </div>
                      </div>
                      <Divider className="divider" />
                      <div className="boxPictures">
                        <p className="title">Adicionar fotos</p>
                        <p></p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <PhasesServices page={page} />
            </div>
          </ModalBody>

          <ModalFooter>
            {page > 1 ? (
              <>
                <Button variant="ghost" mr={3} onClick={() => btnBack()}>
                  Voltar
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" mr={3} onClick={handleCloseModal}>
                  Cancelar
                </Button>
              </>
            )}

            {page === 4 ? (
              <>
                <Button colorScheme="blue" onClick={() => submit()}>
                  Concluir
                </Button>
              </>
            ) : (
              <>
                <Button
                  colorScheme="blue"
                  onClick={() => btnNext()}
                >
                  Próxima etapa
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
