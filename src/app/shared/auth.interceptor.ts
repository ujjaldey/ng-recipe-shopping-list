import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { switchMap } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepted!', req);
        // a request cannot be changed. so you can clone it, but the cloned req cannot be changed either
        // so while cloning, append/set params to the new req
        return this.store.select('auth')
            .pipe(take(1)) // it adds an ongoing subscription. so whenever the state is changed, it extracts the token and sets a new request. adding take(1) will fire it only once
            .pipe(switchMap((authState: fromAuth.State) => {
                const copiedReq = req.clone({
                    // headers: req.headers.append('', '')
                    params: req.params.set('auth', authState.token)
                });
                return next.handle(copiedReq);
            }));
    }
}