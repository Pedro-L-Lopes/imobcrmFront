import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";

// Components
import { insertLocation, reset } from "../../slices/locationSlice";

type InsertLocationModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const InsertLocationModal = ({ onClose, isOpen }: InsertLocationModalProps) => {
  const dispatch = useAppDispatch();
  const { error, success, message } = useSelector(
    (state: any) => state.location
  );

  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [bairro, setBairro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cidade || !estado) return;

    dispatch(
      insertLocation({
        cidade,
        estado,
        bairro,
      })
    );
  };

  useEffect(() => {
    if (success) {
      onClose();
      setCidade("");
      setEstado("");
      setBairro("");
      dispatch(reset());
    }
  }, [success, onClose, dispatch]);

  if (!isOpen) return null;

  console.log(success);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Inserir Localização</h2>

        {message && (
          <div
            className={`p-4 mb-4 rounded-sm text-white ${
              error ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Bairro</label>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Cidade</label>
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none  focus:border-blue-500 ${
                cidade ? "" : "border-red-500"
              }`}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Estado</label>
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
              maxLength={2}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                estado ? "" : "border-red-500"
              }`}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-400 transition-all text-white px-6 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-500 transition-all text-white px-6 py-2 rounded-md"
            >
              Inserir Localização
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsertLocationModal;
