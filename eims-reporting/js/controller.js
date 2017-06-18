app.controller("ToolbarController", function($scope, $rootScope, $firebaseAuth, $firebaseObject) {
  $scope.authObj = $firebaseAuth();
  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if(firebaseUser) {
      $rootScope.signedIn = $firebaseObject(firebase.database().ref("user/" + firebaseUser.uid));
      document.getElementById("go-home").click();
    } else {
      $rootScope.signedIn = false;
      document.getElementById("go-login").click();
    }
  });

  $scope.showEm = function() {
    console.log($rootScope.signedIn);
  }
});

app.controller("LoginController", function($scope, $firebaseAuth) {
  $scope.authObj = $firebaseAuth();
  $scope.test = "Hello there!";

  $scope.userLogin = function(e) {
    $scope.authObj.$signInWithEmailAndPassword($scope.userAuth.email, $scope.userAuth.pass)
      .then(function(firebaseUser) { console.log("Signed in as:", firebaseUser.uid); })
      .catch(function(error) { console.error("Authentication failed:", error); });
    console.log($scope.userAuth);
  }

  $scope.checkAuth = function() {
    var firebaseUser = $scope.authObj.$getAuth();
    if(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
    } else {
      console.log("Signed out");
    }
  }
});

app.controller("SubmitController", function($scope, $firebaseArray) {

  var addZero = function(num) {
    if(parseInt(num) < 10) {
      return "0"+num;
    } else {
      return num;
    }
  }

  $scope.next = function() {
    var pagesSubmitActive = document.querySelector("#content > .active");
    if(pagesSubmitActive.nextElementSibling) {
      pagesSubmitActive.classList.remove("active");
      pagesSubmitActive.nextElementSibling.classList.add("active");
    }
  }

  $scope.shorten = function(str) {
    return str.substr(1);
  }

  var projectsList = firebase.database().ref("project"); projectsList = $firebaseArray(projectsList);
  projectsList.$loaded().then(function() {
    $scope.projectsList = projectsList;
  });

  $scope.clickedProject = function(obj) {
    $scope.next();
    $scope.selectedProject = obj;
  }

  $scope.submitObservation = function(obj) {

    var newSubmission = $scope.selectedProject;

    newSubmission.metaReport = {
      submittedBy: $scope.report.meta.submittedBy,
      submittedTo: $scope.report.meta.submittedTo,
      date: $scope.report.meta.date.getTime(),
      dateLast: $scope.report.meta.dateLast.getTime(),
      dateNext: $scope.report.meta.dateNext.getTime()
    };

    newSubmission.remarks = {
      dateStart: $scope.report.remarks.dateStart.getTime(),
      dateTarget: $scope.report.remarks.dateTarget.getTime(),
      progress: $scope.report.remarks.progress,
      quality: $scope.report.remarks.quality,
      safety: $scope.report.remarks.safety,
      weather: $scope.report.remarks.weather,
      external: $scope.report.remarks.external
    };

    for(i = 0; i < Object.keys($scope.report.progress).length; i++) {
      var keyM = Object.keys($scope.report.progress)[i];
      for(j = 0; j < Object.keys($scope.report.progress[keyM]).length; j++) {
        var keyT = Object.keys($scope.report.progress[keyM])[j];
        $scope.selectedProject.milestones[keyM][keyT].progress = $scope.report.progress[keyM][keyT];
      }
    };

    delete newSubmission["$$hashKey"];
    delete newSubmission["$id"];
    delete newSubmission["$priority"];

    firebase.database().ref("submissions/" + newSubmission.meta.code).push(newSubmission);
  }

});

