(function(){
	function appConfig ( $routeProvider ) {
    	'use strict';
    	$routeProvider
	    	.when('/patients', {
	    		templateUrl: 'views/patients.html',
	    		controller: 'PatientsCtrl',
	    		controllerAs: 'patients'
	    	}) 
	    	.otherwise({
	    		redirectTo: '/patients'
	    	});
    }
	
	function appRun ($rootScope){
    	$rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
    		console.log(event, current, previous, rejection)
    	});
    }
	
	angular
		.module('PatientsApp', ['ngRoute'])
		.config(appConfig)
		.run(appRun);
})()