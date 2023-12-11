const router = require('express').Router()
const ctrls = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog)
router.get('/', ctrls.getBlogs)

router.get('/:bid', ctrls.getBlogById)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog)


module.exports = router