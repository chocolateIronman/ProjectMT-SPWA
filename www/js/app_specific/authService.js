(function () {
    'use strict';

    angular
        .module('authjs')
        .factory('authSrvc', authSrvc);

    authSrvc.$inject = [
        '$q',
        '$timeout',
        'credentialsSrvc'
    ];

    function authSrvc(
        $q,
        $timeout,
        $credentialsSrvc
    ) {
        var service = {};
        var expToken = 100000;//milliseconds to get stuff done before access token expires

        function doAuth(success, fail) {
            var url = $credentialsSrvc.authServiceUri +
                "?client_id=" + $credentialsSrvc.clientID +
                "&scope=" + encodeURIComponent($credentialsSrvc.scopes) +
                "&response_type=token" +
                "&redirect_uri=" + encodeURIComponent($credentialsSrvc.redirectUri);

            //Extract the auth token from URL:
            function getAuthInfoFromUrl(url) {
                var authResponse = url.split("#")[1];
                var toJson = '{"' + authResponse.replace(/&/g, '","').replace(/=/g, '":"') + '"}';
                var authInfo = JSON.parse(
                    toJson,
                    function (key, value) { return key === "" ? value : decodeURIComponent(value); }
                );
                return authInfo;
            }


            function popup(url) {
                var width = 525,
                    height = 525,
                    screenX = window.screenX,
                    screenY = window.screenY,
                    outerWidth = window.outerWidth,
                    outerHeight = window.outerHeight;

                var left = screenX + Math.max(outerWidth - width, 0) / 2;
                var top = screenY + Math.max(outerHeight - height, 0) / 2;

                var features = [
                    "width=" + width,
                    "height=" + height,
                    "top=" + top,
                    "left=" + left,
                    "status=no",
                    "resizable=yes",
                    "toolbar=no",
                    "menubar=no",
                    "clearcache=yes",
                    "clearsessioncache=yes",
                    "cleardata=yes",
                    "scrollbars=yes"];

                var ref = window.open(url, "_blank", features.join(","));
                ref.addEventListener('loadstart',
                    function (event) {
                        if ((event.url).startsWith(credentialsSrvc.redirectShort)) {
                            var authInfo = getAuthInfoFromUrl(event.url);
                            storeAuthInfo(authInfo);
                            ref.close();
                            success();
                        }
                    }
                );
            }
            popup(url);

        }

        function storeAuthInfo(authInfo){
            if(!(authInfo==null)){
                var currentTime_ms=new Date().getTime();
                var expiresAt_ms=currentTime_ms+(authInfo.expires_in*1000);
                authInfo.expires_at_ms=expiresAt_ms;
                localStorage.setItem("authInfo",JSON.stringify(authInfo));
            }else{
                localStorage.removeItem("authInfo");
            }
        }

        function getAuthInfo(){
            var result = null;
            try{
                result=JSON.parse(localStorage.getItem("authInfo"));
            }catch(e){
                //ignore-will simply return null;
            }
            return result;
        }

        function isAuthenticated(){
            var result = false;
            try{
                var authInfo=getAuthInfo();
                if(!(authInfo==null)){
                    var currentTime_ms=new Date().getTime();
                    if(currentTime_ms+expToken<authInfo.expires_at_ms){
                        result=true;
                    }
                }
            }catch(e){}
            return result;
        }

        function clear(){
            storeAuthInfo(null);
        }

        function authenticate(){
            var deffered = $q.defer();
            storeAuthInfo(null);

            $timeout(
                function(){
                    doAuth(
                        deffered.resolve,
                        deffered.reject
                    )
                }
            );

            return deffered.promise;
        }

        service.clear=clear;
        service.getAuthInfo=getAuthInfo;
        service.isAuthenticated=isAuthenticated;
        service.authenticate=authenticate;

        return service;
    }
})();