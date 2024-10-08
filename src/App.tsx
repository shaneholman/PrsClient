import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavPanel from "./NavPanel";
import HomePage from "./HomePage";

import { Toaster } from "react-hot-toast";
import VendorsPage from "./vendors/VendorsPage";
import VendorCreatePage from "./vendors/VendorCreatePage";
import VendorEditPage from "./vendors/VendorEditPage";
import ProductsPage from "./products/ProductsPage";
import ProductCreatePage from "./products/ProductCreatePage";
import ProductEditPage from "./products/ProductEditPage";
import UserCreatePage from "./users/UserCreatePage";
import UserEditPage from "./users/UserEditPage";
import UsersPage from "./users/UsersPage";
import RequestsPage from "./requests/RequestsPage";
import RequestCreatePage from "./requests/RequestCreatePage";
import RequestEditPage from "./requests/RequestEditPage";
import RequestDetailPage from "./requests/RequestDetailPage";
import RequestLineCreate from "./requestlines/RequestLineCreate";
import RequestLinesEdit from "./requestlines/RequestLineEdit";
import { UserContext } from "./users/UserContext";
import { useState } from "react";
import { User } from "./users/user";
import SignInPage from "./account/SignInPage";

function getPersistedUser() {
  const userAsJSON = localStorage.getItem("user");
  if (!userAsJSON) return undefined;
  const user = JSON.parse(userAsJSON);
  return user;
}

function App() {
  const [user, setUser] = useState<User | undefined>(getPersistedUser());

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
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
                  <Route path="signin" element={<SignInPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="vendors" element={<VendorsPage />} />
                  <Route path="vendors/create" element={<VendorCreatePage />} />
                  <Route path="vendors/edit/:id" element={<VendorEditPage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="products/create" element={<ProductCreatePage />} />
                  <Route path="products/edit/:id" element={<ProductEditPage />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="users/create" element={<UserCreatePage />} />
                  <Route path="users/edit/:id" element={<UserEditPage />} />
                  <Route path="requests" element={<RequestsPage />} />
                  <Route path="requests/detail/:requestId" element={<RequestDetailPage />} />
                  <Route path="requests/create" element={<RequestCreatePage />} />
                  <Route path="requests/edit/:id" element={<RequestEditPage />} />
                  <Route path="requests/detail/:requestId/requestlines/create" element={<RequestLineCreate />} />
                  <Route
                    path="requests/detail/:requestId/requestlines/edit/:requestLineId"
                    element={<RequestLinesEdit />}
                  />
                </Routes>
              </section>
            </main>
          </div>
        </>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
