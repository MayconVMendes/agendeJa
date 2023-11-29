export default function PhasesServices({page}) {
  return (
    <div id="action" className={"phases-" + page}>
      <div className="boxCheck one">
        <label>Categoria do serviço</label>
      </div>
      <div className="boxCheck two">
        <label>Informações básicas</label>
      </div>
      <div className="boxCheck three">
        <label>Adicionar fotos</label>
      </div>
      <div className="boxCheck four">
        <label>Concluir cadastro</label>
      </div>
    </div>
  );
}
