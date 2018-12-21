(function () {
    angular.module('kayliJeanApp')
        .directive('disableRightClick', disableRightClick)

    function disableRightClick() {
        const directive = {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function(scope, element, attr) {  
                element.bind('contextmenu', function(e) {  
                    e.preventDefault();  
                })  
            } 
        };
        return directive;
    }

})();