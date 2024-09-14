import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home"
import Member from "./pages/Member";
import SideMenu from "./layouts/SideMenu";
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Frame item="仪表盘" Content={Home} />} />
        <Route path="/Membr" element={ <Frame item="人员" Content={Member} />} />
      </Routes>
    </BrowserRouter>
  )
}

interface FrameProps {
  item: string;
  Content: React.ComponentType;
}
const Frame: React.FC<FrameProps> = ({ item, Content }) => {
  return (
    <div className="flex justify-start items-start h-screen bg-gray-200">
      <div className="w-450 bg-gray-200 p-3">
        <SideMenu currentItem={item}></SideMenu>
      </div>
      <div className="flex-grow bg-white p-4 mt-3">
        <Content />
      </div>
    </div>
  )
}


export default App;
