import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUpdateDataUser from "../../hooks/user/useUpdateDataUser";
import useGetUserById from "../../hooks/user/useGetUserById";
import { useDispatch } from "react-redux";
import { addInfoUser } from "../../redux/userSliceDados";
import InputMask from "react-input-mask";
import { useToast } from "@chakra-ui/react";
import "./MinhaConta.scss";

export default function MinhaConta() {
  const state = useSelector((state) => state?.user);
  const userData = useSelector((state) => state?.userDados);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [image, setImage] = useState("");
  const { updateUser } = useUpdateDataUser();
  const { addUser } = useGetUserById();
  const dispatch = useDispatch();
  const toast = useToast();
  const tokenStorage = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (state?.isLogged === false) {
      navigate("/");
    } else {
      console.log(userData.phone);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setCpf(userData.cpf);
      setBirthday(userData.birthday);
      setPhone(userData.phone);
      setImage(userData.profileImage);
    }
  }, [navigate, state, userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateUser(state?.id_user, tokenStorage.token, {
        firstName: firstName,
        lastName: lastName,
        phone: phone.replace(/[^0-9]/g, ""),
      });
      const updateReduxUser = await addUser(state?.id_user, tokenStorage.token);
      dispatch(addInfoUser(updateReduxUser));
      toast({
        title: "Dados atualizados.",
        description: "Seus dados foram atualizados com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/")
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
    <div className="register">
      <h1>Atualize seus dados!</h1>
      <span>Somente estes dados pode ser atualizados</span>
      <form onSubmit={handleSubmit}>
        <div className="columnImg myProfile">
          <img className="myProfile" src={image} alt="Minha foto" />
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
              type="text"
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
              defaultValue={email}
              disabled
              placeholder="Email"
            />
          </label>
        </div>

        <div className="columnCpfDt">
          <label>
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              disabled
              placeholder="CPF"
            />
          </label>
          <label>
            <input
              type="date"
              defaultValue={birthday}
              disabled
              placeholder="Data de nascimento"
            />
          </label>
        </div>
        <div className="functions">
          <button type="submit">Atualizar</button>
        </div>
      </form>
    </div>
  );
}
