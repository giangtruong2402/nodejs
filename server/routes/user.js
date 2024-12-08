const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", [verifyAccessToken], ctrls.getCrurrent);
router.post("/refreshtoken", ctrls.refeshAccessToken);
router.get("/logout", [verifyAccessToken], ctrls.logout);
router.get("/forgotpassword", ctrls.forgotPassword);
router.put("/resetpassword", ctrls.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers);
router.get("/:uid", [verifyAccessToken, isAdmin], ctrls.getUsersById);

router.delete("/", [verifyAccessToken, isAdmin], ctrls.deleteUser);
router.put("/current", [verifyAccessToken], ctrls.updateUser);
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);



module.exports = router;

//CRUD | Create - read- update - delete | post - get - update - delete
