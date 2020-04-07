import { Request, Response } from 'express'

const loggerMiddleware = (req: Request, resp: Response, next) => {

    console.log('Request logged:', req.method, req.path, resp.statusCode)
    next()
}

export default loggerMiddleware