
describe('Temperature Monitor Test Suite', function() {
  beforeEach(module('TemperatureMonitorApp'));

  var $controller;
  var $service;
  
  beforeEach(inject(function(_$controller_,_TemperatureMonitorService_){
      $controller = _$controller_;
      $service = _TemperatureMonitorService_;
  }));


  describe('recordTemperature', function() {
    it('1. sets the input temperature to "[5,7]"', function() {
      var $scope = {};
      var controller = $controller('TemperatureMonitorController', { $scope: $scope });
      $scope.temperature = 5;
      $scope.recordTemperature();
      $scope.temperature = 7;
      $scope.recordTemperature();
      expect($scope.recordedTemperatures).toEqual([5,7]);
    });
    
     it('2. sets the errorMessage to "Please enter valid number" if input is not number', function() {
      var $scope = {};
      var controller = $controller('TemperatureMonitorController', { $scope: $scope });
      $scope.temperature = 'longerthaneightchars';
      $scope.recordTemperature();
      expect($scope.errorMessage).toEqual('Please enter valid number');
    });
    
    it('3. sets the errorMessage to "Please enter valid number" if input is null', function() {
      var $scope = {};
      var controller = $controller('TemperatureMonitorController', { $scope: $scope });
      $scope.temperature = null;
      $scope.recordTemperature();
      expect($scope.errorMessage).toEqual('Please enter valid number');
    });
    
  });
  
  describe('getCurrentMedian', function() {
    
    it('1. sets the median temperature to "4" if $scope.recordedTemperatures is set to [5, 1, -7, 7, 8, 3] - Even Input', function() {
      var $scope = {};
      $service.recordedTemperatures = [5, 1, -7, 7, 8, 3]; 
      var controller = $controller('TemperatureMonitorController', { $scope, $service });
      $scope.getCurrentMedian();
      expect($scope.currentMedian).toEqual(4);
    });
    
     it('2. sets the median temperature to "5" if $scope.recordedTemperatures is set to [5, 1, -7, 7, 8, 3, 9] -  Odd Input', function() {
      var $scope = {};
      $service.recordedTemperatures = [5, 1, -7, 7, 8, 3, 9]; 
      var controller = $controller('TemperatureMonitorController', { $scope, $service });
      $scope.getCurrentMedian();
      expect($scope.currentMedian).toEqual(5);
    });
    
    it('3. sets the $scope.errorMessage temperature to "No temperatures recorded to calculate mean. Please record temperature using ADD button above" if getCurrentMedian function called on empty array - No Input', function() {
      var $scope = {};
      $service.recordedTemperatures = []; 
      var controller = $controller('TemperatureMonitorController', { $scope, $service });
      $scope.getCurrentMedian();
      expect($scope.errorMessage).toEqual('No temperatures recorded to calculate mean. Please record temperature using ADD button above');
    });
    
  });
  
  describe('TemperatureMonitorService.getCurrentMedian', function() {
    it('throws exception on calculating median if input is empty', function() {
        expect(function(){$service.getCurrentMedia()}).toThrow();
    });
  });
  
});