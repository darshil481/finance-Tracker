import { useState } from "react";
import "./App.css";
import DashBoard from "./Components/DashBoard";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import Transaction from "./Components/Transaction";
interface Details {
  e: string;
  p: string;
}
interface UserContextType {
  details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
}
export const UserContext = createContext<UserContextType>({
  details: { e: "", p: "" },
  setDetails: () => {},
});
function App() {
  const [details, setDetails] = useState<Details>({ e: "", p: "" });
 
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ details, setDetails }}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashBoard></DashBoard>} />
            <Route
              path="/transactions"
              element={<Transaction details={details}></Transaction>}
            />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
