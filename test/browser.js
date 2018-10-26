const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// configure enzyme to use the React 16 adapter for the unit test
Enzyme.configure({ adapter: new Adapter() });

// starting from enzyme v3, react lifecycle methods like componentDidMount are automatically
// being included in the shallow renders, this configuration allows unit tests to opt out
Enzyme.configure({ disableLifecycleMethods: true });

const {JSDOM} = require('jsdom');
const {window} = new JSDOM('<html><head></head><body><div id="mount"></div></body></html>', {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    userAgent: "test/9000",
    includeNodeLocations: true
  });

if(Object.keys(window).length === 0) {
    // this happens if contextify, one of jsdom's dependencies doesn't install correctly
    // (it installs different code depending on the OS, so it cannot get checked in.);
    throw "jsdom failed to create a usable environment, try uninstalling and reinstalling it";
}

function storageMock() {
    let storage = {};

    return {
        setItem: function(key, value) {
            storage[key] = value || '';
        },
        getItem: function(key) {
            return key in storage ? storage[key] : null;
        },
        removeItem: function(key) {
            delete storage[key];
        },
        get length() {
            return Object.keys(storage).length;
        },
        key: function(i) {
            var keys = Object.keys(storage);
            return keys[i] || null;
        }
    };
}

global.URL  = window.URL;
global.window = window;
global.window.Object = Object;
global.window.Math = Math;
global.navigator = window.navigator;
global.localStorage = window.localStorage = storageMock();
global.window.performance = global.performance = Date;
global.document = window.document;

window.document.queryCommandSupported = () => false;