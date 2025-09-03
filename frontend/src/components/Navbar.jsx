import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-gray-700">Mcp Test</Link>
          <div className="flex items-center">
            <Link to="/" className="px-4 text-gray-700 hover:text-blue-500">홈</Link>
            {user ? (
              <>
                {user.role === 'ROLE_ADMIN' && (
                  <Link to="/users" className="px-4 text-gray-700 hover:text-blue-500">회원 목록</Link>
                )}
                <Link to="/mypage" className="px-4 text-gray-700 hover:text-blue-500">마이페이지</Link>
                <span className="px-4 text-gray-700">{user.loginId}님 환영합니다.</span>
                <button onClick={handleLogout} className="px-4 text-gray-700 hover:text-blue-500">로그아웃</button>
              </>
            ) : (
              <>
                <Link to="/signup" className="px-4 text-gray-700 hover:text-blue-500">회원가입</Link>
                <Link to="/login" className="px-4 text-gray-700 hover:text-blue-500">로그인</Link>
                <Link to="/admin/login" className="px-4 text-gray-700 hover:text-blue-500">관리자 로그인</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
