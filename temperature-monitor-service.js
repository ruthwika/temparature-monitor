angular.module('TemperatureMonitorApp')
  .factory('TemperatureMonitorService', function() {

    var TemperatureMonitor = {};

    TemperatureMonitor.recordedTemperatures = [];

    TemperatureMonitor.recordTemperature = function(temperartureToRecord) {
      TemperatureMonitor.recordedTemperatures.push(temperartureToRecord);

    }

    TemperatureMonitor.getCurrentMedian = function() {

      //sort the array 
      var sortedRecordedTemperatures = TemperatureMonitor.recordedTemperatures.slice(0).sort(function(a,b){return a - b});
      //find the lenght of the array 
      var totalRecordedTemperatures = sortedRecordedTemperatures.length;
      
      if(totalRecordedTemperatures <= 0)
      {
        throw new Error("Input cannot be empty");
      }
      
      if (totalRecordedTemperatures % 2 == 0) {
        var middleIndexAtNBy2 = totalRecordedTemperatures / 2;
        var middleIndexAtNBy2Plus1 = middleIndexAtNBy2 + 1;
        var median = (sortedRecordedTemperatures[middleIndexAtNBy2 - 1] + sortedRecordedTemperatures[middleIndexAtNBy2Plus1 - 1]) / 2;

        return median;
      } else {
        var middleIndexAtNPlus1By2 = (totalRecordedTemperatures + 1) / 2;
        var median = sortedRecordedTemperatures[middleIndexAtNPlus1By2 - 1];
        return median;
      }

    }

    return TemperatureMonitor;

  });