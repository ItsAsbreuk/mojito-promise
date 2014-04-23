/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('page2', function(Y, NAME) {

/**
 * The page2 module.
 *
 * @module page2
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {


        /*
        // the unrecomended way: unrecomended, because every js-error made in the resolved callback will prevent a serverreponse

        index: function(ac) {
            var route = '/page2.html';
            Y.Promise.all([
                ac.models.get('pagecontents').getPageContent(route),
                ac.models.get('newsitems').getItems(route)
            ]).then(
                function(responseHash) {
                    var response = responseHash[0];
                    response.newsitems = responseHash[1];
                    //
                    // response = {
                    //     pagecontent: '....',
                    //     newsitems: [
                    //         '....',
                    //         '....',
                    //         '....'
                    //     ]
                    // }
                    //
                    //
                    ac.done(response);
                },
                Y.bind(ac.error, ac)
            );
        }

        */
        // the recomended way: always catch at the end

        index: function(ac) {
            var route = '/page2.html';
            Y.Promise.all([
                ac.models.get('pagecontents').getPageContent(route),
                ac.models.get('newsitems').getItems(route)
            ]).then(
                function(responseHash) {
                    var response = responseHash[0];
                    response.newsitems = responseHash[1];
                    /*
                     * response = {
                     *     pagecontent: '....',
                     *     newsitems: [
                     *         '....',
                     *         '....',
                     *         '....'
                     *     ]
                     * }
                     *
                     */
                    ac.assets.addCss('./index.css');
                    ac.done(response);
                }
            ).catch(
                Y.bind(ac.error, ac)
            );
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-models-addon', 'mojito-assets-addon', 'promise']});
