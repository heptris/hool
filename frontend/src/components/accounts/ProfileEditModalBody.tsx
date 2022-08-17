import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";

import { apiInstance, putRequest } from "api";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import LabelInput from "components/commons/LabelInput";

import { HOOL_API_ENDPOINT, QUERY_KEYS } from "constant";

import { UserInfoType } from "types/UserInfoType";

const ALLOW_FILE_EXTENSION = ".png,.jpg,.jpeg,.gif";
// const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
  const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};

const ProfileEditModalBody = ({
  onDisplayChange,
}: {
  onDisplayChange: Function;
}) => {
  const userInfo = useQueryClient().getQueryData<UserInfoType>([
    QUERY_KEYS.USER,
  ]);
  const profileUrl = userInfo!.memberProfile;
  const profileFileObject = convertURLtoFile(profileUrl); //서버 실행시 성공하는지 확인
  console.log(profileFileObject);
  const nickname = userInfo?.nickName;

  const [files, setFiles] = useState<FileList>(); //profileFileObject
  const imgInputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const previewRef: React.RefObject<HTMLDivElement> = useRef(null);
  const [nickName, setNickname] = useState(nickname);

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

    const formData = new FormData();
    formData.append("file", files[0]);
    const data = {
      nickName,
    };
    formData.append(
      "memberUpdateDto",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    putRequest("member/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        alert("프로필 편집이 성공했습니다.");
      })
      .catch((err) => console.error(err));
  };

  return (
    <ProfileForm onSubmit={onSubmit} encType="multipart/form-data">
      <Wrapper>
        <ImgBox>
          <ImgLabel htmlFor="image-upload">
            {!files && <Icon className="fa-solid fa-plus"></Icon>}
            {!files && <PrifileImg src={profileUrl} />}
          </ImgLabel>
          <ImgInput
            id="image-upload"
            type="file"
            accept={ALLOW_FILE_EXTENSION}
            ref={imgInputRef}
            required={true}
            onChange={onLoadFile}
          />
          <Preview ref={previewRef}></Preview>
          <InfoBox>
            <InfoText>*5MB 이내의 png, jpg, gif 파일만 가능합니다.</InfoText>
          </InfoBox>
        </ImgBox>
      </Wrapper>

      <Wrapper>
        <LabelInput
          type="text"
          widthSize="17rem"
          inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
          inputValue={nickName}
          placeholderText={""}
          text={"닉네임"}
        />
      </Wrapper>
      <ButtonWrapper>
        {/* <Button
          height={2.5}
          width={5}
          text={"취소"}
          marginTop={0.5}
          marginBottom={2}
          color={darkTheme.adaptiveGrey500}
          marginRight={1}
          buttonOnClick={onDisplayChange}
        /> */}

        <SubmitBtn width={6} height={3} text={"수정하기"} />
      </ButtonWrapper>
    </ProfileForm>
  );
};

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 1rem;
`;
const ImgBox = styled.div`
  width: 17rem;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ImgLabel = styled.label`
  width: 13rem;
  height: 13rem;
  background-color: ${darkTheme.adaptiveGrey500};
  border-radius: 13rem;
  z-index: 100;
  opacity: 20%;
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${darkTheme.adaptiveGrey700};
  }
`;
const PrifileImg = styled.img`
  position: absolute;
  width: 13rem;
  height: 13rem;
  border-radius: 13rem;
`;
const ImgInput = styled.input`
  display: none;
`;
const Preview = styled.div`
  width: 13rem;
  height: 13rem;
  border-radius: 13rem;
  position: absolute;
  top: 0;
`;
const InfoBox = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;
const InfoText = styled.span`
  font-size: 0.75rem;
  align-self: start;
  color: ${darkTheme.adaptiveGrey200};
  margin-top: 0.3rem;
`;
const SubmitBtn = styled(Button)`
  margin: 2rem 0 2rem 0;
  background-color: ${darkTheme.mainBadgeColor};

  &:hover {
    background-color: ${darkTheme.darkBadgeColor};
  }
`;
const Icon = styled.i`
  position: absolute;
  color: ${darkTheme.white};
  font-size: 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
`;
const ButtonWrapper = styled.div`
  float: right;
`;

export default ProfileEditModalBody;