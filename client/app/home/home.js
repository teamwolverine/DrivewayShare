app.controller("HomeController", function($scope, Nav, Listings) {

	$scope.data = [];
	$scope.search = "";
  var prevSearch = $scope.search;
  $scope.distSearchInput = 2;
  $scope.listPopulated = false;

  Nav.setPage(1);

  $scope.autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById("main-search-input")),
    {types: ["geocode"]});

  $scope.getSearch = function() {
    // prevSearch = search;
    Listings.sendAddress("main-search-input", function(results) {
      Listings.getListings(results, $scope.distSearchInput).then(function(searchResult) {

        $scope.data = _.filter(searchResult, function(listing) {
					return listing.listing.available !== 0;
				});

        $scope.data.sort(function(itemA, itemB) {
          return itemA.dist - itemB.dist;
        });
        
        $scope.listPopulated = true;
        $scope.search = "";
      });
    });
  };

  $scope.sendEmail = function(email){
    var mail = 'mailto:' + email;
    window.location.href = mail;
  };

  $scope.toggleExpand = function(item) {
    item.expand = !item.expand;
  };

  $scope.sortDist = function() {
    $scope.data.sort(function(itemA, itemB) {
      return itemA.dist - itemB.dist;
    });
  };

  $scope.sortPrice = function() {
    $scope.data.sort(function(itemA, itemB) {
      return itemA.listing.price - itemB.listing.price;
    });
  };

  // $scope.$watch("distSearchInput", _.throttle(function(){
  //   if($scope.listPopulated) {
  //     $scope.getSearch(prevSearch);
  //   }
  // }, 800, {"leading": true, "trailing": true}));

});
