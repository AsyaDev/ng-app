angular.module("app", ["templates"])
  .directive("app", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/app.tpl.html",
      controller:["$scope", "$element", appCtr]
    };
    function appCtr($scope, $element){
      $scope.data = makeDefaulData();
      $scope.selected = $scope.data[0];
      $scope.selctItem = (item) =>{
          $scope.selected = item; 
      }
    }
  })
  .directive("contentView", () => {
    return {
      scope: {
        data: '=',
        selctItem: '&'
      },
      restrict: "E",
      templateUrl: "./js/app/content-view.tpl.html",
      controller:["$scope", "$element", contentViewCtrl]
    };
    function contentViewCtrl($scope, $element){
      $scope.activeItem = $scope.data.map(_ => false);
      $scope.showTime = false;
      $scope.item = {
        id: makeDataId(),
        title: "",
        tags: [],
        date: new Date()
      }
      $scope.selectArr = ['title', 'date']
      $scope.selectSorter = $scope.selectArr[0];
      $scope.selectClass = (i) =>{
        Object.keys($scope.activeItem).forEach( _ => {
          $scope.activeItem[_] = (_ == i);
        });
      }
      $scope.addNewItem = (item) =>{
        $scope.data.push(item)
        console.log($scope.data)
      }     
    }
  })
  .directive("sidebarView", () => {
    return {
      scope: {
        selected:"="
      },
      restrict: "E",
      templateUrl: "./js/app/sidebar-view.tpl.html",
      controller:["$scope", "$element", sidebarViewCtrl]
    };
    function sidebarViewCtrl($scope, $element){
      $scope.tag = '';
      $scope.removeTag = (i) =>{
        $scope.selected.tags.splice(i, 1);
      }
      $scope.addTag = (tag) =>{
        $scope.selected.tags.push(tag)
      }
    }
  })
  .directive("elementsView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/elements-view.tpl.html",
      controller: ["$scope", "$element", elementsViewCtrl]
    };
    function elementsViewCtrl($scope, $element) {
      $scope.model = {
        width: 300,
      };
      $scope.setWidth = () => {
        let width = $scope.model.width;
        if (!width) {
          width = 1;
          $scope.model.width = width;
        }
        $element.css("width", `${width}px`);
      };
      $scope.setWidth();
    }
  })
  .directive("some1", () => {
    return {
      scope: {
        data:'='
      },
      restrict: "E",
      template: "<some-2 data='data'></some-2>",
    };
  })
  .directive("some2", () => {
    return {
      scope: {
        data:'='
      },
      restrict: "E",
      template: "<some-3 data='data'></some-3>",
    };
  })
  .directive("some3", () => {
    return {
      scope: {
        data:'='
      },
      restrict: "E",
      template: "<summary-view data='data'></summary-view>"
    };    
  })
  .directive("summaryView", () => {
    return {
      scope: {
        data:'='
      },
      restrict: "E",
      templateUrl: "./js/app/summary-view.tpl.html",
      controller: ["$scope", "$element", summaryViewCtrl]
    };
    function summaryViewCtrl($scope, $element) {
      $scope.tags = $scope.data.map(d => d.tags).filter(d => d.length).reduce( ( a, b ) => { return a.concat( b ) } )
      $scope.tagsUnic = [...new Set($scope.tags)];
      $scope.lastByDate = {};
  
      $scope.data.forEach(checkDate);
      function checkDate(item, index) {
        const date = new Date(item.date);
      
        if (index === 0) {
          $scope.lastByDate = { 
            id: item.id,
            title: item.title,
            tags: item.tags,
            date: date
           };
          return;
        };
      
        if (date > $scope.lastByDate.date) {
          $scope.lastByDate = { 
            id: item.id,
            title: item.title,
            tags: item.tags,
            date: date
           };
        };
      
      }
      console.log($scope.lastByDate)
    }
  })
  .filter('searchFilter', function() {
    return function(arr, searchString) {
        if(!searchString) {
            return arr;
        }
        searchString = searchString.toLowerCase();
        var result = [];
        angular.forEach(arr, function(el){
            if(el.title.toLowerCase().indexOf(searchString) != -1) {
                result.push(el);
            }
        });
        return result;
    };
});
  
