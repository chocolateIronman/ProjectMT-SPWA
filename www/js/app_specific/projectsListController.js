(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectsListCtrl',control);
        
        control.$inject = [
            '$state',
            'projectsSrvc'
        ];

        function control(
            $state,
            projectsSrvc
        ) {
            var vm = angular.extend(this, {
                projects : []
            });

            vm.onItemSelected = function(index){
                console.log("Project index: "+ index);
                //passing parameters into the new state
                //'selected' is an attribute in a parameter object, defined in the module definition
                //write the destination controller, so it knows to look for an object with a 'selected' attribute
                var projectId= vm.projects[index].id;
                console.log("Project id:" + projectId);
                
                $state.go('projectView',{selected: projectId});
                
            };
        
            vm.noProjects = function(){
                return vm.projects.length == 0;
            };
            

            projectsSrvc.getProjects().then(
                function successCallback(response) {
                    console.log(response.data);

                    vm.projects = response.data;


                    
                    // this callback will be called asynchronously
                    // when the response is available
                },
                function errorCallback(response) {
                    console.error(response);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                }
            );

            vm.deleteProject = function(projectID) {
                
                

                console.log("DELETING PROJECT");

                projectsSrvc.deleteProject(projectID).then(function(){
                    $state.go('projectsList');
                })
            }

            return vm;
        }
    }
)();