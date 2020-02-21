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
            //get the ID of the selected existing project from the state parameters and add it to the new task object
            var projectid=$stateParams.projectID;
            vm.newTask.projectID=projectid; //the task is allocated to the specific project
            console.log($stateParams);
            console.log("ProjectID = " +projectid);
            vm.newTask.EndDate = 0; //set the end date of the project to 0
            
            //create and save the new task
            vm.saveTask = function () {
                console.log("SAVING TASK!!!");
                vm.newTask.StartDate=moment(vm.startDateHolder,"DD/MM/YYYY").valueOf(); //get the date and convert it ot epoch time
                vm.newTask.DueDate=moment(vm.dueDateHolder,"DD/MM/YYYY").valueOf();//get the date and convert it to epoch time
                console.table(vm.newTask);
                //TODO: Error Handling
                tasksSrvc.createTask(vm.newTask).then(function(){
                    $state.go('tasksList',{projectID: projectid}); //if task is saved successfully go to its details view
                });
            };
        }
    }
)();
