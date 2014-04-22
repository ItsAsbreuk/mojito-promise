YUI.add('itsayqlpromise', function (Y, NAME) {

    var DEFAULT_ERROR_DESC = 'YQL returned with an unspecified error',
        NO_RECORDS = 'YQL found no records';

    /**
     * Fetches data using YQL and returns a Promise
     *
     * @method getYQLPromise
     * @since 0.1
     * @param sql {String} The SQL statement to execute
     * @param [params] {Object} An object literal of extra parameters to add to the request
     * @param [opts] {Object}
     * @param [opts.base] {String} to use a different base URL for private data
     * @param [opts.proto] {String} 'http' or 'https'
     * @param [opts.rejectOnEmpty] {Boolean} to make the Promise reject when YQL returns succesfully but without any records
     * @return {Y.Promise}
     */
    Y.YQLPromise = function(sql, params, opts) {
        return new Y.Promise(function(resolve, reject) {
            new Y.YQLRequest(sql, function(r) {
                // this is YQL's callback function
/*jshint expr:true */
                r.error && reject(r.error.description || DEFAULT_ERROR_DESC);
                opts && opts.rejectOnEmpty && r.query && (r.query.count===0) && reject(NO_RECORDS);
/*jshint expr:false */
                resolve(r);
            }, params, opts).send();
        });
    };

}, '@VERSION@', {'requires': ['yql', 'promise']});
