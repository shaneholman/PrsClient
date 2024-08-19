import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavPanel from "./NavPanel";
import HomePage from "./HomePage";
import VendorsPage from "../vendors/VendorsPage";
import VendorCreatePage from "../vendors/VendorCreatePage";
import VendorEditPage from "../vendors/VendorEditPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <>
        <div>
          <Header />
          <main className="d-flex">
            <Toaster
              toastOptions={{
                success: {
                  iconTheme: {
                    primary: "#0d6efd",
                    secondary: "white",
                  },
                },
                style: {
                  maxWidth: 500,
                },
              }}
            />
            <NavPanel />
            <section className="content container-fluid mx-5 my-2 py-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="vendors" element={<VendorsPage />} />
                <Route path="vendors/create" element={<VendorCreatePage />} />
                <Route path="vendors/edit/:id" element={<VendorEditPage />} />
              </Routes>
            </section>
          </main>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
