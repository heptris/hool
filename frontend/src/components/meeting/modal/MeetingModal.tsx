import Modal from "components/commons/Modal";
import { useDispatch } from "react-redux";
import { setIsCreatingRoom } from "store";
import MeetingModalBody from "./MeetingModalBody";
import MeetingModalHeader from "./MeetingModalHeader";

const MeetingModal = () => {
  const dispatch = useDispatch();

  const closeCreatingModal = () => {
    dispatch(setIsCreatingRoom(false));
  };

  return (
    <Modal
      header={<MeetingModalHeader onDisplayChange={closeCreatingModal} />}
      body={<MeetingModalBody onDisplayChange={closeCreatingModal} />}
      onDisplayChange={closeCreatingModal}
    />
  );
};

export default MeetingModal;
