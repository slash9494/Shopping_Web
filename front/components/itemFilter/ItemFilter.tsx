import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Drawer } from "@material-ui/core";
import FilterList from "./FilterList";
import SearchProduct from "./SearchProduct";

const FilterContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: flex-end;
  position: fixed;
  padding: 0 10vw;
  z-index: 6;
`;

function ItemFilter(props: any) {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
<<<<<<< HEAD
  const handleSizeFilters = (value: any) => {
    props.sizeFilters(value);
  };
  const handleCategoryFilters = (value: any) => {
    props.categoryFilters(value);
  };
  const handlePriceFilters = (value: any) => {
    props.priceFilters(value);
  };
  const searchValue = (value: any) => {
    props.searchValue(value);
  };

=======
  const [sizeFilters, setSizeFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  useEffect(() => {
    props.sizeFilters(sizeFilters);
    props.categoryFilters(categoryFilters);
  }, [sizeFilters, categoryFilters]);
>>>>>>> abfcd9156d59bd7c143f1857316786ed948ff28b
  return (
    <FilterContainer>
      <SearchProduct searchValue={searchValue} />
      <Button onClick={handleDrawerOpen}>Filters</Button>
      <Drawer
        open={open}
        onClose={handleDrawerOpen}
        anchor="right"
        variant="persistent"
      >
        <FilterList
          onClose={handleDrawerOpen}
<<<<<<< HEAD
          handleSizeFilters={handleSizeFilters}
          handleCategoryFilters={handleCategoryFilters}
          handlePriceFilters={handlePriceFilters}
=======
          handleSizeFilters={setSizeFilters}
          handleCategoryFilters={setCategoryFilters}
>>>>>>> abfcd9156d59bd7c143f1857316786ed948ff28b
        />
      </Drawer>
    </FilterContainer>
  );
}

export default ItemFilter;
