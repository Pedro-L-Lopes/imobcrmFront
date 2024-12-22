// Hooks
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages and components
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Client from "./pages/Client";
import InsertClient from "./components/client/InsertClient";
import Property from "./pages/Property";
import InsertProperty from "./components/property/InsertProperty";
import Location from "./pages/Location";
import Visit from "./pages/Visit";
import InsertVisit from "./components/visit/InsertVisit";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <BrowserRouter>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <div
          className={`flex-1 flex justify-center items-center p-4 duration-500 ${
            sidebarOpen ? "ml-48" : "ml-16"
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/clientes" element={<Client />} />
            <Route path="/novo-cliente" element={<InsertClient />} />

            <Route path="/localizacoes" element={<Location />} />

            <Route path="/imoveis" element={<Property />} />
            <Route path="/novo-imovel" element={<InsertProperty />} />

            <Route path="/visitas" element={<Visit />} />
            <Route path="/nova-visita" element={<InsertVisit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
