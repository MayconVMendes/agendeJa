import React from "react";
import { useState, useEffect } from "react";
import useDisplayEnterpriseJobById from "../../hooks/display/enterpriseJob/useDisplayEnterpriseJobById";
import { useParams } from "react-router-dom";
import "./Catalogo.scss";

export default function Catalogo() {
    const [isData, setIsData] = useState();
    const {displayEnterpriseJobById} = useDisplayEnterpriseJobById();
    const { id } = useParams();
    var count = 0;

    useEffect(() => {
        if (count === 0) {
          async function searchJob() {
            let resultCategory = await displayEnterpriseJobById(id);
            setIsData(resultCategory.data);
          }
          searchJob();
          count++;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [count]);

      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

  return (
    <div className="boxCatalog">
      <div className="catalogHeader">
        <div className="heading">
          <h2 className="job">{isData?.name}</h2>
          <p className="description">
            {isData?.description}
          </p>
        </div>
        <div className="values">
          <div className="box btns">
            <button>Editar serviço</button>
            <button>Remover serviço</button>
          </div>
          <div className="box prices">
            <h2 className="price">{formatter.format(isData?.price)}</h2>
          </div>
          <div className="box timers">
            <p>Tempo médio:</p>
            <p className="timer">01 hora</p>
          </div>
        </div>
      </div>

      <button onClick={()=> console.log(isData)}>bora</button>
    </div>
  );
}
