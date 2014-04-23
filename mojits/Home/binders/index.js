/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('home-binder-index', function(Y, NAME) {

/**
 * The home-binder-index module.
 *
 * @module home-binder-index
 */

    /**
     * Constructor for the HomeBinderIndex class.
     *
     * @class HomeBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        invokePromise: function(action, options) {
            var instance = this;
            return new Y.Promise(function (fulfill, reject) {
                instance.mojitProxy.invoke(
                    action,
                    options,
                    function(err, data) {
                        err && reject(err);
                        fulfill(data);
                    }
                );
            });
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            var instance = this,
                button1 = node.one('#button1'),
                button2 = node.one('#button2');

            instance.node = node;
            button1.on('click', Y.bind(instance._handleButton1, instance));
            button2.on('click', Y.bind(instance._handleButton2, instance));
        },

        _handleButton1: function() {
            var instance = this,
                container = instance.node.one('#container1'),
                allActions;

            allActions = Y.Promise.all([
                instance.invokePromise('getAttendees', {rpc: true}),
                Y.YQLPromise('select * from weather.forecast where woeid=2502265')
            ]);

            allActions.then(
                function(responseHash) {
                    var attendees = responseHash[0],
                        yqlrecord = responseHash[1],
                        weatheritem = yqlrecord.query.results.channel.item;
                    container.setHTML('<h2>Attendees: '+attendees+'</h2>'+weatheritem.title+'<br>'+weatheritem.description);
                    container.removeClass('hidden');
                }
            ).catch(
                function(err) {
                    // because Y.Promise.all can make the reject-result to be an array, we compose 'errormessage'
                    var errormessage = err.message || Y.dump(err);
                    container.setHTML(errormessage);
                    container.removeClass('hidden');
                }
            );
        },

        _handleButton2: function() {
            var instance = this,
                container = instance.node.one('#container2');

            instance.invokePromise('getWoeId', {rpc: true}).then(
                function(response) {
                    return Y.YQLPromise('select * from weather.forecast where woeid='+response.id);
                }
            ).then(
                function(yqlrecord) {
                    var weatheritem = yqlrecord.query.results.channel.item;
                    container.setHTML('<h2>Weather:</h2>'+weatheritem.title+'<br>'+weatheritem.description);
                    container.removeClass('hidden');
                }
            ).catch(
                function(err) {
                    // because Y.Promise.all can make the reject-result to be an array, we compose 'errormessage'
                    var errormessage = err.message || Y.dump(err);
                    container.setHTML(errormessage);
                    container.removeClass('hidden');
                }
            );
        }

    };

}, '0.0.1', {requires: ['event', 'mojito-client', 'promise', 'itsayqlpromise']});
