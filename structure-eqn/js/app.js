angular.module("eqnApp", [])
  .controller("CalcController", function($scope) {
    $scope.bw = "";
    $scope.d = "";
    $scope.ph = "";
    $scope.aoh = "";
    $scope.rhs = "";

    $scope.varChosen  = {};
    $scope.varChosen.elem  = "0";

    $scope.calc = function() {
      $scope.vuTable = [];
      $scope.tuTable = [];
      var varIncreament = ($scope.varChosen.upper - $scope.varChosen.lower)/($scope.varChosen.iter-1);

      if($scope.varChosen.elem == "0") {
        for(i = 0; i < $scope.varChosen.iter; i++) {
          var Vu = $scope.varChosen.lower + varIncreament*i;
          var Tu = (1.7/$scope.ph*Math.pow($scope.aoh, 2))*Math.sqrt((Math.pow($scope.rhs, 2))-(Math.pow((Vu/($scope.bw*$scope.d)), 2))); Tu = Tu/12;

          $scope.vuTable.push({
            iVu : Vu,
            iTu : Tu
          });
        }
      } else {
        for(i = 0; i < $scope.varChosen.iter; i++) {
          var Tu = $scope.varChosen.lower + varIncreament*i;
          var Vu = $scope.bw*$scope.d*Math.sqrt((Math.pow($scope.rhs, 2))-(Math.pow((Tu*12*$scope.ph/(1.7*Math.pow($scope.aoh, 2))), 2)));

          $scope.tuTable.push({
            iVu : Vu,
            iTu : Tu
          });
        }
      }
    }

    $scope.isNan = function(num) {
      return isNaN(num)
    }

    $scope.rounding = function(num, rn) {
      return (Math.round(num * Math.pow(10, rn)))/Math.pow(10, rn);
    }

  });
