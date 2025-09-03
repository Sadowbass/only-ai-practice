import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        loginId: '',
        password: '',
        passwordConfirm: ''
    });
    const [errors, setErrors] = useState({});
    const [idCheck, setIdCheck] = useState({ checked: false, available: false, message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'loginId') {
            setIdCheck({ checked: false, available: false, message: '' });
        }
    };

    const handleIdCheck = async () => {
        if (!formData.loginId) {
            setErrors({ ...errors, loginId: '아이디를 입력해주세요.' });
            return;
        }
        try {
            const response = await axios.get(`/api/users/login-ids/${formData.loginId}/exists`);
            setErrors({ ...errors, loginId: null }); // Clear previous error
            if (response.data.data) {
                setIdCheck({ checked: true, available: false, message: '이미 사용 중인 아이디입니다.' });
            } else {
                setIdCheck({ checked: true, available: true, message: '사용 가능한 아이디입니다.' });
            }
        } catch (error) {
            console.error("ID check error:", error);
            setIdCheck({ checked: true, available: false, message: '아이디 확인 중 오류가 발생했습니다.' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!idCheck.checked || !idCheck.available) {
            formErrors.loginId = '아이디 중복 확인을 해주세요.';
        }
        if (formData.password !== formData.passwordConfirm) {
            formErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            await axios.post('/api/users', {
                loginId: formData.loginId,
                password: formData.password
            });
            alert('회원가입에 성공했습니다!');
            navigate('/login');
        } catch (error) {
            console.error("Signup error:", error);
            const errorMessage = error.response?.data?.error?.message || '회원가입 중 오류가 발생했습니다.';
            setErrors({ form: errorMessage });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">회원가입</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} noValidate>
                    <InputField
                        id="loginId"
                        label="아이디"
                        type="text"
                        name="loginId"
                        value={formData.loginId}
                        onChange={handleChange}
                        error={errors.loginId}
                    >
                        <button type="button" onClick={handleIdCheck} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-nowrap">
                            중복 확인
                        </button>
                    </InputField>
                    {idCheck.message && <p className={`text-sm -mt-2 mb-4 ${idCheck.available ? 'text-green-500' : 'text-red-500'}`}>{idCheck.message}</p>}

                    <InputField
                        id="password"
                        label="비밀번호"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    <InputField
                        id="passwordConfirm"
                        label="비밀번호 확인"
                        type="password"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        error={errors.passwordConfirm}
                    />

                    <div className="flex items-center justify-between mt-6">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                            가입하기
                        </button>
                    </div>
                    {errors.form && <p className="text-red-500 text-sm text-center mt-4">{errors.form}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
