import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger(LoggingMiddleware.name);

  use(req: Request, _: Response, next: NextFunction) {
    const { method, originalUrl, headers } = req;
    const ip = headers['x-real-ip'] || req.ip;
    const userAgent = headers['user-agent'];
    if (!headers['content-type']) headers['content-type'] = 'application/json';
    const message = `${method} ${originalUrl} ${ip} ${userAgent}`;
    this.logger.log(message);

    next();
  }
}
