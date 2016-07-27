app.controller("crudCtrl", function($scope, crudService){
    $scope.divFav = false;
    GetAllFavorites();
	
    //Get all favorite records
    function GetAllFavorites(){
        debugger;
        var getFavoriteData = crudService.getFavorites();
		
        getFavoriteData.then(function(fav){
            $scope.favorites = fav.data;
        }, function(){
            alert('Error in getting records');
        });
    };
	
    //Edit Favorite
    $scope.editFavorite = function(fav){
        var getFavoriteData = crudService.getFavorite(fav.id);
		
        getFavoriteData.then(function(_fav){
            $scope.favorite = _fav.data;           

            $scope.favoriteId = $scope.favorite.Id;
            $scope.favoriteDescription = $scope.favorite.Description;
            $scope.favoriteLink = $scope.favorite.Link;
            $scope.Action = 'Update';
            $scope.divFav = true;
        }, function(){
            alert('Error in updating records');
        });
    };
	
    //Save 
    $scope.applyUpdates = function (){
        var Favorite = {
            Description: $scope.favoriteDescription,
            Link: $scope.favoriteLink
        };
		
        var getAction = $scope.Action;
		
        if (getAction == 'Update'){
            Favorite.Id = $scope.favoriteId;
            var getFavoriteData = crudService.updateFavorite(Favorite);
            getFavoriteData.then(function(msg){
                GetAllFavorites();
                //alert(msg);
                $scope.divFav = false;
            }, function(){
                alert('Error in updating records');
            });
        } else {
            var getFavoriteData = crudService.addFavorite(Favorite);
            getFavoriteData.then(function(msg){
                GetAllFavorites();
                //alert(msg);
                $scope.divFav = false;
            }, function(){
                alert('Error in adding record');
            });
			
        };	
    };
	
	
    $scope.AddFavDiv = function(){
        ClearFields();
        $scope.Action = 'Add';
        $scope.divFav = true;
    };
	
    //Delete
    $scope.deleteFavorite = function(fav){
        var getFavoriteData = crudService.deleteFavorite(fav.Id);
        getFavoriteData.then(function(msg){
            //alert(msg);
            GetAllFavorites();			
        }, function(){
            alert('Error in deleting record');
        });
    };
	
    //Clear Temp
    function ClearFields() {
        $scope.favoriteId = "";
        $scope.favoriteDescription = "";
        $scope.favoriteLink = "";
    };
	
    //Cancel
    $scope.Cancel = function(){
        $scope.divFav = false;
    };
	
	

});