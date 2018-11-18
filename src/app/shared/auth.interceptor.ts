import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepted!', req);
        // a request cannot be changed. so you can clone it, but the cloned req cannot be changed either
        // so while cloning, append/set params to the new req
        const copiedReq = req.clone({
            // headers: req.headers.append('', '')
            params: req.params.set('auth', this.authService.getToken())
        });
        return next.handle(copiedReq);
    }
}