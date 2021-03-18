import React, { useState, useEffect } from "react";
import Logo from "../../images/LYH.svg";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules/reducers";
import LoggedOutNavBar from "./Sections/LoggedOutNavBar";
import LoggedInNavBar, { StyledBadge } from "./Sections/LoggedInNavBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import DrawerList from "./Sections/DrawerList";
import { createSelector } from "reselect";
import ShoppingBag from "../../images/Shopping-bag.svg";
import { useRouter } from "next/router";
import {
  HeaderContainer,
  LeftMenuContainer,
  OptionLink,
  LogoContainer,
  LogoLink,
  OptionsContainer,
  BagContainer,
} from "./HeaderContainer";
import ItemFilter from "./Sections/itemFilter/ItemFilter";
import { price } from "./Sections/itemFilter/priceData";
import {
  loadManProductsActionAsync,
  loadWomanProductsActionAsync,
  loadKidProductsActionAsync,
} from "../../modules";
import CartDrawer from "./Sections/CartDrawer";
export type Filters = {
  size: number[];
  category: number[];
  price: number[];
  [prop: string]: any;
};

const useStyles = makeStyles({
  toolBarContainer: {
    height: "1rem",
    width: "20vw",
    justifyContent: "flex-start",
    padding: 0,
    paddingLeft: "3vw",
  },
});

function Header() {
  const router = useRouter();
  const pathName = router.pathname;
  const classes = useStyles();
  const dispatch = useDispatch();
  const checkUserDataInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkUserDataInfo);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [badgeCount, setBadgeCount] = useState(0);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    if (userInfo.data?.cart?.length > 0) {
      setBadgeCount(userInfo.data?.cart?.length);
    }
  }, [userInfo.data?.cart]);
  const [filters, setFilters] = useState<Filters>({
    size: [],
    category: [],
    price: [],
  });

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(16);
  const handleFilters = (propedFilters: number[] | number, kind: string) => {
    const newFilters = { ...filters };
    newFilters[kind] = propedFilters;
    if (kind === "price") {
      let priceValues = handlePrice(propedFilters);
      newFilters[kind] = priceValues;
    }
    setFilters(newFilters);
    showFilteredResults(newFilters);
  };
  const handlePrice = (value: any) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key].id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  const showFilteredResults = (filters: Filters) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters: filters,
    };
    setSkip(0);
    if (pathName === "/shop/manPage") {
      dispatch(loadManProductsActionAsync.request(variables));
    } else if (pathName === "/shop/womanPage") {
      dispatch(loadWomanProductsActionAsync.request(variables));
    } else if (pathName === "/shop/kidPage") {
      dispatch(loadKidProductsActionAsync.request(variables));
    } else return;
  };
  const upDateSearchTerm = (newValue: string) => {
    const variables = {
      skip: 0,
      limit: "",
      filters: filters,
      searchTerm: newValue,
    };
    if (pathName === "/shop/manPage") {
      dispatch(loadManProductsActionAsync.request(variables));
    } else if (pathName === "/shop/womanPage") {
      dispatch(loadWomanProductsActionAsync.request(variables));
    } else if (pathName === "/shop/kidPage") {
      dispatch(loadKidProductsActionAsync.request(variables));
    } else return;
    setSkip(0);
  };
  const [open, setOpen] = useState(false);
  const showCartDrawer = () => {
    setOpen(true);
  };
  const closeCartDrawer = () => {
    setOpen(false);
  };
  return (
    <>
      <HeaderContainer>
        <Hidden mdUp>
          <Toolbar className={classes.toolBarContainer}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </Hidden>
        <Hidden smDown implementation="css">
          <LeftMenuContainer>
            <OptionLink href="/contact">CONTACT</OptionLink>
            <OptionLink href="/uploadProduct">VIDEO BOOK</OptionLink>
          </LeftMenuContainer>
        </Hidden>
        <LogoContainer>
          <LogoLink href="/">
            <Logo height={"100%"} width={"100%"} />
          </LogoLink>
        </LogoContainer>
        <Hidden smDown implementation="css">
          <OptionsContainer>
            {!userInfo?.data?.isAuth ? (
              <LoggedOutNavBar />
            ) : (
              <LoggedInNavBar
                badgeCount={badgeCount}
                showCartDrawer={showCartDrawer}
              />
            )}
          </OptionsContainer>
        </Hidden>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            <DrawerList userInfo={userInfo} />
          </Drawer>
        </Hidden>
        <Hidden mdUp implementation="css">
          <BagContainer>
            <OptionLink href="/uploadProduct">
              <StyledBadge
                badgeContent={badgeCount}
                color="default"
                showZero={true}
              >
                <ShoppingBag width={30} height={30} />
              </StyledBadge>
            </OptionLink>
          </BagContainer>
        </Hidden>
      </HeaderContainer>
      {pathName === "/shop/womanPage" ||
      pathName === "/shop/manPage" ||
      pathName === "/shop/kidPage" ? (
        <ItemFilter
          sizeFilters={(propedSizeFilters: number[]) =>
            handleFilters(propedSizeFilters, "size")
          }
          categoryFilters={(propedCategoryFilters: number[]) =>
            handleFilters(propedCategoryFilters, "category")
          }
          priceFilters={(propedPriceFilters: number) =>
            handleFilters(propedPriceFilters, "price")
          }
          searchValue={upDateSearchTerm}
        />
      ) : null}
      <CartDrawer
        open={open}
        closeCartDrawer={closeCartDrawer}
        userCartInfo={userInfo.data?.cart}
      />
    </>
  );
}

export default Header;
