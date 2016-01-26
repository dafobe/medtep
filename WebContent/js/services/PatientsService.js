
angular
	.module('PatientsApp')
	.factory('PatientsService', PatientsService);

function PatientsService($q, $http, PatientEntry) {
	'use strict';
	var PatientsService = {},
		_patients = [],
		datasource = 'https://demo3417391.mockable.io';
		
	var _setPatientEntries = function(patientsJSON){
		if(Array.isArray(patientsJSON)){
			_patients = patientsJSON.map(function(patientObj){
				return new PatientEntry(patientObj.id, patientObj.name, patientObj.surname)
			});
		}
		
		return _patients;
	}
	var _getPatientsStatusJSON = function(){
		var deferred = $q.defer();

		$http.get(datasource+'/patient_status')
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject(data);
			});
		
		return deferred.promise;
	}
	var _getPatientsJSON = function(){
		var deferred = $q.defer();

		$http.get(datasource+'/patients')
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject(data);
			});
		
		return deferred.promise;
	}
	
	var _getPatients = function(){
		$q.all({
				patientsPromise : _getPatientsJSON(),
				statusPromise : _getPatientsStatusJSON()
				})
		.then(function(values) {       
			console.log(values);
			var patients = _patients;
			//Create Patient
			values.patientsPromise && _setPatientEntries(values.patientsPromise.results);
			//Add status to patients
			values.statusPromise && values.statusPromise.results.forEach(function(status){
				var patient = _patients.filter(function(patient){
					return patient.id === status.patient
				});
				
				patient.length && patient.forEach(function(patientEntry){
					patientEntry.setStatus(status.status);
				})
			})
			
			console.log(_patients);
			return _patients;
		});
	}
	//Public API
	return {
		getPatients : _getPatients
	};
}