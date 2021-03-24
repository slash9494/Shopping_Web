import React, { forwardRef, useRef, useEffect } from "react";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { authCheckActionAsync } from "../modules";
import { END } from "redux-saga";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import ReactPlayer from "react-player";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const AppContainer = styled.div`
  width: 100vw;
`;

const TitleConTextContainer = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  justify-content: center;
  background: url("https://images.unsplash.com/photo-1546213290-e1b492ab3eee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80")
    no-repeat center;
  background-size: cover;
`;

const VideoContainer = styled.div`
  height: 600px;
  width: 50%;
`;
const ContextContainer = styled.div`
  height: 600px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0vh;
  left: 50%;
`;

const BlockContainer = styled.div`
  width: 100vw;
  display: flex;
  /* height: calc(100vh - 120px); */
  align-items: flex-start;
  flex-direction: column;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fade: {
      width: "100%",
    },
  })
);

function videoBook() {
  const classes = useStyles();
  useEffect(() => {
    const animationOptions = {
      scrollTrigger: {
        trigger: "#videoSection",
        start: "center center",
        end: () => "+=2400",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
      defaults: { ease: "none" },
    };
    const timeLine = gsap.timeline(animationOptions);
    timeLine.fromTo(
      "#video2",
      { xPercent: +200, x: 0 },
      { xPercent: +94, x: 0 }
    );
  }, []);
  return (
    <AppContainer>
      <Fade duration={2000}>
        <TitleConTextContainer>
          <Fade duration={2000} delay={800}>
            <Typography
              variant="h4"
              style={{
                paddingBottom: "10px",
                justifyContent: "center",
                display: "flex",
                paddingTop: "100px",
              }}
            >
              "지속 가능한 오프라인 매장을 설계하고 있습니다"
            </Typography>
          </Fade>
        </TitleConTextContainer>
      </Fade>
      <BlockContainer id="videoSection">
        <Fade className={classes.fade}>
          <ContextContainer>
            <Typography
              variant="h5"
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              "매장에서 다채로운 환경을 즐겨보세요"
            </Typography>
            <Typography
              variant="h6"
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              최고 수준의 환경 효율적인 매장을 운영할 수 있도록 노력하고
              있습니다.
            </Typography>
          </ContextContainer>
        </Fade>
        <VideoContainer id="video1">
          <ReactPlayer
            url="https://player.vimeo.com/video/383980330?title=0&portrait=0&byline=0&autoplay=1&loop=1"
            loop={true}
            playing={true}
            width="100%"
            height="600px"
          />
        </VideoContainer>
        <VideoContainer
          id="video2"
          style={{ position: "absolute", overflow: "hidden" }}
        >
          <ReactPlayer
            url="https://player.vimeo.com/video/142621176?title=0&portrait=0&byline=0&autoplay=1&loop=1"
            loop={true}
            playing={true}
            width="100%"
            height="600px"
          />
        </VideoContainer>
      </BlockContainer>
      {/* <BlockContainer>
        <ReactPlayer
          url="https://player.vimeo.com/video/328624858?title=0&portrait=0&byline=0&autoplay=1&loop=1"
          loop={true}
          playing={true}
          width="100%"
          height="600px"
        />
      </BlockContainer> */}
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
