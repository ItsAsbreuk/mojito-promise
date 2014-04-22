/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('home-pagecontents', function(Y, NAME) {

/**
 * The home-pagecontents module.
 *
 * @module home-pagecontents
 */

    /**
     * Constructor
     *
     * @class HomeModel
     * @constructor
     */
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @method getPageContent
         * @return {Promise}
         */
        getPageContent: function(route) {
            return Y.dbExampleConnection.getRecord('SELECT pagecontent FROM pages WHERE route=?', route);
        }

        /*

        getPageContent: function(route, callback) {
            // get the database-record....
            if (err) {
                callback(err);
                return;
            }
            callback(null, data);
        }

        */


    };

}, '0.0.1', {requires: ['itsa-node-dbexample-connector']});
