// Define as rotas de cada página

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SearchUser } from "./pages/SearchUser";
import { UserInformation } from "./pages/UserInformation";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" Component={NotFound} />
        <Route path="/" Component={SearchUser} />
        <Route path="/users/:username" Component={UserInformation} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
