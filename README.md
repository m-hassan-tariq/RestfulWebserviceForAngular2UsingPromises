# Restful Webservice For Angular2 Using Promises
Restful implementation of GET, POST, DELETE, PATCH, PUT in Angular2 using Promises

The Angular Http client communicates with the server using a familiar HTTP request/response protocol. The Http client is one of a family of services in the Angular HTTP library. When importing from the @angular/http module, SystemJS knows how to load services from the Angular HTTP library because the systemjs.config.js file maps to that module name. The HttpModule is necessary for making HTTP calls.

Benefits of using Global Service (web-api-promise.service.ts):

* This will contain shared/global service which will be consumed by all modules for executing CRUD operation, Request Type, URL, Parameter Object will be passed to this shared service, so it will make code more maintainable, readable and scalable

* If we dont go through this method then we have to use $http.get() or $http.post method every where in services files of each module

* content negotiation issues can be simply handled over here

* If you want to append anything with each URL like ‘Http:\mydomain\’ then instead of copy it on every service file just hard-code this thing in this file and append URL from their respective services.

* We don’t need to mention protocol and host-name now in every URL request.

-----

### Promise

Although the Angular http client API returns an *Observable* you can turn it into a *Promise*. It's easy to do, and in simple cases, a promise-based version looks much like the observable-based version:

* You can follow the promise then(this.extractData).catch(this.handleError) pattern. 

* Alternatively, you can call toPromise(success, fail). i.e. -> .toPromise(this.extractData, this.handleError). 

* The errorHandler forwards an error message as a failed promise instead of a failed promises.

-----

## HTTP GET Code (web-api-promise.service.ts)

The Http.get method takes an object that implements RequestOptionsArgs as a second parameter.

* #### Plain HTTP GET using Promises without any parameters

        getService(url: string): Promise<any> {
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
        }
            
     **Consumer Code in _custom component_**:
     
        this.moviePromiseService
          .getService('api/Movie/TestGetNo')
          .then(result => console.log(result))
          .catch(error => console.log(error));
            
