import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import axios from "axios";

const DropzoneContainer = styled.div`
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function FileUpload() {
  const onDrop = (files: File[]) => {
    let formData = new FormData();
    const config = {
      data: { header: { "content-type": "multipart/form-data" } },
    };
    formData.append("file", files[0]);
    console.log(files);
    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        console.log(response);
        alert("파일을 업로드하는데 실패했습니다.");
      }
    });
  };

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <DropzoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              <AddCircleRoundedIcon fontSize="large" />
            </DropzoneContainer>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;
