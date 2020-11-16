import "./App.less";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbars/Navbar";
import Register from "./components/Auth/Register";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <Navbar></Navbar>
      {/* <Login></Login> */}
      <Register></Register>
    </div>
  );
}

export default App;
