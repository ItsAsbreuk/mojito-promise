/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('page2-pagecontents', function(Y, NAME) {

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

        getPageContent: function(route) {
            return Y.dbExampleConnection.getRecord('SELECT pagecontent FROM pages WHERE route=?', route);
        }


    };

}, '0.0.1', {requires: ['itsa-node-dbexample-connector', 'promise']});
