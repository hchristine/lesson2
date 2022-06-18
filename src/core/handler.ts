import { Request, Response } from 'express';

export interface RouteHandler<TParams, TBody> {
  handle(request: Request<TParams, any, TBody>, res: Response): any;
}