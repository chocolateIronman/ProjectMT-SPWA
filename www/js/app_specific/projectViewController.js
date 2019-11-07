(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectViewCtrl',control);

        control.$inject = [
            '$state',
            '$stateParams',
            //'projectsSrvc'
        ];

        function control(
            $state,
            $stateParams,
            //projectsSrvc
        ) {
            var vm = angular.extend(this, {
                project : {
                    name: "no name",
                    category: "no category",
                    startDate: "start date",
                    endDate: "end date",
                    year: "no year",
                    notes: "no notes"
                }
            })

            vm.done = function(){
                $state.go('projectsList');
            }

            vm.viewTasks = function(){
                $state.go('tasksList');
            }
            var params = $stateParams;

            //vm.project = projectsSrvc.getProjectAt(params.selected);
        }
    }
)();