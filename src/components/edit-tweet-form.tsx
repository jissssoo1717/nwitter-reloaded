import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

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
const Form = styled.form``;
const TextArea = styled.textarea`
  width: 100%;
  font-size: 14px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const AttachFileButton = styled.label`
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;
const Input = styled.input``;

export default function EditTweet({ tweet, photo, id, setEdit }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);
  const [file, setFile] = useState<File | null>(null);

  const onEditTweet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };

  const onEditFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      if (files[0].size > 1000000) {
        confirm("Photo can be up to 1MB");
        return;
      }
      setFile(files[0]);
    }
  };

  const onSubmitTweet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || editTweet === "" || editTweet.length > 140)
      return;

    try {
      setLoading(true);
      await updateDoc(doc(db, "tweets", id), {
        tweet: editTweet,
      });

      if (file) {
        if (photo) {
          const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
          await deleteObject(photoRef);
        }

        const locationRef = ref(storage, `tweets/${user.uid}/${id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        updateDoc(doc(db, "tweets", id), {
          photo: url,
        });
      }

      setEditTweet("");
      setFile(null);
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
        <AttachFileButton htmlFor="editFile">
          {file ? "Photo added" : "Add Photo"}
        </AttachFileButton>

        <AttachFileInput
          onChange={onEditFile}
          type="file"
          id="editFile"
          accept="image/*"
        />
        <Input type="submit" value={isLoading ? "Posting..." : "Edit Tweet"} />
      </Form>
    </Wrapper>
  );
}
