import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavPanel from "./NavPanel";
import HomePage from "./HomePage";
import VendorsPage from "../vendors/VendorsPage";
import VendorCreatePage from "../vendors/VendorCreatePage";

function App() {
  return (
    <BrowserRouter>
      <>
        <div>
          <Header />
          <main className="d-flex">
            <NavPanel />
            <section className="content container-fluid mx-5 my-2 py-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="vendors" element={<VendorsPage />} />
                <Route path="vendors/create" element={<VendorCreatePage />} />
              </Routes>
            </section>
          </main>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
