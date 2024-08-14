import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavPanel from "./NavPanel";
import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
      <>
        <div>
          <Header />
          <main className="d-flex">
            <NavPanel />
            <section className="content container-fluid mx-5 my-2 py-4">
              <section className="content container-fluid mx-5 my-2 py-4">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
              </section>
            </section>
          </main>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
