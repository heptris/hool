import { useDispatch } from "react-redux";

import { setIsCreatingGame } from "store";

import Modal from "components/commons/Modal";
import MeetingGameModalBody from "./MeetingGameModalBody";
import MeetingGameModalHeader from "./MeetingGameModalHeader";

const MeetingGameModal = ({ setGameInfo }: { setGameInfo: Function }) => {
  const dispatch = useDispatch();

  const closeCreatingModal = () => {
    dispatch(setIsCreatingGame(false));
  };

  return (
    <Modal
      header={<MeetingGameModalHeader />}
      body={
        <MeetingGameModalBody
          onDisplayChange={closeCreatingModal}
          setGameInfo={setGameInfo}
        />
      }
      onDisplayChange={closeCreatingModal}
    />
  );
};

export default MeetingGameModal;