app.controller("CreateController", function($scope, $firebaseArray) {

  var addZero = function(num) {
    if(parseInt(num) < 10) {
      return "0"+num;
    } else {
      return num;
    }
  }

  // $scope.project = {address: "Nakhalpara", code: "TST-004", dist: "Dhaka", name: "TEST PROJECT 04", type: "retrofitting"};
  // $scope.milestones = [{"id":"1","tasks":[{"task":"101","name":"Mobilization","weight":5},{"task":"102","name":"Any Type of Dismantling & Demolishion Work","weight":10},{"task":"103","name":"Brick Work of Any thickness","weight":10},{"task":"104","name":"Plaster Work","weight":20}]},{"id":2,"tasks":[{"task":"201","name":"Tiles Work (Floor tiles & Wall Tiles)","weight":15},{"task":"202","name":"Door & Window Work","weight":5},{"task":"203","name":"Sanitary Work","weight":5},{"task":"204","name":"Electrical Work","weight":10},{"task":"205","name":"Paint Work","weight":15},{"task":"206","name":"Misc/Other Work (Stated in BOQ)","weight":5}]}];
  $scope.milestones = [{"id":"1", "tasks": [{"task":"101"}]}];

  $scope.print = function() {
    console.log($scope.project);
  }

  $scope.next = function() {
    var pagesCreateActive = document.querySelector("#content > .active");
    if(pagesCreateActive.nextElementSibling) {
      pagesCreateActive.classList.remove("active");
      pagesCreateActive.nextElementSibling.classList.add("active");
    }
  }

  $scope.addMS = function() {
    $scope.milestones.push({
      id: $scope.milestones.length+1,
      tasks: [{task: String($scope.milestones.length+1)+"01", name: ""}]
    });
  }

  $scope.addTask = function(e) {
    var msId = e.target.dataset.msid;
    var taskLast = $scope.milestones[parseInt(msId)-1].tasks.length;

    $scope.milestones[parseInt(msId)-1].tasks.push({task: msId + addZero( String(taskLast+1) ), name: ""});
  }

  $scope.createProject = function() {
    firebase.database().ref("project/" + $scope.project.code + "/meta").set($scope.project).then(function() {
      var milestone = {};
      var wtCoeff = 0;
      for(i = 0; i < $scope.milestones.length; i++) {
        milestone["m" + addZero(i+1)] = {};
        for(j = 0; j < $scope.milestones[i].tasks.length; j++) {
          wtCoeff = wtCoeff + $scope.milestones[i].tasks[j].weight;
        }
      }
      wtCoeff = 100 / wtCoeff;
      for(i = 0; i < $scope.milestones.length; i++) {
        milestone["m" + addZero(i+1)] = {};
        for(j = 0; j < $scope.milestones[i].tasks.length; j++) {
          $scope.milestones[i].tasks[j].weight = $scope.milestones[i].tasks[j].weight*wtCoeff;
        }
      }
      for(i = 0; i < $scope.milestones.length; i++) {
        milestone["m" + addZero(i+1)] = {};
        for(j = 0; j < $scope.milestones[i].tasks.length; j++) {
          milestone["m" + addZero(i+1)]["t" + addZero(j+1)] = $scope.milestones[i].tasks[j];
          delete milestone["m" + addZero(i+1)]["t" + addZero(j+1)]["$$hashKey"];
        }
      }
      firebase.database().ref("project/" + $scope.project.code + "/milestones").set(milestone);
    });
  }

});

app.controller("ReportController", function($scope, $firebaseArray) {

  $scope.next = function() {
    var pagesSubmitActive = document.querySelector("#content > .active");
    if(pagesSubmitActive.nextElementSibling) {
      pagesSubmitActive.classList.remove("active");
      pagesSubmitActive.nextElementSibling.classList.add("active");
    }
  }

  $scope.shorten = function(str) {
    return str.substr(1);
  }

  $scope.countObjKeys = function(obj) {
    return Object.keys(obj).length;
  }

  $scope.countMilestoneRows = function(obj) {
    var count = 0;
    for(i = 0; i < Object.keys(obj).length; i++) {
      var k1 = Object.keys(obj)[i];
      for(j = 0; j < Object.keys(obj[k1]).length; j++) {
        var k2 = Object.keys(obj[k1])[j];
        console.log(obj[k1][k2]);
        count = count + 1;
      }
    }
    return count
  }

  $scope.timeToDate = function(time) {
    var convertible = new Date; convertible.setTime(time);
    return d3.timeFormat("%B %-d, %Y")(convertible)
  }

  var reportList = firebase.database().ref("submissions"); reportList = $firebaseArray(reportList);
  reportList.$loaded().then(function() {
    $scope.reportList = reportList;
  });

  $scope.clickedReport = function(rep) {
    $scope.next();
    $scope.viewingReport = rep;
  }

});
