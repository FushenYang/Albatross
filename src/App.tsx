import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";

const App = () => {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  )
}


export default App;
