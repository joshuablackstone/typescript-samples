module App.controllers {
    class ToDosCtlr implements ng.IController {
        static $inject = ["$scope"];
        $onInit() { }

        constructor(
            private $scope: ng.IScope
        ) {
            $scope.model = {};
            $scope.todos = [];

            const resetForm = (form: ng.IFormController): void => {
                // Each control (input, select, textarea, etc) gets added as a property of the form.
                // The form has other built-in properties as well. However it's easy to filter those out,
                // because the Angular team has chosen to prefix each one with a dollar sign.
                // So, we just avoid those properties that begin with a dollar sign.
                const controlNames = Object.keys(form).map(function (key) {
                    return key.indexOf("$") !== 0;
                });

                angular.forEach(controlNames, function (name: string) {
                    var control = form[name];
                    if (control) {
                        control.$setViewValue(undefined);
                    }
                });

                form.$setPristine();
                form.$setUntouched();
            };

            $scope.addToDo = (form: ng.IFormController): void => {
                if (form.$valid) {
                    const todo: App.models.IToDo = new App.models.ToDo($scope.model.Title);
                    $scope.todos.push(todo);
                    $scope.model = {};
                    resetForm(form);
                }
            };

            $scope.removeToDo = (todo: App.models.IToDo): void => {
                $scope.todos.splice($scope.todos.indexOf(todo), 1);
            };

            $scope.markToDoComplete = (todo: App.models.IToDo): void => {
                todo.Complete = true;
                todo.LastUpdated = new Date();
            };
        }
    }

    angular
        .module("app")
        .controller("ToDosCtlr", ToDosCtlr);
}
