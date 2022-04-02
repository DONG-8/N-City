import React, { useState } from "react";
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
  const [deletebtn, setDeletebtn] = useState(false);
  const [modifybtn, setModifybtn] = useState(false);
  // const
  // book.guestbookOwnerId

  return (
    <>
      {book.guestbookContents}
      {book.guestbookCreatedAt}
    </>
  );
};

export default Visitbook;
