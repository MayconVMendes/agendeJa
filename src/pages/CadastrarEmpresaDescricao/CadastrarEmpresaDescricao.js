import { useNavigate } from "react-router-dom";
import "./CadastrarEmpresaDescricao.scss";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import useRegisterCliente from "../../hooks/register/useRegisterClient";

export default function CadastrarEmpresaDescricao() {
  const navigate = useNavigate();
  const dadosJson = localStorage.getItem("registrarEmpresa");
  const dados = JSON.parse(dadosJson);
  const [isDescricao, setIsDescricao] = useState("")
  const {registerUserProvider} = useRegisterCliente();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const info = {
      email: dados.email,
      password: dados.password,
      birthday: dados.birthday,
      phone: dados.phone,
      firstName: dados.firstName,
      lastName: dados.lastName,
      cpf: dados.cpf,
      hasAddress: dados.hasAddress,
      cep: dados.cep,
      logradouro: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      localidade: dados.localidade,
      uf: dados.uf,
      numero: dados.numero,
      isJobProvider: dados.isJobProvider,
      profileImage: dados.profileImage,
      coverImage: null,
      fantasyName: dados.fantasyName,
      category: dados.category,
      subCategories: dados.subCategories,
      hours: dados.hours,
      is24Hours: dados.is24Hours,
      description: isDescricao
    };
    await registerUserProvider(info);
    toast({
      title: "Conta criada.",
      description: "Seu cadastro foi realizado com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/")
  };
  

  return (
    <div className="firstStepContainer">
      <div className="containerCentralDescricao">
        <h2>Cadastre seu negócio</h2>
        <p>Conte um pouco da sua trajetória</p>

        <form onSubmit={handleSubmit} className="formRegisterDescricao">
          <label>
            <input
              type="text"
              placeholder="Descrição da sua trajetória(opcional)"
              value={isDescricao}
              onChange={(event) => setIsDescricao(event.target.value)}
            />
          </label>
          <button className="primaryBtn" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
