const router = require('express').Router()
const ctrls =  require('../controllers/user')


router.post('/register', ctrls.register)

module.exports = router


//CRUD | Create - read- update - delete | post - get - update - delete