/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('page2-newsitems', function(Y, NAME) {

/**
 * The page2-pagecontents module.
 *
 * @module page2-pagecontents
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
         * @method getItems
         * @return {Promise}
         */
        getItems: function(route) {
            return Y.dbExampleConnection.getRecords('SELECT title, news FROM newsitems WHERE route=? ORDER BY date DESC', route).catch(
                function() {
                    // in case of *no records* we do NOT want to reject the promise, but return an empty array instead:
                    return [];
                }
            );
        }

    };

}, '0.0.1', {requires: ['itsa-node-dbexample-connector']});
