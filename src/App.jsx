import "./App.less";
import Register from "./components/Auth/Register";

import "./App.less";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbars/Navbar";
import Contests from "./pages/Contests";
// import Footer from "./components/footer/Footer";
function App() {
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <Navbar></Navbar>
      <Login></Login>
      {/* <Register></Register> */}
      {/* <Contests></Contests> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
