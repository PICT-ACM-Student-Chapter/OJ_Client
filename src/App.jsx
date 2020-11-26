import React from 'react'
import './App.less';
import ContestDetail from './pages/ContestDetailPage/contestdetailpage.component'
import ContestInstructions from './pages/Instructions.component'
function App() {
  return (
    <div className="App" style={{backgroundColor:"black" }}>
      {/* <Navbar></Navbar>
      <Login></Login> */}
      <ContestDetail/>
      {/* <ContestInstructions/>       */}



    </div>
  );
}

export default App;
