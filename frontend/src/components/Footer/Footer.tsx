import React from "react";
import { FooterBlock, FooterWrapper } from "./Footer.style";
export default function Footer() {
  if (window.location.pathname.slice(0, 7) === "/ingame") return null;
  return (
    <FooterWrapper>
      <FooterBlock>
        <div>COPYRIGHT ©남현동 싹쓸어. All rights reserved.</div>
      </FooterBlock>
    </FooterWrapper>
  );
}
