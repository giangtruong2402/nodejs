const userRouter = require('./user')
const {notFound, errHandler} = require('../middlewares/errHandler')
const initRouters = (app) => {
    app.use('/api/user', userRouter)


    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRouters
