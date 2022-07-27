import { useState } from "react";

import Auth from "./components/Auth";

function App() {
  const [count, setCount] = useState(0);

  return <Auth />;
}
export default App;
