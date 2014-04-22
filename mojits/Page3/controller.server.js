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
            Y.Promise.all([
                ac.models.get('pagecontents').getPageContent(route),
                ac.models.get('hangouts').getHangoutInfo(weeknr),
                Y.YQLPromise('select * from weather.forecast where woeid=2502265')
            ]).then(
                function(responseHash) {
                    var pagecontentrecord = responseHash[0],
                        hangoutrecord = responseHash[1],
                        yqlrecord = responseHash[2],
                        weatheritem = yqlrecord.query.results.channel.item;
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
                    ac.done({
                        pagecontent: pagecontentrecord.pagecontent,
                        title: hangoutrecord.title,
                        attendees: hangoutrecord.attendees,
                        weathertitle: weatheritem.title,
                        weather: weatheritem.description
                    });
                }
            ).catch(
                Y.bind(ac.done, ac, {nohangout: true})
            );
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-models-addon', 'promise', 'itsayqlpromise']});
