const Router = require("koa-router");
const { customPassport } = require("../auth/customCallback");
const {
  createBug,
  updateBug,
  bugsByProject,
  deleteBug
} = require("../controllers/bugs");

const router = new Router();

router.post("/", customPassport, createBug);
router.put("/:id", customPassport, updateBug);
router.get("/project", customPassport, bugsByProject);
router.delete("/:id", customPassport, deleteBug);

module.exports = router.routes();
