(function() {
    'use strict';

    angular
        .module('authjs')
        .factory('credentialsSrvc',credentialsSrvc);

        credentialsSrvc.$inject=[];
    
        function credentialsSrvc(

        ){
            var service={
                clientID:'m8xd6h14Rgp4W26OXmL2EcD39Z0p5JD6',
                domain: "projectmt.eu.auth0.com",
                responseType: 'token id_token',
                redirectShort:"http://localhost/callback",
                //redirectUri:"https://chocolateironman.github.io/ProjectMT-SPWA/admin/auth",
                redirectUri:"http://localhost/callback.html",
                scopes:"admin",
                audience:"https://www.projectmt/projectmtadmin",
                authServiceUri:"https://projectmt.eu.auth0.com/authorize"
            };
            return service;
        }
})();