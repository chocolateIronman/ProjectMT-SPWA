(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectUpdateCtrl',control);

        control.$inject = [
            '$state',
            '$stateParams',
            'projectsSrvc'
        ];

        function control(
            $state,
            $stateParams,
            projectsSrvc
        ) {
            var vm = angular.extend(this, {
                project : {
                    name: "no name",
                    category: "no category",
                    startDate: "start date",
                    endDate: "end date",
                    year: "no year",
                    notes: "no notes"
                },

                newProject : {}
            });
           
            var projectid=$stateParams.projectID;

            console.log("ProjectID " + projectid);

            projectsSrvc.getProject(projectid).then(
                function successCallback(response) {
                    console.log(response.data[0]);

                    vm.project = response.data[0];
                    
                    // this callback will be called asynchronously
                    // when the response is available
                },
                function errorCallback(response) {
                    console.error(response);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                }
            );
        

            vm.updateProject = function () {
                console.log("UPDATING PROJECT with",vm.newProject);
                Object.getOwnPropertyNames(vm.project).forEach(function(key){
                    if(vm.newProject[key]==null){
                        vm.newProject[key]=vm.project[key];
                    }
                })
                console.log("update formatting",vm.newProject);
                projectsSrvc.updateProject(vm.newProject,projectid).then(function success(){
                    console.log("leaving now")
                    $state.go('projectView',{selected: projectid});
                },
                function error(err){
                    console.log(err);
                });
            };
        }
    }
)();