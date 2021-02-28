import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "react-image-gallery/styles/css/image-gallery.css";
import styled from "styled-components";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    descriptionTitle: {
      [theme.breakpoints.down("md")]: {
        fontSize: "1.1rem",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1rem",
      },
    },
    description: {
      fontSize: 14,
    },
    descriptionContainer: {
      width: "25vw",
      border: "transparent",
      boxShadow: "none",
      backgroundColor: "#f8f9fa",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",

      [theme.breakpoints.down("md")]: {
        top: "94vh",
        width: "96vw",
      },
    },
  })
);

const DescriptionContainer = styled.div`
  width: 25vw;
  border: transparent;
  box-shadow: none;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 1025px) {
    top: 94vh;
    width: 96vw;
  }
`;

function Description() {
  const classes = useStyles();
  return (
    <DescriptionContainer>
      <Typography
        className={classes.descriptionTitle}
        variant="h5"
        align="center"
      >
        CARE FOR FIBER: 50% 이상 재생 울 사용.
      </Typography>
      <Typography
        className={classes.description}
        color="textSecondary"
        gutterBottom
        align="center"
      >
        이 섬유는 다른 울 제품에서 폐기된 울을 재활용하여 생산합니다. 이
        폐기물을 새로운 자원으로 전환하여 원자재 생산 및 물, 에너지 그리고
        천연자원 소모를 줄일 수 있습니다.
      </Typography>
    </DescriptionContainer>
  );
}

export default Description;
