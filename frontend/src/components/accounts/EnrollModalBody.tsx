import React, { useEffect, useRef, useState } from "react";
import { apiInstance } from "api";
import { HOOL_API_ENDPOINT } from "constant";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";

const ALLOW_FILE_EXTENSION = ".png,.jpg,.jpeg,.gif";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

function EnrollModalBody() {
  const [files, setFiles] = useState<FileList>();
  const imgInputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const previewRef: React.RefObject<HTMLDivElement> = useRef(null);

  const onLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tmpFiles = e.target.files;
    if (tmpFiles === null) return;

    console.log(tmpFiles);
    setFiles(tmpFiles);
  };
  useEffect(() => {
    renderPreview();
  }, [files]);
  const renderPreview = () => {
    if (!files) return;

    const previewEl = previewRef.current;
    const reader = new FileReader();

    reader.onload = () =>
      previewEl?.setAttribute(
        "style",
        `background-image: url(${reader.result});
        background-size: cover;`
      );
    reader.readAsDataURL(files[0]);
  };
  const onSubmit = (e: React.FormEvent) => {
    if (!files) return;
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", files[0]);
    const data = {
      name: "test22",
      description: "test22",
      emojiAnimate: "animate__hinge",
    };
    formData.append(
      "emojiCreateDto",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    const api = apiInstance();
    api
      .post(HOOL_API_ENDPOINT + "emoji/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <EmojiForm onSubmit={onSubmit} encType="multipart/form-data">
      <ImgBox>
        <ImgLabel htmlFor="image-upload" />
        <ImgInput
          id="image-upload"
          type="file"
          accept={ALLOW_FILE_EXTENSION}
          ref={imgInputRef}
          required={true}
          onChange={onLoadFile}
        />
        <Preview ref={previewRef}></Preview>
        <InfoText>*5MB 이내의 png, jpg, gif 파일만 가능합니다.</InfoText>
      </ImgBox>
      <SubmitBtn width={12.5} height={3} text={"제출"} />
    </EmojiForm>
  );
}

const EmojiForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0rem;
`;
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImgLabel = styled.label`
  width: 12.5rem;
  height: 12.5rem;
  background-color: ${darkTheme.adaptiveGrey500};
  border-radius: 4px;
  z-index: 100;
  opacity: 20%;

  &:hover {
    cursor: pointer;
    background-color: ${darkTheme.adaptiveGrey700};
  }
`;
const ImgInput = styled.input`
  display: none;
`;
const Preview = styled.div`
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 4px;
  position: absolute;
`;
const InfoText = styled.span`
  font-size: 0.75rem;
  align-self: start;
  color: ${darkTheme.adaptiveGrey200};
  margin-top: 0.3rem;
`;
const SubmitBtn = styled(Button)`
  margin-top: 2rem;
  background-color: ${darkTheme.darkColor};

  &:hover {
    background-color: ${darkTheme.emphasisColor};
  }
`;

export default EnrollModalBody;
