/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('page3-hangouts', function(Y, NAME) {

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
        getHangoutInfo: function(weeknr) {
            var instance = this;
            return Y.Promise.all([
                instance._getHangout(weeknr),
                instance._getAttendees(weeknr),
                instance._getPersons(weeknr)
            ]).then(
                function(promiseHash) {
                    var personsObject = {},
                        hangout = promiseHash[0],
                        attendees = promiseHash[1],
                        persons = promiseHash[2];

                    // first: create an object with personid's as key: this to speed up attaching personal data
                    // because we are using node.js on the server, native Array.forEach can be used
                    persons.forEach(function(personrecord) {
                        personsObject[personrecord.id] = personrecord;
                    });

                    attendees.forEach(function(attendeesrecord) {
                        var personobject = personsObject[attendeesrecord.personid];
                        attendeesrecord.name = personobject.firstname + ' ' + personobject.lastname;
                    });

                    return {
                        title: hangout.title,
                        attendees: attendees
                    }
                }
            );
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @method getItems
         * @return {Promise}
         */
        _getHangout: function(weeknr) {
            return Y.dbExampleConnection.getRecord('SELECT title FROM hangouts WHERE weeknr=?', weeknr);
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @method getItems
         * @return {Promise}
         */
        _getAttendees: function(weeknr) {
            return Y.dbExampleConnection.getRecords('SELECT personid FROM attendees WHERE weeknr=?', weeknr);
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @method getItems
         * @return {Promise}
         */
        _getPersons: function() {
            return Y.dbExampleConnection.getRecords('SELECT id, firstname, lastname FROM persons');
        }

    };

}, '0.0.1', {requires: ['itsa-node-dbexample-connector', 'promise']});
