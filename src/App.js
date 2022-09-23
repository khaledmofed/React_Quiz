import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListUser from "./Pages/ListUser";
import Header from "./Component/Header";
import AddUser from "./Pages/AddUser";
import EditUser from "./Pages/EditUser";

function App() {
  return (
    <>
      <div className="container mt-3">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<ListUser />} />
            <Route exact path="/add" element={<AddUser />} />
            <Route exact path="/edit/:id" element={<EditUser />} />
            {/* <Route path="/tutorials" element={<TutorialsList/>} />
          // <Route path="/add" element={<AddTutorial/>} />
          <Route path="/tutorials/:id" element={<Tutorial/>} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
