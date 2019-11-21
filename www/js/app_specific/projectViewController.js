(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectViewCtrl',control);

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
                }
            })

            var params = $stateParams;
            //console.log("PARAMS",params);

            projectsSrvc.getProject(params.selected).then(
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
        }
    }
)();