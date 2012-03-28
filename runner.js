
// public variables
var Runner, runTests, table, log;

(function(){ // anonymous closure scope

var Suite = function (name) {
    this.name = name;
    this.tests = [];
};
var S = Suite.prototype = {};

S.addTest = function (name, func) {
    this.tests.push({ name: name, func: func });
};

Runner = {};
var suites = [];
Runner.addSuite = function (name) {
    var suite = new Suite( name );
    suites.push( suite );
    return suite;
}

// DOM node references
var input, output, tableWrapper, tableBase;

log = function log (text) {
    var height = output.clientHeight;
    var scroll = output.scrollTop == output.scrollHeight - height;

    output.appendChild( document.createTextNode( text + "\n" ) );
    if (scroll) output.scrollTop = output.scrollHeight - height;
}

function resetTable() {
    while (tableWrapper.firstChild)
        tableWrapper.removeChild( tableWrapper.firstChild );

    var newTable = tableBase.cloneNode( true );
    tableWrapper.appendChild( newTable );
    table = {
        table: newTable,
        nw: document.getElementById( 'test-cell-nw' ),
        nc: document.getElementById( 'test-cell-nc' ),
        ne: document.getElementById( 'test-cell-ne' ),
        wc: document.getElementById( 'test-cell-wc' ),
        cc: document.getElementById( 'test-cell-cc' ),
        ec: document.getElementById( 'test-cell-ec' ),
        sw: document.getElementById( 'test-cell-sw' ),
        sc: document.getElementById( 'test-cell-sc' ),
        se: document.getElementById( 'test-cell-se' )
    };
}

var currentSuite, currentTest;
var inputRequest = {};

window.addEventListener( 'message', function (event) {
    if (window !== event.source) return;
    if ('runNext' !== event.data) return;

    runNext();    
}, false );

function postponeNext() {
   window.postMessage( 'runNext', "*" );
}

function runNext() {
    var suite = suites[ currentSuite ];
    currentTest++;

    // print the suite header before the first test
    if (0 === currentTest)
        log( "\n======== " + suite.name + " ==========" );

    // if we're out of tests in this suite, go to the next one
    if (currentTest >= suite.tests.length) {
        log( "\n==== end suite" );
        
        // proceed to the next suite
        currentTest = -1;
        currentSuite++;
        
        // if we're out of suites, return
        if (currentSuite >= suites.length) {
            log( "\n==========\ndone" );
            return;
        }

        // postpone to run the next test
        postponeNext();
        return;
    }

    // run the current test
    var test = suite.tests[ currentTest ];
    log( "\n---- " + test.name + " ----" );
    try {
        resetTable();
        test.func();
    } catch (caught) {
        // TODO: handle input requests
        log( "error: " + caught.toString() );
    }

    // postpone to run the next test
    postponeNext();
}

runTests = function runTests() {
    // get rid of the start button
    var button = document.getElementById( 'start-button' );
    button.parentNode.removeChild( button );
    button = null;

    // find the section elements
    input = document.getElementById( 'input' );
    output = document.getElementById( 'output' );
    tableWrapper = document.getElementById( 'test-wrapper' );

    // prepare the testing table
    table = { table: document.getElementById( 'test-table' ) };
    tableBase = table.table.cloneNode( true );
    resetTable();

    log( "starting test run\n==========" );
    currentSuite = 0;
    currentTest = -1;
    postponeNext();
}

})(); // end anonymous closure scope
// vim: se sts=4 sw=4 et :miv
