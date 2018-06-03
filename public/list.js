var app = angular.module('musicLibrary', []);

//Between where you initialize controller and before you initialize the app, you have to to the following:

  //in order to call it from the frontend I have to do what's called inject.
  //Scope is another angular service, containing some functionality. We are using scope to diplay data on the front
  //http makes get request to server, which will give me the array of the items on the list
  app.controller('musicLibraryCtrl', function($scope, $http) {

//function to post the data
//I'm doing http.post to the route I am going to which is myList. The second argument to post is the object newItem: $scope.newMeow
    $scope.submitNewItem = function() { //when clicking submit it is gonna call this function
      $http.post('/myList', {newItem: $scope.newItem}).then(function() { //its gonna send a post request to the server with the new item
        getItems(); //this will refresh the list when adding a new item
        $scope.newItem = ''; //this will make the text field be empty after I post an item
      });
    };

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Delete function is not working!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//we are calling scope.delete because we are calling it from the frontend
    $scope.removeItem = function(deletethisitem) {
      $http.put('/myList/remove', {item: deletethisitem}).then(function() { //its gonna send a post request to the server with the new item
        getItems(); //this will refresh the list when adding a new item
      });
    };

//to make the list item show up without having to refresh
    function getItems() {
      //response is a callback function, that is called when you succesfully get the list from the server.
      //this is done because you don't want the rest rest of the code to run before this is done.
      //http is a service.
      //.get is a function in that service. It calls the route 'list' and gets stuff.
      //it has another thing called a promise (then), which is like a string of functions. its a way to specify a callback.
      //what I just made here is called an API
      $http.get('/myList').then(function(response) {

        //setting the list with what we get back from the server
        $scope.myList = response.data;
      });
    }
//call getItems when the page starts up, and it will load all of them
    getItems();


  });
