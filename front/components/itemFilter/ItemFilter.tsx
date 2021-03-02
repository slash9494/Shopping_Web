import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Drawer } from "@material-ui/core";
import FilterList from "./FilterList";

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
  const [sizeFilters, setSizeFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  useEffect(() => {
    props.sizeFilters(sizeFilters);
    props.categoryFilters(categoryFilters);
  }, [sizeFilters, categoryFilters]);
  return (
    <FilterContainer>
      <Button onClick={handleDrawerOpen}>Filters</Button>
      <Drawer
        open={open}
        onClose={handleDrawerOpen}
        anchor="right"
        variant="persistent"
      >
        <FilterList
          onClose={handleDrawerOpen}
          handleSizeFilters={setSizeFilters}
          handleCategoryFilters={setCategoryFilters}
        />
      </Drawer>
    </FilterContainer>
  );
}

export default ItemFilter;
