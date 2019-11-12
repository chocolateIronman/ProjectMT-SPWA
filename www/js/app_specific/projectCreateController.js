(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectCreateCtrl',control);

        control.$inject = [
            '$state',
            //'projectsSrvc'
        ];

        function control(
            $state,
            //projectsSrvc
        ) {
            var vm = angular.extend(this, {
                
            });

            vm.saveProject = function () {
                console.log("SAVING PROJECT!!!");
                //TODO: Error Handling
                //projectsSrvc.createProject().then(function(){
                    //$state.go('projectsList');
                //});
            };

        }
    }
)();