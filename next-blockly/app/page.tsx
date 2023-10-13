"use client";

import { Juego } from "./clases/Juego";
import Template from "./recursosPaginas/Template";
import ControladorStandard from "./bloques/Controlador";
import customTheme from "./bloques/CustomTheme";
import { CustomCategory } from "./bloques/CustomCategory";
import { Dhs_personajes } from "./clases/Dhs-personajes";
import {
  generarCoordenadas,
  configurarYRenderizarToolbox,
} from "./Utils/Funciones";
import { Dhs_Categorias } from "./clases/Dhs-categorias";

export default function Home() {
  const velocidadInicial = 1000;
  const miJuego = new Juego(velocidadInicial);
  const dimensiones = [7, 7]; //fila, columna

  const tablero = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];

  const coordenadasCaminoPared = generarCoordenadas(tablero);
  const personajesGaleria = new Dhs_personajes();
  const lupe = personajesGaleria.obtenerPersonaje("lupe");
  const cofre = personajesGaleria.obtenerPersonaje("cofre");
  const pasto = personajesGaleria.obtenerPersonaje("pasto");
  const arbol = personajesGaleria.obtenerPersonaje("arbol");
  const bandera = personajesGaleria.obtenerPersonaje("bandera");

  const datosModal = {
    titulo: "¡BUEN TRABAJO!",
    imagen: "monedas",
    texto: "Juntaste todas las monedas de los cofres!",
    oculto: true,
  };

  miJuego.generarEscenario(dimensiones, 2.5, "#9ca64e");
  miJuego.agregarModal(datosModal);
  let conjuntosDePersonajes = [
    {
      estrategia: "fijos",
      personajes: [arbol],
      posiciones: coordenadasCaminoPared.coordenadasPared,
      aliasConjunto: "fijosTablero",
      desapareceAlReiniciar: false,
    },
    {
      estrategia: "fijos",
      personajes: [pasto],
      posiciones: coordenadasCaminoPared.coordenadasCamino,
      aliasConjunto: "fijosTablero",
      desapareceAlReiniciar: false,
    },
    {
      estrategia: "fijos",
      personajes: [lupe],
      posiciones: [[1, 1]],
      aliasConjunto: "fijoPrincipal",
      desapareceAlReiniciar: false,
    },
    {
      estrategia: "fijos",
      personajes: [cofre],
      posiciones: [
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
      ],
      aliasConjunto: "fijosTablero",
      desapareceAlReiniciar: false,
    },
    {
      estrategia: "fijos",
      personajes: [bandera],
      posiciones: [[1, 5]],
      aliasConjunto: "fijosTablero",
      desapareceAlReiniciar: false,
    },
  ];

  miJuego.crearPersonajes(conjuntosDePersonajes);
  miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);
  miJuego.personajePrincipal.abrirCofre = function () {
    const intento = this.buscarParaRealizarAccion("cofre", "abrirse");

    if (!intento.objetoEncontrado) {
      return this.decirTerminar("¡Oh! Aquí no hay cofre.");
    } else if (!intento.exito) {
      return this.decirTerminar("¡Oh! Este cofre ya estaba abierto.");
    }
  };

  miJuego.personajePrincipal.llegarALaBandera = function () {
    if (this.mochila.length === 4) {
      this.abrirYMostrarModal();
    } else {
      return this.decirTerminar("¡Oh! Quedaron cofres sin abrir.");
    }
  };

  // BLOCKLY ------------------------------------------------------
  const miControlador = new ControladorStandard(miJuego, velocidadInicial);
  const categoria = new Dhs_Categorias();
  const categoriaElegida = categoria.obtenerCategoriasNecesarias([
    "Eventos",
    "Movimientos",
    "Acciones",
    "Repeticiones",
  ]);
  const ordenJerarquicoBloques = [
    ["on_execute", "Eventos"],
    ["move_classic_simple", "Movimientos"],
    ["abrir_cofre", "Acciones"],
    ["repeat_times", "Repeticiones"],
  ];

  const bloquesPrecargadosJSON =
    '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
  //const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
  const funcionesAExponer = [
    "moverDerecha",
    "moverAbajo",
    "moverArriba",
    "moverIzquierda",
    "abrirCofre",
  ];

  configurarYRenderizarToolbox(
    miControlador,
    categoriaElegida,
    ordenJerarquicoBloques,
    bloquesPrecargadosJSON,
    funcionesAExponer
  );

  return (
    <main className="dhs-body">
      <div>
        <Template></Template>
      </div>
    </main>
  );
}
