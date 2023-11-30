import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import "./CadastrarEmpresaHorario.scss";

export default function CadastrarEmpresaHorarios() {
  const navigate = useNavigate();
  const dadosJson = localStorage.getItem("registrarEmpresa");
  const dados = JSON.parse(dadosJson);
  const [switchValue, setSwitchValue] = useState(false);
  const [segunda, setSegunda] = useState(false);
  const [terca, setTerca] = useState(false);
  const [quarta, setQuarta] = useState(false);
  const [quinta, setQuinta] = useState(false);
  const [sexta, setSexta] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.setItem("registrarEmpresa", JSON.stringify(dados));
    navigate("/cadastro-empresa/seu-negocio/horarios/descricao");
  };
  return (
    <div className="firstStepContainer">
      <div className="containerCentralHorarios">
        <h2>Cadastre seu negócio</h2>
        <p>Conte um pouco da sua trajetória</p>

        <form onSubmit={handleSubmit} className="formRegisterHorarios">
          <label>
            <FormControl display="flex" alignItems="center">
              <Switch
                id="email-alerts"
                isChecked={switchValue}
                onChange={() => {
                  setSwitchValue(!switchValue);
                }}
              />
              <FormLabel htmlFor="email-alerts" mb="0">
                Aberto 24 horas?
              </FormLabel>
            </FormControl>
          </label>

          {!switchValue ? (
            <>
              <div className="boxHorarios">
                <label className="labelLine">
                  <div className="divCheck">
                    <input
                      type="checkbox"
                      isChecked={segunda}
                      onChange={() => setSegunda(!segunda)}
                    />
                    Segunda-Feira
                  </div>
                  {segunda ? (
                    <div className="divHorarios">
                      <input type="time" placeholder="Inicio" />
                      -
                      <input type="time" placeholder="Fim" />
                    </div>
                  ) : (
                    ""
                  )}
                </label>
              </div>
              <div className="boxHorarios">
                <label className="labelLine">
                  <div className="divCheck">
                    <input
                      type="checkbox"
                      isChecked={terca}
                      onChange={() => setTerca(!terca)}
                    />
                    Terça-Feira
                  </div>
                  {terca ? (
                    <div className="divHorarios">
                      <input type="time" placeholder="Inicio" />
                      -
                      <input type="time" placeholder="Fim" />
                    </div>
                  ) : (
                    ""
                  )}
                </label>
              </div>
              <div className="boxHorarios">
                <label className="labelLine">
                  <div className="divCheck">
                    <input
                      type="checkbox"
                      isChecked={quarta}
                      onChange={() => setQuarta(!quarta)}
                    />
                    Quarta-Feira
                  </div>
                  {quarta ? (
                    <div className="divHorarios">
                      <input type="time" placeholder="Inicio" />
                      -
                      <input type="time" placeholder="Fim" />
                    </div>
                  ) : (
                    ""
                  )}
                </label>
              </div>
              <div className="boxHorarios">
                <label className="labelLine">
                  <div className="divCheck">
                    <input
                      type="checkbox"
                      isChecked={quinta}
                      onChange={() => setQuinta(!quinta)}
                    />
                    Quinta-Feira
                  </div>
                  {quinta ? (
                    <div className="divHorarios">
                      <input type="time" placeholder="Inicio" />
                      -
                      <input type="time" placeholder="Fim" />
                    </div>
                  ) : (
                    ""
                  )}
                </label>
              </div>
              <div className="boxHorarios">
                <label className="labelLine">
                  <div className="divCheck">
                    <input
                      type="checkbox"
                      isChecked={sexta}
                      onChange={() => setSexta(!sexta)}
                    />
                    Sexta-Feira
                  </div>
                  {sexta ? (
                    <div className="divHorarios">
                      <input type="time" placeholder="Inicio" />
                      -
                      <input type="time" placeholder="Fim" />
                    </div>
                  ) : (
                    ""
                  )}
                </label>
              </div>
              <div className="boxHorarios">
                <label className="labelLine">
                  <div className="divCheck">
                    <input
                      type="checkbox"
                      isChecked={sabado}
                      onChange={() => setSabado(!sabado)}
                    />
                    Sabado
                  </div>
                  {sabado ? (
                    <div className="divHorarios">
                      <input type="time" placeholder="Inicio" />
                      -
                      <input type="time" placeholder="Fim" />
                    </div>
                  ) : (
                    ""
                  )}
                </label>
              </div>
              <div className="boxHorarios">
                <label className="labelLine">
                  <div className="divCheck">
                    <input
                      type="checkbox"
                      isChecked={domingo}
                      onChange={() => setDomingo(!domingo)}
                    />
                    Domingo
                  </div>
                  {domingo ? (
                    <div className="divHorarios">
                      <input type="time" placeholder="Inicio" />
                      -
                      <input type="time" placeholder="Fim" />
                    </div>
                  ) : (
                    ""
                  )}
                </label>
              </div>
            </>
          ) : (
            ""
          )}
          <button className="primaryBtn" type="submit">
            Próximo
          </button>
        </form>
      </div>
    </div>
  );
}
