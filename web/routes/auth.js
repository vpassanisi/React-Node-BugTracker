const Router = require("koa-router");
const { customPassport } = require("../auth/customCallback");

const router = new Router();

const {
  register,
  login,
  getMe,
  logout,
  updateDetails,
  updatePassword
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);
router.get("/logout", customPassport, logout);
router.put("/updateDetails", customPassport, updateDetails);
router.put("/updatePassword", customPassport, updatePassword);

module.exports = router.routes();
