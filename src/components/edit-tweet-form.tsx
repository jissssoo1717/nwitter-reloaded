import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";

type Props = {
  tweet: string;
  photo?: string;
  id: string;
  setEdit: (edit: boolean) => void;
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 30px 0px 0px;
`;
const Form = styled.form`
  width: 100%;
`;
const TextArea = styled.textarea`
  width: 100%;
  font-size: 14px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
const Input = styled.input``;

export default function EditTweet({ tweet, photo, id, setEdit }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);
  const onEditTweet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };

  const onSubmitTweet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTweet === "" || editTweet.length > 140) return;
    try {
      setLoading(true);
      await updateDoc(doc(db, "tweets", id), {
        tweet: editTweet,
      });
      setEdit(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={onSubmitTweet}>
        <TextArea
          required
          rows={5}
          maxLength={140}
          onChange={onEditTweet}
          value={editTweet}
        />
        <Input type="submit" value={isLoading ? "Posting..." : "Edit Tweet"} />
      </Form>
    </Wrapper>
  );
}
