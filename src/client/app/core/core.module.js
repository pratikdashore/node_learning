(function() {
    'use strict';

    angular
        .module('nodeLearning.core', [
            'ngAnimate', 'ngSanitize',
            'nodeLearning.exception', 'nodeLearning.logger', 'nodeLearning.router',
            'ui.bootstrap'
        ]);

}());