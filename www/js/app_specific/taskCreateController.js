(
    function () {
        'use strict';

        angular
            .module('tasksjs')
            .controller('taskCreateCtrl',control);

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
                newTask:{
                    
                },
                startDateHolder: Date(),
                dueDateHolder: Date()
            });

            var projectid=$stateParams.projectID;
            vm.newTask.projectID=projectid;
            console.log($stateParams);
            console.log("ProjectID = " +projectid);
            vm.newTask.EndDate = 0;
            

            vm.saveTask = function () {
                console.log("SAVING TASK!!!");
                vm.newTask.StartDate=moment(vm.startDateHolder,"DD/MM/YYYY").valueOf();
                vm.newTask.DueDate=moment(vm.dueDateHolder,"DD/MM/YYYY").valueOf();
                console.table(vm.newTask);
                //TODO: Error Handling
                tasksSrvc.createTask(vm.newTask).then(function(){
                    $state.go('tasksList',{projectID: projectid});
                });
            };
        }
    }
)();