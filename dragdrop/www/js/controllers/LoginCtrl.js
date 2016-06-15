app.controller('LoginCtrl', function($scope, $ionicLoading, $stateParams, $timeout, ionicMaterialMotion, LoginService, $ionicPopup, $state, Parse) {

    $scope.busyShow = function() {
      $ionicLoading.show({
          template: '<ion-spinner icon="ios" class="spinner-light"></ion-spinner>'
      });
    };
    $scope.busyHide = function() {
      $ionicLoading.hide()
    };

    $scope.data = {};
 
    $scope.login = function() {
        $scope.busyShow();
        var e = Parse.User.logIn($scope.data.username, $scope.data.password, {
            success: function(user) {
                // Do stuff after successful login.
                console.log('success');
                $scope.busyHide();
                $state.go('app.lists');
            },
            error: function(user, error) {
                // The login failed. Check error to see why.
                $scope.busyHide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
            }
        });
        if(e._rejected) {
            $scope.busyHide();
        }
    }


    var reset = function() {
        var inClass = document.querySelectorAll('.in');
        for (var i = 0; i < inClass.length; i++) {
            inClass[i].classList.remove('in');
            inClass[i].removeAttribute('style');
        }
        var done = document.querySelectorAll('.done');
        for (var i = 0; i < done.length; i++) {
            done[i].classList.remove('done');
            done[i].removeAttribute('style');
        }
        var ionList = document.getElementsByTagName('ion-list');
        for (var i = 0; i < ionList.length; i++) {
            var toRemove = ionList[i].className;
            if (/animate-/.test(toRemove)) {
                ionList[i].className = ionList[i].className.replace(/(?:^|\s)animate-\S*(?:$|\s)/, '');
            }
        }
    };

    $scope.ripple = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
        setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 500);
    };

    $scope.fadeSlideInRight = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in-right';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideInRight();
        }, 500);
    };

    $scope.fadeSlideIn = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideIn();
        }, 500);
    };

    $scope.blinds = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds(); // ionic.material.motion.blinds(); //ionicMaterialMotion
        }, 500);
    };

    $timeout(function() {
    	$scope.fadeSlideIn();
    },100);

// Parse.User.logOut().then(() => {
//   var currentUser = Parse.User.current();  // this will now be null
// });

    // check to see if the user is logged in and then redirect to login
    var currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        $state.go('app.lists');
    } else {
        // show the signup or login page
        console.log('user not logged in');
    }



})

.factory('Parse', [function () {
    Parse.initialize("84SypQ6fm2G8UcxX4enfo1deEcE11c77", "JAVASCRIPT_ID_HERE");
    Parse.serverURL = 'https://delect-dev.azurewebsites.net/parse';

    return Parse;
}])