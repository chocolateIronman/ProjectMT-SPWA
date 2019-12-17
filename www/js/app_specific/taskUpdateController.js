(
    function () {
        'use strict';

        angular
            .module('tasksjs')
            .controller('taskUpdateCtrl',control);

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
                    startDate: "startDate",
                    dueDate: "due date",
                    endDate: "end date",
                    notes: "no notes"
                },

                newTask : {},
                startDateHolder: Date(),
                dueDateHolder: Date(),
                endDateHolder: Date()
            });

            var taskid=$stateParams.taskID;
            console.log("TaskID "+ taskid);

            tasksSrvc.getTask(taskid).then(
                function successCallback(response) {
                    console.log(response.data[0]);
                    vm.task = response.data[0];
                },
                function errorCallback(response) {
                    console.error(response);
                }
            );

            vm.updateTask = function(){
                vm.newTask.StartDate=moment(vm.startDateHolder,"DD/MM/YYYY").valueOf();
                if(isNaN(vm.newTask.StartDate)){
                    vm.newTask.StartDate=parseInt(vm.task.StartDate);
                }
                vm.newTask.DueDate=moment(vm.dueDateHolder,"DD/MM/YYYY").valueOf();
                if(isNaN(vm.newTask.DueDate)){
                    vm.newTask.DueDate=parseInt(vm.task.DueDate);
                }
                vm.newTask.EndDate=moment(vm.endDateHolder,"DD/MM/YYYY").valueOf();
                if(isNaN(vm.newTask.EndDate)){
                    vm.newTask.EndDate=parseInt(vm.task.EndDate);
                }
                console.log("UPDATING TASK with", vm.newTask);
                Object.getOwnPropertyNames(vm.task).forEach(function(key){
                    if(vm.newTask[key]==null){
                        vm.newTask[key]=vm.task[key];
                    }
                })
                console.log("update formatting", vm.newTask);
                tasksSrvc.updateTask(vm.newTask,taskid).then(function success(){
                    console.log("leaving now");
                    $state.go('taskView',{selected: taskid});
                },
                function error(err){
                    console.log(err);
                
                });
            };
        }
    }
)();