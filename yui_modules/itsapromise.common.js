YUI.add('itsapromise', function (Y, NAME) {

/**
 * Adds Y.Promise.allFulFilled() to Y.Promise.
 *
 * @module itsapromise
 */

var YPromise = Y.Promise;

/**
 * Returns a promise that always fulfilles when ALL values are resolved (either fulfilled
 * or rejected. This is useful for waiting for the resolution of multiple
 * promises, such as reading multiple files in Node.js or making multiple XHR
 * requests in the browser. Because -on the contrary of Y.Promise.all()- allResolved() waits until
 * all single Promises are resolved, you can handle all promises, even if on gets rejected.
 *
 * @method allResolved
 * @param {Any[]} values An array of any kind of values, promises or not. If a value is not
 * @return [Promise] A promise for an array of all the fulfillment values
 * @static
 */
YPromise.allResolved = function (values) {
    var Promise = this;
    return new Promise(function (fulfill, reject) {
        if (!Y.Lang.isArray(values)) {
            reject(new TypeError('Promise.all expects an array of values or promises'));
            return;
        }

        var remaining       = values.length,
            length          = values.length,
            fulfilledresults = [],
            rejectedresults = [],
            i;

        function oneDone(index, fulfilled) {
            return function (value) {
                fulfilledresults[index] = fulfilled ? value : null;
                rejectedresults[index] = fulfilled ? null : value;

                remaining--;

                if (!remaining) {
                    fulfill({
                        fulfilled: fulfilledresults,
                        rejected: rejectedresults
                    });
                }
            };
        }

        if (length < 1) {
            return fulfill({
                        fulfilled: fulfilledresults,
                        rejected: rejectedresults
                    });
        }

        for (i=0; i < length; i++) {
            Promise.resolve(values[i]).then(oneDone(i, true), oneDone(i, false));
        }
    });
};

YPromise.prototype.allResolved = YPromise.allResolved;

}, '@VERSION@', {'requires': ['yui-base', 'promise']});
