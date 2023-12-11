const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body
    if (!title || !description || !category) throw new Error('Missing input!')
    const response = await Blog.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : 'Cannot create new blog!'
    })
})

const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing input!')
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response : 'Cannot update blog!'
    })
})

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.status(200).json({
        success: response ? true : false,
        blogs: response ? response : 'Cannot get blogs!'
    })
})

const getBlogById = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const response = await Blog.findById(bid)
    return res.status(200).json({
        success: response ? true : false,
        blog: response ? response : 'Cannot get blog!'
    })
})

const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.body
    if (!bid) throw new Error('Missing input!')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})

module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    getBlogById
}