import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles({
  container: {
    height: 50,
  },
});

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 80px;
`;

function LandingPage(props: any) {
  const onClick = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 하는데 실패했습니다.");
      }
    });
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles(props);

  return (
    <LandingPageContainer>
      <div>메인</div>
      <button onClick={onClick}>로그아웃</button>
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Open Menu
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <SendIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </StyledMenuItem>
        </StyledMenu>
      </div>
    </LandingPageContainer>
  );
}

export default withRouter(LandingPage);
