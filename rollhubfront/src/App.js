import './App.css';
import LoginPage from "./components/Auth/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import AdminRouter from "./components/Admin/AdminRouter";
import AuthGuard from "./services/AuthGuard";
import BaseRouter from "./components/Base/BaseRouter";
import Register from "./components/Auth/Register";
import {RegisterForm} from "./components/Forms/RegisterForm";

function App() {
  return (
    <div className="App">
        <GlobalStyle/>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={
                    <AuthGuard>
                        <BaseRouter/>
                    </AuthGuard>
                }/>
                <Route path="/admin/*" element={
                    <AuthGuard>
                        <AdminRouter/>
                    </AuthGuard>
                }/>
                <Route path={"/login"} element={ <LoginPage/>}/>
                <Route path={"/register"} element={ <Register/>}/>
                <Route path={"/register2"} element={ <RegisterForm/>}/>

            </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;