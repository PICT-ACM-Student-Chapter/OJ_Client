import "./App.less";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbars/Navbar";
import QuestionPage from "./pages/QuestionPage";
function App() {
	return (
		<div className="App" style={{ backgroundColor: "black" }}>
			<Navbar></Navbar>
			{/* <Login></Login> */}
			<QuestionPage></QuestionPage>
		</div>
	);
}

export default App;
