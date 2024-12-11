import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { BIOMETRICS_PATH, ENTRY_PATH, HOST_PATH, PHONE_PATH, RAPPI_PATH, REPORTS_PATH, RESTAURANT_ORDER_PATH, RESTAURANT_PATH, SELL_TYPES_PATH, TABLES_CONTROL_PATH, TO_GO_PATH } from "./lib/routes.paths.lib";
import Login from "./routes/login/login";
import { useAuthStore } from "./shared";
import { CASHIER } from "./components/tools/confirmPassword/lib";
import Host from "./routes/host/host";
import Sells from "./routes/sells/sells";
import Order from "./routes/order/order";
import Cashier from "./routes/cashier/cashier";
import FingerRegister from "./routes/fingerRegister/fingerRegister";
import Reports from "./routes/reports/reports";
import Restaurant from "./routes/restaurant/restaurant";
import TablesControl from "./routes/tablesControl/tablesControl";
import ToGoOrder from "./routes/toGoOrder/toGoOrder";
import RappiOrders from "./routes/rappiOrder/rappiOrder";
import PhoneOrders from "./routes/phoneOrder/phoneOrder";
import ProtectedRoute from "./components/protect/protectedRoutes/protectedRoute";



const App = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <HashRouter>
      <Routes>
        {/* Ruta de Login */}
        <Route path={ENTRY_PATH} element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={<ProtectedRoute isAllowed={isAuth} />}
        >
          <Route path={HOST_PATH} element={<Host />} />
          <Route path={SELL_TYPES_PATH} element={<Sells />} />
          <Route path={RESTAURANT_ORDER_PATH} element={<Order />} />
          <Route path={CASHIER} element={<Cashier />} />
          <Route path={BIOMETRICS_PATH} element={<FingerRegister />} />
          <Route path={REPORTS_PATH} element={<Reports />} />
          <Route path={RESTAURANT_PATH} element={<Restaurant />} />
          <Route path={TABLES_CONTROL_PATH} element={<TablesControl />} />
          <Route path={TO_GO_PATH} element={<ToGoOrder />} />
          <Route path={RAPPI_PATH} element={<RappiOrders />} />
          <Route path={PHONE_PATH} element={<PhoneOrders />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to={ENTRY_PATH} />} />
      </Routes>
    </HashRouter>
  );
};

// Renderizar la aplicación principal
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
