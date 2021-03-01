import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSelector, useDispatch } from "react-redux";
import FileUploadForm from "../components/FileUploadForm";
import { RootState } from "../modules/reducers";
import userReducer, {
  UPLOAD_MAN_PRODUCT_REQUEST,
  uploadDummyManProductActionAsync,
} from "../modules";
import { createSelector } from "reselect";
import { useRouter } from "next/router";
export type Images = any[];

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    minWidth: 120,
    marginRight: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
  },
}));

function UploadForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const checkUploadProductInfo = createSelector(
    (state: RootState) => state.productReducer,
    (productReducer) => productReducer.uploadProductInfo
  );
  const uploadProductInfo = useSelector(checkUploadProductInfo);
  console.log(uploadProductInfo);
  const checkAuthInfo = createSelector(
    (state: RootState) => [state.userReducer],
    (userReducer) => userReducer.authCheckInfo
  );
  const authCheckInfo = useSelector(checkAuthInfo);
  const [inputs, setInputs] = useState({
    title: null,
    description: null,
    price: null,
  });
  const [images, setImages] = useState<Images>([]);
  const [category, setCategory] = useState(0);
  const [section, setSection] = useState("");
  const { title, description, price } = inputs;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  console.log(images);
  const updateImages = (propedImages: Images) => {
    setImages(propedImages);
  };
  const categoryChange = (event: ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as number);
  };
  const sectionChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSection(event.target.value as string);
  };
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !inputs.description ||
      !inputs.price ||
      !inputs.title ||
      !images.length ||
      !category ||
      !section
    ) {
      return alert("빈칸을 전부 채워야 합니다.");
    }

    const body = {
      writer: "test000",
      title: title,
      description: description,
      price: price,
      images: images,
      category: category,
    };
    if (section === "man") {
      dispatch(uploadDummyManProductActionAsync.request(body));
    }
    if (section === "woman") {
      dispatch(uploadDummyManProductActionAsync.request(body));
    }
    if (section === "kid") {
      dispatch(uploadDummyManProductActionAsync.request(body));
    }
  };
  useEffect(() => {
    if (uploadProductInfo?.data?.uploadProductSuccess === true) {
      alert("상품업로드를 완료했습니다.");
      router.push("/shop/manPage");
    }
  }, [uploadProductInfo?.data?.uploadProductSuccess]);
  return (
    <Container className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Upload Product
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FileUploadForm refreshImages={updateImages} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="text"
                value={title}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description"
                label="description"
                id="description"
                autoComplete="text"
                value={description}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="price"
                label="price"
                id="price"
                autoComplete="transaction-amount"
                value={price}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} justify="flex-start">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={category}
                  onChange={categoryChange}
                  label="category"
                >
                  <MenuItem value={0}></MenuItem>
                  <MenuItem value={1}>Top</MenuItem>
                  <MenuItem value={2}>Bottom</MenuItem>
                  <MenuItem value={3}>Shoes</MenuItem>
                  <MenuItem value={4}>ACC</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  section
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={section}
                  onChange={sectionChange}
                  label="section"
                >
                  <MenuItem value={"man"}>MAN</MenuItem>
                  <MenuItem value={"woman"}>WOMAN</MenuItem>
                  <MenuItem value={"kid"}>KID</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            REGISTER
          </Button>
        </form>
      </div>
    </Container>
  );
}
export default UploadForm;
