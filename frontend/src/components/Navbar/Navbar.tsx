import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">메인</Link>
        </li>
        <li>
          <Link to="login">로그인</Link>
        </li>
        <li>
          <Link to="signup">회원가입</Link>
        </li>
        <li>
          <Link to="faq">FAQ</Link>
        </li>
        <li>
          <Link to="mypage">마이페이지</Link>
        </li>
      </ul>
    </div>
  );
}
