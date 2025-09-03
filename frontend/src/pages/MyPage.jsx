import React from 'react';
import { Outlet } from 'react-router-dom';
import MyPageSidebar from '../components/MyPageSidebar';

const MyPage = () => {
    return (
        <div className="flex space-x-8">
            <MyPageSidebar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default MyPage;
