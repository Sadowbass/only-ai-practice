import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import axios from 'axios';
import SignupPage from './SignupPage';

// axios를 모킹(mocking)하여 실제 네트워크 요청을 보내지 않도록 합니다.
vi.mock('axios');

// useNavigate 훅을 모킹합니다.
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('SignupPage', () => {
    test('회원가입 성공 시 홈으로 이동', async () => {
        // given: 테스트를 위한 준비 단계
        // axios.get과 post가 호출되면, 성공 응답을 반환하도록 설정합니다.
        axios.get.mockResolvedValue({ data: false }); // 이메일 중복 아님
        axios.post.mockResolvedValue({ status: 201 }); // 회원가입 성공

        // SignupPage 컴포넌트를 렌더링합니다.
        render(
            <BrowserRouter>
                <SignupPage />
            </BrowserRouter>
        );

        // when: 사용자의 행동을 시뮬레이션하는 단계
        // 각 입력 필드에 값을 입력합니다.
        fireEvent.change(screen.getByLabelText(/이메일/), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/이름/), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText(/비밀번호 \(8자 이상\)/), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/비밀번호 확인/), { target: { value: 'password123' } });

        // '중복 확인' 버튼을 클릭합니다.
        fireEvent.click(screen.getByRole('button', { name: /중복 확인/ }));

        // '사용 가능한 이메일입니다.' 메시지가 나타날 때까지 기다립니다.
        await screen.findByText('사용 가능한 이메일입니다.');

        // '가입하기' 버튼을 클릭합니다.
        fireEvent.click(screen.getByRole('button', { name: /가입하기/ }));

        // then: 테스트 결과를 검증하는 단계
        // axios.post가 올바른 데이터와 함께 호출되었는지 확인합니다.
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('/api/users', {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
            });
        });

        // navigate 함수가 홈('/') 경로로 호출되었는지 확인합니다.
        expect(mockedNavigate).toHaveBeenCalledWith('/');
    });

    test('비밀번호 불일치 시 에러 메시지 표시', async () => {
        // given: 테스트를 위한 준비 단계
        render(
            <BrowserRouter>
                <SignupPage />
            </BrowserRouter>
        );

        // when: 사용자의 행동을 시뮬레이션하는 단계
        // 비밀번호와 비밀번호 확인 필드에 서로 다른 값을 입력합니다.
        fireEvent.change(screen.getByLabelText(/비밀번호 \(8자 이상\)/), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/비밀번호 확인/), { target: { value: 'password456' } });

        // '가입하기' 버튼을 클릭합니다.
        fireEvent.click(screen.getByRole('button', { name: /가입하기/ }));

        // then: 테스트 결과를 검증하는 단계
        // '비밀번호가 일치하지 않습니다.' 라는 에러 메시지가 화면에 표시되는지 확인합니다.
        const errorMessage = await screen.findByText('비밀번호가 일치하지 않습니다.');
        expect(errorMessage).toBeInTheDocument();
    });
});
