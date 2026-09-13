import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
/*import ClientRoutes from "./ClientRoutes";
import ProviderRoutes from "./ProviderRoutes";*/

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
      {/* <Route path="/client/*" element={<ClientRoutes />} />
       <Route path="/provider/*" element={<ProviderRoutes />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;