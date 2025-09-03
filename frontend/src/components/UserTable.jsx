import React from 'react';

const UserTable = ({ users }) => {
  // users prop이 유효한 배열이 아닐 경우, 렌더링하지 않고 에러를 방지합니다.
  if (!Array.isArray(users)) {
    return null; 
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">아이디</th>
            <th className="py-3 px-6 text-center">가입일</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map(user => (
            <tr key={user.loginId} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{user.loginId}</td>
              <td className="py-3 px-6 text-center">{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
