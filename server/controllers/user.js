const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const { response } = require('express')

const register = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    if (!email || !password || !firstName || !lastName)
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs',
        })
    const user = await User.findOne({ email })
    if (user) throw new Error('User has existed!')
    else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? 'Register is successfull!' : 'Something went wrong!'
        })
    }
})

//refreshToken => Cấp mới accessToken
//accessToken => Xác thực người dùng, phân quyền người dùng.
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs',
        })
    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {
        //Tách password và role ra khỏi response    
        const { password, role, ...userData } = response.toObject()
        //Tạo accessToken
        const accessToken = generateAccessToken(response._id, role)
        //Tạo refreshToken
        const refreshToken = generateRefreshToken(response._id)
        //Lưu refreshToken vào DB
        await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true })
        //Lưu refreshToken vào Cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    }
    else {
        throw new Error('Invalid credentials!')
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: false,
        rs: user ? user : 'User not found!'
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    //lấy token từ cookie
    const cookie = req.cookies
    //check xem có token không
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies!')
    //check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    //Xóa refreshToken ở DB
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    //Xóa refreshToken ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    res.status(200).json({
        success: true,
        mes: 'Logout is done'
    })
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout
}