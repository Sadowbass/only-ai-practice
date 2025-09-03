import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';

const PasswordChangeForm = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!formData.currentPassword || !formData.newPassword) {
            setError('모든 필드를 입력해주세요.');
            return;
        }

        try {
            await axios.patch('/api/users/me/password', formData);
            setMessage('비밀번호가 성공적으로 변경되었습니다.');
            setFormData({ currentPassword: '', newPassword: '' }); // Clear form
        } catch (err) {
            setError(err.response?.data?.error?.message || '비밀번호 변경에 실패했습니다.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-6">비밀번호 변경</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    id="currentPassword"
                    label="현재 비밀번호"
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                />
                <InputField
                    id="newPassword"
                    label="새 비밀번호"
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                />
                {message && <p className="text-green-500 text-sm text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <div className="flex items-center justify-end mt-6">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        비밀번호 변경
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordChangeForm;
