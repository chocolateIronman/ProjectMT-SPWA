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

                newTask : {}
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