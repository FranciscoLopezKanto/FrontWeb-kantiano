// EditInsuranceModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';

const EditInsuranceModal = ({ isOpen, onRequestClose, user, onSave }) => {
  const [insurance, setInsurance] = useState(user.seguroMedico);

  const handleSave = () => {
    onSave({ ...user, seguroMedico: insurance });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Insurance"
      ariaHideApp={false}
    >
      <h2>Editar Seguro Médico</h2>
      <form>
        <label>
          Seguro Médico:
          <select value={insurance} onChange={(e) => setInsurance(e.target.value)}>
            <option value="Fonasa">Fonasa</option>
            <option value="Isapre">Isapre</option>
          </select>
        </label>
        <div>
          <button type="button" onClick={onRequestClose}>Cancelar</button>
          <button type="button" onClick={handleSave}>Guardar</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditInsuranceModal;
