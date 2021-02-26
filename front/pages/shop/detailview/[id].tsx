import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Popover from "@material-ui/core/Popover";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    descriptionTitle: {
      [theme.breakpoints.down("md")]: {
        fontSize: "1.1rem",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    description: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    imageViewContainer: {
      width: "100%",
      border: "transparent",
      boxShadow: "none",
      backgroundColor: "#f8f9fa",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      height: "100%",
    },
    descriptionContainer: {
      width: "30vw",
      border: "transparent",
      boxShadow: "none",
      backgroundColor: "#f8f9fa",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",

      [theme.breakpoints.down("md")]: {
        width: "14vw",
      },
    },
    divider: {
      backgroundColor: "black",
    },
    formControl: {
      margin: "5px 0px 16px 16px",
      minWidth: 120,
    },
  })
);

const AppContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  align-items: center;
  padding: 0 5vw;
  position: "absolute";
  @media screen and (max-width: 1280px) {
    padding: 0 2vw;
  }
  @media screen and (max-width: 769px) {
    flex-direction: column;
  }
`;

const ProductDetailContainer = styled.div`
  width: 30vw;
  padding: 0 3vw;
  @media screen and (max-width: 1280px) {
    width: 14vw;
    padding: 0;
  }
`;

const Button = styled.button`
  background: black;
  color: white;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 0px;
  font-size: 12px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 10px;
  height: 24px;
  width: 100%;
  &:hover {
    background: #495057;
  }
`;
const PopOverButton = styled.button`
  background: transparent;
  color: black;
  outline: none;
  border: none;
  border-radius: 0px;
  font-size: 12px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 10px;
  height: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 1025px) {
    display: none;
  }
`;

const ImageContainer = styled.div`
  width: 40vw;
  padding: 20px 40px 40px 40px;
  height: 86vh;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  @media screen and (max-width: 1280px) {
    width: 70vw;
  }
  @media screen and (max-width: 769px) {
    width: 96vw;
  }
`;

const DescriptionDetailContainer = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const PopOverDescriptionContainer = styled.div`
  width: 20vw;
`;

const images = [
  {
    original:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    original:
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    original:
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    original:
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    original:
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    original:
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
];

function DetailProduct() {
  const router = useRouter();
  const { id } = router.query;
  const classes = useStyles();
  const [size, setSize] = useState<string | number>("");
  const [open, setOpen] = useState(false);
  const [showThumbNail, setShowThumbNail] = useState(true);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSize(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const touchOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const touchClose = () => {
    setAnchorEl(null);
  };

  const PopOverOpen = Boolean(anchorEl);
  const popOverId = open ? "simple-popover" : undefined;
  const descriptionText = () => {
    return (
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
    );
  };
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      return setShowThumbNail(false);
    }
  }, []);
  return (
    <AppContainer>
      <Paper elevation={0} className={classes.descriptionContainer} key="2">
        <Typography
          className={classes.descriptionTitle}
          variant="h5"
          align="center"
        >
          CARE FOR FIBER: 50% 이상 재생 울 사용.
        </Typography>
        <PopOverButton onClick={touchOpen}>
          <HelpIcon fontSize="small" />
          자세히 알아보기
        </PopOverButton>
        <Popover
          id={popOverId}
          open={PopOverOpen}
          anchorEl={anchorEl}
          onClose={touchClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <PopOverDescriptionContainer>
            {descriptionText()}
          </PopOverDescriptionContainer>
        </Popover>
        <DescriptionDetailContainer>
          {descriptionText()}
        </DescriptionDetailContainer>
      </Paper>
      <ImageContainer>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={showThumbNail}
          thumbnailPosition="right"
        />
      </ImageContainer>
      <ProductDetailContainer>
        <CardContent>
          <Typography variant="h5"></Typography>
          <Typography variant="h6" className={classes.pos}>
            울 후드 코트
          </Typography>
          <Typography variant="body2">
            199,000 원
            <br />
            색상: 네이비
          </Typography>
        </CardContent>
        <Divider classes={{ root: classes.divider }} />

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">사이즈</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={size}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>사이즈 선택</em>
            </MenuItem>
            <MenuItem value={10}>S</MenuItem>
            <MenuItem value={20}>M</MenuItem>
            <MenuItem value={30}>L</MenuItem>
          </Select>
        </FormControl>

        <Divider classes={{ root: classes.divider }} />
        <Button type="submit">장바구니</Button>
      </ProductDetailContainer>
    </AppContainer>
  );
}

export default DetailProduct;
