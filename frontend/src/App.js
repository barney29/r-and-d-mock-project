import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PrivateLayout from "./component/layout/PrivateLayout";
import PublicLayout from "./component/layout/PublicLayout";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
