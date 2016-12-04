import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebApiPromiseService {
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getService(url: string): Promise<any> {
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getServiceWithDynamicQueryTerm(url: string, key: string, val: string): Promise<any> {
        return this.http
            .get(url + "/?" + key + "=" + val, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getServiceWithFixedQueryString(url: string, param: any): Promise<any> {
        this.options = new RequestOptions({ headers: this.headers, search: 'query=' + param });
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getServiceWithComplexObjectAsQueryString(url: string, param: any): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                let val = param[key];
                params.set(key, val);
            }
        }
        this.options = new RequestOptions({ headers: this.headers, search: params });
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    createService(url: string, param: any): Promise<any> {
        let body = JSON.stringify(param);
        return this.http
            .post(url, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    updateService(url: string, param: any): Promise<any> {
        let body = JSON.stringify(param);
        return this.http
            .put(url, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    patchService(url: string, param: any): Promise<any> {
        let body = JSON.stringify(param);
        return this.http
            .patch(url, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteService(url: string, param: any): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                let val = param[key];
                params.set(key, val);
            }
        }
        this.options = new RequestOptions({ headers: this.headers, search: params });
        return this.http
            .delete(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteServiceWithId(url: string, key: string, val: string): Promise<any> {
        return this.http
            .delete(url + "/?" + key + "=" + val, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
