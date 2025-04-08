import { useState } from "react";
import VoiceTranslation from "./components/VoiceTranslation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <VoiceTranslation />
    </>
  );
}

export default App;
