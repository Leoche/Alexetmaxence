var app = angular.module('adminApp', []);
app.controller('adminController', ["$scope","$http",function($scope,$http) {
	$http.get('res/admin.json').success(function(data) {
		$scope.infos = data;
	});
	$scope.saved = false;
	$scope.active = null;
	$scope.setActive = function(active){
		if($scope.active == active) $scope.active = null;
		else $scope.active = active;
	}
	$scope.isActive = function(active){
		return $scope.active == active;
	}
	$scope.addLink = function(){
		$scope.infos.livres[$scope.active].liens.push({
			"quote":"",
			"link":"",
			"site":""
		});
	}
	$scope.removeLink = function(index){
		$scope.infos.livres[$scope.active].liens.splice(index, 1);
	}
	$scope.addBook = function(){
		var livre = {
			"title":"Nouveau livre",
			"color":"#17152b",
			"cover":"",
			"histoire":"",
			"liens":[
			],
			"kindle_link":"",
			"kindlefire_link":""
		}
		$scope.infos.livres.push(livre);
	}
	$scope.removeBook = function(index){
		$scope.infos.livres.splice(index, 1);
	}
	$scope.resetAll = function(){
		$http.get('res/admin.json').success(function(data) {
			$scope.infos = data;
		});
		$scope.active = null;
	}
	$scope.submit = function(){
		$http.post("/save.php",$scope.infos);
		$scope.saved=true;
	}
}]);