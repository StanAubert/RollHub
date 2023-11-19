import logo from './logo.svg';
import './App.css';
import LoginPage from "./components/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import Admin from "./components/Admin";
import GlobalStyle from "./components/GlobalStyle";

function App() {
  return (
    <div className="App">
        <GlobalStyle/>
        <BrowserRouter>
            <Routes>
                <Route index element={ <HomePage/>}/>

                <Route path={"/login"} element={ <LoginPage/>}/>
                <Route path={"/home"} element={ <HomePage/>}/>
                <Route path={"/admin"} element={ <Admin/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;