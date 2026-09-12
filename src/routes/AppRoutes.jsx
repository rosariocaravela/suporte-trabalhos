import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
/*import ClientRoutes from "./ClientRoutes";
import AccountantRoutes from "./AccountantRoutes";*/

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
       {/* <Route path="/client/*" element={<ClientRoutes />} />
        <Route path="/accountant/*" element={<AccountantRoutes />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;