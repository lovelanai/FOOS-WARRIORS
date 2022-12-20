import React from "react";
import { Route, Routes } from "react-router-dom";
import { Playground } from "./views/Playground";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </div>
  );
}

export default App;
