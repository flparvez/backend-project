
const asynHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }

}

export { asynHandler }

// const asynHandler = (fn) => async (req, res, next) => {

//     try {
//         await fn(req, res, next)
//     } catch (err) {
//         res.status(err.code || 500).json({
//             succes: false,
//             messeage: err.messeage
//         })
//     }
// }