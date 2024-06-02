import React, { Fragment } from "react";
import './Services.css';

export default function Services() {

  

  return (
    <Fragment>
      <div className="wrapperServices">
        <div className="container">
          <input type="radio" name="slide" id="c1" defaultChecked />
          <label htmlFor="c1" className="cardServices" id="cardServicesMarketing">
            <div className="row">
              <div className="icon">1</div>
              <div className="description">
                <h4>Marketing & Communication</h4>
                <p>Notre département de Communication et Marketing est votre partenaire stratégique pour bousculer votre marque </p>
              </div>
            </div>
          </label>
          <input type="radio" name="slide" id="c2" />
          <label htmlFor="c2" className="cardServices" id="cardServicesFormationKaafat">
            <div className="row">
              <div className="icon">2</div>
              <div className="description">
                <h4>Formation * KAFAAT *</h4>
                <p>Notre département de Formation, connu sous le nom de KAFAAT,</p>
              </div>
            </div>
          </label>
          <input type="radio" name="slide" id="c3" />
          <label htmlFor="c3" className="cardServices" id="cardServicesAudiov">
            <div className="row">
              <div className="icon">3</div>
              <div className="description">
                <h4>Audiovisuel </h4>
                <p>Notre département d'Audiovisuel est votre partenaire créatif pour donner vie à</p>
              </div>
            </div>
          </label>
          <input type="radio" name="slide" id="c4" />
          <label htmlFor="c4" className="cardServices" id="cardServicesEven">
            <div className="row">
              <div className="icon">4</div>
              <div className="description">
                <h4>Événementiel </h4>
                <p>Notre département d'événementiel est dédié à créer des expériences inoubliables</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </Fragment>
  );
}
