import { NextFunction, Router, Request, Response } from 'express';
import { RouteHandler } from './handler';

export type Handler = (req: Request, res: Response, next: NextFunction) => void;

export interface CoreApp {
  registerMiddleware(handler: Handler): void;
  registerRouter(router: CoreRouter): void;
  start(port: string): Promise<void>;
}

export interface RouteProcessor {
  use(...handlers: Handler[]): RouteProcessor;
  handler<P, B>(handler: RouteHandler<P, B>): void;
}

export interface CoreRouter {
  path: string;
  get(path: string): RouteProcessor;
  post(path: string): RouteProcessor;
  put(path: string): RouteProcessor;
  delete(path: string): RouteProcessor;
  getInstance(): Router;
}
