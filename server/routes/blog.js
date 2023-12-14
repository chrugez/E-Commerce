const router = require('express').Router()
const ctrls = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../configs/cloudinary.config')

router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog)
router.get('/', ctrls.getBlogs)

router.put('/like/:bid', [verifyAccessToken], ctrls.likeBlog)
router.put('/dislike/:bid', [verifyAccessToken], ctrls.dislikeBlog)
router.put('/image/:pid', [verifyAccessToken, isAdmin], uploader.single('image'), ctrls.uploadImageBlog)
router.get('/:bid', ctrls.getBlogById)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog)


module.exports = router