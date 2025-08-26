import { Request, Response, NextFunction } from 'express';
type AsyncRequestHandler = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise<any>;

type SyncRequestHandler = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => any;


const asyncHandler = (requestHandler: AsyncRequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((error) => {
            console.error(JSON.stringify(error, null, 2));
            next(error)
        } )
    }
}

export {asyncHandler}

