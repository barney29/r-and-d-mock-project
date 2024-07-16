import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateLayout from "./component/layout/PrivateLayout";
import PublicLayout from "./component/layout/PublicLayout";

function App() {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