* #### HTTP GET using Promises with single query string term

        getServiceWithDynamicQueryTerm(url: string, key: string, val: string): Promise<any> {
        return this.http
            .get(url + "/?" + key + "=" + val, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
        }
            
     **Consumer Code in _custom component_**:
     
        this.moviePromiseService
          .getServiceWithDynamicQueryTerm('api/Movie/TestGetParam', "query","hello")
          .then(result => console.log(result))
          .catch(error => console.log(error));     
            
* #### HTTP GET using Promises with multiple query string term

        getServiceWithMultipleQueryTerm(url: string, query: string): Promise<any> {
        return this.http
            .get(url + "/?" + query, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
        }

     **Consumer Code in _custom component_**:
     
        this.moviePromiseService
          .getServiceWithMultipleQueryTerm('api/Movie/TestGetParam', "id=1&&name=abc")
          .then(result => console.log(result))
          .catch(error => console.log(error));

* #### HTTP GET using Promises with hardcode query string term

  *The search field of that object can be used to set a string or a URLSearchParams object.*

        getServiceWithFixedQueryString(url: string, param: any): Promise<any> {
        this.options = new RequestOptions({ headers: this.headers, search: 'query=' + param });
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
        }          

     **Consumer Code in _custom component_**:
     
        this.moviePromiseService
          .getServiceWithFixedQueryString('api/Movie/TestGetParam', 'abc')
          .then(result => console.log(result))
          .catch(error => console.log(error));

* #### HTTP GET using Promises with complex object as query string

  *The search field of that object can be used to set a string or a URLSearchParams object.*

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

     **Consumer Code in _custom component_**:
     
        this.moviePromiseService
          .getServiceWithComplexObjectAsQueryString('api/Movie/TestGet', "{ id: '1', name: 'abc'}")
          .then(result => console.log(result))
          .catch(error => console.log(error));

## HTTP POST Producer Code (web-api-promise.service.ts)

The Http.post method takes body as second parameter and an object that implements RequestOptionsArgs as a third parameter.

* #### HTTP POST using Promises with body object as parameter

        createService(url: string, param: any): Promise<any> {
        let body = JSON.stringify(param);
        return this.http
            .post(url, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
        }

     **Consumer Code in _custom component_**:
     
        this.moviePromiseService
          .createService('api/Movie/TestPost', "{ id: '1', name: 'abc'}")
          .then(result => console.log(result))
          .catch(error => console.log(error));

## HTTP PUT Producer Code (web-api-promise.service.ts)

The Http.put method takes body as second parameter and an object that implements RequestOptionsArgs as a third parameter.

* #### HTTP PUT using Promises with body object as parameter

        updateService(url: string, param: any): Promise<any> {
        let body = JSON.stringify(param);
        return this.http
            .put(url, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
        } 

     **Consumer Code in _custom component_**:
     
        this.moviePromiseService
          .updateService('api/Movie/TestPost', "{ id: '1', name: 'abc'}")
          .then(result => console.log(result))
          .catch(error => console.log(error));

## HTTP PATCH Producer Code (web-api-promise.service.ts)

The Http.patch method takes body as second parameter and an object that implements RequestOptionsArgs as a third parameter.

* #### HTTP PATCH using Promises with body object as parameter

        patchService(url: string, param: any): Promise<any> {
        let body = JSON.stringify(param);
        return this.http
            .patch(url, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
        }    

     **Consumer Code in _custom component_**:
     
        this.moviePromiseService
          .patchService('api/Movie/TestPost', "{ id: '1', name: 'abc'}")
          .then(result => console.log(result))
          .catch(error => console.log(error));

## HTTP DELETE Producer Code (web-api-promise.service.ts)

The Http.delete method takes an object that implements RequestOptionsArgs as a second parameter.

* #### HTTP DELETE using Promises with ID as parameter

        deleteServiceWithId(url: string, val: string): Promise<any> {
        return this.http
            .delete(url + "/?id=" + val, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
        } 

     **Consumer Code in _custom component_**:
     
        this.moviePromiseService
          .deleteServiceWithId('api/Movie/TestGetNo', 111)
          .then(result => console.log(result))
          .catch(error => console.log(error));

* #### HTTP DELETE using Promises with complex object as parameter

   *The search field of that object can be used to set a string or a URLSearchParams object.*
   
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

     **Consumer Code in _custom component_**:
     
        this.moviePromiseService
          .deleteService('api/Movie/TestPost', "{ id: '1', name: 'abc'}")
          .then(result => console.log(result))
          .catch(error => console.log(error));

#### Important Note

**You need to append Accept headers to your get request in order for Firefox to render the json that comes back.**

In the headers object, the Content-Type specifies that the body represents JSON. The headers object is used to configure the options object. The options object is a new instance of RequestOptions, a class that allows you to specify certain settings when instantiating a request. In this way, headers is one of the RequestOptions.

In the return statement, options is the third argument of the post method, as shown above.

        ngOnInit() {
            let headers = new Headers();
            headers.append('Accept', 'q=0.8;application/json;q=0.9');
            return this.http.get(this.url, { headers: headers } ).map(res => {
                      return res.json();
                    }).subscribe((response) => { console.log(response) });
        }

-----

# Restful HTTP Service using Promises

Angular injects a WebApiPromiseService into the constructor and the component calls that service to fetch and save data. The component does not talk directly to the Angular Http client. The component doesn't know or care how it gets the data. It delegates to the WebApiPromiseService. **This is a golden rule: always delegate data access to a supporting service class.**

      import { Injectable } from '@angular/core';
      import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
      import 'rxjs/add/operator/toPromise';

      import { ToasterService } from './alert.service';
      import { LoaderService } from './loader.service';

      @Injectable()
      export class WebApiPromiseService {
          headers: Headers;
          options: RequestOptions;

          constructor(private http: Http,
              private toasterService: ToasterService,
              private loaderService: LoaderService) {
              this.headers = new Headers({ 'Content-Type': 'application/json', 
                                           'Accept': 'q=0.8;application/json;q=0.9' });
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
          
          getServiceWithMultipleQueryTerm(url: string, query: string): Promise<any> {
              return this.http
                  .get(url + "/?" + query, this.options)
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
              this.toasterService.showToaster('error', 'Oops!! An error occurred', error);
              this.loaderService.displayLoader(false);
              return Promise.reject(error.message || error);
          }
      }


[Text Reference](https://angular.io/docs/ts/latest/guide/server-communication.html) 
