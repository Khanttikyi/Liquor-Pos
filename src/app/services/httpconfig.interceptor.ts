import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { LoadingService } from "./loading/loading.service";
import { AlertService } from "./alert-model/alert.service";
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private loading: LoadingService,private alertService:AlertService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (!this.userProfile.isOnline) {
        // return throwError('Please Check Your Network Connection !');
        //     return EMPTY;
        // }
        // const token: string = this.userProfile.token;

        // if (this.authService.authToken) {
        //     request = request.clone({ headers: request.headers.set('Authorization', "Bearer " + this.authService.authToken) });
        //     // let body = request.body
        //     // request = request.clone({ body: { ...body, userId: this.userProfile.userInfo.userId } });
        // }
        // if (!this.authService.authToken && !request.url.includes('login'))
        //     return of(undefined)

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        // request = request.clone({ headers: request.headers.set('X-Tenant-ID', 'kbzms') });
        // request = request.clone({ headers: request.headers.set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyODQyMzI5OCwiaWF0IjoxNjI3ODE4NDk4fQ.K08GdAdgMVisiUjOO8ySxRA68Rj6PWTjRdoOBAnpRiCJ5aAY4pqJPKrhKS0ulK6K9qjU4jpOx2wuFdVi-XHw4A') });
        if (this.loading['activate'])
            this.loading.activate()
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    // if(event.body === null){
                    //     this.authService.logout()
                    // }
                    if (event.body) {
                        return event.clone({
                            body: event.body.body
                        });
                        // return event.body;
                    }
                }
                // console.log('event--->>>', event);
                return event;
            }),
            // catchError(this.errorHandler)
            catchError(
                (error: HttpErrorResponse) => {
                    console.log('error--->>>', error);
                    if (this.loading['deactivate'])
                        this.loading.deactivate()
                    if (error.error) {
                        if (typeof error.error == 'string') {
                            this.alertService.activate("Internal Server error!", "Error Message")
                        } else {
                            this.alertService.activate(error.error.payload || error.error.message || "Internal Server error!", 'Error Message');
                            if (error.error.code == "403") {
                                // this.authService.logout()
                                document.location.reload();
                            }
                        }
                    }
                    else
                        this.alertService.activate("Sorry!, Try again later", 'Error Message');

                    return throwError(error)
                }
            ),
            finalize(() => {
                if (this.loading['deactivate'])
                    this.loading.deactivate()
            })
        );
    }

}
