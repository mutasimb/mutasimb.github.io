var app = angular.module("eimsRenovForm", ["ngRoute", "ngMaterial", "firebase"]);

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCKLd2-bgJ8bm0QT8hjmZbTeDhLv7EP72U",
  authDomain: "eims-forms.firebaseapp.com",
  databaseURL: "https://eims-forms.firebaseio.com",
  projectId: "eims-forms",
  storageBucket: "eims-forms.appspot.com",
  messagingSenderId: "579891652264"
});

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/login", { templateUrl: "views/login.html", controller: "LoginController" })
                .when("/home", { templateUrl: "views/home.html", controller: "HomeController" })
                .when("/submit", { templateUrl: "views/submit.html", controller: "SubmitController" })
                .when("/report", { templateUrl: "views/report.html", controller: "ReportController" })
                .when("/create", { templateUrl: "views/create.html", controller: "CreateController" })
                .otherwise({ redirectTo: "/login" });
}]);

app.controller("HomeController", function($scope, $firebaseObject) {
  $scope.test = "Test";
});
