(
    function () {
        'use strict';

        angular
            .module('tasksjs')
            .controller('taskViewCtrl',control);

        control.$inject = [
            '$state',
            '$stateParams',
            'tasksSrvc',
            'moment'
        ];

        function control(
            $state,
            $stateParams,
            tasksSrvc,
            moment
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
                    vm.task.StartDate=moment(parseInt(response.data[0].StartDate)).format("DD/MM/YYYY");
                    vm.task.DueDate=moment(parseInt(response.data[0].DueDate)).format("DD/MM/YYYY");
                    vm.task.EndDate=moment(parseInt(response.data[0].EndDate)).format("DD/MM/YYYY");
                },
                function errorCallback(response) {
                    console.error(response);
                    
                }
            );
        }
    }
) ();