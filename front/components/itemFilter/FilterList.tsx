import React, { useState } from "react";
import { List, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloseIcon from "@material-ui/icons/Close";
import { price } from "./priceData";
import StyledCheckBox from "./StyledCheckBox";
import StyledRadioBox from "./StyledRadioBox";
import RadioGroup from "@material-ui/core/RadioGroup";
const useStyles = makeStyles({
  itemContainer: {
    width: "100%",
    justifyContent: "space-between",
    margin: 0,
    flexDirection: "row-reverse",
  },
  button: {
    color: "black",
  },
});
const Container = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListContainer = styled.div``;

const ListItemsContainer = styled.div`
  padding: 30px;
`;

function FilterList(props: any) {
  const classes = useStyles();
  const [sizeChecked, setSizeChecked] = useState<number[]>([]);
  const [categoryChecked, setCategoryChecked] = useState<number[]>([]);
  const [priceChecked, setPriceChecked] = useState<string>("");
  const handleSizeChecked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const parsedValue = parseInt(e.target.value);
    const currentIndex = sizeChecked.indexOf(parsedValue);
    const newChecked = [...sizeChecked];
    if (currentIndex === -1) {
      newChecked.push(parsedValue);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSizeChecked(newChecked);
    props.handleSizeFilters(newChecked);
  };
  const handleCategoryChecked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const parsedValue = parseInt(e.target.value);
    const currentIndex = categoryChecked.indexOf(parsedValue);
    const newChecked = [...categoryChecked];
    if (currentIndex === -1) {
      newChecked.push(parsedValue);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCategoryChecked(newChecked);
    props.handleCategoryFilters(newChecked);
  };
  const handlePriceChecked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(e.target.value);
    props.handlePriceFilters(e.target.value);
  };

  return (
    <Container>
      <ButtonContainer>
        <IconButton onClick={props.onClose}>
          <CloseIcon className={classes.button} />
        </IconButton>
      </ButtonContainer>
      <ListContainer>
        <ListItemsContainer>
          <h2>사이즈</h2>
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleSizeChecked} />}
            label="S"
            value="1"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleSizeChecked} />}
            label="M"
            value="2"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleSizeChecked} />}
            label="L"
            value="3"
          />
        </ListItemsContainer>
        <ListItemsContainer>
          <h2>아이템</h2>
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleCategoryChecked} />}
            label="Top"
            value="1"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleCategoryChecked} />}
            label="Bottom"
            value="2"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleCategoryChecked} />}
            label="Shoes"
            value="3"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleCategoryChecked} />}
            label="Acc"
            value="4"
          />
        </ListItemsContainer>
        <ListItemsContainer>
          <h2>가격</h2>
          <RadioGroup>
            <FormControlLabel
              className={classes.itemContainer}
              control={<StyledRadioBox onClick={handlePriceChecked} />}
              label="~30,000"
              value={`${price[1].id}`}
            />
            <FormControlLabel
              className={classes.itemContainer}
              control={<StyledRadioBox onClick={handlePriceChecked} />}
              label="~50,000"
              value={`${price[2].id}`}
            />
            <FormControlLabel
              className={classes.itemContainer}
              control={<StyledRadioBox onClick={handlePriceChecked} />}
              label="~80,000"
              value={`${price[3].id}`}
            />
            <FormControlLabel
              className={classes.itemContainer}
              control={<StyledRadioBox onClick={handlePriceChecked} />}
              label="~100,000"
              value={`${price[4].id}`}
            />
          </RadioGroup>
        </ListItemsContainer>
      </ListContainer>
    </Container>
  );
}

export default FilterList;
