import logo from './logo.svg';
import './App.css';
import LoginPage from "./components/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFound from "./components/Base/NotFound";
import AdminDashboard from "./components/Admin/AdminDashboard";
import GlobalStyle from "./components/GlobalStyle";
import BaseLayout from "./components/Base/BaseLayout";
import AdminRouter from "./components/Admin/AdminRouter";
import AuthGuard from "./services/AuthGuard";
import BaseRouter from "./components/Base/BaseRouter";

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

            </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;