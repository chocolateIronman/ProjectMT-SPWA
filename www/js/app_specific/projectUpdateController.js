(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectUpdateCtrl',control);

        control.$inject = [
            '$state',
            '$stateParams',
            'projectsSrvc',
            'categorySrvc',
            '$scope',
            'moment'
        ];

        function control(
            $state,
            $stateParams,
            projectsSrvc,
            categorySrvc,
            $scope,
            moment
        ) {
            var vm = angular.extend(this, {
                project : {
                    name: "no name",
                    category: "no category",
                    startDate: "0",
                    endDate: "0",
                    year: "no year",
                    notes: "no notes"
                },
                newProject : {},

                categories: [],
                displayCategories: [],
                showAddButton: false,
                newCategory: {},
                startDateHolder: Date(),
                endDateHolder: Date()
            });
           
            var projectid=$stateParams.projectID;

            console.log("ProjectID " + projectid);

            projectsSrvc.getProject(projectid).then(
                function successCallback(response) {
                    console.log(response.data[0]);

                    vm.project = response.data[0];
                    /* console.log(response.data[0].EndDate);*/
                    //vm.project.EndDate=(parseInt(response.data[0].EndDate));
                   
                    
                    // this callback will be called asynchronously
                    // when the response is available
                },
                function errorCallback(response) {
                    console.error(response);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                }
            );
        
            categorySrvc.getCategories().then(
                function successCallback(response) {
                    console.log(response.data);

                    vm.categories = response.data;
                },
                function errorCallback(response){
                    console.error(response);
                }
            );

            vm.searchCategory = function searchCategory(input){
                var tempCategory = [];
                console.log("Searching for "+input);

                var j=0;
                if(angular.isUndefined(input)||input==null||input==""){
                    vm.showAddButton=false;
                    return null;
                } else{
                    for(var i=0;i<vm.categories.length;i++){
                        if(vm.categories[i].name.toLowerCase().includes(input.toLowerCase())){
                            tempCategory[j]=vm.categories[i];
                            j++;
                        }
                    }
                    if(tempCategory.length==0){
                        vm.showAddButton=true;
                    }else{
                        vm.showAddButton=false;
                    }
                    return tempCategory;
                }
            }

            document.getElementById('categorySearchInput').addEventListener('input',function(){
                setTimeout(function() {
                    vm.displayCategories=vm.searchCategory(document.getElementById('categorySearchInput').value);
                    console.log(vm.displayCategories);
                    $scope.$apply();
                },0);
            })

            vm.onItemSelected = function(index){
                console.log("Category index: "+index);
                var categoryId = vm.displayCategories[index].id;
                console.log("Category id: "+categoryId);
                vm.newProject.ProjectCategory=categoryId;
                console.log(vm.newProject.ProjectCategory);
            }

            vm.saveCategory = function () {
                console.log("SAVING CATEGORY!");
                console.table(vm.newCategory);
                categorySrvc.createCategory(vm.newCategory).then(function(){
                    categorySrvc.getCategories().then(
                        function successCallback(response) {
                            console.log(response.data);
                            var foundCategory={};
                            vm.categories = response.data;
                            vm.categories.forEach(function(category){
                                if(category.name==vm.newCategory.name) {
                                    foundCategory=category.id;
                                }
                            });
                            console.log("FOUND CATEGORY "+foundCategory);
                            console.table(foundCategory);

                            vm.newProject.ProjectCategory=foundCategory;
                        },
                        function errorCallback(response){
                            console.error(response);
                        }
                    );
                });
            }
            
                
            vm.updateProject = function () {
                vm.newProject.StartDate=moment(vm.startDateHolder,"DD/MM/YYYY").valueOf();
                if(isNaN(vm.newProject.StartDate)){
                    vm.newProject.StartDate=parseInt(vm.project.StartDate);
                }
                vm.newProject.EndDate=moment(vm.endDateHolder,"DD/MM/YYYY").valueOf();
                if(isNaN(vm.newProject.EndDate))
                {
                    vm.newProject.EndDate=parseInt(vm.project.EndDate);
                }
                console.log("UPDATING PROJECT with",vm.newProject);
               
                Object.getOwnPropertyNames(vm.project).forEach(function(key){
                    if(vm.newProject[key]==null){
                        console.log("key= "+key);
                        if (key=="id") {
                            //vm.newProject.ProjectID=vm.project[key];
                        }else{
                        vm.newProject[key]=vm.project[key];
                        }
                    }
                    
                })
                

                if (vm.newProject.ProjectCategory == null || vm.newProject.ProjectCategory == undefined) {
                    var foundID;
                    console.log("GETTING CATEGORY");
                    categorySrvc.getCategories().then(
                        function successCallback(response) {
                            console.log(response.data);
                            var foundCategory = {};
                            vm.categories = response.data;
                            vm.categories.forEach(function (category) {
                                if (category.name == vm.newProject.name) {
                                    foundID = category.id;
                                }
                            });
                            console.log("FOUND id " + foundID);
                            //console.table(foundCategory);

                            vm.newProject.ProjectCategory = foundID;
                            delete vm.newProject.name;
                            console.log("fixed proj = ", vm.newProject);



                            console.log("oldproject", vm.project);
                            console.log("update formatting", vm.newProject);
                            projectsSrvc.updateProject(vm.newProject, projectid).then(function success() {
                                console.log("leaving now")
                                $state.go('projectView', { selected: projectid });
                            },
                                function error(err) {
                                    console.log(err);
                                });
                        },
                        function errorCallback(response) {
                            console.error(response);
                        }
                    );
                } else {












                    console.log("oldproject", vm.project);
                    console.log("update formatting", vm.newProject);
                    projectsSrvc.updateProject(vm.newProject, projectid).then(function success() {
                        console.log("leaving now")
                        $state.go('projectView', { selected: projectid });
                    },
                        function error(err) {
                            console.log(err);
                        });
                }
            };

            return vm;
        }
    }
)();