import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage"
import MemberPage from "./pages/MemberPage";
import SideMenu from "./layouts/SideMenu";
import "./App.css"
import UnitsPage from "./pages/UnitsPage";
import ImportData from "./pages/ImportData";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Frame item="检查" Content={Home} />} />
        <Route path="/Units" element={ <Frame item="部门" Content={UnitsPage} />} />
        <Route path="/Membr" element={ <Frame item="人员" Content={MemberPage} />} />
        <Route path="/Import" element={ <Frame item="导入" Content={ImportData} />} />
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
    <div className="flex">
      <div className="w-40 fixed h-screen">
        <SideMenu currentItem={item}></SideMenu>
      </div>
      <div className="flex-1 ml-40">
        <Content />
      </div>
    </div>
  )
}
export default App;
