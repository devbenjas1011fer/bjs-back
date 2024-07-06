import { NextFunction, Request, Response } from "express";

function convertData(
    responseData: any,
    statusCode: number,
    statusMessage: string
) {
    return {
        data: responseData,
        message: statusMessage ?? "OK",
        status: statusCode,
    };
}

export function responseHandler(_req: Request, res: Response, next: NextFunction) {
    const originalSend = res.json;

    res.json = function (): any {
        if (res.statusCode < 400)
            arguments[0] = convertData(
                arguments[0],
                res.statusCode,
                res.statusMessage
            );
        originalSend.apply(res, arguments as unknown as [body?: any]);
    };
    next();
}