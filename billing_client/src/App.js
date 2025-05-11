import { BrowserRouter ,Route,Router, Routes} from "react-router-dom";
import Login from "./Component/login/Login";
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectionArea from "./Component/selectionArea/SelectionArea";
import UserManagement from "./Component/userManagement/UserManagement";
import Product from "./Component/product/Product";
import Unit from "./Component/units/Unit";
import Layout from "./Component/layout/Layout";
import Billing from "./Component/billing/Billing";
import Report from "./Component/Report/Report";

function App() {
  return (
   <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>} ></Route>
        <Route path="/" element={<Layout/>}>
        <Route path="/selectionArea" element={<SelectionArea/>}></Route>
        <Route path="/userManagement" element={<UserManagement/>}></Route>
        <Route path="/product" element={<Product/>}></Route>
        <Route path="/unit" element={<Unit/>}></Route>
        <Route path="/billing" element={<Billing/>}></Route>
        <Route path="/report" element={<Report/>}></Route>
        </Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
