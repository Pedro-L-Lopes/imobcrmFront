import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./pages/Client";
import InsertClient from "./components/client/InsertClient";
import Location from "./pages/Location";
import Property from "./pages/Property";
import InsertProperty from "./components/property/InsertProperty";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="flex">
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/clientes" element={<Client />} />
            <Route path="/novo-cliente" element={<InsertClient />} />

            <Route path="/localizacoes" element={<Location />} />

            <Route path="/imoveis" element={<Property />} />
            <Route path="/novo-imovel" element={<InsertProperty />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
