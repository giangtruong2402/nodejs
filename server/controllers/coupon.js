const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler(async (req, res) => {
    const {name, discount, expiry} = req.body
    if(!name || !discount || !expiry) throw new Error('missing input')
    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry *24*60*60*1000
    })
    return res.json({
        success: response ?true : false,
        createCoupon: response ? response : 'cant create new Coupon'
    })
})
const getCoupon = asyncHandler(async (req, res) => {
    
    const response = await Coupon.find().select('-createAt -updateAt')
    return res.json({
        success: response ?true : false,
        Coupons: response ? response : 'cant get Coupon'
    })
})
const updateCoupon = asyncHandler(async (req, res) => {
    const {cid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('missing input')
    if(req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry *24*60*60*1000
    const response = await Coupon.findByIdAndUpdate(cid,req.body,{new: true})
    return res.json({
        success: response ?true : false,
        updateCoupon: response ? response : 'cant update Coupon'
    })
})
const deleteCoupon = asyncHandler(async (req, res) => {
    const {cid} = req.params
    const response = await Coupon.findByIdAndDelete(cid)
    return res.json({
        success: response ?true : false,
        deleteCoupon: response ? response : 'cant delete Coupon'
    })
})
module.exports ={
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}