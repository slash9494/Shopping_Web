const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { ManProduct, WomanProduct, KidProduct } = require("../models/Product");

router.post("/signUp", async (req, res) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).json({
        signUpSuccess: false,
        message: "이미 사용 중인 아이디입니다.",
      });
    }
    const user = new User(req.body);
    await user.save((err, userInfo) => {
      if (err) return res.status(500).json({ signUpSuccess: false, err });
      return res.status(200).json({
        signUpSuccess: true,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("user_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ logOutSuccess: false, err });
    return res.status(200).send({
      logOutSuccess: true,
    });
  });
});

router.post("/addToCart", auth, (req, res) => {
  const productInfo = req.body;
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;

    userInfo.cart.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.query.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ addToCartSuccess: false, err });
          res.status(200).json({ addToCartSuccess: true, cart: userInfo.cart });
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              quantity: 1,
              id: req.query.productId,
              productInfo,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ addToCartSuccess: false, err });
          res.status(200).json({ addToCartSuccess: true, cart: userInfo.cart });
        }
      );
    }
  });
});

router.post("/removeFromCart", auth, (req, res) => {
  const size = req.size;
  User.findOneAndUpdate(
    { _id: req.user._id, "cart.id": req.query.productId, "cart.size": size },
    {
      $pull: { cart: { id: req.query.productId } },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.json({ removeCartSuccess: false, err });
      res.status(200).json({ removeCartSuccess: true, cart: userInfo.cart });
    }
  );
});

module.exports = router;
