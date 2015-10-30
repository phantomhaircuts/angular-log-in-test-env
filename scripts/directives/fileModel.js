//FILE UPLOAD DIRECTIVE =======================================
app.directive ('fileInput', ['$parse', function($parse){
  return {
    restrict: 'A',
    link: function(scope, elm, attrs){
      elm.bind('change', function(){
        $parse(attrs.fileInput)
        .assign(scope,elm[0].files)
        scope.$apply();
      })
    }
  }
}]);

app.directive ('fileInputTwo', ['$parse', function($parse){
  return {
    restrict: 'A',
    link: function(scope, elm, attrs){
      elm.bind('change', function(){
        $parse(attrs.fileInput)
        .assign(scope,elm[1].files)
        scope.$apply();
      })
    }
  }
}]);
