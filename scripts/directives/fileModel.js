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

app.directive("fileRead", [function () {
  return {
    scope: {
      fileread: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.fileread = loadEvent.target.result;
          });
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
}]);
