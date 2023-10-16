import React, { Component } from "react";
import { DHS_Gallery } from "./Dhs-galeria";

export class Escenario extends Component {
  constructor(dimensiones, unidadAnchoDeseada, elementoHTML, colorBordes) {
    super({ dimensiones, unidadAnchoDeseada, elementoHTML, colorBordes });
    console.log("CONTRS");
    console.log(dimensiones);
    this.state = {
      dimensiones: dimensiones,
      unidadAnchoDeseada: unidadAnchoDeseada,
      colorBordes: colorBordes,
      objetosCasilleros: [],
    };
    this.galeria = new DHS_Gallery();
  }

  componentDidMount() {
    this.crearEscenario();
  }

  crearEscenario() {
    console.log(this.state.dimensiones);
    for (let fila = 0; fila < this.state.dimensiones[0]; fila++) {
      let nuevaFila = [];
      for (let col = 0; col < this.state.dimensiones[1]; col++) {
        let nuevoCasillero = this.crearCasillero(fila, col);
        nuevaFila.push(nuevoCasillero);
      }
      this.setState((prevState) => ({
        objetosCasilleros: [...prevState.objetosCasilleros, nuevaFila],
      }));
    }

    this.renderizarLaberinto();
  }

  crearCasillero(fila, columna) {
    return <Casillero fila={fila} columna={columna} />;
  }

  renderizarLaberinto() {
    const anchoTotal =
      this.state.unidadAnchoDeseada * this.state.dimensiones[1];
    const altoTotal = this.state.unidadAnchoDeseada * this.state.dimensiones[0];

    return (
      <div style={{ width: `${anchoTotal}em`, height: `${altoTotal}em` }}>
        {this.state.objetosCasilleros.map((fila, rowIndex) => (
          <div key={rowIndex}>
            {fila.map((casillero, colIndex) => (
              <React.Fragment key={colIndex}>{casillero}</React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  }

  obtenerCasillero(posicionY, posicionX) {
    const fila = this.state.objetosCasilleros[posicionY];
    const casillero = fila ? fila[posicionX] : null;
    return casillero;
  }

  iluminarCasilleros(posiciones, classCss) {
    posiciones.forEach((posicion) => {
      this.state.objetosCasilleros[posicion[0]][posicion[1]].agregarClassCss(
        classCss
      );
    });
    //console.log("setear classCss")
  }

  render() {
    return <div>{/* Render the escenario here */}</div>;
  }
}

class Casillero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fila: props.fila,
      columna: props.columna,
      ocupantes: [],
    };
  }

  esPisable() {
    return this.state.tipo === "camino";
  }

  hayColisionCon(colisiones) {
    let obj = { factorDeAvance: 1 };
    colisiones.forEach((objeto) => {
      let objetoColisionante = this.verSiExisteEnArray(objeto);
      if (objetoColisionante) {
        obj = objeto;
        obj.objetoColisionante = objetoColisionante;
      }
    });
    return obj;
  }

  verSiExisteEnArray(object) {
    let objEncontrado = this.state.ocupantes.find(
      (ocupante) => ocupante.tipoPersonaje === object.con
    );
    return objEncontrado;
  }

  vaciarCasillas() {
    this.setState({ ocupantes: [] });
  }

  agregarClassCss(classCss) {
    // Add your class to the CSS class list
    // You can add more logic here if needed
    this.casilla.classList.add(classCss);
  }

  render() {
    return <div className="casillero" ref={(el) => (this.casilla = el)}></div>;
  }
}
