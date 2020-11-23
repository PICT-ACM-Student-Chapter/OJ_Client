import "./App.less";
import Register from "./components/Auth/Register";

import "./App.less";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbars/Navbar";
import Contests from "./pages/Contests";
function App() {
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <Navbar></Navbar>
      {/* <<<<<<< HEAD */}
      {/* <Login></Login> */}
      <Register></Register>
      {/* ======= */}
      {/* <Contests></Contests> */}
    </div>
  );
}

export default App;
