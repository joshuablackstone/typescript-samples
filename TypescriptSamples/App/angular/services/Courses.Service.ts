module App.services {
    export class CoursesService {
        static $inject = ["$http", "$q"];

        private serviceUrl: string;

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService
        ) {
            this.serviceUrl = 'http://pluralsightcourseviewer.azurewebsites.net/api/courseviewer/courses';
        }

        getCourses(): ng.IPromise<App.models.ICourse[]> {
            return this.$http.get(this.serviceUrl).then(
                (
                    response: ng.IHttpPromiseCallbackArg<App.models.ICourse[]>
                ): App.models.ICourse[] => {
                    return response.data;
                }
            );
        }
    }

    angular.module("app").service("CoursesService", CoursesService);
}
