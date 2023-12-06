import React from "react";
import img1 from "../../../../assets/img1.png";
import MaryRocha from "../../../../assets/maryRocha.png";
import img3 from "../../../../assets/img3.png";
import Barbershop from "../../../../assets/barbershop.png";
import "./ourClients.scss";

export default function OurClients() {
  return (
    <section className="ourClients" id="section05">
      <h2>Profissionais da plataforma</h2>
      <div className="divBox">
        <div className="divSon">
          <div className="text">
            <img className="google" src={img1} alt="Img1" />
          </div>
          <div className="text">
            <img className="maryRocha" src={MaryRocha} alt="MaryRocha" />
          </div>
          <div className="text">
            <img className="meta" src={img3} alt="Img3" />
          </div>
          <div className="text">
            <img className="barbershop" src={Barbershop} alt="Barbershop" />
          </div>
        </div>
      </div>
    </section>
  );
}
