import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: "150%",
  },
  imageContainer: {
    width: "40vw",
    padding: 40,
    border: "transparent",
    boxShadow: "none",
    backgroundColor: "#f8f9fa",
  },
  textDetail: {
    width: "30vw",
    border: "transparent",
    boxShadow: "none",
    backgroundColor: "#f8f9fa",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  //   productDetail: {
  //     width: "30vw",
  //     border: "transparent",
  //     boxShadow: "none",
  //     backgroundColor: "#f8f9fa",
  //   },
  divider: {
    backgroundColor: "black",
  },
});

const AppContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  align-items: center;
  padding: 10px 5vw;
`;

const ProductDetailContainer = styled.div`
  width: 30vw;
`;

function DetailProduct() {
  const router = useRouter();
  const { id } = router.query;
  const classes = useStyles();

  return (
    <AppContainer>
      <Paper elevation={0} className={classes.textDetail}>
        <Typography variant="h5" align="center">
          CARE FOR FIBER: 50% 이상 재생 울 사용.
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          align="center"
        >
          이 섬유는 다른 울 제품에서 폐기된 울을 재활용하여 생산합니다. 이
          폐기물을 새로운 자원으로 전환하여 원자재 생산 및 물, 에너지 그리고
          천연자원 소모를 줄일 수 있습니다.
        </Typography>
      </Paper>
      <Card className={classes.imageContainer}>
        <CardMedia
          className={classes.media}
          image="https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        />
      </Card>
      <ProductDetailContainer>
        <CardContent>
          <Typography variant="h5" component="h2"></Typography>
          <Typography className={classes.pos} color="textSecondary">
            울 후드 코트
          </Typography>
          <Typography variant="body2" component="p">
            199,000 원
            <br />
            색상: 네이비
          </Typography>
        </CardContent>
        <Divider classes={{ root: classes.divider }} />
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
        <Divider classes={{ root: classes.divider }} />
      </ProductDetailContainer>
    </AppContainer>
  );
}

export default DetailProduct;
