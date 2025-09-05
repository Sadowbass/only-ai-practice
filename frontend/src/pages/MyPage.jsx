import React from 'react';
import { Outlet } from 'react-router-dom';
import MyPageSidebar from '../components/MyPageSidebar';

const MyPage = () => {
    return (
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
            <MyPageSidebar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default MyPage;
