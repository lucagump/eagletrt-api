import cors from 'cors';
import morgan from 'morgan'
import express from 'express';
import bodyParser from 'body-parser';
import getVersionRouter from '../../routes/router';


export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req: express.Request, res: express.Response) => {
    res.status(200).end();
  });
  app.head('/status', (req: express.Request, res: express.Response) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  // Load API routes
  app.use(morgan('dev'));

  app.use('/api', getVersionRouter());

  /// catch 404 and forward to error handler
  // app.use((req: express.Request, res: express.Response, next: any) => {
  //   const err = new Error('Not Found');
  //   err['status'] = 404;
  //   next(err);
  // });

  /// error handlers
  app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  
  app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
