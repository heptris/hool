import Modal from "components/commons/Modal";
import MarketModalHeader from "./MarketModalHeader";
import React from "react";
import MarketModalBody from "./MarketModalBody";

const MarketModal = ({ onDisplayChange }: { onDisplayChange: Function }) => {
  return (
    <Modal
      header={<MarketModalHeader onDisplayChange={onDisplayChange} />}
      body={<MarketModalBody />}
      onDisplayChange={onDisplayChange}
    />
  );
};

export default MarketModal;
