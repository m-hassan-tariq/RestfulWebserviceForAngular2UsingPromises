import { Component, OnInit } from '@angular/core';

import { SearchMovieModel } from '../shared/model/search-movie.model';
import { WebApiPromiseService } from '../../shared/service/web-api-promise.service';

@Component({
    selector: 'search-movie-list',
    templateUrl: '../../Scripts/app/search-movies/search-movie-list/search-movie-list.component.html'
})

export class SearchMovieListComponent implements OnInit {

    constructor(
        private moviePromiseService: WebApiPromiseService) {
        this.searchMovieModel = {id: '12' , name: 'abc'};
    }

    ngOnInit() {
        this.moviePromiseService
            .getService('api/Movie/TestGetNo')
            .then(result => console.log("1. getService: " + result))
            .catch(error => console.log(error));

        this.moviePromiseService
            .getServiceWithDynamicQueryTerm('api/Movie/TestGetParam', "query","hello")
            .then(result => console.log("2. getServiceWithDynamicQueryTerm: " + result))
            .catch(error => console.log(error));

        this.moviePromiseService
            .getServiceWithFixedQueryString('api/Movie/TestGetParam', this.searchMovieModel.name)
            .then(result => console.log("3. getServiceWithFixedQueryString: " + result))
            .catch(error => console.log(error));

        this.moviePromiseService
            .getServiceWithComplexObjectAsQueryString('api/Movie/TestGet', this.searchMovieModel)
            .then(result => console.log("4. getServiceWithComplexObjectAsQueryString: " + result))
            .catch(error => console.log(error));

        this.moviePromiseService
            .createService('api/Movie/TestPost', this.searchMovieModel)
            .then(result => console.log("5. createService: " + result))
            .catch(error => console.log(error));

        this.moviePromiseService
            .updateService('api/Movie/TestPut', this.searchMovieModel)
            .then(result => console.log("6. updateService: " + result))
            .catch(error => console.log(error));

        this.moviePromiseService
            .patchService('api/Movie/TestPatch', this.searchMovieModel)
            .then(result => console.log("7. patchService: " + result))
            .catch(error => console.log(error));

        this.moviePromiseService
            .deleteService('api/Movie/TestDelete', this.searchMovieModel)
            .then(result => console.log("8. deleteService: " + result))
            .catch(error => console.log(error));

        this.moviePromiseService
            .deleteServiceWithId('api/Movie/TestDeleteWithId', "id", "8631")
            .then(result => console.log("9. deleteServiceWithId: " + result))
            .catch(error => console.log(error));
	}
}
