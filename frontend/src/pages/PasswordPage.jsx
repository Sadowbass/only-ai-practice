import React from 'react';
import PasswordChangeForm from '../components/PasswordChangeForm';

const PasswordPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">비밀번호 변경</h1>
            <PasswordChangeForm />
        </div>
    );
};

export default PasswordPage;
