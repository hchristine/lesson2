import express from "express";
import { CoreApp, Handler, CoreRouter } from "../core/core-interfaces";

class App implements CoreApp {
  private app: ReturnType<typeof express>;

  constructor() {
    this.app = express();
  }
  
  registerMiddleware(handler: Handler): void {
    this.app.use(handler);
  }

  registerRouter(router: CoreRouter): void {
    this.app.use(router.path, router.getInstance());
  }

  start(port: string): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(port, () => {
        resolve();
      });
    });
  }
}

export default App;
