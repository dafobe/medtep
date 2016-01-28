
angular
	.module('PatientsApp')
	.factory('PatientsService', PatientsService);

function PatientsService($q, $http, PatientEntry) {
	'use strict';
	var PatientsService = {},
		_patients = [],
		datasource = 'https://demo3417391.mockable.io';
		
	var _setPatientEntries = function(patientsJSON){
		var patients = [];
		
		if(Array.isArray(patientsJSON)){
			patients = patientsJSON.map(function(patientObj){
				return new PatientEntry(patientObj.id, patientObj.name, patientObj.surname)
			});
		}
		
		return patients;
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
	var _updatePatients = function(values) {       
		var patients = [];
		//Create Patient
		patients = _setPatientEntries(values.patientsPromise.results);
		//Add status to patients
		values.statusPromise && values.statusPromise.results.forEach(function(status){
			var patient = patients.filter(function(patient){
				return patient.id === status.patient
			});
			
			patient.length && patient.forEach(function(patientEntry){
				patientEntry.setStatus(status.status);
			})
		})
		return patients;
	}
	var _getPatients = function(){
		var finalPromise = $q.all({
								patientsPromise : _getPatientsJSON(),
								statusPromise : _getPatientsStatusJSON()
								}); 
		
		finalPromise.then();
		console.log(_patients);
		return finalPromise;
	}
	//Public API
	return {
		getPatients: _getPatients,
		updatePatients: _updatePatients
	};
}