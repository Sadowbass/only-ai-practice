import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false); // 로그아웃 시 메뉴 닫기
        navigate('/');
    };

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* 로고 */}
                    <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-gray-800">와우 길드관리</Link>

                    {/* 햄버거 메뉴 버튼 (모바일용) */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* 데스크탑 메뉴 */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/" className="px-4 text-gray-700 hover:text-blue-500">홈</Link>
                        {user ? (
                            <>
                                {user.role === 'ROLE_ADMIN' && <Link to="/users" className="px-4 text-gray-700 hover:text-blue-500">회원 목록</Link>}
                                <Link to="/mypage" className="px-4 text-gray-700 hover:text-blue-500">마이페이지</Link>
                                <span className="px-4 text-gray-700">{user.loginId}님</span>
                                <button onClick={handleLogout} className="px-4 text-gray-700 hover:text-blue-500 font-bold">로그아웃</button>
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

            {/* 모바일 메뉴 (드롭다운) */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500">홈</Link>
                        {user ? (
                            <>
                                {user.role === 'ROLE_ADMIN' && <Link to="/users" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500">회원 목록</Link>}
                                <Link to="/mypage" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500">마이페이지</Link>
                                <div className="border-t border-gray-200 my-2"></div>
                                <span className="block px-3 py-2 text-base font-medium text-gray-500">{user.loginId}님 환영합니다.</span>
                                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-white hover:bg-red-500">로그아웃</button>
                            </>
                        ) : (
                            <>
                                <Link to="/signup" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500">회원가입</Link>
                                <Link to="/login" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500">로그인</Link>
                                <Link to="/admin/login" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500">관리자 로그인</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
