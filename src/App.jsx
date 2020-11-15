import "./App.less";
import Navbar from "./components/Navbars/Navbar";
import ContestLandingPage from "./pages/ContestLandingPage";

function App() {
	return (
		<div className="App" style={{ backgroundColor: "black" }}>
			<Navbar></Navbar>
			<ContestLandingPage />
		</div>
	);
}

export default App;
