
// public variables
var Runner, table, log;

(function(){ // anonymous closure scope

/** 72 column horizontal rule. */
var rule = "\n========================================"
        + "================================\n";

function attach (target, name, callback) {
    if (target.addEventListener) {
        target.addEventListener( name, callback, true );
    } else {
        target.attachEvent( 'on' + name, function() {
            callback.call( this, window.event );
        });
    }
}

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
var runSuites;
Runner.addSuite = function (name) {
    var suite = new Suite( name );
    suites.push( suite );
    return suite;
}

// DOM node references
var input, output, tableWrapper, tableBase, runInput;

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

function resetInput() {
    while (input.firstChild)
        input.removeChild( input.firstChild );
}

var currentSuite, currentTest;
var inputRequest = {};

attach( window, 'message', function (event) {
    if (window !== event.source) return;
    if ('runNext' !== event.data) return;

    runNext();    
});

function postponeNext() {
   window.postMessage( 'runNext', "*" );
}

function runNext() {
    var suite = runSuites[ currentSuite ];
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
        if (currentSuite >= runSuites.length) {
            log( rule + "test run complete" + rule );
            input.appendChild( runInput );
            return;
        }

        // postpone to run the next test
        postponeNext();
        return;
    }

    // reset the content areas
    resetTable();
    resetInput();

    // run the current test
    var test = suite.tests[ currentTest ];
    log( "\n---- " + test.name + " ----" );
    try {
        test.func();
    } catch (caught) {
        // TODO: handle input requests
        log( "error: " + caught.toString() );
    }

    // postpone to run the next test
    postponeNext();
}

function runTests() {
    // build the list of suites to be run
    runSuites = [];
    var boxen = runInput.getElementsByTagName( 'input' );
    for (var idx = 0; idx < boxen.length; idx++) {
        var box = boxen[ idx ];
        if (box.checked)
            runSuites.push( suites[ box.name ] );
    }

    // give up if no suites are selected
    if (0 === runSuites.length) {
        log( "no suites selected, not running" );
        return;
    }

    // clear the input area
    resetInput();
    
    // hand off to the test run
    log( rule + "starting test run" + rule );
    currentSuite = 0;
    currentTest = -1;
    postponeNext();
}

attach( window, 'load', function (event) {
    // find the section elements
    input = document.getElementById( 'input' );
    output = document.getElementById( 'output' );
    tableWrapper = document.getElementById( 'test-wrapper' );

    // prepare the testing table
    table = { table: document.getElementById( 'test-table' ) };
    tableBase = table.table.cloneNode( true );
    resetTable();
    
    runInput = document.createElement( 'div' );

    // create the suite list
    var list = document.createElement( 'ul' );
    runInput.appendChild( list );
    list.id = 'suite-list';
    for (var idx = 0; idx < suites.length; idx++) {
        var item = document.createElement( 'li' );
        
        var checkbox = document.createElement( 'input' );
        checkbox.id = 'suite-' + idx;
        checkbox.type = 'checkbox';
        checkbox.name = idx;
        checkbox.checked = true;
        item.appendChild( checkbox );

        var label = document.createElement( 'label' );
        label.setAttribute( 'for', checkbox.id );
        label.appendChild(
                document.createTextNode( suites[ idx ].name ) );
        item.appendChild( label );

        list.appendChild( item );
    }

    // add the start button
    var button = document.createElement( 'button' );
    runInput.appendChild( button );
    attach( button, 'click', runTests );
    button.appendChild( document.createTextNode( 'Run Tests' ) );

    input.appendChild( runInput );
});

})(); // end anonymous closure scope
// vim: se sts=4 sw=4 et :miv
