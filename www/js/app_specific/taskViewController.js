(
    function () {
        'use strict';

        angular
            .module('tasksjs')
            .controller('taskViewCtrl',control);

        control.$inject = [
            '$state',
            '$stateParams',
            //'tasksSrvc'
        ];

        function control(
            $state,
            $stateParams,
            //projectsSrvc
        ) {
            var vm = angular.extend(this, {
                task : {
                    name: "no name",
                    startDate: "start date",
                    dueDate: "due date",
                    endDate: "end date",
                    notes: "no notes"
                },
                project : {
                    name: "no name project"
                }
            })

          
            var params = $stateParams;

            //vm.project = tasksSrvc.getTaskAt(params.selected);
        }
    }
) ();