(
    function () {
        'use strict';

        angular
            .module('tasksjs')
            .controller('taskCreateCtrl',control);

        control.$inject = [
            '$state',
            //'tasksSrvc'
        ];

        function control(
            $state,
            //tasksSrvc
        ) {
            var vm = angular.extend(this, {

            });

            

            vm.saveTask = function () {
                console.log("SAVING TASK!!!");
                //TODO: Error Handling
                //tasksSrvc.createTask().then(function(){
                    //state.go('tasksList');
                //})
            };
        }
    }
)();