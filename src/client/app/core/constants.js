/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('nodeLearning.core')
        .constant('moment', moment)
        .constant('toastr', toastr);
})();