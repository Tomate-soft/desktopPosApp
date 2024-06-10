import { useEffect } from "react";
import { useOperationProcess } from "../../store/operatingPeriod/operatingPeriod.store";

export default function UseCashierException(openModal: any) {
  const periodsArray = useOperationProcess((state) => state.operatingPeriod);
  const cashierSession = periodsArray[0]?.sellProcess;

  //OperatingPeriod confirm
  const getCurrentPeriod = useOperationProcess(
    (state) => state.getCurrentPeriod
  );
  useEffect(() => {
    getCurrentPeriod();
    if (!cashierSession || cashierSession?.length === 0) {
      openModal();
    }
  }, []);
}
