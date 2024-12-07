import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Client from "./pages/Client";
import InsertClient from "./components/client/InsertClient";
import Location from "./pages/Location";
import Property from "./pages/Property";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/clientes" element={<Client />} />
          <Route path="/novo-cliente" element={<InsertClient />} />
          <Route path="/localizacoes" element={<Location />} />
          <Route path="/" element={<Property />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
