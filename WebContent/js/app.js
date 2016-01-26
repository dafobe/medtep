(function(){
	angular.module('PatientsApp', [
	                                    'ngRoute'
	                                    ]).config(function ( $routeProvider ) {
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
	                                    }).run(function($rootScope){
	                                    	$rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
	                                    		console.log(event, current, previous, rejection)
	                                    	});
	                                    });
})()