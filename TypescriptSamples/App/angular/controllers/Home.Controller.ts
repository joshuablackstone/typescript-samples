module App.controllers {
    class HomeCtlr implements ng.IController {
        static $inject = [
            "$scope",
            "CoursesService"
        ];
        $onInit() { }

        constructor(
            private $scope: ng.IScope,
            private CoursesService: App.services.CoursesService
        ) {
            const init = () => {
                CoursesService.getCourses()
                    .then(data => $scope.courses = data)
                    .catch(error => console.error(error))
                    .finally(() => console.log($scope.courses));
            };

            $scope.courses = [];
            $scope.filterCourses = null;

            init();
        }
    }

    angular
        .module("app")
        .controller("HomeCtlr", HomeCtlr);
}
