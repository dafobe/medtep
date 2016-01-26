
angular.module('PatientsApp')
.factory('PatientsService', PatientsService);

function PatientEntry(id, name, lastName, status){
	this.id = id;
	this.name = name;
	this.lastName = lastName;
	this.status = status;
}

PatientEntry.prototype.setStatus = function (status){
	this.status = status;
	
	return this;
}

function PatientsService($q, $http) {
	'use strict';
	var PatientsService = {},
		_patients = [];
		
	var _setPatientEntries = function(patientsJSON){
		if(Array.isArray(patientsJSON)){
			_patients = patientsJSON.map(function(patientObj){
				return new PatientEntry(patientObj.id, patientObj.name, patientObj.surname)
			});
		}
	}
	var _getPatients = function(){
		var deferred = $q.defer();

		$http.get('https://demo3417391.mockable.io/patients')
			.success(function (data) {
				if(data.results){
					_setPatientEntries(data.results);
				}
				console.log(_patients)
				deferred.resolve(_patients);
			})
			.error(function (data) {
				deferred.reject(data);
			});
		
		return deferred.promise;
	}
		
	//Public API
	return {
		getPatients : _getPatients
	};
}