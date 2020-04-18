import { Request, Response } from 'express'

const loggerMiddleware = (req: Request, resp: Response, next) => {
    console.log('REQUEST LOGGED :', req.method, req.path)
    next()
}

export default loggerMiddleware