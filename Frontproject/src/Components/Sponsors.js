import React from "react";
import s1 from "../Assets/sponsors/adidas.png";
import s2 from "../Assets/sponsors/fila.png";
import s3 from "../Assets/sponsors/hsn.png";
import s4 from "../Assets/sponsors/mp.png";
import s5 from "../Assets/sponsors/nike.jpeg";

function Sponsors() {
  return (
    <div className="col-12 col-xl-2 mt-2 p-0">
      <div className="row row-cols-5 row-cols-xl-1 bg-white g-2 p-2">
        <div className="col d-flex align-items-center justify-content-center">
          <img src={s1} className="img-fluid" alt="logo de adidas"></img>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <img src={s2} className="img-fluid" alt="logo de fila"></img>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <img src={s5} className="img-fluid" alt="logo de nike"></img>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <img src={s3} className="img-fluid" alt="logo de hsn"></img>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <img src={s4} className="img-fluid" alt="logo de mp"></img>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
