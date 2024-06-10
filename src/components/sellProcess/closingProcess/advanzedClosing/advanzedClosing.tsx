import styles from "./advanzedClosing.module.css";
import tillIcon from "../../../../assets/icon/tillIconTwo.svg";
import useDate from "../../../../hooks/useDate";
import crossButton from "../../../../assets/icon/crossButton.svg";
import dividerFinally from "../../../../assets/icon/dividerFinally.svg";
import buttonTill from "../../../../assets/icon/tillTransparent.svg";
import cashCircle from "../../../../assets/icon/paperCash.svg";
import dividerOne from "../../../../assets/icon/divider10.svg";
import dividerThree from "../../../../assets/icon/divider30.svg";
import cardCircle from "../../../../assets/icon/cardCircle.svg";
import platformCircle from "../../../../assets/icon/platformCircle.svg";
import dividerTwo from "../../../../assets/icon/divider20.svg";
import { IS_METALLIC, IS_PAPER, entrys } from "./constants";
import { useState } from "react";
import ClosingBoard from "../closingBoard/closingBoard";
interface Props {
  onClose: () => void;
}
export default function AdvanzedClosing({ onClose }: Props) {
  const { currentDateTime, opcionesFecha, opcionesHora }: any = useDate();
  const formattedFecha = currentDateTime.toLocaleDateString(
    "es-ES",
    opcionesFecha
  );

  const [values, setValues] = useState(entrys.map(() => "")); // Inicializa un arreglo para almacenar los valores de los inputs

  // Función para manejar cambios en los inputs
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newValue = event.target.value;

    // Limitar a 2 caracteres
    newValue = newValue.slice(0, 3);

    // Remover caracteres especiales y negativos
    newValue = newValue.replace(/[^0-9]/g, "");

    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValue;
      return newValues;
    });
  };

  // Función para calcular el efectivo total
  const calcularEfectivoTotal = () => {
    let total = 0;
    values.forEach((value, index) => {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        total += parsedValue * entrys[index].value;
      }
    });
    return total.toFixed(2);
  };

  // Calcular el efectivo total una vez al inicio para evitar la llamada repetida en el JSX
  const efectivoTotal = parseFloat(calcularEfectivoTotal());

  return (
    <div className={styles.display}>
      <div className={styles.container}>
        <div>
          <div>
            <img src={tillIcon} alt="till-icon" />
            <h3>{`Cierre de caja`}</h3>
          </div>
          <div>
            <h3>{formattedFecha}</h3>
            <button onClick={onClose}>
              <img src={crossButton} alt="close-button" />
            </button>
          </div>
        </div>
        <div className={styles.mainSection}>
          <div className={styles.primaryContainer}>
            <div>
              <div>
                <div>
                  <h3>Importe</h3>
                  <h3>Metodo de pago</h3>
                </div>
                <img src={dividerOne} alt="divider" />
              </div>
              <div>
                <div>
                  <input type="text" placeholder="0" />
                  <h3>Tarjeta de débito</h3>
                </div>
                <div>
                  <input type="text" placeholder="0" />
                  <h3>Tarjeta de crédito</h3>
                </div>
                <div>
                  <input type="text" placeholder="0" />
                  <h3>Transferencia</h3>
                </div>
                <div>
                  <div>
                    <span>#! value</span>
                  </div>
                  <h3>Cortesía</h3>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <h3>Importe</h3>
                  <h3>Plataforma</h3>
                </div>
                <img src={dividerTwo} alt="divider" />
              </div>
              <div>
                <div>
                  <input type="text" placeholder="0" />
                  <h3>Rappi</h3>
                </div>
                <div>
                  <input type="text" placeholder="0" />
                  <h3>Uber Eats</h3>
                </div>
                <div>
                  <div>
                    <span>#! value</span>
                  </div>
                  <h3>Didi Food</h3>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <h3>Importe</h3>
                  <h3>Plataforma</h3>
                </div>
                <img src={dividerThree} alt="divider" />
              </div>
              <div>
                <div>
                  <input type="text" placeholder="0" />
                  <h3>Entradas de efectivo</h3>
                </div>
                <div>
                  <input type="text" placeholder="0" />
                  <h3>Salidas de efectivo</h3>
                </div>
                <div>
                  <div>
                    <span>#! value</span>
                  </div>
                  <h3>Propinas</h3>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.secondaryContainer}>
            <div>
              <div>
                <div>
                  <h3 className={styles.quantity}>Cantidad</h3>
                  <h3>Denominación</h3>
                  <h3 className={styles.import}>Importe</h3>
                </div>
                <img src={dividerFinally} alt="divider-finally" />
              </div>
              <div className={styles.denominationBox}>
                {entrys.map((element, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder="0"
                      value={values[index]}
                      onChange={(event) => handleInputChange(index, event)}
                    />

                    <h3>{element.tittle}</h3>
                    <h3>{`${
                      !isNaN(parseFloat(values[index]))
                        ? (parseFloat(values[index]) * element.value).toFixed(2)
                        : "0"
                    } MXN`}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.totals}>
              <div>
                <div>
                  <img src={cashCircle} alt="cash-circle" />
                  <h3>Efectivo total: </h3>
                </div>
                <h3>{`$${!isNaN(efectivoTotal) ? efectivoTotal : "0"} MXN`}</h3>
              </div>
              <div>
                <div>
                  <img src={cardCircle} alt="card-circle" />
                  <h3>Total de metodos de pago: </h3>
                </div>
                <h3>{`$${!isNaN(efectivoTotal) ? efectivoTotal : "0"} MXN`}</h3>
              </div>
              <div>
                <div>
                  <img src={platformCircle} alt="platform-circle" />
                  <h3>Total de: </h3>
                </div>
                <h3>{`$${!isNaN(efectivoTotal) ? efectivoTotal : "0"} MXN`}</h3>
              </div>
            </div>
          </div>
          <div>
            <ClosingBoard></ClosingBoard>
            <button>
              <img src={buttonTill} alt="till-icon" />
              Cerrar caja
            </button>
            <div>
              <h4>Total ingresado</h4>
              <h3>{`$${!isNaN(efectivoTotal) ? efectivoTotal : "0"} MXN`}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
