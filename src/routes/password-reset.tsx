import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

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
const Form = styled.form`
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
const Error = styled.span`
  font-weight: 600;
  color: tomato;
  margin-top: 10px;
`;

export default function PasswordReset() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
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
    if (isLoading || email === "") return;
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email).then(() => {
        alert(
          "Password Reset Email was sent.\nCheck your email and click the link for changing the password."
        );
        navigate("/login");
      });
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
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
