import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import "./CadastrarEmpresaHorario.scss";

export default function CadastrarEmpresaHorarios() {
  const navigate = useNavigate();
  const dadosJson = localStorage.getItem("registrarEmpresa");
  const dados = JSON.parse(dadosJson);
  const [switchValue, setSwitchValue] = useState(false);
  const [segunda, setSegunda] = useState(false);
  const [segundaHoraInicio, setSegundaHoraInicio] = useState("00:00");
  const [segundaHoraFim, setSegundaHoraFim] = useState("00:00");
  const [terca, setTerca] = useState(false);
  const [tercaHoraInicio, setTercaHoraInicio] = useState("00:00");
  const [tercaHoraFim, setTercaHoraFim] = useState("00:00");
  const [quarta, setQuarta] = useState(false);
  const [quartaHoraInicio, setQuartaHoraInicio] = useState("00:00");
  const [quartaHoraFim, setQuartaHoraFim] = useState("00:00");
  const [quinta, setQuinta] = useState(false);
  const [quintaHoraInicio, setQuintaHoraInicio] = useState("00:00");
  const [quintaHoraFim, setQuintaHoraFim] = useState("00:00");
  const [sexta, setSexta] = useState(false);
  const [sextaHoraInicio, setSextaHoraInicio] = useState("00:00");
  const [sextaHoraFim, setSextaHoraFim] = useState("00:00");
  const [sabado, setSabado] = useState(false);
  const [sabadoHoraInicio, setSabadoHoraInicio] = useState("00:00");
  const [sabadoHoraFim, setSabadoHoraFim] = useState("00:00");
  const [domingo, setDomingo] = useState(false);
  const [domingoHoraInicio, setDomingoHoraInicio] = useState("00:00");
  const [domingoHoraFim, setDomingoHoraFim] = useState("00:00");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(segundaHoraInicio);
    dados.is24Hours = switchValue;
    dados.hours = [
      {
        dayOfWeek: "MONDAY",
        start: segundaHoraInicio,
        end: segundaHoraFim,
      },
      {
        dayOfWeek: "TUESDAY",
        start: tercaHoraInicio,
        end: tercaHoraFim,
      },
      {
        dayOfWeek: "WEDNESDAY",
        start: quartaHoraInicio,
        end: quartaHoraFim,
      },
      {
        dayOfWeek: "THURSDAY",
        start: quintaHoraInicio,
        end: quintaHoraFim,
      },
      {
        dayOfWeek: "FRIDAY",
        start: sextaHoraInicio,
        end: sextaHoraFim,
      },
      {
        dayOfWeek: "SATURDAY",
        start: sabadoHoraInicio,
        end: sabadoHoraFim,
      },
      {
        dayOfWeek: "SUNDAY",
        start: domingoHoraInicio,
        end: domingoHoraFim,
      },
    ];
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
                      <input
                        type="time"
                        value={segundaHoraInicio}
                        onChange={(event) =>
                          setSegundaHoraInicio(event.target.value)
                        }
                        placeholder="Inicio"
                      />
                      -
                      <input
                        type="time"
                        value={segundaHoraFim}
                        onChange={(event) =>
                          setSegundaHoraFim(event.target.value)
                        }
                        placeholder="Fim"
                      />
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
                      <input
                        type="time"
                        value={tercaHoraInicio}
                        onChange={(event) =>
                          setTercaHoraInicio(event.target.value)
                        }
                        placeholder="Inicio"
                      />
                      -
                      <input
                        type="time"
                        value={tercaHoraFim}
                        onChange={(event) =>
                          setTercaHoraFim(event.target.value)
                        }
                        placeholder="Fim"
                      />
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
                      <input
                        type="time"
                        value={quartaHoraInicio}
                        onChange={(event) =>
                          setQuartaHoraInicio(event.target.value)
                        }
                        placeholder="Inicio"
                      />
                      -
                      <input
                        type="time"
                        value={quartaHoraFim}
                        onChange={(event) =>
                          setQuartaHoraFim(event.target.value)
                        }
                        placeholder="Fim"
                      />
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
                      <input
                        type="time"
                        value={quintaHoraInicio}
                        onChange={(event) =>
                          setQuintaHoraInicio(event.target.value)
                        }
                        placeholder="Inicio"
                      />
                      -
                      <input
                        type="time"
                        value={quintaHoraFim}
                        onChange={(event) =>
                          setQuintaHoraFim(event.target.value)
                        }
                        placeholder="Fim"
                      />
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
                      <input
                        type="time"
                        value={sextaHoraInicio}
                        onChange={(event) =>
                          setSextaHoraInicio(event.target.value)
                        }
                        placeholder="Inicio"
                      />
                      -
                      <input
                        type="time"
                        value={sextaHoraFim}
                        onChange={(event) =>
                          setSextaHoraFim(event.target.value)
                        }
                        placeholder="Fim"
                      />
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
                      <input
                        type="time"
                        value={sabadoHoraInicio}
                        onChange={(event) =>
                          setSabadoHoraInicio(event.target.value)
                        }
                        placeholder="Inicio"
                      />
                      -
                      <input
                        type="time"
                        value={sabadoHoraFim}
                        onChange={(event) =>
                          setSabadoHoraFim(event.target.value)
                        }
                        placeholder="Fim"
                      />
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
                      <input
                        type="time"
                        value={domingoHoraInicio}
                        onChange={(event) =>
                          setDomingoHoraInicio(event.target.value)
                        }
                        placeholder="Inicio"
                      />
                      -
                      <input
                        type="time"
                        value={domingoHoraFim}
                        onChange={(event) =>
                          setDomingoHoraFim(event.target.value)
                        }
                        placeholder="Fim"
                      />
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
