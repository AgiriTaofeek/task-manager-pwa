import {
  BrowserRouter,
  // Route,
  //  Routes
} from "react-router-dom";
import Root from "./pages/Root";
// import Welcome from "./pages/Welcome";
// import Tasks from "./pages/Tasks";
// import Create from "./pages/Create-page";
// import InstallButton from "./components/InstallButton";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create" element={<Create />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes> */}
        <Root />
      </BrowserRouter>
      {/* <InstallButton /> */}
    </>
  );
}

export default App;
