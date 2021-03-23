import React from "react";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { authCheckActionAsync } from "../modules";
import { END } from "redux-saga";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import ReactPlayer from "react-player";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
const AppContainer = styled.div`
  width: 100vw;
`;

const VideoContainer = styled.div`
  height: 600px;
  width: 50%;
`;
const ContextContainer = styled.div`
  height: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const BlockContainer = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - 120px);
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fade: {
      width: "50%",
    },
  })
);
function videoBook() {
  const classes = useStyles();
  return (
    <AppContainer>
      <BlockContainer>
        <VideoContainer>
          <ReactPlayer
            url="https://player.vimeo.com/video/383980330?title=0&portrait=0&byline=0&autoplay=1&loop=1"
            loop={true}
            playing={true}
            width="100%"
            height="600px"
          />
        </VideoContainer>
        <Fade className={classes.fade}>
          <ContextContainer>
            <Typography
              variant="h4"
              style={{
                paddingBottom: "10px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              " 지속 가능하고 효율적인 <br />
              오프라인 매장을 설계하고 있습니다 "
            </Typography>
            <Typography
              variant="h5"
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              매장에서 다채로운 환경을 즐겨보세요.
            </Typography>
          </ContextContainer>
        </Fade>
      </BlockContainer>
      <BlockContainer>
        <ReactPlayer
          url="https://player.vimeo.com/video/328624858?title=0&portrait=0&byline=0&autoplay=1&loop=1"
          loop={true}
          playing={true}
          width="100%"
          height="600px"
        />
      </BlockContainer>
    </AppContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(authCheckActionAsync.request());
    context.store.dispatch(END);
    await (context.store as IStore).sagaTask?.toPromise();
  }
);

export default videoBook;
