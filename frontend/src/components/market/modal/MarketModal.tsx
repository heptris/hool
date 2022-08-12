import Modal from "components/commons/Modal";
import MarketModalHeader from "./MarketModalHeader";
import MarketModalBody from "./MarketModalBody";

const MarketModal = ({ onDisplayChange }: { onDisplayChange: Function }) => {
  return (
    <Modal
      header={<MarketModalHeader />}
      body={<MarketModalBody />}
      onDisplayChange={onDisplayChange}
    />
  );
};

export default MarketModal;
