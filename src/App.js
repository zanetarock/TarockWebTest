import "./styles.css";
import MyCard from "./components/MyCardScreen";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignIn from "./pages/Signin";
export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<MyCard/> }></Route>
          
          <Route path='/signin' element={<SignIn/> }>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
