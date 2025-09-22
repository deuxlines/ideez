import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Card from './components/Card'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
      {/* <div className="mt-16 flex flex-col space-y-8">
        <div className="flex flex-row space-x-8">
          <Card><div></div></Card>
          <Card><div></div></Card>
        </div>
        <div className="flex flex-row space-x-8">
          <Card><div></div></Card>
          <Card><div></div></Card>
        </div>
        <div className="flex flex-row space-x-8">
          <Card><div></div></Card>
          <Card><div></div></Card>
        </div>
      </div> */}
    </>
  )
}

export default App