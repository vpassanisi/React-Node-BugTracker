const Router = require("koa-router");
const { customPassport } = require("../auth/customCallback");
const {
  createProject,
  getProject,
  getProjects,
  setProject,
  deleteProject,
  updateProject
} = require("../controllers/projects");

const router = new Router();

router.post("/", customPassport, createProject);
router.get("/getProject", customPassport, getProject);
router.get("/getProjects", customPassport, getProjects);
router.get("/:id", customPassport, setProject);
router.put("/", customPassport, updateProject);
router.delete("/", customPassport, deleteProject);

module.exports = router.routes();
