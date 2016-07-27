app.service("crudService", function ($http) {
    
    //get all favorites
    this.getFavorites = function () {
        return $http.get("Home/GetAllFavorites");
    };

    //Getting favorite by id
    this.getFavorite = function (favId) {
        var response = $http({
            method: "post",
            url: "Home/GetFavoriteById",
            params: { favoriteId: JSON.stringify(favId) }
        });
        return response;
    };

    //Adding Favorite
    this.addFavorite = function (fav) {
        var response = $http({
            method: "post",
            url: "Home/AddFavorite",
            data: JSON.stringify(fav),
            dataType: "json"
        });
        return response;
    };

    //Updating Favorite
    this.updateFavorite = function (fav) {
        var response = $http({
            method: "post",
            url: "Home/UpdateFavorite",
            data: JSON.stringify(fav),
            dataType: "json"
        });
        return response;
    };

    //Deleting Favorite
    this.deleteFavorite = function (favId) {
        var response = $http({
            method: "post",
            url: "Home/DeleteFavorite",
            params: {
                id: JSON.stringify(favId)
            }
        });
        return response;
    };

})