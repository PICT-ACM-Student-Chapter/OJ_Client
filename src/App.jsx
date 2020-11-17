import './App.less';
// import Login from './components/Auth/Login';
// import Navbar from './components/Navbars/Navbar';
import ContestDetail from './pages/ContestDetailPage/contestdetailpage.component';
function App() {
  return (
    <div className="App" style={{backgroundColor:"black" }}>
      {/* <Navbar></Navbar>
      <Login></Login> */}
      <ContestDetail/>
      

    </div>
  );
}

export default App;
