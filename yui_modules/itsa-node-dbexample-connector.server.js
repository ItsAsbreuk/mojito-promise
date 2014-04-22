YUI.add('itsa-node-dbexample-connector', function (Y, NAME) {


    // initialize Y.dbExampleConnection:

    Y.dbExampleConnection = new Y.DatabaseConnection({
        database: 'example_db',
        user: 'usertest',
        password: 'passwordtest'
    });

    // Y.dbExampleConnection is ready to be used, just include the module 'itsa-node-dbexample-connector'

}, '@VERSION@', {'requires': ['yui-base', 'itsa-node-dbconnector']});
