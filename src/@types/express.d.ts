import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    metadata: {
      account?: {
        id: string;
        role: string;
      };
    };
  }
}
