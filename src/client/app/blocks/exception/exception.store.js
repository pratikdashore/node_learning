(function() {
    'use strict';

    angular
        .module('nodeLearning.exception')
        .factory('exceptionStore', exceptionStore)

    exceptionStore.$inject = ['$q', 'logger'];

    /** @ngInject */
    function exceptionStore($q, logger) {

        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(e) {
                var thrownDescription, newMessage;
                if (e.data && e.data.description) {
                    thrownDescription = '\n' + e.data.description;
                    newMessage = message + thrownDescription;
                }
                e.data.description = newMessage;
                logger.error(newMessage);
                return $q.reject(e);
            };
        }
    }

}());