(function () {
    /**
     * $c: set string and encode chars.
     *
     * @param {array} a -
     * @return {undefined}
     */
    var Token = function (a) {
        this.w = a || [];
    };

    Token.prototype.set = function (a) {
        this.w[a] = true;
    };

    Token.prototype.encode = function () {
        var a = [];

        // reorder characters.
        for (var i = 0; i < this.w.length; i++) {
            this.w[i] && (a[Math.floor(i / 6)] ^= 1 << i % 6);
        }

        // encode characters to generate a random string.
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
        for (var j = 0; j < a.length; j++) {
            a[j] = chars.charAt(a[j] || 0);
        }

        return a.join('') + '~';
    };

    /**
     * vd:
     *
     * @type {object}
     */
    var token = new Token;

    /**
     * J:
     *
     * @param {array} a -
     * @return {undefined}
     */
    function setToken(a) {
        token.set(a);
    }

    /**
     * Nd:
     *
     * @param {object} a -
     * @param {string} b -
     * @return {array}
     */
    var setUmParameter = function (a, b) {
        var p = getUmParameters(a);
        var c = new Token(p);

        c.set(b);
        a.set(umParameter, c.w);
    };

    /**
     * Td:
     *
     * @param {object} fields -
     * @return {string}
     */
    var getEncodedToken = function (fields) {
        var p = getUmParameters(fields);

        var t = new Token(p);
        var w = token.w.slice();

        for (var i = 0; i < t.w.length; i++) {
            w[i] = w[i] || t.w[i];
        }

        var copy = new Token(w);
        return copy.encode();
    };

    /**
     * Dd:
     *
     * @param {object} a -
     * @return {array}
     */
    var getUmParameters = function (a) {
        var value = a.get(umParameter);
        return (isArray(value) ? value : []);
    };

    /**
     * ea: Determine whether or not argument is a function.
     *
     * @param {*} a -
     * @return {boolean}
     */
    var isFunction = function (a) {
        return ('function' === typeof a);
    };

    /**
     * ka: returns true if an object is an array, false if it is not.
     *
     * Array.isArray
     *
     * @param {*} a -
     * @return {boolean}
     */
    var isArray = function (a) {
        return ('[object Array]' === Object.prototype.toString.call(Object(a)));
    };

    /**
     * qa: returns true if string.
     *
     * @param {*} a -
     * @return {boolean}
     */
    var isString = function (a) {
        return (undefined !== a && -1 < (a.constructor + '').indexOf('String'));
    };

    /**
     * D: Determine if string begins with characters.
     *
     * ES6: str.startsWith(searchString[, position])
     *
     * @param {string} haystack -
     * @param {string} needle -
     * @return {boolean}
     */
    var startsWith = function (haystack, needle) {
        return (0 === haystack.indexOf(needle));
    };

    /**
     * sa: Strip non-breakable whitespace.
     *
     * @param {string} a -
     * @return {string}
     */
    var stripWhitespace = function (a) {
        return (a ? a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '') : '');
    };

    /**
     * ta: Create 1x1 pixel image.
     *
     * @param {string} src -
     * @return {object}
     */
    var createImage = function (src) {
        var img = doc.createElement('img');
        img.width = 1;
        img.height = 1;
        img.src = src;
        return img;
    };

    /**
     * ua: Placeholder function.
     *
     * @type {function}
     */
    var placeholderFunction = function () {};

    /**
     * K: encodes a URI component.
     *
     * @param {string} a -
     * @return {string}
     */
    var escapeChars = function (a) {
        if (encodeURIComponent instanceof Function) return encodeURIComponent(a);
        setToken(28);
        return a;
    };

    /**
     * L: registers the specified handler
     *
     * @param {string} target -
     * @param {string} type -
     * @param {function} handler -
     * @param {boolean=} useCapture -
     * @return {undefined}
     */
    var registerListener = function (target, type, handler, useCapture) {
        try {
            (
              target.addEventListener
            ? target.addEventListener(type, handler, !!useCapture)
            : target.attachEvent && target.attachEvent('on' + type, handler)
            );
        } catch (e) {
            setToken(27);
        }
    };

    /**
     * wa: Create script tag.
     *
     * @param {string} src -
     * @param {string} id -
     * @return {undefined}
     */
    var createScript = function(src, id) {
        if (src) {
            var script = doc.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;
            if (id) script.id = id;
            // insert tag relative to first script tag.
            var firstTag = doc.getElementsByTagName('script')[0];
            firstTag.parentNode.insertBefore(script, firstTag);
        }
    };

    /**
     * Ud: Determine whether the protocol is HTTPS.
     *
     * @return {boolean}
     */
    var isSecureProtocol = function () {
        return ('https:' === doc.location.protocol);
    };

    /**
     * xa: Get hostname from location.
     *
     * @return {string}
     */
    var getHostname = function () {
        var hostname = '' + doc.location.hostname;
        return (0 === hostname.indexOf('www.') ? hostname.substring(4) : hostname);
    };

    /**
     * ya: Get referrer from location.
     */
    var getReferrer = function (a) {
        var referrer = doc.referrer;
        if (/^https?:\/\//i.test(referrer)) {
            if (a) {
                return referrer;
            }

            var host = '//' + doc.location.hostname;
            var position = referrer.indexOf(host);

            // expects the referrer to be prefixed with http: (5) or https: (6).
            if (5 === position || 6 === position) {
                // determine the trailing character of the referrer has path information:
                var lastChar = referrer.charAt(position + host.length);
                if ('/' === lastChar || '?' === lastChar || '' === lastChar || ':' === lastChar) {
                    return;
                }
            }

            return referrer;
        }
    };

    /**
     * za:
     *
     * @param {array} a -
     * @param {array} b -
     * @return {array}
     */
    var copyFields = function (a, b) {
        if (1 === b.length && null !== b[0] && 'object' === typeof b[0]) {
            return b[0];
        }

        var c = {};
        var d = Math.min(a.length + 1, b.length);

        for (var i = 0; i < d; i++) {
            if ('object' === typeof b[i]) {
                for (var g in b[i]) {
                    if (b[i].hasOwnProperty(g)) {
                        c[g] = b[i][g];
                    }
                }
                break;
            } else {
                if (i < a.length) c[a[i]] = b[i];
            }
        }

        return c;
    };

    /**
     * ee: Model Object
     */
    var Model = function () {
        this.keys = [];
        this.values = {};
        this.m = {};
    };

    /**
     * ee.set:
     *
     * Sets a field/value pair or a group of field/value pairs on the model.
     *
     * @param {string|object} key - fieldName|fieldsObject
     * @param {*} fieldValue -
     * @param {boolean} temporary - Set on the model for the current hit.
     * @return {undefined}
     */
    Model.prototype.set = function (fieldName, fieldValue, temporary) {
        this.keys.push(fieldName);

        if (temporary) {
            this.m[':' + fieldName] = fieldValue;
        } else {
            this.values[':' + fieldName] = fieldValue;
        }
    };

    /**
     * ee.get:
     *
     * Gets the value of a field stored on the model.
     *
     * @param {string} fieldName
     * @return {*}
     */
    Model.prototype.get = function (fieldName) {
        return (this.m.hasOwnProperty(':' + fieldName)
            ? this.m[':' + fieldName]
            : this.values[':' + fieldName]);
    };

    /**
     *
     *
     * [?]
     *
     * @param {function} callback
     * @return {undefined}
     */
    Model.prototype.map = function (callback) {
        for (var i = 0; i < this.keys.length; i++) {
            var fieldName = this.keys[i];
            var fieldValue = this.get(fieldName);
            if (fieldValue) callback(fieldName, fieldValue);
        }
    };

    /**
     * O: Window.
     *
     * @type {object}
     */
    var win = window;

    /**
     * M: Document.
     *
     * @type {object}
     */
    var doc = document;

    /**
     * Mc: Generate a signature for a users browser session.
     *
     * @return {number}
     */
    var generateSignature = function () {
        var signature = win.navigator.userAgent + (doc.cookie ? doc.cookie : '') + (doc.referrer ? doc.referrer : '');
        var signatureLen = signature.length;
        var historyLen = win.history.length;

        for (; 0 < historyLen;) {
            signature += historyLen-- ^ signatureLen++;
        }

        return hash(signature);
    };

    /**
     * Aa: Google Analytics Opt-out Browser Add-on
     * https://tools.google.com/dlpage/gaoptout
     *
     * @param {string} trackingProperty
     * @return {number}
     */
    var isOptOutEnabled = function (trackingProperty) {
        var userPreferences = win._gaUserPrefs;
        if (userPreferences && userPreferences.ioo &&
            userPreferences.ioo() || trackingProperty &&
            true === win['ga-disable-' + trackingProperty]) return true;

        try {
            // check for preferences in additional browser components (IE/Firefox).
            var external = win.external;
            if (external && external._gaUserPrefs
                && 'oo' === external._gaUserPrefs) return true;
        } catch (e) { /* silence */ }

        return false;
    };

    /**
     * Ca: Get values from cookie.
     *
     * @param {string} key -
     * @return {array}
     */
    var getCookieItems = function (key) {
        var items = [];
        var parts = doc.cookie.split(';');
        var pattern = new RegExp('^\\s*' + key + '=\\s*(.*?)\\s*$');

        for (var i = 0; i < parts.length; i++) {
            var found = parts[i].match(pattern);
            if (found) {
                items.push(found[1]);
            }
        }

        return items;
    };

    /**
     * zc: Set a tracking cookie.
     *
     * @param {string} key -
     * @param {string} value -
     * @param {string} path -
     * @param {string} domain -
     * @param {string} trackingId -
     * @param {string} expires -
     * @return {string}
     */
    var setCookie = function (key, value, path, domain, trackingId, expires) {
        var isAllowed = (
            isOptOutEnabled(trackingId)
            ? false : (
                doubleClickDomainPattern.test(doc.location.hostname) ||
                '/' === path &&
                googleDomainPattern.test(domain)
                ? false : true
            )
        );

        if ( ! isAllowed) return false;

        // trim length to max value.
        if (value && 1200 < value.length) {
            value = value.substring(0, 1200);
            setToken(24);
        }

        var cookie = key + '=' + value + '; path=' + path + '; ';

        if (expires) {
            var current = new Date();
            var offset = new Date(current.getTime() + expires);
            cookie += 'expires=' + offset.toGMTString() + '; ';
        }

        if (domain && 'none' !== domain) {
            cookie += 'domain=' + domain + ';';
        }

        var previous = doc.cookie;
        doc.cookie = cookie;

        // testing for success insertion of key
        // by comparing the previous state of cookies
        // to the current one.
        var result = true;

        if (previous !== doc.cookie) {
            var items = getCookieItems(key);
            for (var i = 0; i < items.length; i++) {
                if (value === items[i]) {
                    result = true;
                }
            }
        }

        return result;
    };

    /**
     * Cc: encodes a URI component with parenthesis.
     */
    var encodeCharsWithParens = function (str) {
        return escapeChars(str).replace(/\(/g, '%28').replace(/\)/g, '%29');
    };

    /**
     * vc: pattern for google.com
     */
    var googleDomainPattern = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/;

    /**
     * eb: pattern for doubleclick.net
     */
    var doubleClickDomainPattern = /(^|\.)doubleclick\.net$/i;

    /**
     * oc: Get Google Analytics root url.
     */
    var getGoogleAnalyticsURL = function () {
        return (forceSSL || isSecureProtocol() ? 'https:' : 'http:') + '//www.google-analytics.com';
    };

    /**
     * Da: Length error object.
     */
    var lenError = function (a) {
        this.name = 'len';
        this.message = a + '-8192';
    };

    /**
     * ba: request length limit test result
     */
    var sendRequest = function (uri, params, callback) {
        callback = callback || placeholderFunction;
        if (2036 >= params.length) {
            // information request length limit test result within safe length 2K
            sendByImage(uri, params, callback);
        } else if (8192 >= params.length) {
            // IE6/7 will have issues while the other major browsers are safe.
            sendByBeacon(uri, params, callback) || sendByXHR(uri, params, callback) || sendByImage(uri, params, callback);
        } else {
            throw sendErrorHitByImage('len', params.length), new lenError(params.length);
        }
    };

    /**
     * wc: Register image handlers.
     */
    var sendByImage = function (uri, params, callback) {
        var img = createImage(uri + '?' + params);

        function handler() {
            img.onload = null;
            img.onerror = null;
            callback();
        }

        img.onload = img.onerror = handler;
    };

    /**
     * wd: Send by AJAX.
     */
    var sendByXHR = function (uri, data, callback) {
        var xhr = win.XMLHttpRequest;

        if ( ! xhr) return false;

        var request = new xhr;

        if ( ! ('withCredentials' in request)) return false;

        request.open('POST', uri, true);

        request.withCredentials = true;

        request.setRequestHeader('Content-Type', 'text/plain');

        request.onreadystatechange = function () {
            if (4 === request.readyState) {
                callback();
                request = null;
            }
        };

        request.send(data);

        return true;
    };

    /**
     * wd: Send using sendBeacon.
     *
     * Method to asynchronously transfer small HTTP data from
     * the User Agent to a web server.
     */
    var sendByBeacon = function (uri, data, callback) {
        var request = win.navigator.sendBeacon;

        if (request && request(uri, data)) {
            callback();
            return true;
        }

        return false;
    };

    /**
     * ge: Send error hit by image.
     */
    var sendErrorHitByImage = function (errorType, f, m) {
        var canRandom = (1 <= 100 * Math.random());

        if (canRandom && ! isOptOutEnabled('?')) {
            var list = [
                't=error',  // hit type
                '_e=' + errorType,
                '_v=j39',
                'sr=1' // screen resolution
            ];

            if (f) list.push('_f=' + f);
            if (m) list.push('_m=' + escapeChars(m.substring(0, 100)));

            list.push('aip=1'); // anonymize ip
            list.push('z=' + getRandomBasic()); // cache buster

            sendByImage(getGoogleAnalyticsURL() + '/collect', list.join('&'), placeholderFunction);
        }
    };

    /**
     * Ha: Task Filters
     *
     * Customize how analytics.js validates, constructs, and sends
     * measurement protocol requests. Each time the send command is
     * called, analytics.js executes a sequence of tasks to validate,
     * construct, and send a measurement protocol request from the
     * user's browser to Google Analytics servers.
     *
     * @return {undefined}
     */
    var Filters = function () {
        this.m = [];
    };

    /**
     * Ha.add:
     *
     * Add filters to list.
     *
     * @return {undefined}
     */
    Filters.prototype.add = function (a) {
        this.m.push(a);
    };

    /**
     * Ha.D:
     *
     * Executing list of filters.
     *
     * @param {} a - fields
     * @return {undefined}
     */
    Filters.prototype.execute = function (fields) {
        try {
            for (var i = 0; i < this.m.length; i++) {
                var callback = fields.get(this.m[i]);
                if (callback && isFunction(callback)) callback.call(win, fields);
            }
        } catch (e) { /* silence */ }

        var hitCallback = fields.get(hitCallbackParameter);

        // manually firing callback.
        if (hitCallback !== placeholderFunction && isFunction(hitCallback)) {
            fields.set(hitCallbackParameter, placeholderFunction, true);
            setTimeout(hitCallback, 10);
        }
    };

    /**
     * Ja: samplerTask
     *
     * Determines whether the current user has been sampled out.
     *
     * @param {object} a -
     * @return {undefined}
     */
    function samplerTask(a) {
        if (100 !== a.get(sampleRateParameter) &&
            (hash(getValueStr(a, clientIdParameter)) % 1E4) >=
            (100 * getValueInt(a, sampleRateParameter))) throw 'abort';
    }


    /**
     * Ma: check if opted-out of tracking.
     *
     * @return {undefined}
     */
    function optOutTask(a) {
        if (isOptOutEnabled(getValueStr(a, trackingIdParameter))) throw 'abort';
    }

    /**
     * Oa: Test for valid HTTP protocol.
     *
     * @return {undefined}
     */
    function checkProtocolTask() {
        var protocol = doc.location.protocol;
        if ('http:' !== protocol && 'https:' !== protocol) throw 'abort';
    }


    /**
     * Pa: buildHitTask
     *
     * @param {object} a -
     * @return {undefined}
     */
    function buildHitTask(a) {
        try {
            win.navigator.sendBeacon ? setToken(42) : win.XMLHttpRequest && 'withCredentials' in new win.XMLHttpRequest && setToken(40);
        } catch (b) { /* silence */ }

        a.set(usageParameter, getEncodedToken(a), true);
        a.set(sParameter, getValueInt(a, sParameter) + 1);

        var c = [];

        fieldList.map(function (b, e) {
            if (e.protocolName) {
                var g = a.get(b);
                undefined != g && g != e.defaultValue && ('boolean' == typeof g && (g *= 1), c.push(e.protocolName + '=' + escapeChars('' + g)));
            }
        });

        c.push('z=' + getRandom());

        a.set(hitPayloadParameter, c.join('&'), true);
    }

    /**
     * Sa: Send hit task through to collect.
     *
     * @param {object} a -
     * @return {undefined}
     */
    function sendHitTask(a) {
        var uri = getValueStr(a, transportUrlParameter) || getGoogleAnalyticsURL() + '/collect';
        var method = getValueStr(a, transportParameter);

        if ( ! method && a.get(useBeaconParameter)) {
            method = 'beacon';
        }

        if (method) {
            var data = getValueStr(a, hitPayloadParameter);
            var callback = a.get(hitCallbackParameter);

            callback = callback || placeholderFunction;

            // handle the different methods of sending a request,
            // if a specific methods is provided, use that otherwise
            // this will failover trying every method until the finally
            // trying again.
            (
                  'image' === method
                ? sendByImage(uri, data, callback)
                :       'xhr' == method && sendByXHR(uri, data, callback)
                  || 'beacon' == method && sendByBeacon(uri, data, callback)
                  || sendRequest(uri, data, callback)
            );
        } else {
            sendRequest(uri, getValueStr(a, hitPayloadParameter), a.get(hitCallbackParameter));
        }

        a.set(hitCallbackParameter, placeholderFunction, true);
    }

    /**
     * Hc: Set data for content experiments.
     *
     * @param {object} a -
     * @return {undefined}
     */
    function contentExperimentTask(a) {
        var data = win.gaData;

        if (data) {
            if (data.expId) a.set(experimentIdParameter, data.expId);
            if (data.expVar) a.set(experimentVariantParameter, data.expVar);
        }
    }

    /**
     * cd: Test if page is being loaded as a preview.
     *     Note sure if this is Safari specific [?]
     *
     * @return {undefined}
     */
    function previewTask() {
        if (win.navigator && 'preview' == win.navigator.loadPurpose) throw 'abort';
    }

    /**
     * yd: Set Google Developer ID
     *
     * @param {object} a -
     * @return {undefined}
     */
    function devIdTask(a) {
        var ids = win.gaDevIds;

        if (isArray(ids) && 0 !== ids.length) {
            a.set('&did', ids.join(','), true);
        }
    }

    /**
     * vb: check that the tracking ID has been set.
     *
     * @param {object} a -
     * @return {undefined}
     */
    function validationTask(a) {
        if ( ! a.get(trackingIdParameter)) throw 'abort';
    }

    /**
     * hd: get random value
     *
     * @return {number}
     */
    var getRandomValue = function () {
        return Math.round(2147483647 * Math.random());
    };

    /**
     * Bd: get random value preferring crypto.
     *
     * @return {number}
     */
    var getRandom = function () {
        try {
            var buffer = new Uint32Array(1);
            win.crypto.getRandomValues(buffer);
            return buffer[0] & 2147483647;
        } catch (e) {
            return getRandomValue();
        }
    };

    /**
     * fe: alias for standard random.
     *
     * @type {function}
     */
    var getRandomBasic = getRandomValue;

    /**
     * Ta: related to _rlt parameter
     *
     * @param {object} a-
     * @return {undefined}
     */
    function rateLimitTask(a) {
        var hc = getValueInt(a, hcParameter);

        // maximum number of hits for this page.
        if (500 <= hc) setToken(15);

        var hitType = getValueStr(a, hitTypeParameter);

        if ('transaction' !== hitType && 'item' !== hitType) {
            var to = getValueInt(a, toParameter);
            var ti = getValueInt(a, tiParameter);

            var d = new new Date();
            var now = d.getTime();

            if (0 === ti) a.set(tiParameter, now);

            var diff = Math.round(2 * (now - ti) / 1E3);

            if (0 < diff) {
                to = Math.min(to + diff, 20);
                a.set(tiParameter, now);
            }

            // check if exceeded rate limit for sending hits.
            if (0 >= to) throw 'abort';

            a.set(toParameter, to--);
        }

        a.set(hcParameter, hc++);
    }

    /**
     * Ya: Fields Object
     *
     * @return {undefined}
     */
    var Fields = function () {
        this.data = new Model;
    };

    /**
     * Qa: List of parameters.
     *
     * @type {object}
     */
    var fieldList = new Model;

    /**
     * Za: List of paramter patterns.
     *
     * @type {array}
     */
    var fieldPatterns = [];

    Fields.prototype.get = function (key) {
        var param = getFieldPattern(key);
        var value = this.data.get(key);

        if (param && undefined === value) {
            value = (isFunction(param.defaultValue) ? param.defaultValue() : param.defaultValue);
        }

        return (param && param.getValue ? param.getValue(this, key, value) : value);
    };

    /**
     * P: return value and coherce to string.
     */
    var getValueStr = function (list, key) {
        var value = list.get(key);
        return (undefined === value ? '' : '' + value);
    };

    /**
     * R: return value and coherce to integer.
     *
     * @param {object} list -
     * @param {string} key -
     * @return {number}
     */
    var getValueInt = function (list, key) {
        var value = list.get(key);
        return (undefined == value || '' === value ? 0 : 1 * value);
    };

    /**
     *
     *
     * @param {object} ref -
     * @param {string=} value -
     * @param {function=} callback -
     * @return {undefined}
     */
    Fields.prototype.set = function (ref, value, callback) {
        if (ref) {
            if ('object' === typeof ref) {
                for (var key in ref) {
                    if (ref.hasOwnProperty(key)) {
                        ab(this, key, ref[key], callback);
                    }
                }
            } else {
                ab(this, ref, value, callback);
            }
        }
    };

    /**
     * ab: [?]
     *
     * @param {object} self -
     * @param {string} key -
     * @param {string=} value -
     * @param {function=} callback -
     * @return {undefined}
     */
    var ab = function (self, key, value, callback) {
        if (undefined !== value && trackingIdParameter === key) {
            // [?] not sure what the point of this is as its not evaluated.
            trackingIdPattern.test(value);
        }

        var param = getFieldPattern(key);

        if (param && param.callback) {
            param.callback(self, key, value, callback);
        } else {
            self.data.set(value, callback);
        }
    };

    /**
     * bb: Google Analytic Parameter.
     *
     * @param {string} fieldName -
     * @param {string=} protocolName -
     * @param {*} defaultValue -
     * @param {function=} getValue - Function for returning value.
     * @param {function=} callback -
     * @return {undefined}
     */
    var FieldParameter = function (fieldName, protocolName, defaultValue, getValue, callback) {
        this.name = fieldName;
        // this.F
        this.protocolName = protocolName;
        // this.Z
        this.getValue = getValue;
        // this.o
        this.callback = callback;
        this.defaultValue = defaultValue;
    };

    /**
     * $a: Parse the list of parameter pattern
     *
     * @param {string} key -
     * @return {string}
     */
    var getFieldPattern = function (key) {
        var param = fieldList.get(key);
        if ( ! param) {
            for (var i = 0; i < fieldPatterns.length; i++) {
                var item = fieldPatterns[i];

                var pattern = item[0],
                    callback = item[1];

                // search for a match in they key.
                var result = pattern.exec(key);
                if (result) {
                    param = callback(result);
                    fieldList.set(param.name, param);
                    break;
                }
            }
        }

        return param;
    };

    /**
     * yc: lookup a parameter name by walking through the list.
     *
     * @param {string} protocolName -
     * @return {string|undefined} Returns the parameter name.
     */
    var getFieldName = function (protocolName) {
        var param;

        fieldList.map(function (key, value) {
            if (value.protocolName === protocolName) param = value;
        });

        return (param ? param.name : undefined);
    };

    /**
     * S: Set parameter.
     *
     * @param {string} fieldName -
     * @param {string=} protocolName -
     * @param {*} defaultValue -
     * @param {function=} getValue -
     * @param {function=} callback -
     * @return {string}
     */
    var addField = function (fieldName, protocolName, defaultValue, getValue, callback) {
        var f = new FieldParameter(fieldName, protocolName, defaultValue, getValue, callback);
        fieldList.set(f.name, f);
        return f.name;
    };

    /**
     * cb: set parameter pattern
     *
     * @param {string} findStr -
     * @param {function} callback -
     * @return {undefined}
     */
    var setFieldPattern = function (findStr, callback) {
        var pattern = new RegExp('^' + findStr + '$');
        fieldPatterns.push([pattern, callback]);
    };

    /**
     * T: set paramater with dummy callback [?]
     *
     * @param {string} fieldName -
     * @param {string=} protocolName -
     * @param {*} defaultValue -
     * @return {string}
     */
    var setField = function (fieldName, protocolName, defaultValue) {
        var callback = placeholderFn;
        return addField(fieldName, protocolName, defaultValue, undefined, callback);
    };

    /**
     * db: empty placeholder function
     *
     * @return {undefined}
     */
    var placeholderFn = function () {};

    /**
     * gb: set Google Analaytics reference
     */
    var gaObjectName = isString(window.GoogleAnalyticsObject) &&
        stripWhitespace(window.GoogleAnalyticsObject) ||
        'ga';

    /**
     * Ba: override the current HTTP protocol.
     *
     * @type {boolean}
     */
    var forceSSL = false;

    /**
     * he: [?]
     *
     * @type {}
     */
    var brParameter = addField('_br');

    /**
     * hb: apiVersion
     *
     * @type {number}
     */
    var apiVersionParameter = setField('apiVersion', 'v');

    /**
     * ib: clientVersion
     *
     * @type {number}
     */
    var clientVersionParameter = setField('clientVersion', '_v');

    /**
     * Anonymize IP
     *
     * Optional.
     *
     * When present, the IP address of the sender will be anonymized.
     *
     * @type {boolean}
     */
    addField('anonymizeIp', 'aip');

    /**
     * jb: adSenseId
     *
     * @type {}
     */
    var adSenseIdParameter = addField('adSenseId', 'a');

    /**
     * Va: Hit type
     *
     * The type of hit. Must be one of 'pageview', 'screenview',
     * 'event', 'transaction', 'item', 'social', 'exception', 'timing'.
     *
     * @type {string}
     */
    var hitTypeParameter = addField('hitType', 't');

    /**
     * Ia: Hit Callback
     *
     * Optional.
     *
     * A function that will be called after processing a hit. This
     * callback is designed to always be called, either directly after
     * a hit is sent successfully or when it has been determined that
     * a hit cannot be sent or has failed to send. No arguments are
     * passed to the function when called. You may want to avoid
     * using hitcallBack to execute code that is critical to your
     * application since it's possible it may not get called in rare
     * cases (e.g. if the server doesn't respond or analytics.js fails
     * to load). In this case you can set a timeout to ensure execution.
     *
     * @type {function}
     */
    var hitCallbackParameter = addField('hitCallback');

    /**
     * Ra: hitPayload
     */
    var hitPayloadParameter = addField('hitPayload');

    /**
     * Ra: Non-Interaction Hit
     *
     * Optional.
     *
     * Specifies that a hit be considered non-interactive.
     *
     * @type {string}
     */
    addField('nonInteraction', 'ni');

    /**
     * currencyCode
     *
     *
     *
     * @type {string}
     */
    addField('currencyCode', 'cu');

    /**
     * Data Source
     *
     * Optional.
     *
     * Indicates the data source of the hit. Hits sent from
     * analytics.js will have data source set to 'web'; hits
     * sent from one of the mobile SDKs will have data source
     * set to 'app'.
     *
     * @type {string}
     */
    addField('dataSource', 'ds');

    /**
     * Vd: Use Beacon
     *
     * Optional.
     *
     * This option is now deprecated. Use 'transport' instead. Setting
     * this to true, will instruct the client to use navigator.sendBeacon
     * to send the hit. This is useful in cases where you wish to track
     * an event just before a user navigates away from your site,
     * without delaying the navigation. If the browser does not support
     * navigator.sendBeacon, the hit will be sent normally.
     *
     * @type {boolean}
     */
    var useBeaconParameter = addField('useBeacon', undefined, false);

    /**
     * fa: Transport
     *
     * Optional.
     *
     * This specifies the transport mechanism with which hits will be
     * sent. The options are 'beacon', 'xhr', or 'image'. By default,
     *  analytics.js will try to figure out the best method based on
     * the hit size and browser capabilities. If you specify 'beacon'
     * and the user's browser does not support the `navigator.sendBeacon`
     * method, it will fall back to 'image' or 'xhr' depending on hit size.
     *
     * @type {string}
     */
    var transportParameter = addField('transport');

    /**
     * Session Control
     *
     * Optional.
     *
     * Used to control the session duration. A value of 'start'
     * forces a new session to start with this hit and 'end'
     * forces the current session to end with this hit. All
     * other values are ignored.
     *
     * @type {string}
     */
    addField('sessionControl', 'sc', '');

    /**
     * queueTime
     *
     * [?]
     *
     * @type {}
     */
    addField('sessionGroup', 'sg');

    /**
     * queueTime
     *
     * [?]
     *
     * @type {}
     */
    addField('queueTime', 'qt');

    /**
     * Ac: _s
     *
     * [?]
     *
     * @type {}
     */
    var sParameter = addField('_s', '_s');

    /**
     * Screen Name
     *
     * Required for all hit types.
     *
     * This parameter is optional on web properties, and
     * required on mobile properties for screenview hits,
     * where it is used for the 'Screen Name' of the screenview
     * hit. On web properties this will default to the unique
     * URL of the page by either using the &dl parameter as-is
     * or assembling it from &dh and &dp.
     *
     * @type {string}
     */
    addField('screenName', 'cd');

    /**
     * kb: Document location URL
     *
     * Optional.
     *
     * Specifies the full URL (excluding anchor) of the page.
     * This field is initialized by the create command.
     *
     * @type {string}
     */
    var documentLocationParameter = addField('location', 'dl', '');

    /**
     * lb: Document Referrer
     *
     * Optional.
     *
     * Specifies which referral source brought traffic to a website.
     * This value is also used to compute the traffic source. The
     * format of this value is a URL. This field is initialized
     * by the create command and is only set when the current
     * hostname differs from the referrer hostname, unless the
     * 'alwaysSendReferrer' field is set to true.
     *
     * @type {string}
     */
    var documentReferrerParameter = addField('referrer', 'dr');

    /**
     * mb: Document Path
     *
     * Optional.
     *
     * The path portion of the page URL. Should begin with '/'.
     * For 'pageview' hits, either &dl or both &dh and &dp have
     * to be specified for the hit to be valid. Used to specify
     * virtual page paths.
     *
     * @type {string}
     */
    var documentPathParameter = addField('page', 'dp', '');

    /**
     * Document Host Name
     *
     * Optional.
     *
     * Specifies the hostname from which content was hosted.
     *
     * @type {string}
     */
    addField('hostname', 'dh');

    /**
     * nb: User Language
     *
     * Optional.
     *
     * Specifies the language. This field is initialized by the create command.
     *
     * @type {string}
     */
    var userLanguageParameter = addField('language', 'ul');

    /**
     * ob: Document Encoding
     *
     * Optional.
     *
     * Specifies the character set used to encode the page / document.
     * This field is initialized by the create command.
     *
     * @type {string}
     */
    var documentEncodingParameter = addField('encoding', 'de');

    /**
     * Document Title
     *
     * Optional.
     *
     * The title of the page / document. Defaults to document.title.
     *
     * @type {string}
     */
    addField('title', 'dt', function () {
        return doc.title || undefined;
    });

    /**
     * contentGroup
     *
     *  ga('set', 'contentGroup<Index Number>', '<Group Name>');
     *
     * @type {}
     */
    setFieldPattern('contentGroup([0-9]+)', function (result) {
        return new FieldParameter(result[0], 'cg' + result[1]);
    });

    /**
     * pb: Screen Colors
     *
     * Optional.
     *
     * Specifies the screen color depth. This field is initialized
     * by the create command.
     *
     * @type {}
     */
    var screenColorsParameter = addField('screenColors', 'sd');

    /**
     * qb: Screen Resolution
     *
     * Optional.
     *
     * Specifies the screen resolution. This field is initialized
     * by the create command.
     *
     * @type {string}
     */
    var screenResolutionParameter = addField('screenResolution', 'sr');

    /**
     * rb: Viewport size
     *
     * Optional.
     *
     * Specifies the viewable area of the browser / device. This
     * field is initialized by the create command.
     *
     * @type {string}
     */
    var viewportSizeParameter = addField('viewportSize', 'vp');

    /**
     * sb: Java Enabled
     *
     * Optional.
     *
     * Specifies whether Java was enabled. This field is initialized
     * by the create command.
     *
     * @type {boolean}
     */
    var javaEnabledParameter = addField('javaEnabled', 'je');

    /**
     * tb: flashVersion
     *
     * Optional.
     *
     * Specifies the flash version. This field is initialized by the create command.
     *
     * @type {string}
     */
    var flashVersionParameter = addField('flashVersion', 'fl');

    /**
     * Campaign ID
     *
     * Optional.
     *
     * Specifies the campaign ID.
     *
     * @type {string}
     */
    addField('campaignId', 'ci');

    /**
     * Campaign Name
     *
     * Optional.
     *
     * Specifies the campaign name..
     *
     * @type {string}
     */
    addField('campaignName', 'cn');

    /**
     * Campaign Source
     *
     * Optional.
     *
     * Specifies the campaign source.
     *
     * @type {string}
     */
    addField('campaignSource', 'cs');

    /**
     * Campaign Medium
     *
     * Optional.
     *
     * Specifies the campaign medium.
     *
     * @type {string}
     */
    addField('campaignMedium', 'cm');

    /**
     * Campaign Keyword
     *
     * Optional.
     *
     * Specifies the campaign keyword.
     *
     * @type {string}
     */
    addField('campaignKeyword', 'ck');

    /**
     * Campaign Content
     *
     * Optional.
     *
     * Specifies the campaign content.
     *
     * @type {string}
     */
    addField('campaignContent', 'cc');

    /**
     * ub: Event Category
     *
     * Required for event hit type.
     *
     * Specifies the event category. Must not be empty.
     *
     * @type {string}
     */
    var eventCategoryParameter = addField('eventCategory', 'ec');

    /**
     * xb: Event Action
     *
     * Required for event hit type.
     *
     * Specifies the event action. Must not be empty.
     *
     * @type {string}
     */
    var eventActionParameter = addField('eventAction', 'ea');

    /**
     * yb: Event Label
     *
     * Optional.
     *
     * Specifies the event label.
     *
     * @type {string}
     */
    var eventLabelParameter = addField('eventLabel', 'el');

    /**
     * zb: Event Value
     *
     * Optional.
     *
     * Specifies the event value. Values must be non-negative.
     *
     * @type {number}
     */
    var eventValueParameter = addField('eventValue', 'ev');

    /**
     * Bb: Social Network
     *
     * Required for social hit type.
     *
     * Specifies the social network, for example Facebook or Google Plus.
     *
     * @type {string}
     */
    var socialNetworkParameter = addField('socialNetwork', 'sn');

    /**
     * Cb: Social Action
     *
     * Required for social hit type.
     *
     * Specifies the social interaction action. For example on
     * Google Plus when a user clicks the +1 button, the social
     * action is 'plus'.
     *
     * @type {string}
     */
    var socialActionParameter = addField('socialAction', 'sa');

    /**
     * Db: Social Action Target
     *
     * Required for social hit type.
     *
     * Specifies the target of a social interaction. This value
     * is typically a URL but can be any text.
     *
     * @type {string}
     */
    var socialTargetParameter = addField('socialTarget', 'st');

    /**
     * Eb: Page Load Time
     *
     * Optional.
     *
     * Specifies the time it took for a page to load.
     * The value is in milliseconds.
     *
     * pageLoadTime = (b.loadEventStart - b.navigationStart)
     *
     * @type {number}
     */
    var pageLoadTimeParameter = addField('l1', 'plt');

    /**
     * Fb: Page Download Time
     *
     * Optional.
     *
     * Specifies the time it took for the page to be downloaded.
     * The value is in milliseconds.
     *
     * pageDownloadTime = (b.responseEnd - b.responseStart)
     *
     * @type {number}
     */
    var pageDownloadTimeParameter = addField('l2', 'pdt');

    /**
     * Gb: DNS Time
     *
     * Optional.
     *
     * Specifies the time it took to do a DNS lookup.
     * The value is in milliseconds.
     *
     * dnsQueryTime = (b.domainLookupEnd - b.domainLookupStart)
     *
     * @type {number}
     */
    var dnsQueryTimeParameter = addField('l3', 'dns');

    /**
     * Hb: Redirect Response Time
     *
     * Optional.
     *
     * Specifies the time it took for any redirects to happen.
     * The value is in milliseconds.
     *
     * returnResponseTime = (b.fetchStart - b.navigationStart)
     *
     * @type {number}
     */
    var returnResponseTimeParameter = addField('l4', 'rrt');

    /**
     * Ib: Server Response Time
     *
     * Optional.
     *
     * Specifies the time it took for the server to respond after
     * the connect time. The value is in milliseconds.
     *
     * serverResponseTime = (b.responseStart - b.requestStart)
     *
     * @type {number}
     */
    var serverResponseTimeParameter = addField('l5', 'srt');

    /**
     * Jb: TCP Connect Time
     *
     * Optional.
     *
     * Specifies the time it took for a TCP connection to be made.
     * The value is in milliseconds.
     *
     * tcpConnectionTime = (b.connectEnd - b.connectStart)
     *
     * @type {number}
     */
    var tcpConnectionTimeParameter = addField('l6', 'tcp');

    /**
     * Kb: DOM Interactive Time
     *
     * Optional.
     *
     * Specifies the time it took for Document.readyState to be
     * 'interactive'. The value is in millisecond
     *
     * domInteractiveTime = (b.domInteractive - b.navigationStart)
     *
     * @type {number}
     */
    var domInteractiveTimeParameter = addField('l7', 'dit');

    /**
     * Lb: Content Load Time
     *
     * Optional.
     *
     * Specifies the time it took for the DOMContentLoaded Event
     * to fire. The value is in milliseconds.
     *
     * contentLoadTime = (b.domContentLoadedEventStart - b.navigationStart)
     *
     * @type {number}
     */
    var contentLoadTimeParameter = addField('l8', 'clt');

    /**
     * Mb: User timing category
     *
     * Required for timing hit type.
     *
     * Specifies the user timing category.
     *
     * @type {string}
     */
    var userTimingCategoryParameter = addField('timingCategory', 'utc');

    /**
     * Nb: User timing variable name
     *
     * Required for timing hit type.
     *
     * Specifies the user timing variable.
     *
     * @type {string}
     */
    var userTimingVariableNameParameter = addField('timingVar', 'utv');

    /**
     * Ob: User timing  label
     *
     * Required for timing hit type.
     *
     * Specifies the user timing label.
     *
     * @type {string}
     */
    var userTimingLabelParameter = addField('timingLabel', 'utl');

    /**
     * Pb: User timing time
     *
     * Required for timing hit type.
     *
     * Specifies the user timing value. The value is in milliseconds.
     *
     * @type {number}
     */
    var userTimingTimeParameter = addField('timingValue', 'utt');

    /**
     * Application Name
     *
     * Required for all hit types.
     *
     * Specifies the application name. This field is required for
     * all hit types sent to app properties. For hits sent to web
     * properties, this field is optional.
     *
     * @type {string}
     */
    addField('appName', 'an');

    /**
     * Application Version
     *
     * Optional.
     *
     * Specifies the application version.
     *
     * @type {string}
     */
    addField('appVersion', 'av', '');

    /**
     * Application ID
     *
     * Optional.
     *
     * Application identifier.
     *
     * @type {string}
     */
    addField('appId', 'aid', '');

    /**
     * Application Installer ID
     *
     * Optional.
     *
     * Application installer identifier.
     *
     * @type {string}
     */
    addField('appInstallerId', 'aiid', '');

    /**
     * Exception Description
     *
     * Optional.
     *
     * Specifies the description of an exception. (Optional)
     *
     * @type {string}
     */
    addField('exDescription', 'exd');

    /**
     * Is Exception Fatal?
     *
     * Optional.
     *
     * Specifies whether the exception was fatal.
     *
     * @type {boolean}
     */
    addField('exFatal', 'exf');

    /**
     * Nc: Experiment ID
     *
     * Optional.
     *
     * This parameter specifies that this user has been
     * exposed to an experiment with the given ID. It
     * should be sent in conjunction with the Experiment
     * Variant parameter.
     */
    var experimentIdParameter = addField('expId', 'xid');

    /**
     * Oc: Experiment Variant
     *
     * Optional.
     *
     * This parameter specifies that this user has been
     * exposed to a particular variation of an experiment.
     * It should be sent in conjunction with the Experiment ID parameter.
     */
    var experimentVariantParameter = addField('expVar', 'xvar');

    /**
     * Rc: _utma
     *
     * Used to distinguish users and sessions. The cookie
     * is created when the javascript library executes and
     * no existing __utma cookies exists. The cookie is
     * updated every time data is sent to Google Analytics.
     */
    var utmaParameter = addField('_utma', '_utma');

    /**
     * Sc: _utmz
     *
     * Stores the traffic source or campaign that explains
     * how the user reached your site. The cookie is created
     * when the javascript library executes and is updated
     * every time data is sent to Google Analytics.
     */
    var utmzParameter = addField('_utmz', '_utmz');

    /**
     * Tc: _utmht
     *
     * [?] Time of last hit being sent to Google Analytics
     *
     * @type {date}
     */
    var utmhtParameter = addField('_utmht', '_utmht');

    /**
     * Ua: _hc:
     *
     * [?] Hit counter for each time data is sent to Google Analytics.
     *
     * @type {number}
     */
    var hcParameter = addField('_hc', undefined, 0);

    /**
     * Xa: _ti
     *
     * [?] Rate limit time ...
     *
     * @type {date}
     */
    var tiParameter = addField('_ti', undefined, 0);

    /**
     * Wa: _to
     *
     * [?] Rate limit time offset.
     *
     * @type {date}
     */
    var toParameter = addField('_to', undefined, 20);

    /**
     * Custom Dimension
     *
     * Optional.
     *
     * Each custom dimension has an associated index. There is a
     * maximum of 20 custom dimensions (200 for Premium accounts).
     * The dimension index must be a positive integer between 1
     * and 200, inclusive.
     *
     * @type {number}
     */
    setFieldPattern('dimension([0-9]+)', function (result) {
        return new FieldParameter(result[0], 'cd' + result[1]);
    });

    /**
     * Custom Metric
     *
     * Optional.
     *
     * Each custom metric has an associated index. There is a
     * maximum of 20 custom metrics (200 for Premium accounts).
     * The metric index must be a positive integer between 1 and
     * 200, inclusive.
     *
     * @type {number}
     */
    setFieldPattern('metric([0-9]+)', function (result) {
        return new FieldParameter(result[0], 'cm' + result[1]);
    });

    /**
     * Command to retrieve a special linker parameter that includes
     * both the client ID as well as a hashed timestamp.
     *
     * @type {}
     */
    addField('linkerParam', undefined, undefined, getClientSessionReference, placeholderFn);

    /**
     * ld: usage
     *
     * [?]
     *
     * @type {}
     */
    var usageParameter = addField('usage', '_u');

    /**
     * Gd: _um
     *
     * [?]
     *
     * @type {}
     */
    var umParameter = addField('_um');

    /**
     * Force SSL
     *
     * Optional.
     *
     * By default, tracking beacons sent from https pages
     * will be sent using https while beacons sent from http
     * pages will be sent using http. Setting forceSSL to
     * true will force http pages to also send all beacons
     * using https.
     *
     * @type {boolean}
     */
    addField('forceSSL', undefined, undefined, function () {
        return forceSSL;
    }, function (a, b, c) {
        setToken(34);
        forceSSL = !!c;
    });

    /**
     * ed: Display Join Beacon
     *
     * Used for linking analytics with the DoubleClick cookie. If you've enabled
     * display advertising (for e.g. demographic data etc.) any hits will be
     * resent through the DoubleClick servers, use the ID to join
     * the data together.
     *
     * @type {}
     */
    var joinIdParameter = addField('_j1', 'jid');

    setFieldPattern('\\&(.*)', function (result) {
        var param = new FieldParameter(result[0], result[1]);
        var foundName = getFieldName(result[0].substring(1));

        if (foundName) {
            param.protocolName = undefined;

            param.getValue = function (a) {
                return a.get(foundName);
            };

            param.callback = function (a, b, g, ca) {
                a.set(foundName, g, ca);
            };
        }

        return param;
    });

    /**
     * Qb: _oot
     *
     * [?]
     *
     * @type {}
     */
    var optOutTaskParameter = setField('_oot');

    /**
     * dd: previewTask
     *
     * Aborts the request if the page is only being rendered
     * to generate a 'Top Sites' thumbnail for Safari.
     *
     * @type {}
     */
    var previewTaskParameter = addField('previewTask');

    /**
     * Rb: checkProtocolTask
     *
     * Aborts the request if the page protocol is not http or https.
     *
     * @type {}
     */
    var checkProtocolTaskParameter = addField('checkProtocolTask');

    /**
     * md: validationTask
     *
     * Aborts the request if required fields are missing or invalid.
     *
     * @type {}
     */
    var validationTaskParameter = addField('validationTask');

    /**
     * Sb: checkStorageTask
     *
     * Aborts the request if the tracker is configured to use cookies
     * but the user's browser has cookies disabled.
     *
     * @type {}
     */
    var checkStorageTaskParameter = addField('checkStorageTask');

    /**
     * Uc: historyImportTask
     *
     * Imports information from ga.js and urchin.js cookies to preserve
     * visitor history when a site migrates to Universal Analytics.
     *
     * @type {}
     */
    var historyImportTaskParameter = addField('historyImportTask');

    /**
     * Tb: samplerTask
     *
     * Samples out visitors based on the sampleRate setting for this tracker.
     *
     * @type {}
     */
    var samplerTaskParameter = addField('samplerTask');

    /**
     * Vb: _rlt
     *
     * [?]
     *
     * @type {}
     */
    var rateLimitTaskParameter = addField('_rlt');

    /**
     * Wb: buildHitTask
     *
     * Builds a measurement protocol request string and stores
     * it in the hitPayload field.
     *
     * @type {}
     */
    var buildHitTaskParameter = addField('buildHitTask');

    /**
     * Xb: sendHitTask
     *
     * Transmits the measurement protocol request stored in
     * the hitPayload field to Google Analytics servers.
     *
     * @type {}
     */
    var sendHitTaskParameter = addField('sendHitTask');

    /**
     * Vc: Content Experiment Task
     *
     * The Google Analytics Content Experiments Framework enables you
     * to test almost any change or variation to a property to see
     * how it performs in optimizing a specific goal. For example,
     * increasing goal completions or decreasing bounce rates. This
     * allows you to identify changes worth implementing based on
     * the direct impact they have on the performance of your
     * website.
     *
     * @type {}
     */
    var contentExperimentTaskParameter = addField('ceTask');

    /**
     * zd: Google Developer IDs
     *
     * [?]
     *
     * @type {}
     */
    var devIdTaskParameter = addField('devIdTask');

    /**
     * Cd: timingTask
     *
     * Automatically generates a site speed timing hit based
     * on the siteSpeedSampleRate setting for this tracker.
     *
     * @type {}
     */
    var timingTaskParameter = addField('timingTask');

    /**
     * Ld: displayFeaturesTask
     *
     * Sends an additional hit if display features is enabled and
     * a previous hit has not been sent within the timeout period
     * set by the display features cookie (_gat).
     *
     * @type {}
     */
    var displayFeaturesTaskParameter = addField('displayFeaturesTask');

    /**
     * V: name
     *
     * [?]
     *
     * @type {}
     */
    var nameParameter = setField('name');

    /**
     * Q: Client ID
     *
     * Required for all hit types.
     *
     * Anonymously identifies a browser instance. By default,
     * this value is stored as part of the first-party analytics
     * tracking cookie with a two-year expiration.
     *
     * @type {string}
     */
    var clientIdParameter = setField('clientId', 'cid');

    /**
     * Ad: User ID
     *
     * Optional.
     *
     * This is intended to be a known identifier for a user provided
     * by the site owner/tracking library user. It must not itself
     * be PII (personally identifiable information). The value
     * should never be persisted in GA cookies or other Analytics
     * provided storage.
     *
     * @type {string}
     */
    var userIdParameter = addField('userId', 'uid');

    /**
     * Na: Tracking ID / Web Property ID
     *
     * Required for all hit types.
     *
     * The tracking ID / web property ID. The format is UA-XXXX-Y.
     * All collected data is associated by this ID.
     *
     * @type {string}
     */
    var trackingIdParameter = setField('trackingId', 'tid');

    /**
     * U: Cookie Name
     *
     * Optional. This may only be set in the create method.
     *
     * Name of the cookie used to store analytics data
     *
     * @type {string}
     */
    var cookieNameParameter = setField('cookieName', undefined, '_ga');

    /**
     * W: Cookie Domain
     *
     * Optional. This may only be set in the create method.
     *
     * Specifies the domain used to store the analytics cookie.
     * Setting this to 'none' sets the cookie without specifying a domain.
     *
     * @type {string}
     */
    var cookieDomainParameter = setField('cookieDomain');

    /**
     * Yb: cookiePath
     *
     * @type {string}
     */
    var cookiePathParameter = setField('cookiePath', undefined, '/');

    /**
     * Zb: Cookie Expiration
     *
     * Optional. This may only be set in the create method.
     *
     * Specifies the cookie expiration, in seconds.
     *
     * @type {number}
     */
    var cookieExpiresParameter = setField('cookieExpires', undefined, 63072E3);

    /**
     * $b: Legacy Cookie Domain
     *
     * Optional. This may only be set in the create method.
     *
     * This field is used to configure how analytics.js searches
     * for cookies generated by earlier Google Analytics tracking
     * scripts such as ga.js and urchin.js.
     *
     * @type {string}
     */
    var legacyCookieDomainParameter = setField('legacyCookieDomain');

    /**
     * Wc: Legacy History Import
     *
     * Optional. This may only be set in the create method.
     *
     * Specifies whether analytics.js should attempt to import history
     * data from ga.js cookies.
     *
     * @type {boolean}
     */
    var legacyHistoryImportParameter = setField('legacyHistoryImport', undefined, true);

    /**
     * ac: storage
     *
     * [?]
     *
     * @type {string}
     */
    var storageParameter = setField('storage', undefined, 'cookie');

    /**
     * bc: Allow Linker Parameters
     *
     * Optional. This may only be set in the create method.
     *
     * Setting this field to true will enables the parsing of
     * cross-domain linker parmeters used to transfer state across domains.
     *
     * @type {boolean}
     */
    var allowLinkerParameter = setField('allowLinker', undefined, false);

    /**
     * cc: Allow Anchor Parameters
     *
     * Optional. This may only be set in the create method.
     *
     * By default, analytics.js will search for custom campaign
     * parameters such as utm_source, utm_medium, etc. in both the
     * query string and anchor of the current page's URL. Setting
     * this field to false will result in ignoring any custom
     * campaign parameters that appear in the anchor.
     *
     * @type {boolean}
     */
    var allowAnchorParameter = setField('allowAnchor', undefined, true);

    /**
     * Ka: Sample Rate
     *
     * Optional. This may only be set in the create method.
     *
     * Specifies what percentage of users should be tracked. This
     * defaults to 100 (no users are sampled out) but large sites
     * may need to use a lower sample rate to stay within Google
     * Analytics processing limits.
     *
     * @type {number}
     */
    var sampleRateParameter = setField('sampleRate', 'sf', 100);

    /**
     * dc: Site Speed Sample Rate
     *
     * Optional. This may only be set in the create method.
     *
     * This setting determines how often site speed tracking beacons
     * will be sent. By default, 1% of users will be automatically
     * be tracked.
     *
     * @type {number}
     */
    var siteSpeedSampleRateParameter = setField('siteSpeedSampleRate', undefined, 1);

    /**
     * ec: Always Send Referrer
     *
     * Optional. This may only be set in the create method.
     *
     * By default the HTTP referrer URL, which is used to attribute
     * traffic sources, is only sent when the hostname of the referring
     * site differs from the hostname of the current page. Enable this
     * setting only if you want to process other pages from your current
     * host as referrals.
     *
     * @type {boolean}
     */
    var alwaysSendReferrerParameter = setField('alwaysSendReferrer', undefined, false);

    /**
     * gd: transportUrl
     *
     * [?]
     *
     * @type {string}
     */
    var transportUrlParameter = addField('transportUrl');

    /**
     * Md: _r
     *
     * [?]
     *
     * @type {string}
     */
    var _rParameter = addField('_r', '_r');

    /**
     * X: Wrap function.
     *
     * @param {string} key -
     * @param {object} b -
     * @param {function} callback -
     * @param {number=} num -
     * @return {undefined}
     */
    function fnWrap(key, b, callback, num) {
        b[key] = function () {
            try {
                if (num) {
                    setToken(num);
                    callback.apply(this, arguments);
                }
            } catch (e) {
                throw sendErrorHitByImage('exc', key, e && e.name), e;
            }
        };
    }

    /**
     * Od: User Sampling Rate
     *
     * [?] Initialization values for calculating a sample rate, maybe?
     *
     * @param {boolean} override -
     * @param {number} br -
     * @param {number=} max -
     * @return {undefined}
     */
    var UserSampleRate = function (override, br, max) {
        this.threshold = 1E4; // 10000;
        this.override = override;
        this.isSampled = false;
        this.br = br; // brParameter
        this.max = max || 1;
    };

    /**
     * Ed: get user sampling value.
     *
     * [?] Looks related to sampling out users.
     *
     * @param {object} a -
     * @param {object=} fields -
     * @return {number}
     */
    var getUserSample = function (a, fields) {
        var num;

        if (a.override && a.isSampled) return 0;

        a.isSampled = true;

        if (fields) {
            if (a.br && getValueInt(fields, a.br)) return getValueInt(fields, a.br);
            if (0 === fields.get(siteSpeedSampleRateParameter)) return 0;
        }

        if (0 === a.dec) return 0;

        if (undefined === num) num = getRandom();

        return (0 === (num % a.threshold) ? (Math.floor(num / a.threshold) % a.max) + 1 : 0);
    };

    /**
     * ie: User Sample Rate
     *
     * [?] No idea what these parameters represent.
     *
     * @type {object}
     */
    var usr = new UserSampleRate(true, brParameter, 7);

    /**
     * je: Send sample
     *
     * @param {object} fields - Tracker fields.
     * @return {undefined}
     */
    var sampleHit = function (fields) {
        if (isSecureProtocol() || forceSSL) return;

        if ( ! isSecureProtocol() && ! forceSSL) {
            var b = getUserSample(usr, fields);

            if (b && ! ( ! win.navigator.sendBeacon && 4 <= b && 6 >= b)) {
                var hours = (new Date).getHours();
                var ref = [getRandom(), getRandom(), getRandom()].join('.');

                var a = (3 === b || 5 === b ? 'https:' : 'http:') +
                    '//www.google-analytics.com/collect?z=br.' +
                    [b, 'A', hours, ref].join('.');

                var e = (1 !== b % 3 ? 'https:' : 'http:') +
                    '//www.google-analytics.com/collect?z=br.'
                    + [b, 'B', hours, ref].join('.');

                if (7 === b) {
                    e = e.replace('//www.', '//ssl.');
                }

                var fn = function () {
                    4 <= b && 6 >= b
                    ? win.navigator.sendBeacon(e, '')
                    : createImage(e);
                };

                getRandom() % 2 ? (
                    createImage(a),
                    fn())
                : (
                    fn(),
                    createImage(a)
                );
            }
        }
    };

    /**
     * fc: get flash verion.
     *
     * @return {string|undefined}
     */
    function getFlashVersion() {
        var flash;
        var version;
        var plugins = (win.navigator.plugins ? win.navigator.plugins : null);

        if (plugins && plugins.length) {
            for (var i = 0; i < plugins.length; i++) {
                var plugin = plugins[i];
                if (-1 < plugin.name.indexOf('Shockwave Flash')) {
                    version = plugin.description;
                    break;
                }
            }
        }

        if (win.ActiveXObject) {
            var axo = win.ActiveXObject;
            if ( ! version) {
                try {
                    flash = new axo('ShockwaveFlash.ShockwaveFlash.7');
                    version = flash.GetVariable('$version');
                } catch (e) { /* silence */ }
            }

            if ( ! version) {
                try {
                    flash = new axo('ShockwaveFlash.ShockwaveFlash.6');
                    // IE6 is known to crash when you attempt to GetVariable, if
                    // the next commands throws exception, then assume IE6.
                    version = 'WIN 6,0,21,0';
                    flash.AllowScriptAccess = 'always';
                    version = flash.GetVariable('$version');
                } catch (e) { /* silence */ }
            }

            if ( ! version) {
                try {
                    flash = new axo('ShockwaveFlash.ShockwaveFlash');
                    version = flash.GetVariable('$version');
                } catch (e) { /* silence */ }
            }
        }

        // reformat version numbers.
        if (version) {
            var numbers = version.match(/[\d]+/g);
            if (3 <= numbers.length) {
                version = numbers[0] + '.' + numbers[1] + ' r' + numbers[2];
            }
        }

        return version || undefined;
    }

    /**
     * gc: calculate page performance
     *
     * @param {object} a -
     * @param {function} callback -
     * @return {undefined}
     */
    var setPagePerformance = function (a, callback) {
        var sampleRate = Math.min(getValueInt(a, siteSpeedSampleRateParameter), 100);

        var t = {};

        // test if site speed data should be sent if visitor sampled out.
        if ( ! (hash(getValueStr(a, clientIdParameter)) % 100 >= sampleRate)
            && (setPageTimings(t) || setPageLoadTime(t))) {
            var value = t[pageLoadTimeParameter];

            // site speed data not sent due to unsupported browser.
            if (undefined === value || Infinity === value ||
                isNaN(value) || 0 < value) {
                filterNumber(t, dnsQueryTimeParameter);
                filterNumber(t, tcpConnectionTimeParameter);
                filterNumber(t, serverResponseTimeParameter);
                filterNumber(t, pageDownloadTimeParameter);
                filterNumber(t, returnResponseTimeParameter);
                filterNumber(t, domInteractiveTimeParameter);
                filterNumber(t, contentLoadTimeParameter);
                callback(t);
            } else {
                // site speed data not available - waiting for onload
                registerListener(win, 'load', function () {
                    setPagePerformance(a, callback);
                }, false);
            }
        }
    };

    /**
     * Ec: set page timings.g
     *
     * @param {object} a -
     * @return {boolean}
     */
    var setPageTimings = function (a) {
        //var performance = win.performance || win.mozPerformance || win.msPerformance || win.webkitPerformance || {};
        //var timing = performance.timing || {};
        //var navigation = performance.navigation || {};

        var p = win.performance || win.webkitPerformance;
        var t = p && p.timing;

        if ( ! t) return false;

        var s = t.navigationStart;

        if (0 === s) return false;

        a[pageLoadTimeParameter] = t.loadEventStart - s;
        a[dnsQueryTimeParameter] = t.domainLookupEnd - t.domainLookupStart;
        a[tcpConnectionTimeParameter] = t.connectEnd - t.connectStart;
        a[serverResponseTimeParameter] = t.responseStart - t.requestStart;
        a[pageDownloadTimeParameter] = t.responseEnd - t.responseStart;
        a[returnResponseTimeParameter] = t.fetchStart - s;
        a[domInteractiveTimeParameter] = t.domInteractive - s;
        a[contentLoadTimeParameter] = t.domContentLoadedEventStart - s;

        return true;
    };

    /**
     * Fc: [?] Not sure if this a google toolbar/plugin thats being detected.
     *
     * @param {object} a -
     * @return {boolean}
     */
    var setPageLoadTime = function(a) {
        // ensure window is top.
        if (win.top !== win) return false;

        var onloadT;

        var e = win.external;

        if (e && e.onloadT) onloadT = e.onloadT;
        if (e && ! e.isValidLoadTime) onloadT = undefined;
        if (2147483648 < onloadT) onloadT = undefined;
        if (0 < onloadT) e.setPageReadyTime();
        if (undefined === onloadT) return false;

        a[pageLoadTimeParameter] = onloadT;

        return true;
    };

    /**
     * Y: filter number for valid integer.
     *
     * @param {object} c -
     * @param {string} key -
     * @return {undefined}
     */
    var filterNumber = function (c, key) {
        var value = c[key];
        if (isNaN(value) || Infinity === value || 0 > value) c[key] = undefined;
    };

    /**
     * Fd: Track Page performance
     *
     * @param {object} a -
     * @return {function}
     */
    var timingTask = function (a) {
        return function (b) {
            if ('pageview' !== b.get(hitTypeParameter) || a.I) {
                a.I = true;
                setPagePerformance(b, function (b) {
                    a.send('timing', b);
                });
            }
        };
    };

    /**
     * hc: track whether cookie has been set.
     *
     * @type {boolean}
     */
    var isCookieSet = false;

    /**
     * mc: Set hit cookie
     *
     * @param {object} a -
     * @return {undefined}
     */
    var setTrackingCookie = function (a) {
        if ('cookie' !== getValueStr(a, storageParameter)) return;

        var key = getValueStr(a, cookieNameParameter);
        var value = getCookieValueGA1(a);
        var path = prefixForwardSlash(getValueStr(a, cookiePathParameter));
        var domain = removeDotPrefix(getValueStr(a, cookieDomainParameter));
        var expires = 1E3 * getValueInt(a, cookieExpiresParameter);
        var trackingId = getValueStr(a, trackingIdParameter);

        var success;

        // if domain is assigned, use it ...
        if ('auto' !== domain) {
            success = setCookie(key, value, path, domain, trackingId, expires);
            if (success) isCookieSet = true;
        } else {
            // ... otherwise, attempt to determine the domain.
            setToken(32);

            // [?] looks like it makes generate variations
            //     for which it makes multiple attempts to
            //     place the cookie on the domain name.
            var variations = [];

            domain = getHostname().split('.');

            if (4 === domain.length) {
                var l = domain[domain.length - 1];
                if (parseInt(l, 10) === l) l = ['none'];
            } else {
                for (var i = domain.length - 2; 0 <= i; i--) {
                    variations.push(domain.slice(i).join('.'));
                }

                variations.push('none');
            }

            for (var j = 0; j < variations.length; j++) {
                domain = variations[j];
                a.data.set(cookieDomainParameter, domain);
                value = getCookieValueGA1(a);
                success = setCookie(key, value, path, domain, trackingId, expires);
                if (success) {
                    isCookieSet = true;
                    return;
                }
            }

            a.data.set(cookieDomainParameter, 'auto');
        }
    };

    /**
     * nc: checkStorageTaskParameter
     *
     * @param {object} a -
     * @return {undefined}
     */
    var checkStorageTask = function (a) {
        if ('cookie' === getValueStr(a, storageParameter) &&
            ! isCookieSet && (setTrackingCookie(a), ! isCookieSet)) throw 'abort';
    };

    /**
     * Yc: historyImportTaskParameter
     *
     * @param {object} a -
     * @return {undefined}
     */
    var historyImportTask = function (a) {
        if (a.get(legacyHistoryImportParameter)) {
            var b = getValueStr(a, cookieDomainParameter);
            var c = getValueStr(a, legacyCookieDomainParameter) || getHostname();
            var d = getCookieByName('__utma', c, b);

            if (d) {
                setToken(19);
                a.set(utmhtParameter, (new Date).getTime(), true);
                a.set(utmaParameter, d.R);

                if (d.hash == b.hash) a.set(utmzParameter, b.R);
            }
        }
    };

    /**
     * nd: Format of the GA cookie.
     *
     * @param {object} a -
     * @return {string}
     */
    var getCookieValueGA1 = function (a) {
        var clientId = getValueStr(a, clientIdParameter);
        var encodedClientId = encodeCharsWithParens(clientId);

        var domainLevels = getDomainLevelsCount(getValueStr(a, cookieDomainParameter));
        var directoryCount = getPathDirectoryCount(getValueStr(a, cookiePathParameter));

        if (1 < directoryCount) domainLevels += '-' + directoryCount;

        return ['GA1', domainLevels, encodedClientId].join('.');
    };

    /**
     * Gc: [?]
     *
     * @param {array} a -
     * @param {number} count - director or path count.
     * @param {number} c - 1/0
     * @return {array}
     */
    var filterURIParts = function (a, count, ref) {
        var d = [], e = [], g;

        for (var i = 0; i < a.length; i++) {
            var l = a[i];

            if (l.H[ref] === count) {
                d.push(l);
            } else if (undefined === g || l.H[ref] < g) {
                e = [l];
                g = l.H[ref];
                if (l.H[ref] === g) e.push(l);
            }
        }

        return 0 < d.length ? d : e;
    };

    /**
     * lc: Fix domain prefix
     *
     * @param {string} domain -
     * @return {string}
     */
    var removeDotPrefix = function (domain) {
        return (0 === domain.indexOf('.') ? domain.substr(1) : domain);
    };

    /**
     * ic: Get number of levels in domain.
     *
     * @param {string} domain -
     * @return {number}
     */
    var getDomainLevelsCount = function (domain) {
        return removeDotPrefix(domain).split('.').length;
    };

    /**
     * kc: Fix a path with a trailing slash
     *
     * @param {string} path -
     * @return {string}
     */
    var prefixForwardSlash = function (path) {
        if ( ! path) return '/';

        if (1 < path.length && path.lastIndexOf('/') === (path.length - 1))
            path = path.substr(0, path.length - 1);

        if (0 !== path.indexOf('/')) path = '/' + path;

        return path;
    };

    /**
     * jc: Count directory parts in path.
     *
     * @param {string} path -
     * @return {number}
     */
    var getPathDirectoryCount = function (path) {
        path = prefixForwardSlash(path);
        return ('/' === path ? 1 : path.split('/').length);
    };

    /**
     * Xc: Get cookie by name.
     *
     * @param {object} name -
     * @param {string} cookieDomain -
     * @param {string} legacyCookieDomain -
     * @return {string|undefined}
     */
    function getCookieByName(name, cookieDomain, legacyCookieDomain) {
        // Setting this to 'none' sets the cookie
        // without specifying a domain.
        if ('none' === cookieDomain) cookieDomain = '';

        var list = [];
        var items = getCookieItems(name);

        // __utma is presistent cookie to calculate Days and Visits.
        var nameLen = ('__utma' === name ? 6 : 2);

        for (var i = 0; i < items.length; i++) {
            var value = ('' + items[i]).split('.');

            if (value.length >= nameLen) {
                list.push({
                    hash: value[0],
                    R: items[i],
                    O: value
                });
            }
        }

        if (0 === list.length) return undefined;
        if (1 === list.length) return list[0];

        // try different variations.
        return getCookieDomain(cookieDomain, list) ||
               getCookieDomain(legacyCookieDomain, list) ||
               getCookieDomain(null, list) ||
               list[0];
    }

    /**
     * Zc: parse lookup list looking for matching cookie.
     *
     * @param {string} domain -
     * @param {array} list -
     * @return {string|undefined}
     */
    function getCookieDomain(domain, list) {
        var h1, h2;

        if (null === domain) {
            h1 = h2 = 1;
        } else {
            h1 = hash(domain);
            h2 = hash(startsWith(domain, '.') ? domain.substring(1) : '.' + domain);
        }

        for (var i = 0; i < list.length; i++) {
            if (list[i].hash === h1 || list[i].hash === h2) return list[i];
        }
    }

    /**
     * od: Pattern for url starting with valid HTTP protocol.
     *
     * @type {object}
     */
    var httpPattern = new RegExp(/^https?:\/\/([^\/:]+)/);

    /**
     * pd: Google Analtics tracking pattern [?]
     *
     * @type {string}
     */
    var trackerPattern = /(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/;

    /**
     * Bc: get unique identifier for GA.
     *
     * @param {object} a -
     * @return {string}
     */
    function getClientSessionReference(a) {
        var clientId = a.get(clientIdParameter);
        var sessionId = getSessionHash(clientId, 0);
        return '_ga=1.' + escapeChars(sessionId + '.' + clientId);
    }

    /**
     * Ic: Unique identifer the browser session.
     *
     * @param {string} clientId -
     * @param {number} offset -
     * @return {number}
     */
    function getSessionHash(clientId, offset) {
        var d = new Date();

        var info = [
            clientId,
            nav.userAgent,
            d.getTimezoneOffset(),
            d.getYear(),
            d.getDate(),
            d.getHours(),
            d.getMinutes() + offset
        ];

        var nav = win.navigator;
        var plugins = nav.plugins || [];

        for (var i = 0; i < plugins.length; i++) {
            info.push(plugins[i].description);
        }

        return hash(info.join('.'));
    }

    /**
     * Dc: Tracking links between pages.
     *
     * @param {object} a -
     * @return {undefined}
     */
    var Linker = function (a) {
        setToken(48);
        this.target = a;
        this.T = false;
    };

    /**
     * Dc.ca: decorate
     *
     * @param {string|object} a - Either a element or a string href.
     * @param {} b
     * @return {undefined}
     */
    Linker.prototype.decorate = function (a, b) {
        if (a.tagName) {
            var tag = a.tagName.toLowerCase();

            if ('a' === tag) {
                if (a.href) a.href = hrefLinker(this, a.href, b);
                return;
            }

            if ('form' === tag) return formLinker(this, a);
        }

        if ('string' === typeof a) return hrefLinker(this, a, b);
    };

    /**
     * qd: Add tracking code to href.
     *
     * @param {object} self
     * @param {string} href
     * @param {number} c
     * @return {}
     */
    var hrefLinker = function (self, href, c) {
        var matches = trackerPattern.exec(href);

        if (matches && 3 <= matches.length) {
            href = matches[1] + (matches[3] ? matches[2] + matches[3] : '');
        }

        var ga = self.target.get('linkerParam');

        var hashQueryStr = href.indexOf('?');
        var hasHashSymbol = href.indexOf('#');

        if (c) {
            href += (-1 === hasHashSymbol ? '#' : '&') + ga;
        } else {
            var prefix = (-1 == hashQueryStr ? '?' : '&');
            href = (
                -1 == hasHashSymbol
                ? href + (prefix + ga)
                : href.substring(0, hasHashSymbol) + prefix + ga + href.substring(hasHashSymbol)
            );
        }

        return href;
    };

    /**
     * rd: Append tracker value to form.
     *
     * @param {object} self -
     * @param {object} form -
     * @return {undefined}
     */
    var formLinker = function (self, form) {
        if (form && form.action) {
            var gaValue = self.target.get('linkerParam').split('=')[1];

            if ('get' === form.method.toLowerCase()) {
                var nodes = form.childNodes || [];

                for (var i = 0; i < nodes.length; i++) {
                    if ('_ga' === nodes[i].name) {
                        nodes[i].setAttribute('value', gaValue);
                        return;
                    }
                }

                var input = doc.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', '_ga');
                input.setAttribute('value', gaValue);
                form.appendChild(input);

            } else if ('post' === form.method.toLowerCase()) {
                form.action = hrefLinker(self, form.action);
            }
        }
    };

    /**
     * Dc.S: autoLink
     *
     * @param {} a -
     * @param {} b -
     * @param {} c -
     * @return {undefined}
     */
    Linker.prototype.autoLink = function (a, b, c) {
        var handler = function (e) {
            try {
                e = e || win.event;
                var tag = {};
                var n = e.target || e.srcElement;
                for (var i = 100; n && 0 < i;) {
                    if (n.href && n.nodeName.match(/^a(?:rea)?$/i)) {
                        tag = n;
                    } else {
                        n = n.parentNode;
                        i--;
                    }
                }

                if ('http:' === tag.protocol || 'https:' === tag.protocol) {
                    if (isValidHostname(a, tag.hostname || '') && tag.href) {
                        tag.href = hrefLinker(self, tag.href, b);
                    }
                }
            } catch (e) {
                setToken(26);
            }
        };

        var self = this;

        if ( ! self.T) {
            self.T = true;
            registerListener(doc, 'mousedown', handler, false);
            registerListener(doc, 'keyup', handler, false);
        }

        if (c) {
            var submitHandler = function (e) {
                e = e || win.event;
                var form = e.target || e.srcElement;
                if (form && form.action) {
                    var matches = form.action.match(httpPattern);
                    if (matches && isValidHostname(a, matches[1]))
                        formLinker(self, form);
                }
            };

            for (var i = 0; i < doc.forms.length; i++) {
                registerListener(doc.forms[i], 'submit', submitHandler);
            }
        }
    };

    /**
     * sd: verify the hostname [?] checking for cross origin?
     *
     * @param {} a -
     * @param {} hostname -
     * @return {boolean}
     */
    function isValidHostname(a, hostname) {
        if (hostname === doc.location.hostname) return false;

        for (var i = 0; i < a.length; i++) {
            if (a[i] instanceof RegExp) {
                if (a[i].test(hostname)) {
                    return true;
                }
            } else if (0 <= hostname.indexOf(a[i])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Jd:
     *
     * _gat: Used to throttle request rate.
     *
     * @param {} fields -
     * @param {string=} url -
     * @param {string=} cookieName -
     * @return {undefined}
     */
    var DoubleClick = function (fields, url, cookieName) {
        this.jid = joinIdParameter;
        this.url = url;

        // display features cookie = _gat
        if ( ! cookieName) {
            cookieName = '_gat';
            var str = getValueStr(fields, nameParameter);

            if (str && 't0' !== str) {
                if (gtmPattern.test(str)) {
                    cookieName = '_gat_' + encodeCharsWithParens(getValueStr(fields, trackingIdParameter));
                } else {
                    cookieName = '_gat_' + encodeCharsWithParens(str);
                }
            }
        }

        this.name = cookieName;
    };

    /**
     * Rd:
     *
     * @param {} a -
     * @param {object} fields -
     * @return {undefined}
     */
    var doubleClickHit = function (dc, fields) {
        var buildHitTask = fields.get(buildHitTaskParameter);

        fields.set(buildHitTaskParameter, function (b) {
            setJoinId(dc, b);
            var d = buildHitTask(b);
            setDoubleClickCookie(dc, b);
            return d;
        });

        var sendHitTask = fields.get(sendHitTaskParameter);

        fields.set(sendHitTaskParameter, function (b) {
            var c = sendHitTask(b);
            sendDoubleClickHit(dc, b);
            return c;
        });
    };

    /**
     * Pd:
     *
     * @param {} a -
     * @param {object} b -
     * @return {undefined}
     */
    var setJoinId = function (dc, b) {
        if ( ! b.get(dc.jid)) {
            b.set(dc.jid, ('1' == getCookieItems(dc.name)[0] ? '' : '' + getRandomBasic()), true);
        }
    };

    /**
     * Qd:
     *
     * @param {} dc - DoubleClick
     * @param {object} b -
     * @return {undefined}
     */
    var setDoubleClickCookie = function(dc, b) {
        if (b.get(dc.jid)) {
            var key = dc.name;
            var value = '1';
            var path = b.get(cookiePathParameter);
            var domain = b.get(cookieDomainParameter);
            var trackingId = b.get(trackingIdParameter);
            var expires = 6E5;
            setCookie(key, value, path, domain, trackingId, expires);
        }
    };

    /**
     * Id:
     *
     * @param {} dc - DoubleClick
     * @param {object} fields -
     * @return {undefined}
     */
    var sendDoubleClickHit = function (dc, fields) {
        if (fields.get(dc.jid)) {
            var m = new Model;

            var copyField = function (k) {
                if (getFieldPattern(k).protocolName)
                    m.set(getFieldPattern(k).protocolName, fields.get(k));
            };

            copyField(apiVersionParameter);
            copyField(clientVersionParameter);
            copyField(trackingIdParameter);
            copyField(clientIdParameter);

            copyField(dc.jid);

            m.set(
                getFieldPattern(usageParameter).protocolName,
                getEncodedToken(fields)
            );

            var url = dc.url;

            m.map(function (key, value) {
                url += escapeChars(key) + '=';
                url += escapeChars('' + value) + '&';
            });

            url += 'z=' + getRandomBasic();

            createImage(url);

            fields.set(dc.jid, '', true);
        }
    };

    /**
     * Wd:
     *
     * @type {RegExp}
     */
    var gtmPattern = /^gtm\d+$/;

    /**
     * fd: Load double click for displayfeatures, adfeatures
     *
     * @param {} tracker -
     * @param {} b -
     * @return {undefined}
     */
    var doubleClickTask = function (tracker, b) {
        var fields = tracker.fields;
        if ( ! fields.get('dcLoaded')) {
            setUmParameter(fields, 29);
            b = b || {};
            var name;
            if (b[cookieNameParameter])
                name = encodeCharsWithParens(b[cookieNameParameter]);

            var dc = new DoubleClick(fields, 'https://stats.g.doubleclick.net/r/collect?t=dc&aip=1&_r=3&', name);
            doubleClickHit(dc, fields);
            fields.set('dcLoaded', true);
        }
    };

    /**
     * Sd:
     *
     * @param {} a -
     * @return {undefined}
     */
    var displayFeaturesTask = function (a) {
        if (a.get('dcLoaded') && ('cookie' !== a.get(storageParameter))) {
            setUmParameter(a, 51);
            var dc = new DoubleClick(a);
            setJoinId(dc, a);
            setDoubleClickCookie(dc, a);

            if (a.get(dc.jid)) {
                a.set(_rParameter, 1, true);
                a.set(transportUrlParameter, getGoogleAnalyticsURL() + '/r/collect', true);
            }
        }
    };

    /**
     * Lc: adSenseIdParameter
     *
     * Determinates the Hit id.
     *
     * @return {number}
     */
    var getHitId = function () {
        var a = win.gaGlobal = win.gaGlobal || {};
        return a.hid = a.hid || getRandomBasic();
    };

    /**
     * ad: whether the in page scripts are loaded.
     *
     * @type {boolean}
     */
    var loadedScriptGASO;

    /**
     * bd:
     *
     * [?] GASO = Google Analytics Site Overlay?
     *
     * @param {} trackingId -
     * @param {} domain -
     * @param {} path -
     * @return {undefined}
     */
    var setSiteOverlayTracking = function (trackingId, domain, path) {
        if ( ! loadedScriptGASO) {
            var locationHash = doc.location.hash;
            var windowName = win.name;
            var pattern = /^#?gaso=([^&]*)/;

            var matches = (
                locationHash && locationHash.match(pattern) ||
                windowName && windowName.match(pattern)
            );

            var value = (matches ? matches[1] : getCookieItems('GASO')[0] || '');
            var parts = (value ? value.match(/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i) : undefined);

            if (value && parts) {
                setCookie('GASO', '' + value, path, domain, trackingId, 0);

                if ( ! window._udo) window._udo = domain;
                if ( ! window._utcp) window._utcp = path;

                var prefix = parts[1];
                var src = 'https://www.google.com/analytics/web/inpage/pub/inpage.js?' +
                    (prefix ? 'prefix=' + prefix + '&' : '') + getRandomBasic();
                createScript(src, '_gasojs');
            }

            loadedScriptGASO = true;
        }
    };

    /**
     * wb: tracking identifier pattern
     */
    var trackingIdPattern = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/;

    /**
     * pc: Tracker Object
     *
     * [?] Set all the main tracking parameters and callbacks. Is this queue for ga()?
     *
     * @param {object} a -
     * @return {undefined}
     */
    var Tracker = function (a) {
        var self = this;

        function setData(a, b) {
            self.fields.data.set(a, b);
        }

        function addFilter(a, c) {
            setData(a, c);
            self.filters.add(a);
        }

        self.fields = new Fields;

        self.filters = new Filters;

        setData(nameParameter, a[nameParameter]);
        setData(trackingIdParameter, stripWhitespace(a[trackingIdParameter]));
        setData(cookieNameParameter, a[cookieNameParameter]);
        setData(cookieDomainParameter, a[cookieDomainParameter] || getHostname());
        setData(cookiePathParameter, a[cookiePathParameter]);
        setData(cookieExpiresParameter, a[cookieExpiresParameter]);
        setData(legacyCookieDomainParameter, a[legacyCookieDomainParameter]);
        setData(legacyHistoryImportParameter, a[legacyHistoryImportParameter]);
        setData(allowLinkerParameter, a[allowLinkerParameter]);
        setData(allowAnchorParameter, a[allowAnchorParameter]);
        setData(sampleRateParameter, a[sampleRateParameter]);
        setData(siteSpeedSampleRateParameter, a[siteSpeedSampleRateParameter]);
        setData(alwaysSendReferrerParameter, a[alwaysSendReferrerParameter]);
        setData(storageParameter, a[storageParameter]);
        setData(userIdParameter, a[userIdParameter]);
        setData(apiVersionParameter, 1);
        setData(clientVersionParameter, 'j39');

        addFilter(optOutTaskParameter, optOutTask);
        addFilter(previewTaskParameter, previewTask);
        addFilter(checkProtocolTaskParameter, checkProtocolTask);
        addFilter(validationTaskParameter, validationTask);
        addFilter(checkStorageTaskParameter, checkStorageTask);
        addFilter(historyImportTaskParameter, historyImportTask);
        addFilter(samplerTaskParameter, samplerTask);
        addFilter(rateLimitTaskParameter, rateLimitTask);
        addFilter(contentExperimentTaskParameter, contentExperimentTask);
        addFilter(devIdTaskParameter, devIdTask);
        addFilter(displayFeaturesTaskParameter, displayFeaturesTask);
        addFilter(buildHitTaskParameter, buildHitTask);
        addFilter(sendHitTaskParameter, sendHitTask);
        addFilter(timingTaskParameter, timingTask(self));

        setClientId(self.fields, a[clientIdParameter]);
        setClientBrowserParameters(self.fields);

        self.fields.set(adSenseIdParameter, getHitId());

        setSiteOverlayTracking(
            self.fields.get(trackingIdParameter),
            self.fields.get(cookieDomainParameter),
            self.fields.get(cookiePathParameter)
        );
    };

    /**
     * Jc: assign the client id.
     *
     * @param {object} a -
     * @param {object} clientId -
     * @return {undefined}
     */
    var setClientId = function (a, clientId) {
        if ('cookie' === getValueStr(a, storageParameter)) {
            isCookieSet = false;

            var gaValue = undefined;

            var cookieItems = getCookieItems(getValueStr(a, cookieNameParameter));
            if (cookieItems && 0 < cookieItems.length) {
                var values = [];

                for (var i = 0; i < cookieItems.length; i++) {
                    var items = cookieItems[i].split('.');
                    var nextItem = items.shift(); // get first element in array.

                    if (('GA1' === nextItem || '1' === nextItem) && 1 < items.length) {
                        var parts = items.shift().split('-');

                        if (1 === parts.length) parts[1] = '1';

                        // coherces to numeric values.
                        parts[0] *= 1;
                        parts[1] *= 1;

                        c.push({
                            H: parts,
                            s: items.join('.')
                        });
                    }
                }

                if (1 === values.length) {
                    setToken(13);
                    gaValue = values[0].s;
                } else if (0 === values.length) {
                    setToken(12);
                } else {
                    setToken(14);

                    var levelCount = getDomainLevelsCount(getValueStr(a, cookieDomainParameter));
                    values = filterURIParts(values, levelCount, 0);

                    if (1 == values.length) {
                        gaValue = values[0].s;
                    } else {
                        var pathCount = getPathDirectoryCount(getValueStr(a, cookiePathParameter));
                        values = filterURIParts(values, pathCount, 1);
                        gaValue = values[0] && values[0].s;
                    }
                }
            }

            if ( ! gaValue) {
                var domain = getValueStr(a, cookieDomainParameter);
                var hostname = getValueStr(a, legacyCookieDomainParameter) || getHostname();
                var cookie = getCookieByName('__utma', hostname, domain);

                if (undefined !== cookie) {
                    setToken(10);
                    gaValue = cookie.O[1] + '.' + cookie.O[2];
                }
            }

            if (gaValue) {
                a.data.set(clientIdParameter, gaValue);
                isCookieSet = true;
            }
        }

        var isAnchorAllowed = a.get(allowAnchorParameter);

        var matches = doc.location[isAnchorAllowed ? 'href' : 'search'].match(
            '(?:&|#|\\?)' +
            escapeChars('_ga').replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') +
            '=([^&#]*)'
        );

        var t = (matches && 2 === matches.length ? matches[1] : '');
        var p;

        if (t) {
            if (a.get(allowLinkerParameter)) {
                p = t.indexOf('.');
                if (-1 === p) {
                    setToken(22);
                } else {
                    var d = t.substring(p + 1);
                    if ('1' !== t.substring(0, p)) {
                        setToken(22);
                    } else {
                        p = d.indexOf('.');
                        if (-1 === p) {
                            setToken(22);
                        } else {
                            var e = d.substring(0, p);
                            var c = d.substring(p + 1);

                            if (e != getSessionHash(c, 0) &&
                                e != getSessionHash(c, -1) &&
                                e != getSessionHash(c, -2)) {
                                setToken(23);
                            } else {
                                setToken(11);
                                a.data.set(clientIdParameter, c);
                            }
                        }
                    }
                }
            } else {
                setToken(21);
            }
        }

        if (clientId) {
            setToken(9);
            a.data.set(clientIdParameter, escapeChars(clientId));
        }

        if (a.get(clientIdParameter)) {
            var gaGlobal = win.gaGlobal;
            // get visitor id.
            var visitorId = ('vid' in gaGlobal ? gaGlobal.vid : '');
            var found = (-1 !== visitorId.search(/^(?:utma\.)?\d+\.\d+$/) ? visitorId : undefined);

            if (found) {
                setToken(17);
                a.data.set(clientIdParameter, visitorId);
            } else {
                setToken(8);

                clientId = [
                    getRandomBasic() ^ generateSignature() & 2147483647,
                    Math.round((new Date).getTime() / 1E3)
                ].join('.');

                a.data.set(clientIdParameter, clientId);
            }
        }

        setTrackingCookie(a);
    };

    /**
     * Kc: set browser client settings.
     *
     * @param {object} a -
     * @return {undefined}
     */
    var setClientBrowserParameters = function (a) {
        var nav = win.navigator;
        var scr = win.screen;
        var loc = doc.location;

        a.set(documentReferrerParameter, getReferrer(a.get(alwaysSendReferrerParameter)));

        if (loc) {
            var path = loc.pathname || '';

            if ('/' !== path.charAt(0)) {
                setToken(31);
                path = '/' + path;
            }

            a.set(documentLocationParameter, loc.protocol + '//' + loc.hostname + path + loc.search);
        }

        if (scr) {
            a.set(screenResolutionParameter, scr.width + 'x' + scr.height);
            a.set(screenColorsParameter, scr.colorDepth + '-bit');
        }

        var body = doc.body;
        var isBodyDimensions = body.clientWidth && body.clientHeight;
        var rootElement = doc.documentElement;
        var dimensions = [];

        // using doc.compatMode to determine dimensions by detecting whether or not browser is
        // in full quirks mode  ('BackCompat') or in almost standards mode ('CSS1Compat').
        if (rootElement &&
            rootElement.clientWidth && rootElement.clientHeight &&
            ('CSS1Compat' === doc.compatMode || ! isBodyDimensions)) {
            dimensions = [rootElement.clientWidth, rootElement.clientHeight];
        } else {
            dimensions = [body.clientWidth, body.clientHeight];
        }

        var viewportSize = (0 >= dimensions[0] || 0 >= dimensions[1] ? '' : dimensions.join('x'));

        a.set(viewportSizeParameter, viewportSize);
        a.set(flashVersionParameter, getFlashVersion());
        a.set(documentEncodingParameter, doc.characterSet || doc.charset);
        a.set(javaEnabledParameter, nav && ('function' === typeof nav.javaEnabled && nav.javaEnabled()));
        a.set(userLanguageParameter, nav && (nav.language || nav.browserLanguage || '').toLowerCase());

        var locHash = doc.location.hash;
        if (loc && a.get(allowAnchorParameter) && locHash) {
            var parts = locHash.split(/[?&#]+/);
            var list = [];

            for (var i = 0; i < parts.length; ++i) {
                var part = parts[i];
                if (
                    startsWith(parts, 'utm_id') ||
                    startsWith(parts, 'utm_campaign') ||
                    startsWith(parts, 'utm_source') ||
                    startsWith(parts, 'utm_medium') ||
                    startsWith(parts, 'utm_term') ||
                    startsWith(parts, 'utm_content') ||
                    startsWith(parts, 'gclid') ||
                    startsWith(parts, 'dclid') ||
                    startsWith(parts, 'gclsrc')
                ) list.push(part);
            }

            if (0 < list.length) {
                var str = '#' + list.join('&');
                a.set(documentLocationParameter, a.get(documentLocationParameter) + str);
            }
        }
    };

    /**
     * pc.get
     *
     * Gets the value of a field stored on the tracker.
     *
     * @param {string} fieldName -
     * @return {*}
     */
    Tracker.prototype.get = function(fieldName) {
        return this.fields.get(fieldName);
    };

    /**
     * pc.set
     *
     * Sets a field/value pair or a group of field/value pairs on the tracker.
     *
     * @param {string|object} fieldName|fieldsObject -
     * @param {string=} fieldValue -
     * @return {undefined}
     */
    Tracker.prototype.set = function (fieldName, fieldValue) {
        this.fields.set(fieldName, fieldValue);
    };

    /**
     * qc:
     *
     * Fields that correspond to each hit type.
     *
     * @type {object}
     */
    var hitTypeFields = {
        pageview: [
            documentPathParameter
        ],
        event: [
            eventCategoryParameter,
            eventActionParameter,
            eventLabelParameter,
            eventValueParameter
        ],
        social: [
            socialNetworkParameter,
            socialActionParameter,
            socialTargetParameter
        ],
        timing: [
            userTimingCategoryParameter,
            userTimingVariableNameParameter,
            userTimingTimeParameter,
            userTimingLabelParameter
        ]
    };

    /**
     * pc.send:
     *
     * Sends a hit to Google Analytics.
     *
     * tracker.send([hitType], [...fields], [fieldsObject]);
     *
     * @param {string} hitType -
     * @param {string=} fields -
     * @param {string=} fieldsObject -
     * @return {undefined}
     */
    Tracker.prototype.send = function () {
        if ( ! (1 > arguments.length)) {
            var hitType, args;

            if ('string' === typeof arguments[0]) {
                hitType = arguments[0];
                args = [].slice.call(arguments, 1);
            } else {
                hitType = arguments[0] && arguments[0][hitTypeParameter];
                args = arguments;
            }

            if (hitType) {
                var f = copyFields(hitTypeFields[hitType] || [], args);

                f[hitTypeParameter] = hitType;

                this.fields.set(f, undefined, true);

                this.filters.execute(this.fields);

                this.fields.data.m = {};

                sampleHit(this.fields);
            }
        }
    };

    /**
     * rc: Determine document visibility.
     *
     * @param {function} callback -
     * @return {boolean}
     */
    var isDocumentVisible = function (callback) {
        // page content is being prerendered and is not visible to the user.
        if ('prerender' === doc.visibilityState) return false;
        callback();
        return true;
    };

    /**
     * td:
     *
     * Plugins can expose their own methods which can be invoked using
     * the ga command queue syntax:
     *
     * ga('[trackerName.]pluginName:methodName', ...args);
     *
     * Where trackerName is optional and methodName corresponds to the
     * name of a function on the plugin constructors prototype. If
     * methodName does not exist on the plugin or the plugin does not
     * exist, an error will occur.
     *
     * @type {RegExp}
     */
    var pluginPattern = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/;

    /**
     * sc: Plugin
     *
     * Plugins are scripts that enhance the functionality of
     * analytics.js to help solve problems and aid in measuring
     * user interaction. This guide describes the process of
     * writing your own analytics.js plugins. For information
     * about how to use analytics.js plugins in your own
     * implementations, see the guide on using plugins.
     *
     * @param {array} a -
     * @return {undefined}
     */
    var PluginScript = function (a) {
        if (isFunction(a[0])) {
            this.fnCallback = a[0];
        } else {
            var matches = pluginPattern.exec(a[0]);

            if (null !== matches && 4 === matches.length) {
                // matches definition syntax.
                this.trackerName = matches[1] || 't0';
                this.pluginName  = matches[2] || '';
                this.methodName  = matches[3];

                // trim off the first part of the argument array.
                this.argList = [].slice.call(a, 1);

                if ( ! this.pluginName) {
                    this.isCreate  = ('create'  === this.methodName);
                    this.isRequire = ('require' === this.methodName);
                    this.isProvide = ('provide' === this.methodName);
                    this.isRemove  = ('remove'  === this.methodName);
                }

                // require format:
                // ga('require', 'localHitSender', {path: '/log', debug: true});
                if (this.isRequire) {
                    if (3 <= this.argList.length) {
                        this.pluginName = this.argList[1];
                        this.pluginOptions = this.argList[2];
                    } else {
                        if (this.argList[1]) {
                            if (isString(this.argList[1])) {
                                this.pluginName = this.argList[1];
                            } else {
                                this.pluginOptions = this.argList[1];
                            }
                        }
                    }
                }
            }

            var arg1 = a[1];
            var arg2 = a[2];

            if ( ! this.methodName) throw 'abort';

            if (this.isRequire && (
                ! isString(arg1) || '' === arg1
            )) throw 'abort';

            if (this.isProvide && (
                ! isString(arg2) || '' === arg2 || ! isFunction(arg2)
            )) throw 'abort';

            if (containsDelimiter(this.trackerName) ||
                containsDelimiter(this.pluginName)) throw 'abort';

            if (this.isProvide && 't0' !== this.trackerName) throw 'abort';
        }
    };

    /**
     * ud:
     *
     * Detect whether or not the string contains a delimiter.
     *
     * @param {string} a -
     * @type {boolean}
     */
    function containsDelimiter (str) {
        return 0 <= str.indexOf('.') || 0 <= str.indexOf(':');
    }

    /**
     * Yd: Registered Plugins
     *
     * Plugins are defined via the provide command, which must be
     * invoked with the name of the plugin as the first argument
     * followed by the plugin's constructor function. When the
     * provide command is run, it registers the plugin for use
     * with the ga() command queue.
     *
     * @type {object}
     */
    var PluginProvide = new Model;

    /**
     * $d: Loaded Plugins via a require method.
     *
     * Track list of registered plugins.
     *
     * @type {object}
     */
    var PluginRequire = new Model;

    /**
     * Zd: Plugin Options
     *
     * Plugins are scripts that enhance the functionality of analytics.js
     * to aid in measuring user interaction. Plugins are typically
     * specific to a set of features that may not be required by all
     * Google Analytics users, such as ecommerce or cross-domain
     * tracking, and are therefore not included in analytics.js by
     * default.
     *
     * @type {object}
     */
    var pluginOptions = {
        /**
         * Enhanced Ecommerce
         *
         * The enhanced ecommerce plug-in for analytics.js enables the
         * measurement of user interactions with products on ecommerce
         * websites across the user's shopping experience, including:
         * product impressions, product clicks, viewing product details,
         * adding a product to a shopping cart, initiating the checkout
         * process, transactions, and refunds.
         *
         * https://www.google-analytics.com/plugins/ua/ec.js
         */
        ec: 45,

        /**
         * Ecommerce Tracking
         *
         * Ecommerce tracking allows you to measure the number of transactions
         * and revenue that your website generates. On a typical ecommerce site,
         * once a user clicks the "purchase" button in the browser, the user's
         * purchase information is sent to the web server, which carries out
         * the transaction. If successful, the server redirects the user to
         * a "Thank You" or receipt page with transaction details and a receipt
         * of the purchase. You can use the analytics.js library to send the
         * ecommerce data from the "Thank You" page to Google Analytics.
         *
         * https://www.google-analytics.com/plugins/ua/ecommerce.js
         */
        ecommerce: 46,

        /**
         * Enhanced Link Attribution
         *
         * Enhanced Link Attribution improves the accuracy of your In-Page
         * Analytics report by automatically differentiating between
         * multiple links to the same URL on a single page by using link
         * element IDs.
         *
         * https://www.google-analytics.com/plugins/ua/linkid.js
         */
        linkid: 47
    };

    /**
     * ae: parse incoming url
     */
    var parseUrl = function (url) {
        function parseAnchor (a) {
            // remove port reference.
            var hostname = (a.hostname || '').split(':')[0].toLowerCase();
            var protocol = (a.protocol || '').toLowerCase();
            // use a defined port otherwise, use the protocol to determine the port number.
            var port = 1 * a.port || ('http:' === protocol ? 80 : 'https:' === protocol ? 443 : '');
            var pathname = a.pathname || '';
            // prepend a missing trailing forward slash, if needed.
            if ( ! startsWith(pathname, '/')) pathname = '/' + pathname;
            return [hostname, '' + port, pathname];
        }

        var anchorTag = doc.createElement('a');
        // assign tag href from document href.
        anchorTag.href = doc.location.href;
        var protocol = (anchorTag.protocol || '').toLowerCase();
        var queryStr = anchorTag.search || '';
        var tag = parseAnchor(anchorTag);
        var root = protocol + '//' + tag[0] + (tag[1] ? ':' + tag[1] : '');

        // attempt to fix url
        if (startsWith(url, '//')) {
            url = protocol + url;
        } else if (startsWith(url, '/')) {
            url = root + url;
        } else if ( ! url || startsWith(url, '?')) {
            url = root + tag[2] + (url || queryStr);
        } else if (0 > url.split('/')[0].indexOf(':')) {
            url = root + tag[2].substring(0, tag[2].lastIndexOf('/')) + '/' + url;
        }

        /*
        (
              startsWith(a, '//')
            ? a = protocol + a
            : (
                  startsWith(a, '/')
                ? a = ca + a
                : (
                      ! a || startsWith(a, '?')
                    ? a = ca + e[2] + (a || g)
                    : 0 > a.split('/')[0].indexOf(':') && (
                        a = ca + e[2].substring(0, e[2].lastIndexOf('/')) + '/' + a
                    )
                )
            )
        );
        */

        anchorTag.href = url;

        // another parse of the tag.
        tag = parseAnchor(anchorTag);

        return {
            protocol: protocol,
            host: tag[0],
            port: tag[1],
            path: tag[2],
            search: queryStr,
            url: url || ''
        };
    };

    /**
     * Z: Plugin Object
     *
     * @type {object}
     */
    var PluginManager = {
        reset: function () {
            PluginManager.instances = [];
        }
    };

    PluginManager.reset();

    /**
     * Z.D: Add plugins to queue to be dispatched.
     *
     * [?] provide
     *
     * @param {} a
     * @return {undefined}
     */
    PluginManager.queue = function () {
        var pluginList = PluginManager.parse.apply(PluginManager, arguments);
        var plugins = PluginManager.instances.concat(pluginList);

        PluginManager.instances = [];

        for (; 0 < plugins.length;) {
            var p = plugins[0];

            if (PluginManager.dispatch(p)) break;

            plugins.shift();

            if (0 < PluginManager.instances.length) break;
        }

        PluginManager.instances = PluginManager.instances.concat(plugins);
    };

    /**
     * Z.J: Parse the incoming plugins.
     *
     * @type {array} - List of plugins.
     */
    PluginManager.parse = function () {
        var list = [];
        for (var i = 0; i < arguments.length; i++) {
            try {
                var p = new PluginScript(arguments[i]);

                if (p.isProvide) {
                    PluginProvide.set(p.argList[0], p.argList[1]);
                } else {
                    // The require command takes the name of a plugin and
                    // registers it for use with the the ga() command queue.
                    // If the plugin accepts configuration options, those
                    // options can be passed as the final argument to the
                    // require command.
                    if (p.isRequire) {
                        var pluginName = p.argList[0];
                        //var pluginName = p.pluginName;

                        if ( ! isFunction(PluginProvide.get(pluginName)) &&
                             ! PluginRequire.get(pluginName)) {
                            if (pluginOptions.hasOwnProperty(pluginName)) {
                                setToken(pluginOptions[pluginName]);
                            }

                            var filename;

                            if ( ! pluginName &&
                                   pluginOptions.hasOwnProperty(pluginName)) {
                                setToken(39);
                                filename = pluginName + '.js';
                            } else {
                                setToken(43);
                            }

                            if (filename) {
                                var url;

                                if (-1 === filename.indexOf('/')) {
                                    url = (forceSSL || isSecureProtocol()
                                        ? 'https:' : 'http:') +
                                        '//www.google-analytics.com/plugins/ua/' + filename;
                                }

                                var parts = parseUrl(url);
                                var urlProto = parts.protocol;
                                var docProto = doc.location.protocol;

                                // make sure protocol for url matches the document or
                                // otherwise favour HTTPS.
                                var protocolMatch = (
                                    'https:' === urlProto ||
                                    docProto === urlProto
                                    ? true
                                    : (
                                        'http:' !== urlProto
                                        ? false : 'http:' === docProto
                                    )
                                );

                                var urlValid;

                                if (protocolMatch) {
                                    var docUrl = parseUrl(doc.location.href);

                                    if (parts.search ||
                                        0 <= parts.url.indexOf('?') ||
                                        0 <= parts.path.indexOf('://')) {
                                        urlValid = false;
                                    } else if (parts.host === docUrl.host &&
                                               parts.port === docUrl.port) {
                                        urlValid = true;
                                    } else {
                                        var port = ('http:' === parts.protocol
                                         ? 80 : 443);

                                        urlValid = (
                                            'www.google-analytics.com' === parts.host &&
                                            (parts.port || port) === port &&
                                            startsWith(parts.path, '/plugins/')
                                            ? true : false
                                        );
                                    }
                                }

                                if (urlValid) {
                                    createScript(parts.url);
                                    PluginRequire.set(pluginName, true);
                                }
                            }
                        }
                    }

                    list.push(p);
                }
            } catch (e) { /* silence */ }
        }

        return list;
    };

    /**
     * Z.v:
     *
     * [?] send
     *
     * @param {object} p - Plugin
     * @return {undefined}
     */
    PluginManager.dispatch = function (p) {
        try {
            if (p.fnCallback) {
                p.fnCallback.call(win, GA.getByName('t0'));
            } else {
                var tracker = (
                    p.trackerName === gaObjectName
                    ? GA : GA.getByName(p.trackerName)
                );

                if (p.isCreate && 't0' === p.trackerName) {
                    GA.create.apply(GA, p.argList);
                } else if (p.isRemove) {
                    GA.remove(p.trackerName);
                } else if (tracker) {
                    if (p.isRequire) {
                        var pluginTrackerSet = false;
                        var pluginName = p.argList[0];
                        var pluginOptions = p.pluginOptions;

                        // [?] not sure what the point of this is.
                        tracker == GA || tracker.get(nameParameter);

                        var pluginFunc = PluginProvide.get(pluginName);

                        if (isFunction(pluginFunc)) {
                            tracker.plugins_ = tracker.plugins_ || new Model;
                            if ( ! tracker.plugins_.get(pluginName)) {
                                tracker.plugins_.set(pluginName, new pluginFunc(tracker, pluginOptions || {}));
                                pluginTrackerSet = true;
                            }
                        }

                        if ( ! pluginTrackerSet) return true;

                    } else if (p.pluginName) {
                        var tp = tracker.plugins_.get(p.pluginName);
                        tp[p.methodName].apply(tp, p.argList);
                    }
                } else {
                    tracker[p.methodName].apply(tracker, p.argList);
                }
            }
        } catch (e) { /* silence */ }
    };

    /**
     * N: ga Object
     *
     * @param {} a
     * @return {undefined}
     */
    var GA = function () {
        setToken(1);
        PluginManager.queue.apply(PluginManager, [arguments]);
    };

    /**
     * N.h: List of tracker instances by name.
     *
     * @type {array}
     */
    GA.instances = {};

    /**
     * N.P: Index of tracker instances.
     *
     * @type {array}
     */
    GA.trackers = [];

    /**
     * N.L:
     *
     * @type {array}
     */
    GA.exists = 0;

    /**
     * N.answer: Determine whether this has been loaded already.
     *
     * The Answer to the Ultimate Question of Life, The Universe, and Everything.
     *
     * @type {array}
     */
    GA.answer = 42;

    /**
     * uc:
     *
     * @type {array}
     */
    var defaultFields = [
        trackingIdParameter,
        cookieDomainParameter,
        nameParameter
    ];

    /**
     * N.create:
     *
     * Creates a new tracker instance with the specified fields.
     *
     * @param {object} a -
     * @return {array}
     */
    GA.create = function () {
        var fields = copyFields(defaultFields, [].slice.call(arguments));
        if ( ! fields[nameParameter]) fields[nameParameter] = 't0';

        var name = '' + fields[nameParameter];
        if (GA.instances[name]) return GA.instances[name];

        var t = new Tracker(fields);

        GA.instances[name] = t;
        GA.trackers.push(t);

        return t;
    };

    /**
     * N.remove:
     *
     * Removes the tracker instance with the specified name.
     *
     * @param {object} name - Name of tracking code.
     * @return {array}
     */
    GA.remove = function (name) {
        for (var i = 0; i < GA.trackers.length; i++) {
            if (GA.trackers[i].get(nameParameter) === name) {
                GA.trackers.splice(i, 1);
                GA.instances[name] = null;
                break;
            }
        }
    };

    /**
     * N.j:
     *
     * Gets the tracker instance with the specified name.
     *
     * @param {object} name - Name of parameter code.
     * @return {object}
     */
    GA.getByName = function (name) {
        return GA.instances[name];
    };

    /**
     * N.getAll:
     *
     * Gets all tracker instances.
     *
     * @return {array}
     */
    GA.getAll = function () {
        return GA.trackers.slice(0);
    };

    /**
     * N.N:
     *
     * [?] Initializing Google Analytics.
     *
     * @return {undefined}
     */
    GA.initialize = function () {
        if ('ga' !== gaObjectName) setToken(49);

        var gaObject = win[gaObjectName];

        // test if tracking script already loaded.
        if ( ! gaObject || 42 != gaObject.answer) {
            GA.exists = gaObject && gaObject.l;
            GA.loaded = true;

            // ga Object
            var g = win[gaObjectName] = GA;
            fnWrap('create', g, g.create);
            fnWrap('remove', g, g.remove);
            fnWrap('getByName', g, g.getByName, 5);
            fnWrap('getAll', g, g.getAll, 6);

            // Tracker Object
            var t = Tracker.prototype;
            fnWrap('get', t, t.get, 7);
            fnWrap('set', t, t.set, 4);
            fnWrap('send', t, t.send);

            // Fields Object
            var m = Fields.prototype;
            fnWrap('get', m, m.get);
            fnWrap('set', m, m.set);

            if ( ! isSecureProtocol() && ! forceSSL) {
                var loadedOverSSL = false;
                var scripts = doc.getElementsByTagName('script');
                for (var i = 0; i < scripts.length && 100 > i; i++) {
                    var src = scripts[i].src;
                    if (src && 0 === src.indexOf('https://www.google-analytics.com/analytics')) {
                        setToken(33);
                        loadedOverSSL = true;
                    }
                }

                if (loadedOverSSL) forceSSL = true;
            }

            if (isSecureProtocol() || forceSSL || ! getUserSample(new UserSampleRate)) {
                setToken(36);
                forceSSL = true;
            }

            // override windows linker.
            win.gaplugins = win.gaplugins || {};
            win.gaplugins.Linker = Linker;

            var linker = Linker.prototype;

            PluginProvide.set('linker', linker);

            fnWrap('decorate', linker, linker.decorate, 20);
            fnWrap('autoLink', linker, linker.autoLink, 25);

            PluginProvide.set('displayfeatures', doubleClickTask);
            PluginProvide.set('adfeatures', doubleClickTask);

            var a = gaObject && gaObject.q;

            isArray(a) ? PluginManager.queue.apply(GA, a) : setToken(50);
        }
    };

    /**
     * N.da: run each parameter.
     *
     * [?] this doesn't appear to get called.
     *
     * @return {undefined}
     */
    GA.da = function () {
        var trackers = GA.getAll();
        for (var i = 0; i < trackers.length; i++)
            trackers[i].get(nameParameter);
    };

    /**
     * Handle page loading and changes to visibility.
     */
    (function () {
        var callback = GA.initialize;
        if ( ! isDocumentVisible(callback)) {
            setToken(16);
            var isVisible = false;
            var handler = function () {
                if ( ! isVisible && isDocumentVisible(callback)) {
                    isVisible = true;
                    doc.removeEventListener
                    ? doc.removeEventListener('visibilitychange', callback, false)
                    : doc.detachEvent && doc.detachEvent('onvisibilitychange', callback);
                }
            };

            registerListener(doc, 'visibilitychange', handler);
        }
    })();

    /**
     * La: hashing algorithm
     *
     * [?]
     *
     * @param {string} str -
     * @return {string}
     */
    function hash(str) {
        var b = 1;
        var c = 0;
        var d;

        if (str) {
            for (b = 0, d = str.length - 1; 0 <= d; d--) {
                c = str.charCodeAt(d);
                b = (b << 6 & 268435455) + c + (c << 14);
                c = b & 266338304;
                b = 0 != c ? b ^ c >> 21 : b;
            }
        }

        return b;
    }

})(window);