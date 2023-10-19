import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {Dhs_personajes} from '../../clases/Dhs-personajes';
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import {Dhs_Categorias} from '../../clases/Dhs-categorias';
import {PersonajesAlAzarExcluyente} from '../../clases/StrategyCreacion';



document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 9]; //fila, columna

const tablero = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const panda = personajesGaleria.obtenerPersonaje("lupe");
const agua = personajesGaleria.obtenerPersonaje("agua");
const frutilla = personajesGaleria.obtenerPersonaje("frutilla");
const bamboo = personajesGaleria.obtenerPersonaje("bamboo");
const bambooAncho = personajesGaleria.obtenerPersonaje("bambooAncho");
const bambooAnchoCamino = personajesGaleria.obtenerPersonaje("bambooAnchoCamino");
const bambooIzq = personajesGaleria.obtenerPersonaje("bambooIzqHoja");
const bambooDerecho = personajesGaleria.obtenerPersonaje("bambooDerechoHoja");
const nubes = personajesGaleria.obtenerPersonaje("nubes")
const estrella = personajesGaleria.obtenerPersonaje("cofre")
const tierra = personajesGaleria.obtenerPersonaje("pasto")

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "caraPanda",
  texto: "¡Objetivo Cumplido!",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 3.5, "white");
miJuego.agregarModal(datosModal);
//fijos,azarRango,azarFijos,azarExcluyente,azarCantTotal,azarCantidadTotalFijos
let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [panda],
    posiciones: [[0, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  // {
  //   estrategia: "fijos",
  //   personajes: [tierra],
  //   //posiciones: coordenadasCaminoPared.coordenadasPared,
  //   aliasConjunto: "fijosTablero",
  //   desapareceAlReiniciar: false,
  // },
  // {
  //   estrategia: "fijos",
  //   personajes: [estrella],
  //   //posiciones: [[3, 7]],
  //   aliasConjunto: "fijosTablero",
  //   desapareceAlReiniciar: false,
  // },
  {
    estrategia: "filasAleatoriasSimples",
    personajes: [nubes, tierra, estrella],
    aliasConjunto: "filasAleatoriasSimples",
    desapareceAlReiniciar: true,
    anchoMinimo: 2,
    anchoMaximo: 8, // Warning no exceda el tablero.
}
];


//miJuego.crearPersonajeEscenarioAleatoreo(conjuntosDePersonajes, tablero);
miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[0]);

//Método para detectar
// miJuego.personajePrincipal.detectarFrutilla = function () {
//   // devuelve true si encuentra o false si no hay cofre
//   return this.buscarObjetoEnCasilleroActual("frutilla") !== undefined
// };
// miJuego.personajePrincipal.comerFrutilla = function () {
//   const intento = this.buscarParaRealizarAccion("frutilla", "abrirse");
//   if (!intento.objetoEncontrado) {
//     return this.decirTerminar("¡Oh! Aquí no hay frutilla.");
//   } else if (!intento.exito) {
//     return this.decirTerminar("¡Oh! Aqui ya no hay frutilla.");
//   }else if (intento.premio?.tipo == "frutilla") {
//     return this.decir("¡mmmm! que rica frutilla.",2000);
//   }

// };

// miJuego.personajePrincipal.detectarBamboo = function () {
//   // devuelve true si encuentra o false si no hay cofre
//   return this.buscarObjetoEnCasilleroActual("bamboo") !== undefined
// };
// miJuego.personajePrincipal.comerBamboo = function () {
//   const intento = this.buscarParaRealizarAccion("bamboo", "abrirse");
//   if (!intento.objetoEncontrado) {
//     return this.decirTerminar("¡Oh! Aquí no hay bambú.");
//   } else if (!intento.exito) {
//     return this.decirTerminar("¡Oh! Aqui ya no hay bambú.");
//   }else if (intento.premio?.tipo == "bamboo") {
//     return this.decir("¡mmmm! que rica bambú.",2000);
//   }

// };

// miJuego.personajePrincipal.llegarALaEstrella = function () {
//   //El if depende de la cantidadTotal de cofres que hayamos seteado arriba
//   //console.log(this.mochila[0].tipo) si era un bamboo, la mochila viene vacia,
//   //  y si era una frutilla y no se la comio, también viene vacia
//   const casilleroAleatoreoFrutilla = miJuego.escenario.objetosCasilleros[3][5].ocupantes.some(p=>p.idHTML == "frutilla")
//   if(casilleroAleatoreoFrutilla && this.mochila[0]?.tipo == "frutilla"){
//     this.abrirYMostrarModal();
//   }
//   if(casilleroAleatoreoFrutilla && this.mochila.length == 0){
//     this.decirTerminar("¡Oh No! Quedó una frutilla sin comer 😟.")
//   }
//   if(!casilleroAleatoreoFrutilla && this.mochila[0]?.tipo == "bamboo"){
//     this.abrirYMostrarModal();
//   }else{
//     this.decirTerminar("¡Oh No! Quedó una bamboo sin comer 😟.");
//   }
// };

// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones","Condicionales","Sensores"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_left_right_param", "Movimientos"],
  ["if", "Condicionales"],
  ["ifElse", "Condicionales"],
];

const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer=["moverDerecha","moverIzquierda"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
