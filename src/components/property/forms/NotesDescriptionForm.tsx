import React from "react";

interface NotesDescriptionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const NotesDescriptionForm: React.FC<NotesDescriptionProps> = ({
  formData,
  handleChange,
}) => (
  <div>
    <div>
      <label htmlFor="observacoes" className="block font-semibold mb-1">
        Observações
      </label>
      <textarea
        id="observacoes"
        name="observacoes"
        value={formData.observacoes}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={4}
        maxLength={255}
      />
    </div>
  </div>
);

export default NotesDescriptionForm;
