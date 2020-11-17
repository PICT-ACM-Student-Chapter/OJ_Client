import './App.less';
<<<<<<< HEAD
// import Login from './components/Auth/Login';
// import Navbar from './components/Navbars/Navbar';
import ContestDetail from './pages/ContestDetailPage/contestdetailpage.component';
function App() {
  return (
    <div className="App" style={{backgroundColor:"black" }}>
      {/* <Navbar></Navbar>
      <Login></Login> */}
      <ContestDetail/>
      

=======
import Login from './components/Auth/Login';
import Navbar from './components/Navbars/Navbar';
import Contests from './pages/Contests';
function App() {
  return (
    <div className="App" style={{backgroundColor:"black"}}>
      <Navbar></Navbar>
      <Contests></Contests>
>>>>>>> 6b8c23a588f871673adb2e778599e4e9d8cc498e
    </div>
  );
}

export default App;
