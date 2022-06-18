import { Router } from 'express';
import { CoreRouter, Handler, RouteProcessor } from "../core/core-interfaces";
import { RouteHandler } from '../core/handler';

class RouteProcessorImplementation implements RouteProcessor {
  private route: ReturnType<ReturnType<typeof Router>['get']>;

  constructor(route: ReturnType<ReturnType<typeof Router>['get']>) {
    this.route = route;
  }

  use(...handlers: Handler[]): RouteProcessor {
    this.route.use(...handlers);
    return this;
  }
  handler<P, B>(handler: RouteHandler<P, B>): void {
    this.route.get(handler.handle as any);
  }
}

class AppRouter implements CoreRouter {
  readonly path: string;
  private readonly router: Router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();
  }
  getInstance(): Router {
    return this.router;
  }

  get(path: string): RouteProcessor {
    const route = this.router.get(path);

    return new RouteProcessorImplementation(route);
  }
  post(path: string): RouteProcessor {
    const route = this.router.post(path);

    return new RouteProcessorImplementation(route);
  }
  put(path: string): RouteProcessor {
    const route = this.router.put(path);

    return new RouteProcessorImplementation(route);
  }
  delete(path: string): RouteProcessor {
    const route = this.router.delete(path);

    return new RouteProcessorImplementation(route);
  }
}

export default AppRouter;