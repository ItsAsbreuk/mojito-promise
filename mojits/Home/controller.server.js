/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('home', function(Y, NAME) {

/**
 * The home module.
 *
 * @module home
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /*
        // This is the most compact way of using promises (when not chained)

        index: function(ac) {
            var route = '/';
            ac.assets.addCss('./index.css');
            ac.models.get('pagecontents').getPageContent(route).then(  // response = {pagecontent: '....'}
                Y.bind(ac.done, ac),
                Y.bind(ac.error, ac)
            );
        },

        */

        /*
        // This is a second way of using promises, making use of '.catch()', which is needed when chaining

        index: function(ac) {
            var route = '/';
            ac.assets.addCss('./index.css');
            ac.models.get('pagecontents').getPageContent(route).then(  // response = {pagecontent: '....'}
                Y.bind(ac.done, ac)
            ).catch(
                Y.bind(ac.error, ac)
            );
        },

        */

        // The moststraight foreward way of unsing promises: using inline anonymous functions in the thenable

        index: function(ac) {
            var route = '/';
            ac.assets.addCss('./index.css');
            ac.models.get('pagecontents').getPageContent(route).then(
                function(response) {
                    ac.done(response);
                },
                function(err) {
                    ac.error(err);
                }
            );
        },

        /*
        // This is the default way to retreive data in Mojito, using a callback

        index: function(ac) {
            ac.assets.addCss('./index.css');
            ac.models.get('model').getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.done(data);
            });
        },

        */

        getAttendees: function(ac) {
            ac.done(['Marco', 'Clarence', 'Andrew'], 'json');
        },

        getWoeId: function(ac) {
            ac.done({id: 2502265}, 'json');
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-models-addon', 'mojito-assets-addon']});
