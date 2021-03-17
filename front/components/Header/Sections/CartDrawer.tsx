import React, { useState } from "react";
import { Drawer } from "@material-ui/core";
import styled from "styled-components";

interface CartDrawerProps {
  open: boolean;
  closeCartDrawer: any;
}

const CartDrawerContainer = styled.div`
  width: 500px;
  height: 100%;
`;

function CartDrawer(props: CartDrawerProps) {
  return (
    <Drawer open={props.open} anchor="right" variant="persistent">
      <CartDrawerContainer onMouseLeave={props.closeCartDrawer}>
        dd
      </CartDrawerContainer>
    </Drawer>
  );
}

export default CartDrawer;
