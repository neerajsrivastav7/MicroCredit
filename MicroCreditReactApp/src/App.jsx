// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import CardDetail from "./Card/CardDetail";
import UserDetailBySubName from "./DetailUserComponent/UserDetailByName";
import BySubName from "./DetailBySubName/DetailBySubNameRoot";
import { AuthProvider } from "./OauthComponent/AuthContext"; // Adjust the import path as necessary
import ProtectedRoute from "./OauthComponent/ProtectedRoute"; // Adjust the import path as necessary
import TotalCollectionRoot from "./TotalCollection/TotalCollectionRoot";
import AddUserRoot from "./AddUser/AddUserRoot";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/microcredit/login" element={<LoginPage />} />
          <Route path="/microcredit/" element={<LoginPage />} />
          <Route path="/microcredit" element={<LoginPage />} />
          <Route
            path="/microcredit/userDetail"
            element={
              <ProtectedRoute>
                <CardDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/microcredit/userDetail/:name"
            element={
              <ProtectedRoute>
                <UserDetailBySubName />
              </ProtectedRoute>
            }
          />
          <Route
            path="/microcredit/userDetail/subName/:name/:subName"
            element={
              <ProtectedRoute>
                <BySubName />
              </ProtectedRoute>
            }
          />
          <Route
            path="/microcredit/userDetail/totalCollection"
            element={
              <ProtectedRoute>
                <TotalCollectionRoot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/microcredit/userDetail/addUser"
            element={
              <ProtectedRoute>
                <AddUserRoot />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
