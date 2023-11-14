import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { Error } from "../components/auth-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: white;
  padding-top: 150px;
`;
const Title = styled.h1`
  font-size: 45px;
  color: black;
`;
const Form = styled.span`
  margin-top: 50px;
  height: 22%;
  padding: 10px;
  border: 1px solid #21130d;
  border-radius: 10px;
  background-color: white;
`;
const P = styled.p`
  color: black;
  padding: 30px 10px;
`;
const Input = styled.input`
  padding: 15px 10px;
  width: 100%;
  border-radius: 700px;
  border: 1px solid black;
  gap: 10px;
  &[type="submit"] {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px auto;
    width: 50%;
    color: white;
    background-color: #1d9bf0;
    border-radius: 50px;
    border: none;
    font-size: 25px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default function PasswordReset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email).then(() => {
        console.log("Password Reset Email sent");
        navigate("/login");
      });
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    }
  };
  return (
    <Wrapper>
      <Title>Reset your password</Title>
      <Form onSubmit={onSubmit}>
        <P>Enter your email address and we'll send you a password reset link</P>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="enter your email address"
        />
        <Input type="submit" value={"send"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
