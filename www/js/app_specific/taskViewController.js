(
    function () {
        'use strict';

        angular
            .module('tasksjs')
            .controller('taskViewCtrl',control);

        control.$inject = [
            '$state',
            '$stateParams',
            'tasksSrvc'
        ];

        function control(
            $state,
            $stateParams,
            tasksSrvc
        ) {
            var vm = angular.extend(this, {
                task : {
                    name: "no name",
                    startDate: "start date",
                    dueDate: "due date",
                    endDate: "end date",
                    notes: "no notes"
                }
            })

          
            var params = $stateParams;
            console.log("PARAMS",params);

            tasksSrvc.getTask(params.selected).then(
                function successCallback(response) {
                    console.log(response.data[0]);

                    vm.task = response.data[0];
                },
                function errorCallback(response) {
                    console.error(response);
                    
                }
            );
        }
    }
) ();