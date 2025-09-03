import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { adminLogin } = useAuth();
    const [formData, setFormData] = useState({ loginId: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await adminLogin(formData.loginId, formData.password);
            navigate('/users'); // Redirect to admin user list page
        } catch (err) {
            setError(err.response?.data?.error?.message || '관리자 로그인에 실패했습니다.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">관리자 로그인</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <InputField
                        id="loginId"
                        label="관리자 아이디"
                        type="text"
                        name="loginId"
                        value={formData.loginId}
                        onChange={handleChange}
                    />
                    <InputField
                        id="password"
                        label="비밀번호"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                    <div className="flex items-center justify-between mt-6">
                        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                            관리자 로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
