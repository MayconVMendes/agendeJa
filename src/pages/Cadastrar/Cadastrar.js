import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRegisterCliente from "../../hooks/register/useRegisterClient";
import "./cadastrar.scss";
import { useNavigate } from "react-router-dom";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { useToast } from "@chakra-ui/react";
import Loader from "../../components/Loader/Loader";
import { Checkbox } from "@chakra-ui/react";
import FileToBase64 from "react-file-base64";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [switchValue, setSwitchValue] = useState(false);
  const [image, setImage] = useState(null);
  const [base64ImageData, setBase64ImageData] = useState("");
  const { registerUser, loading } = useRegisterCliente();
  const navigate = useNavigate();
  const toast = useToast();
  const [isFetching, setIsFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const dadosJson = localStorage.getItem("registrarEmpresa");
    const dados = JSON.parse(dadosJson);
    if (dados) {
      setSwitchValue(dados.isJobProvider);
      setEmail(dados.email);
      setPassword(dados.password);
      setBirthday(dados.birthday);
      setPhone(dados.phone);
      setFirstName(dados.firstName);
      setLastName(dados.lastName);
      setCpf(dados.cpf);
    }
  }, []);

  useEffect(() => {
    if (loading === true) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }
  }, [loading]);

  const info = {
    email: email,
    password: password,
    birthday: birthday,
    phone: phone.replace(/[^0-9]/g, ""),
    firstName: firstName,
    lastName: lastName,
    cpf: cpf.replace(/[^0-9]/g, ""),
    isJobProvider: switchValue,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (switchValue === true) {
        localStorage.setItem("registrarEmpresa", JSON.stringify(info));
        navigate("/cadastro-empresa");
      } else {
        await registerUser(info);
        toast({
          title: "Conta criada.",
          description: "Seu cadastro foi realizado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Ocorreu algum erro.",
        description: `Error: ${error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {isFetching ? <Loader /> : ""}

      <div className="register">
        <h1>Cadastre-se</h1>
        <span className="spanSub">Crie uma conta e acesse</span>
        <form onSubmit={handleSubmit} className="formRegister">
          <FormControl display="flex" alignItems="center">
            <Switch
              id="email-alerts"
              isChecked={switchValue}
              onChange={() => {
                setSwitchValue(!switchValue);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setBirthday("");
                setPhone("");
                setFirstName("");
                setLastName("");
                setCpf("");
              }}
            />
            <FormLabel htmlFor="email-alerts" mb="0">
              Você é prestador de serviços?
            </FormLabel>
          </FormControl>
          <div className="columnImg">
            <FileToBase64
              value={image}
              onDone={(base64Data) => {
                setBase64ImageData(base64Data);
              }}
            />
          </div>
          <div className="columnName">
            <label>
              <input
                type="text"
                value={firstName}
                placeholder="Nome"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </label>
            <label>
              <input
                type="text"
                value={lastName}
                placeholder="Sobrenome"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="columnEmail">
            <label>
              <InputMask
                mask="(99) 99999-9999"
                value={phone}
                placeholder="Telefone"
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </label>
            <label>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </label>
          </div>

          <div className="columnCpfDt">
            <label>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                placeholder="CPF"
                onChange={(event) => {
                  setCpf(event.target.value);
                }}
              />
            </label>
            <label>
              <input
                type="date"
                value={birthday}
                placeholder="Data de nascimento"
                onChange={(event) => {
                  setBirthday(event.target.value);
                }}
              />
            </label>
          </div>

          <div className="passwords">
            <label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Senha"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </label>
            <label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="Confirmar Senha"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </label>
          </div>
          <Checkbox
            isChecked={showPassword}
            onChange={() => {
              setShowPassword(!showPassword);
            }}
          >
            Mostrar senha
          </Checkbox>
          <div className="functions">
            <Link to="/login">Fazer login</Link>
            <button className="primaryBtn" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
