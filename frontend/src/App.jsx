import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import UserListPage from './pages/UserListPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import MyPage from './pages/MyPage';
import PasswordPage from './pages/PasswordPage';
import CharacterPage from './pages/CharacterPage';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Routes */}
        <Route 
          path="/users" 
          element={
            <ProtectedRoute adminOnly={true}>
              <UserListPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/mypage" 
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="characters" replace />} />
          <Route path="password" element={<PasswordPage />} />
          <Route path="characters" element={<CharacterPage />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
