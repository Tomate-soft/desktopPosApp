import axios from "axios";
import { useState } from "react";
import { tables } from "../mocks/tables";

export default function UseTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [tablesArray, setTablesArray] = useState<any>();
  const [errors, setErrors] = useState(false);
  const [currentTable, setCurrentTable] = useState();

  async function getTables() {
    setIsLoading(true);
    try {
      const res = await axios("https://tomate-server.onrender.com/tables");
      if (!res.data) {
        setIsLoading(false);
        setErrors(true);
        alert("No se ha podido encontrar la informacion de las mesas");
      }
      setIsLoading(false);
      const tableArray = res.data;
      setTablesArray(tableArray);
      return tableArray;
    } catch (error) {
      setIsLoading(false);
      setErrors(true);
      console.error(`Ha ocurrido algo inesperado: ${error}`);
    }
  }

  async function getOneTable(id: string | undefined) {
    setIsLoading(true);
    try {
      const res = await axios(
        `https://tomate-server.onrender.com/tables/${id}`
      );
      if (!res.data) {
        setIsLoading(false);
        setErrors(true);
        alert("No se ha podido encontrar la informacion de la mesa");
      }
      setIsLoading(false);
      const tableArray = res.data;
      setCurrentTable(tableArray);
      return tableArray;
    } catch (error) {
      setIsLoading(false);
      setErrors(true);
      console.error(`Ha ocurrido algo inesperado: ${error}`);
    }
  }
  async function updateTable(
    statusChange: string,
    id: string | undefined,
    bill?: string[]
  ) {
    /*   tables.map((item) => {
      if (item.tableNum === tableId) {
      }
    });  */

    try {
      if (bill) {
        const res = await axios.patch(
          `https://tomate-server.onrender.com/tables/${id}`,
          { status: statusChange, bill: [] }
        );

        return res.data;
      }
      const res = await axios.patch(
        `https://tomate-server.onrender.com/tables/${id}`,
        { status: statusChange }
      );
      if (!res.data) {
        setIsLoading(false);
        setErrors(true);
        alert("No se ha podido encontrar la informacion de las mesas");
      }
      setIsLoading(false);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      setErrors(true);
      console.error(`Ha ocurrido algo inesperado: ${error}`);
    }
  }
  // revisar los metodos locales

  function updateForPaymentTable(tableId: string) {
    tables.map((item) => {
      if (item.tableNum === tableId) {
        item.status = "forPayment";
      }
    });
  }
  function activeTable(tableId: string) {
    tables.map((item) => {
      if (item.tableNum === tableId) {
        item.status = "enable";
      }
    });
  }

  return {
    tablesArray,
    getTables,
    isLoading,
    errors,
    updateForPaymentTable,
    updateTable,
    activeTable,
    getOneTable,
    currentTable,
  };
}
