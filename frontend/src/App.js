import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PrivateLayout from "./component/layout/PrivateLayout";
import PublicLayout from "./component/layout/PublicLayout";
import Auth from "./pages/Auth";

function App() {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="auth" element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
