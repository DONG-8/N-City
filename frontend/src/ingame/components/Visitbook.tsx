import React from "react";
import styled from "styled-components";

interface IguestInfo {
  book: {
    guestbookContents: string;
    guestbookCreatedAt: string;
    guestbookId: number;
    guestbookOwnerId: number;
    guestbookWriterId: number;
  };
}

const Visitbook: React.FC<IguestInfo> = ({ book }) => {
  console.log(book.guestbookContents);
  return (
    <>
      {book.guestbookContents}
      {book.guestbookCreatedAt}
    </>
  );
};

export default Visitbook;
