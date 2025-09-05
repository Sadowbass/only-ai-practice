import React from 'react';
import { NavLink } from 'react-router-dom';

const MyPageSidebar = () => {
    const activeLinkClass = "bg-indigo-100 text-indigo-700";
    const inactiveLinkClass = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

    return (
        <aside className="w-full md:w-64 flex-shrink-0" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-white rounded-lg shadow-md">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/mypage/password"
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg ${isActive ? activeLinkClass : inactiveLinkClass}`
                            }
                        >
                            <span className="ml-3">비밀번호 변경</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/mypage/characters"
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg ${isActive ? activeLinkClass : inactiveLinkClass}`
                            }
                        >
                            <span className="ml-3">캐릭터 관리</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default MyPageSidebar;
