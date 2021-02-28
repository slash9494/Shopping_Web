import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileUploadActionAsync } from "../../modules";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { RootState } from "../../modules/reducers";
import { Alert } from "@material-ui/lab";
type ImagesState = any[];

type FileUploadProps = {
  refreshImages: Function;
};

const BlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const DropzoneContainer = styled.div`
  width: 350px;
  height: 240px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DroppedImageContainer = styled.div`
  display: flex;
  width: 350px;
  height: 240px;
  overflow-x: scroll;
  @media (max-width: 768px) {
    width: 100%;
    border: 1px solid lightgray;
    scrollbar-width: 3px;
  }
`;

const DroppedImage = styled.img`
  min-width: 100%;
  height: 100%;
  cursor: pointer;
`;

function FileUploadForm(props: FileUploadProps) {
  const [Images, setImages] = useState<ImagesState>([]);
  const dispatch = useDispatch();
  const { fileUploadInfo } = useSelector(
    (state: RootState) => state.productReducer
  );
  const onDrop = (files: File[]) => {
    let formData = new FormData();
    const config = {
      data: { header: { "content-type": "multipart/form-data" } },
    };
    formData.append("file", files[0]);

    dispatch(fileUploadActionAsync.request({ formData, config }));
  };

  useEffect(() => {
    if (fileUploadInfo?.data?.fileUploadSuccess === true) {
      setImages([...Images, fileUploadInfo.data.filePath]);
      props.refreshImages([...Images, fileUploadInfo?.data?.filePath]);
    } else if (fileUploadInfo?.data?.fileUploadSuccess === false) {
      <Alert severity="error">파일을 업로드하는데 실패했습니다.</Alert>;
    } else return;
  }, [
    props.refreshImages,
    fileUploadInfo?.data?.filePath,
    fileUploadInfo?.data?.fileUploadSuccess,
  ]);
  const onDelete = (image: ImageData) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshImages(newImages);
  };
  console.log(Images);
  return (
    <BlockContainer>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <DropzoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              <AddPhotoAlternateIcon fontSize="large" />
            </DropzoneContainer>
          </section>
        )}
      </Dropzone>
      <DroppedImageContainer>
        {Images.map((image, index) => (
          <DroppedImage
            // src={`http://localhost:5000/${image}`}
            src="https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951"
            alt={`productImg-${index}`}
            key={index}
            onClick={() => {
              onDelete(image);
            }}
          />
        ))}
      </DroppedImageContainer>
    </BlockContainer>
  );
}

export default FileUploadForm;
