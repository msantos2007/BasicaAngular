(function () {
    'use strict';

    angular.module('common.core', []);

})();

(function () {
    'use strict';

    angular.module('common.ui', ['ngAnimate', 'ngMaterial']) //, 'ngMessages'
        .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('indigo')
                .warnPalette('red')
                .backgroundPalette('grey');
        })
        .config(function ($mdAriaProvider) {   // Globally disables all ARIA warnings.
            $mdAriaProvider.disableWarnings();
        });
})();

(function () {
    'use strict';

    angular.module('basica', ['common.core', 'common.ui'])
        .run(run)
        .config(config);

    config.$inject = ['$locationProvider'];
    function config($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    run.$inject = [];
    function run() {

    }

})();

(function () {
    'use strict';
    angular.module("ngLocale", [], ["$provide", function ($provide) {
        var PLURAL_CATEGORY = { ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other" };
        $provide.value("$locale", {
            "DATETIME_FORMATS": {
                "AMPMS": [
                    "AM",
                    "PM"
                ],
                "DAY": [
                    "domingo",
                    "segunda-feira",
                    "ter\u00e7a-feira",
                    "quarta-feira",
                    "quinta-feira",
                    "sexta-feira",
                    "s\u00e1bado"
                ],
                "ERANAMES": [
                    "antes de Cristo",
                    "depois de Cristo"
                ],
                "ERAS": [
                    "a.C.",
                    "d.C."
                ],
                "FIRSTDAYOFWEEK": 6,
                "MONTH": [
                    "janeiro",
                    "fevereiro",
                    "mar\u00e7o",
                    "abril",
                    "maio",
                    "junho",
                    "julho",
                    "agosto",
                    "setembro",
                    "outubro",
                    "novembro",
                    "dezembro"
                ],
                "SHORTDAY": [
                    "dom",
                    "seg",
                    "ter",
                    "qua",
                    "qui",
                    "sex",
                    "s\u00e1b"
                ],
                "SHORTMONTH": [
                    "jan",
                    "fev",
                    "mar",
                    "abr",
                    "mai",
                    "jun",
                    "jul",
                    "ago",
                    "set",
                    "out",
                    "nov",
                    "dez"
                ],
                "STANDALONEMONTH": [
                    "janeiro",
                    "fevereiro",
                    "mar\u00e7o",
                    "abril",
                    "maio",
                    "junho",
                    "julho",
                    "agosto",
                    "setembro",
                    "outubro",
                    "novembro",
                    "dezembro"
                ],
                "WEEKENDRANGE": [
                    5,
                    6
                ],
                "fullDate": "EEEE, d 'de' MMMM 'de' y",
                "longDate": "d 'de' MMMM 'de' y",
                "medium": "d 'de' MMM 'de' y HH:mm:ss",
                "mediumDate": "d 'de' MMM 'de' y",
                "mediumTime": "HH:mm:ss",
                "short": "dd/MM/y HH:mm",
                "shortDate": "dd/MM/y",
                "shortTime": "HH:mm"
            },
            "NUMBER_FORMATS": {
                "CURRENCY_SYM": "R$",
                "DECIMAL_SEP": ".", //Tive que colocar "." em vez de ","
                "GROUP_SEP": ",", //Tive que colocar "," em vez de "."
                "PATTERNS": [
                    {
                        "gSize": 3,
                        "lgSize": 3,
                        "maxFrac": 3,
                        "minFrac": 0,
                        "minInt": 1,
                        "negPre": "-",
                        "negSuf": "",
                        "posPre": "",
                        "posSuf": ""
                    },
                    {
                        "gSize": 3,
                        "lgSize": 3,
                        "maxFrac": 2,
                        "minFrac": 2,
                        "minInt": 1,
                        "negPre": "-\u00a4",
                        "negSuf": "",
                        "posPre": "\u00a4",
                        "posSuf": ""
                    }
                ]
            },
            "id": "pt-br",
            "localeID": "pt_BR",
            "pluralCat": function (n, opt_precision) { var i = n | 0; if (i >= 0 && i <= 1) { return PLURAL_CATEGORY.ONE; } return PLURAL_CATEGORY.OTHER; }
        });
    }]);
})();

(function (app) {
    'use strict';

    app.filter('casasDecimais', function () {
        return function (input) {
            if (!input) return;
            var vlr = input;

            vlr = vlr.replace(/\./g, ':');
            vlr = vlr.replace(/,/g, ';');
            vlr = vlr.replace(/:/g, ',');
            vlr = vlr.replace(/;/g, '.');

            return vlr;
        };
    });

    app.directive('focusIf', focusIf); //uso: <elm focus-if="true" focus-delay="300">/<elm> //usado com variavel: ex. visitanteNovo.html
    focusIf.$inject = ['$timeout'];
    function focusIf($timeout) {
        function link($scope, $element, $attrs) {
            var dom = $element[0];
            if ($attrs.focusIf) {
                $scope.$watch($attrs.focusIf, focus);
            } else {
                focus(true);
            }
            function focus(condition) {
                if (condition) {
                    $timeout(function () {
                        dom.focus();
                    }, $scope.$eval($attrs.focusDelay) || 0);
                }
            }
        }
        return {
            restrict: 'A',
            link: link
        };
    }

    app.filter('capitalize', function () {
        return function (input) {
            return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
        };
    });

})(angular.module('basica'));

(function (app) {
    'use strict';

    app.controller('rootCtrl', rootCtrl);

    rootCtrl.$inject = ['$scope', '$rootScope', '$location', '$window', '$timeout', 'apiService', '$mdDialog', '$filter'];

    function rootCtrl($scope, $rootScope, $location, $window, $timeout, apiService, $mdDialog, $filter) {
        $scope.pageClass = 'page-root';
        $rootScope.pageClassAtual = $scope.pageClass;

        var ctrlr = this;
        ctrlr.loading = true;

        ctrlr.carregarSwagger = carregarSwagger;

        function carregarSwagger(href) {
            document.location.href = href;
        }

        $timeout(function () {
            ctrlr.loading = false;
        });

        return ctrlr;
    }

})(angular.module('basica'));