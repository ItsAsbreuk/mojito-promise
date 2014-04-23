/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('page3', function(Y, NAME) {

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
            var route = '/page3.html',
                weeknr = 17;
            Y.Promise.allResolved([
                ac.models.get('pagecontents').getPageContent(route),
                ac.models.get('hangouts').getHangoutInfo(weeknr),
                Y.YQLPromise('select * from weather.forecast where woeid=2502265')
            ]).then(
                function(response) {
                    var fulfilledHash = response.fulfilled;
                        pagecontentrecord = fulfilledHash[0],
                        hangoutrecord = fulfilledHash[1],
                        yqlrecord = fulfilledHash[2],
                        weatheritem = yqlrecord && yqlrecord.query.results.channel.item;
                    /*
                     * response = {
                     *     pagecontent: '....',
                     *     title: '....',
                     *     attendees: [
                     *         '....',
                     *         '....',
                     *         '....'
                     *     ],
                     *     weather: '...'
                     * }
                     *
                     */

                    ac.assets.addCss('./index.css');
                    // Cautious: fulfilledHash might return 'null' for its individual promises (in case of error)
                    // therefore, you can't call its properties without checking if they are valid.
                    // meaning: don't use "hangoutrecord.title", but "hangoutrecord && hangoutrecord.title" instead
                    ac.done({
                        pagecontent: pagecontentrecord && pagecontentrecord.pagecontent,
                        title: hangoutrecord && hangoutrecord.title,
                        attendees: hangoutrecord && hangoutrecord.attendees,
                        weathertitle: weatheritem && weatheritem.title,
                        weather: weatheritem && weatheritem.description
                    });
                }
            ).catch(
                Y.bind(ac.done, ac, {nohangout: true})
            );
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-models-addon', 'mojito-assets-addon', 'itsapromise', 'itsayqlpromise']});
