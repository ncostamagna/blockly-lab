//es responsabilidad del juego rellenarlo
import "../style.css";
import "../styleActividades.css";
import "../styleAnimaciones.css";
import Icon from "./Iconos";
import Image from "next/image";

export default () => {
  return (
    <>
      <header>
        <div class="botones">
          <button class="tooltip botonera" id="dhs-boton-ejecutar">
            <i>
              {" "}
              <Icon icon={"circle-play"} />{" "}
            </i>
            <span class="tooltiptext">Ejecutar bloques</span>
          </button>
          <button class="tooltip botonera" id="dhs-boton-detener">
            <i>
              {" "}
              <Icon icon={"circle-stop"} />{" "}
            </i>
            <span class="tooltiptext">Detener ejecución</span>
          </button>
          <button class="tooltip botonera" id="dhs-boton-reiniciar">
            <i>
              {" "}
              <Icon icon={"rotate-left"} />{" "}
            </i>
            <span class="tooltiptext">Reiniciar juego</span>
          </button>
          <button class="tooltip botonera" id="dhs-boton-borrar">
            <i>
              {" "}
              <Icon icon={"trash"} />{" "}
            </i>
            <span class="tooltiptext">Borrar todos los bloques</span>
          </button>
        </div>
        <div class="rango">
          <button class="tooltip botonera" disabled>
            <i class="tooltip botonera">
              {" "}
              <Icon icon={"person"} />{" "}
            </i>
            <span class="tooltiptext">Más lento</span>
          </button>
          <input
            id="dhs-input-acelerador"
            type="range"
            min="0"
            max="2400"
            step="200"
          />
          <button class="tooltip botonera" disabled>
            <i class="tooltip botonera">
              {" "}
              <Icon icon={"person-running"} />{" "}
            </i>
            <span class="tooltiptext">Más rápido</span>
          </button>
        </div>
        <div class="mostrar">
          <div>
            <i class="tooltip botonera">
              <Icon icon={"code"} />
              <span class="tooltiptext">Mostrar código</span>
            </i>
            <input type="range" value="0" min="0" max="1" />
          </div>
          <div>
            <i class="tooltip botonera">
              <Icon icon={"comment"} />
              <span class="tooltiptext">Mostrar resultado</span>
            </i>
            <input type="range" value="0" min="0" max="1" />
          </div>
        </div>
        <div class="desactivarSueltos">
          <span>Desactivar bloques sueltos</span>
          <input id="dhs-input-bloques-sueltos" type="checkbox" />
        </div>
      </header>
      <main>
        <div id="dhs-blockly-div" class="espacioBloques"></div>
        <div class="juego-escenario">
          <div class="juego">
            <div id="elemento-escenario" class="escenario"></div>
          </div>
          <textarea
            class="esconder"
            id="dhs-text-area-codigo-generado"
            value=""
            disabled
          ></textarea>
          <textarea
            class="esconder"
            id="dhs-text-area-output-generado"
            value=""
            disabled
          ></textarea>
        </div>
      </main>
      <footer>
        <Image
          src="/img/logodhsBlack.png"
          width={500}
          height={100}
          id="logoDHS-footer"
          alt="logo de Digital House Schools"
        />
        <Image
          src="/img/logoBlockly.png"
          width={100}
          height={100}
          id="logoBlockly-footer"
          alt="logo de Blockly"
        />
      </footer>
    </>
  );
};
