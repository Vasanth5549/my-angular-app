import { ErrorHandler, Injectable} from '@angular/core';
 
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
 
    constructor() { 
    }
  
    handleError(error) {
       console.error('An error occurred:', error.message);
       console.error(error);
   }
 
}