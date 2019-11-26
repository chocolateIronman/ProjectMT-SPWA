(
    function () {
        'use strict';

        angular
            .module('tasksjs')
            .controller('taskCreateCtrl',control);

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
                newTask:{
                    
                }
            });

            var projectid=$stateParams.projectID;
            vm.newTask.ProjectID=projectid;
            console.log($stateParams);
            console.log("ProjectID = " +projectid);
            

            vm.saveTask = function () {
                console.log("SAVING TASK!!!");
                console.table(vm.newTask);
                //TODO: Error Handling
                tasksSrvc.createTask(vm.newTask).then(function(){
                    $state.go('tasksList',{projectID: projectid});
                });
            };
        }
    }
)();