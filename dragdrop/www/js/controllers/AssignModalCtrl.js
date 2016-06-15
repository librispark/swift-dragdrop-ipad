app.controller('ModalCtrl', function($scope) {
    $scope.closeModal = function() {
      console.log('hide modal called');
      $scope.modalCtrl.hide();
    };

    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function() {
        console.log('destroy modal called to remove');
        if($scope.modal) {
            $scope.modal.remove();
        }
    });


    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function () {
        $scope.centerAnchor = !$scope.centerAnchor;
    };
    //$scope.draggableObjects = [{name:'one'}, {name:'two'}, {name:'three'}];
    var onDraggableEvent = function (evt, data) {

        // console.log("128", "onDraggableEvent", evt, data);
    };
    $scope.$on('draggable:start', onDraggableEvent);
   // $scope.$on('draggable:move', onDraggableEvent);
    $scope.$on('draggable:end', onDraggableEvent);
    
    $scope.numRows = 7;
    $scope.numCols = 10;
    $scope.droppedObjects = new Array($scope.numRows);
    for(var i=0; i<$scope.numRows; i++) {
    	$scope.droppedObjects[i] = new Array($scope.numCols);
	    for(var j=0; j<$scope.numCols; j++) {
	    	$scope.droppedObjects[i][j] = [];
	    }
    }
    $scope.printIndxs = function(indx, pindx, dindx) {
    	// console.log('tag', indx, pindx, dindx);
    };

    $scope.initNewArry = function(length) {
    	return new Array(length);
    };

    $scope.onDragSuccess = function (data, evt, indx, indx2, indx3) {
    	console.log(indx, indx2, indx3);
        var index = $scope.droppedObjects[indx3][indx2].indexOf(data);
        if (index > -1) {
            $scope.droppedObjects[indx3][indx2].splice(index, 1);
        }
    };
    $scope.onDropComplete = function (data, evt, indx, row) {
    	// console.log(data, evt, indx, row);
        var index = $scope.droppedObjects[row][indx].indexOf(data);
        if (index === -1) {
            $scope.droppedObjects[row][indx].push(data);
        }
    };

    function getParams(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }

    $scope.layoutIsEditable = false;
    $scope.toggleLayoutEditing = function() {
        if($scope.layoutIsEditable === false) {
            $scope.layoutIsEditable = true;
        } else {
            $scope.layoutIsEditable = false;
            window.location = 'custom://stuff?data='+JSON.stringify($scope.droppedObjects);
        }
    }

    var inArray = function (array, obj) {
        var index = array.indexOf(obj);
    };

});
