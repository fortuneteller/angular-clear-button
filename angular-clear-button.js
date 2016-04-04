/**
 * @author Tushar Borole
 * @description Add ios style clear button for input box
 * for example <input type="text" id="fixed"  clear-btn/>
 */

angular.module('angular-clear-button', []).directive('clearBtn', ['$parse', function ($parse) {
    return {
        scope: {
            placeholder: '@'
        },
        link: function (scope, elm, attr, ngModelCtrl) {
            var top = elm.height() / 2;
            var useSmartLabel = typeof attr.notUseSmartLabel === 'undefined';
            elm.wrap("<div style=\"position: relative; width:100%\"></div>");
            var btn = '<span id=' + Math.round(Math.random() * 1000000000) + ' class="searchclear ng-hide glyphicon glyphicon-remove-circle"></span>';
            var angularBtn = angular.element(btn);
            if (useSmartLabel)
                var label = angular.element('<label class="ss-input-field-label">' + scope.placeholder + '</label>');
            angularBtn.css('top', top);

            if (useSmartLabel && elm.val().length == 0) {
                label.addClass('ng-hide');
            }

            elm.after(angularBtn);
            elm.after(label);
            //clear the input
            angularBtn.on("click", function () {
                elm.val('').trigger("change");
                $parse(attr.ngModel).assign(scope, '');
                scope.$apply();
            });

            // show  clear btn  on focus
            elm.bind('focus keyup change paste propertychange', function (blurEvent) {
                if (elm.val() && elm.val().length > 0) {
                    angularBtn.removeClass("ng-hide");
                    if (useSmartLabel) {
                        label.removeClass("ng-hide");
                        elm.addClass('ss-input-field-filled');
                    }
                } else {
                    angularBtn.addClass("ng-hide");
                    if (useSmartLabel) {
                        label.addClass("ng-hide");
                        elm.removeClass('ss-input-field-filled');
                    }
                }
            });
            // remove  clear btn  on focus
            elm.bind('blur', function (blurEvent) {
                if (!angularBtn.is(":hover"))
                    angularBtn.addClass("ng-hide");
            });
        }
    };
}]);



