const router = require("express").Router();
const ctrls = require("../controllers/coupon");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post('/', [verifyAccessToken, isAdmin], ctrls.createCoupon)
router.get('/', ctrls.getCoupon)
router.put('/:cid', [verifyAccessToken, isAdmin], ctrls.updateCoupon)
router.delete('/:cid', [verifyAccessToken, isAdmin], ctrls.deleteCoupon)





module.exports = router;