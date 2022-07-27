import { useState } from "react";

import Modal from "components/commons/Modal";
import ProfileView from "pages/ProfileView";

function App() {
  return (
    <div>
      {/* <Modal header={<div>Header</div>} body={<div>Body</div>} /> */}
      <ProfileView />
    </div>
  );
}
export default App;
