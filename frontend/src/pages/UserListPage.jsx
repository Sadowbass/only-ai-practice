import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import Pagination from '../components/Pagination';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = async (page) => {
        try {
            const response = await axios.get(`/api/users?page=${page}`);
            // API 응답 구조에 맞게 데이터 접근 경로 수정
            const pageData = response.data.data;
            setUsers(pageData.content || []); // 항상 배열을 보장
            setTotalPages(pageData.totalPages || 0);
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]); // 에러 발생 시 빈 배열로 초기화
        }
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-6">회원 목록</h1>
            <UserTable users={users} />
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPrevPage={handlePrevPage} 
                onNextPage={handleNextPage} 
            />
        </div>
    );
};

export default UserListPage;
