import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  tweet: string;
  photo?: string;
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 30px 0px 0px;
`;
const Form = styled.form``;
const TextArea = styled.textarea`
  width: 100%;
`;

const Button = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  margin-top: 50px;
  cursor: pointer;
`;

export default function EditTweet({ tweet, photo }: Props) {
  const [editTweet, setEditTweet] = useState(tweet);
  const onEditTweet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };

  const onSubmitTweet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTweet === "" || editTweet.length > 140) return;
    try {
      // update doc
    } catch (e) {
      // error
    }
  };
  return (
    <Wrapper>
      <Form>
        <TextArea
          required
          rows={5}
          maxLength={140}
          onChange={onEditTweet}
          value={editTweet}
        />
      </Form>
    </Wrapper>
  );
}
