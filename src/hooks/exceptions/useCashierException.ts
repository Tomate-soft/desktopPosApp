import { useEffect } from "react";
import { useOperationProcess } from "../../store/operatingPeriod/operatingPeriod.store";

export default function UseCashierException(openModal: any) {
  const periodsArray = useOperationProcess((state) => state.operatingPeriod);
  const cashierSession = periodsArray[0]?.sellProcess; // array con todas las sessiones
  const sessionsEnables = cashierSession?.filter((item: any) => item.enable);

  //OperatingPeriod confirm
  const getCurrentPeriod = useOperationProcess(
    (state) => state.getCurrentPeriod
  );
  useEffect(() => {
    getCurrentPeriod();
    if (!cashierSession || sessionsEnables.length === 0) {
      openModal();
    }
  }, []);
}
