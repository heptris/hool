import Modal from "components/commons/Modal";
import { useDispatch } from "react-redux";
import { setIsCreatingGame } from "store";
import MeetingGameModalBody from "./MeetingGameModalBody";
import MeetingGameModalHeader from "./MeetingGameModalHeader";

const MeetingGameModal = () => {
  const dispatch = useDispatch();

  const closeCreatingModal = () => {
    dispatch(setIsCreatingGame(false));
  };

  return (
    <Modal
      header={<MeetingGameModalHeader />}
      body={<MeetingGameModalBody />}
      onDisplayChange={closeCreatingModal}
    />
  );
};

export default MeetingGameModal;
