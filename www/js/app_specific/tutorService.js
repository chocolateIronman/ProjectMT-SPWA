(function () {
    'use strict';

    angular
        .module('authjs')
        .factory('tutorSrvc',tutorSrvc);

    tutorSrvc.$inject=[
        '$q',
        '$timeout',
        '$http',
        'authSrvc'
    ];

    function tutorSrvc(
        $q,
        $timeout,
        $http,
        authSrvc
    ) {
        var service = {};
        service.tutors =[];

        service.createTutor = function createTutor() {
            var deferred = $q.defer();
            var token=authSrvc.getAuthInfo().access_token;
            console.log(JSON.stringify(token,null,2));
            $http({
                method: 'POST',
                url:'https://projectmt.herokuapp.com:443/tutor',
                //url:'http://172.20.10.5:8080/tutor',
                headers: {
                    "Content-Type" : 'application/json',
                    "Authorization" : 'Bearer '+token
                },
                data: ''
            }).then(
                function Success(response){
                    
                    deferred.resolve(response);
                }, function Fail(error){
                    if(error.status==409)
                    {
                        deferred.resolve();
                    }
                    else{
                        deferred.reject(new Error("Problem with network!"));
                    }
                    
                }
            )
            return deferred.promise;
        }

        

        return service;
    }
})();