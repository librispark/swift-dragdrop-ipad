app.controller('ListsCtrl', function ($scope, $filter, $stateParams, $ionicModal, $timeout, ionicMaterialMotion) {

    $scope.resTypes = [{
      type: 'American', 
      selected: false
    }, {
      type: 'Mexican', 
      selected: false
    }, {
      type: 'German', 
      selected: false
    }, {
      type: 'Latin Indian', 
      selected: false
    }];

    $scope.restuarant2xRows = [];

    $scope.restuarant2xRowsData = [{
        name: 'Cheesecake Factory',
        type: 'American',
        img: 'https://s.yimg.com/ny/api/res/1.2/wGbpyPT.69Qx.i2poSkKPg--/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://l.yimg.com/cd/resizer/2.0/original/0zf1yX89LiMCyT0Lo2ieqPZIEUI',
        distance: '.2 mi',
        tel: '301-977-5655',
        address1: '9811 Washington Blvd',
        address2: 'Gaithersburg, MD'
      }, {
        name: 'Guapo\'s Restuarant',
        type: 'Latin Indian',
        img: 'http://barcodedc.com/wp-content/gallery/food/healthfitnessrevolution-com.jpg',
        distance: '.5 mi',
        tel: '301-977-5655',
        address1: '9811 Washington Blvd',
        address2: 'Gaithersburg, MD'
      }, {
        name: 'Sauf Haus Hall',
        type: 'German',
        img: 'http://vafoodbanks.org/wp-content/uploads/2012/06/fresh_food.jpg',
        distance: '.5 mi',
        tel: '301-977-5655',
        address1: '9811 Washington Blvd',
        address2: 'Gaithersburg, MD'
      }, {
        name: 'Zatinya',
        type: 'American',
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRj6vCxYb_cLlGRllhMrxs-mOvy2pvDvLsyIqLq9mCs_nULWg76',
        distance: '.8 mi',
        tel: '301-977-5655',
        address1: '9811 Washington Blvd',
        address2: 'Gaithersburg, MD'
      }, {
        name: 'Mon Ami Gabi',
        type: 'Latin Indian',
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTS_Gm7FpDlBtNm6SdaLpj4aDTil7RlszACN-E-I6d0WewhjgTz',
        distance: '1.2 mi',
        tel: '301-977-5655',
        address1: '9811 Washington Blvd',
        address2: 'Gaithersburg, MD'
      }, {
        name: 'The Tombs',
        type: 'American',
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSfpW3HVjbp-QDBCenDVyukJ4hTT2uWNFVNpO-jxLHSHcMNTuVY',
        distance: '1.5 mi',
        tel: '301-977-5655',
        address1: '9811 Washington Blvd',
        address2: 'Gaithersburg, MD'
      }, {
        name: 'Cheesecake Factory 2',
        type: 'American',
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT2c9btSW0TK5LyEgseHqGPnAlOtLnR2l--la8iAUBQVAJaYdyP',
        distance: '2.2 mi',
        tel: '301-977-5655',
        address1: '9811 Washington Blvd',
        address2: 'Gaithersburg, MD'
      }, {
        name: 'Guapo\'s Restuarant 2',
        type: 'Mexican',
        img: 'https://knoji.com/images/user/hamburger.jpg',
        distance: '2.5 mi',
        tel: '301-977-5655',
        address1: '9811 Washington Blvd',
        address2: 'Gaithersburg, MD'
      }, {
        name: 'Sauf Haus Hall 2',
        type: 'German',
        img: 'http://pad3.whstatic.com/images/thumb/e/e4/Get-Rid-of-Food-Poisoning-Step-1.jpg/670px-Get-Rid-of-Food-Poisoning-Step-1.jpg',
        distance: '2.5 mi',
        tel: '301-977-5655',
        address1: '9811 Washington Blvd',
        address2: 'Gaithersburg, MD'
      }
    ];

    $ionicModal.fromTemplateUrl('templates/assign-modal.html', function(modal) {
      $scope.modalCtrl = modal;
    }, {
      scope: $scope,  /// GIVE THE MODAL ACCESS TO PARENT SCOPE
      animation: 'slide-in-up', //'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      // focusFirstInput: true
    });

    $scope.openModal = function() {
        $scope.modalCtrl.show();
    };

    $scope.logout = function() {
      // Parse.User.logOut();
    }

    $scope.resTypesFltrd = $filter('filter')($scope.resTypes,{selected:true});
    $scope.resTypesFiltrParams = '';
    for(var x=0; x<$scope.resTypesFltrd.length; x++) {
      if(x===0) {
        $scope.resTypesFiltrParams+=$scope.resTypesFltrd[x].type;
      } else {
        $scope.resTypesFiltrParams+=':'+$scope.resTypesFltrd[x].type;
      }
    }
    $scope.resTypesFltrData = $filter('filter')($scope.restuarant2xRowsData,$scope.resTypesFiltrParams);
    var restuarant2xRowsNewHld = [];
    var dataIndex = 0;
    for(var j=0; j<(Math.round($scope.resTypesFltrData.length/2)); j++) {
      restuarant2xRowsNewHld[j] = [];
      for(var k=0; k<2; k++) {
        restuarant2xRowsNewHld[j][k] = $scope.resTypesFltrData[dataIndex];
        dataIndex++;
      }
    }
    console.log(restuarant2xRowsNewHld);
    $scope.restuarant2xRows = restuarant2xRowsNewHld;

    $scope.processClickFilter = function(res,indx) {
      $scope.restuarant2xRows = [];
      for(var i=0; i<$scope.resTypes.length; i++) {
        if(i!==indx) {
          $scope.resTypes[i].selected = false;
        }
      }
      $scope.resTypes[indx].selected = !$scope.resTypes[indx].selected;

      $scope.resTypesFltrd = $filter('filter')($scope.resTypes,{selected:true});
      $scope.resTypesFiltrParams = '';
      for(var x=0; x<$scope.resTypesFltrd.length; x++) {
        if(x===0) {
          $scope.resTypesFiltrParams+=$scope.resTypesFltrd[x].type;
        } else {
          $scope.resTypesFiltrParams+=':'+$scope.resTypesFltrd[x].type;
        }
      }
      $scope.resTypesFltrData = $filter('filter')($scope.restuarant2xRowsData,$scope.resTypesFiltrParams);
      var restuarant2xRowsNewHld = [];
      var dataIndex = 0;
      for(var j=0; j<(Math.round($scope.resTypesFltrData.length/2)); j++) {
        restuarant2xRowsNewHld[j] = [];
        for(var k=0; k<2; k++) {
          restuarant2xRowsNewHld[j][k] = $scope.resTypesFltrData[dataIndex];
          dataIndex++;
        }
      }
      console.log(restuarant2xRowsNewHld);
      $scope.restuarant2xRows = restuarant2xRowsNewHld;

      var selectAnim = Math.round(Math.random()*3);
      console.log(selectAnim);
      switch(selectAnim) {
          case 0:
              $scope.fadeSlideIn();
              break;
          case 1:
              $scope.ripple();
              break;
          case 2:
              $scope.blinds();
              break;
          case 3:
              $scope.fadeSlideInRight();
              break;
          default:
              $scope.blinds();
      }

    };

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

    $scope.blinds();

});