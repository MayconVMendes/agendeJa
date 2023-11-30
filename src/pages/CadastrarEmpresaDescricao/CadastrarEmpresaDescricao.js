import { useNavigate } from "react-router-dom";
import "./CadastrarEmpresaDescricao.scss";

export default function CadastrarEmpresaDescricao() {
  const navigate = useNavigate();
  const dadosJson = localStorage.getItem("registrarEmpresa");
  const dados = JSON.parse(dadosJson);

  const handleSubmit = async (event) => {
    event.preventDefault();

    localStorage.setItem("registrarEmpresa", JSON.stringify(dados));
    navigate("/cadastro-empresa/seu-negocio/horarios");
    // const info = {
    //   email: dados.email,
    //   password: dados.password,
    //   birthday: dados.birthday,
    //   phone: dados.phone,
    //   firstName: dados.firstName,
    //   lastName: dados.lastName,
    //   cpf: dados.cpf,
    //   hasAddress: dados.hasAddress,
    //   cep: dados.cep,
    //   logradouro: dados.logradouro,
    //   complemento: dados.complemento,
    //   bairro: dados.bairro,
    //   localidade: dados.localidade,
    //   uf: dados.uf,
    //   numero: dados.numero,
    //   isJobProvider: dados.isJobProvider,
    //   imageId: null,
    //   fantasyName: dados.fantasyName,
    //   category: dados.category,
    //   subCategories: dados.subCategories,
    // };
    // await registerUserProvider(info);
    // navigate("/");
  };

  return (
    <div className="firstStepContainer">
      <div className="containerCentralDescricao">
        <h2>Cadastre seu negócio</h2>
        <p>Conte um pouco da sua trajetória</p>

        <form onSubmit={handleSubmit} className="formRegisterDescricao">
          <label>
            <input type="text" placeholder="Descrição da sua trajetória" />
          </label>
          <button className="primaryBtn" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
