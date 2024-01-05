import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader/AppHeader";
import Alphabets from "./pages/Alphabets/Alphabets";
import Digits from "./pages/Digits/Digits";
import './App.css'
import Words from "./pages/Words/Words";
import Practice from "./pages/Practice/Practice";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <AppHeader />
        <div style={{marginTop:'55px', display: "flex", flexDirection: "row", width: "100%",background:'#f6f6f6' }}>
          <Routes>
            <Route path="/" element={<Alphabets />} />
            <Route path="/alphabets" element={<Alphabets />} />
            <Route path="/digits" element={<Digits />} />
            <Route path="/words" element={<Words />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
