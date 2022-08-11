import Modal from "components/commons/Modal";
import { useDispatch } from "react-redux";
import { setIsCreatingPreferences } from "store";
import PreferencesModalBody from "./PreferencesModalBody";
import PreferencesModalHeader from "./PreferencesModalHeader";

const PreferencesModal = () => {
  const dispatch = useDispatch();

  const closeCreatingModal = () => {
    dispatch(setIsCreatingPreferences(false));
  };
  return (
    <Modal
      header={<PreferencesModalHeader />}
      body={<PreferencesModalBody />}
      onDisplayChange={closeCreatingModal}
    />
  );
};

export default PreferencesModal;
