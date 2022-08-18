import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { apiInstance, postRequest } from "api";
import { HOOL_API_ENDPOINT } from "constant";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import LabelInput from "components/commons/LabelInput";
import LabelTextarea from "components/commons/LabelTextarea";

import { QUERY_KEYS } from "constant";

const ALLOW_FILE_EXTENSION = ".png,.jpg,.jpeg,.gif";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;
const EMOJI_NAME_MAX_SIZE = 255;
const ANIMATE_TYPES = [
  "animate__none",
  "animate__rubberBand",
  "animate__wobble",
  "animate__heartBeat",
  "animate__backInUp",
  "animate__lightSpeedInLeft",
  "animate__hinge",
  "animate__flip",
  "animate__zoomIn",
  "animate__zoomInDown",
  "animate__slideOutUp",
];

function EnrollModalBody({ onDisplayChange }: { onDisplayChange: Function }) {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<FileList>();
  const [emojiName, setEmojiName] = useState("");
  const [emojiAnimate, setEmojiAnimate] = useState("");
  const [emojiDescription, setEmojiDescription] = useState("");
  const imgInputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const previewRef: React.RefObject<HTMLDivElement> = useRef(null);

  const nameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setEmojiName(e.target.value);
  };
  const animateOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setEmojiAnimate(e.target.value);
  };
  const descriptionOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setEmojiDescription(e.target.value);
  };

  const onLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tmpFiles = e.target.files;
    if (tmpFiles === null) return;

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
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        `
      );
    reader.readAsDataURL(files[0]);
  };

  const onSubmit = (e: React.FormEvent) => {
    if (!files) return;
    e.preventDefault();
    if (emojiName.trim() === "") return;
    if (emojiDescription.trim() === "") return;

    const formData = new FormData();
    formData.append("file", files[0]);
    const data = {
      name: emojiName.trim(),
      description: emojiDescription.trim(),
      emojiAnimate: emojiAnimate,
    };
    formData.append(
      "emojiCreateDto",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    postRequest("emoji/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        queryClient.invalidateQueries([QUERY_KEYS.MY_OWN_EMOJI_LIST]);
        onDisplayChange();
      })
      .catch((err) => console.error(err));
  };

  return (
    <EmojiForm onSubmit={onSubmit} encType="multipart/form-data">
      <Left>
        <ImgBox>
          <ImgLabel htmlFor="image-upload">
            {!files && <Icon className="fa-solid fa-plus"></Icon>}
          </ImgLabel>
          <ImgInput
            id="image-upload"
            type="file"
            accept={ALLOW_FILE_EXTENSION}
            ref={imgInputRef}
            required={true}
            onChange={onLoadFile}
          />
          <Preview
            ref={previewRef}
            className={`animate__animated ${emojiAnimate}`}
          ></Preview>
          <InfoText>*5MB 이내의 png, jpg, gif 파일만 가능합니다.</InfoText>
        </ImgBox>
        <SubmitBtn width={12.5} height={3} text={"제출"} />
      </Left>
      <Right>
        <LabelInput
          text={"이모지 이름"}
          info={`(${emojiName.length}/${EMOJI_NAME_MAX_SIZE})`}
          placeholderText={"이모지 이름"}
          inputValue={emojiName}
          inputOnChange={nameOnChange}
          isRequired={true}
        />
        <DropDownLabel htmlFor="animate">애니메이션</DropDownLabel>
        <DropDownInput
          id="animate"
          value={emojiAnimate}
          onChange={animateOnChange}
        >
          {ANIMATE_TYPES.map((type, i) => (
            <option value={type} key={i}>
              {_.capitalize(type.split("__")[1])}
            </option>
          ))}
        </DropDownInput>
        <LabelTextarea
          text="설명"
          placeholderText="설명을 적어주세요"
          height="9rem"
          width="100%"
          textareaValue={emojiDescription}
          textareaOnChange={descriptionOnChange}
          isRequired={true}
        />
      </Right>
    </EmojiForm>
  );
}

const EmojiForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4rem 1rem;
`;
const Left = styled.div``;
const Right = styled.div`
  margin-left: 2rem;
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
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${darkTheme.adaptiveGrey700};
  }
`;
const Icon = styled.i`
  position: absolute;
  color: ${darkTheme.white};
  font-size: 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
const DropDownLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  font-weight: normal;
  color: ${darkTheme.adaptiveGrey200};
`;
const DropDownInput = styled.select`
  background-color: ${darkTheme.adaptiveGrey500};
  color: ${darkTheme.adaptiveGrey200};
  border-radius: 4px;
  margin-bottom: 1rem;
  padding: 0 0 0 0.8rem;

  &:focus {
    outline: 2px solid ${darkTheme.mainBadgeColor};
  }
`;

export default EnrollModalBody;
