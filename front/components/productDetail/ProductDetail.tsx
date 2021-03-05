import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "react-image-gallery/styles/css/image-gallery.css";
import Popover from "@material-ui/core/Popover";
import HelpIcon from "@material-ui/icons/Help";
import Description from "./Description";
import { useDispatch } from "react-redux";
import { addToCartActionAsync } from "../../modules";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: 12,
      [theme.breakpoints.down("md")]: {
        display: "flex",
        alignItems: "center",
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
const ProductDetailContainer = styled.div`
  width: 25vw;
  padding: 0 1.5vw;
  @media screen and (max-width: 1280px) {
    /* width: 14vw; */
    padding: 0;
  }
  @media screen and (max-width: 1025px) {
    width: 75vw;
    padding: 18px;
  }
  @media screen and (max-width: 600px) {
    width: 75vw;
    padding: 0;
    z-index: 5;
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
  font-size: 9px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  @media screen and (min-width: 1025px) {
    display: none;
  }
`;

function ProductDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [size, setSize] = useState<string | number>("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const PopOverOpen = Boolean(anchorEl);
  const popOverId = open ? "simple-popover" : undefined;
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSize(event.target.value as number);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const touchOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const touchClose = () => {
    setAnchorEl(null);
  };
  const handleAddToCart = () => {
    const productId = "testProductId000";
    if (size === "") {
      Swal.fire("사이즈를 선택해주세요", "", "info");
      return;
    } else {
      dispatch(addToCartActionAsync.request(productId));
    }
  };
  return (
    <ProductDetailContainer>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          울 후드 코트 &nbsp;
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
            <Description />
          </Popover>
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
      <Button type="submit" onClick={handleAddToCart}>
        장바구니
      </Button>
    </ProductDetailContainer>
  );
}

export default ProductDetail;
