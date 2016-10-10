angular.module('TemperatureMonitorApp')
  .controller('TemperatureMonitorController', function($scope, TemperatureMonitorService) {
    $scope.recordedTemperatures = [];
    $scope.recordTemperature = function() {
      if ($scope.temperature === undefined || $scope.temperature === null || isNaN($scope.temperature)) {
        $scope.errorMessage = 'Please enter valid number';
        alert($scope.errorMessage);
        return;
      }
      TemperatureMonitorService.recordTemperature($scope.temperature);
      $scope.recordedTemperatures = TemperatureMonitorService.recordedTemperatures;
      $scope.temperature = null;
    }

    $scope.getCurrentMedian = function() {


      try {
        $scope.currentMedian = TemperatureMonitorService.getCurrentMedian();
      } catch (err) {
        if(err.message == 'Input cannot be empty')
        {
          $scope.errorMessage = 'No temperatures recorded to calculate mean. Please record temperature using ADD button above';
          alert($scope.errorMessage);
        }
      }
    }

    $scope.reset = function() {
      TemperatureMonitorService.recordedTemperatures = angular.copy([]);
      $scope.recordedTemperatures = angular.copy([]);
      $scope.currentMedian = null;
    }

  });