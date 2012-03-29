
// public variables
var Runner, table, log;

(function(){ // anonymous closure scope

/** 72 column horizontal rule. */
var rule = "\n========================================"
        + "================================\n";

/** Binds a callback to a DOM event on an object.
 * This is an abstraction layer over the cross browser differences in
 * the event listener API.
 */
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

var input, output, tableWrapper, tableBase, runInput;
var currentSuite, currentTest;
var inputRequest = {};
var inputCallback;

/** Writes a string to the output area.
 * A newline will be appended to the output string.
 */
log = function log (text) {
    var height = output.clientHeight;
    var scroll = output.scrollTop == output.scrollHeight - height;

    output.appendChild( document.createTextNode( text + "\n" ) );
    if (scroll) output.scrollTop = output.scrollHeight - height;
}

/** Resets the test table to its original state.
 */
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

/** Clears the input area.
 */
function resetInput() {
    while (input.firstChild)
        input.removeChild( input.firstChild );
}

/** Pushes a call to {@link #runNext()} to the browser event queue.
 */
function postponeNext() {
   window.postMessage( 'runNext', "*" );
}

// receives the messages sent by postponeNext
attach( window, 'message', function (event) {
    if (window !== event.source) return;
    if ('runNext' !== event.data) return;

    runNext();    
});

/** Advances to and runs the next test.
 * If there are no more tests in the current suite it advances to the
 * next suite. If there are no more suites it ends the test run.
 */
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

    // reset the content area
    resetTable();

    // run the current test
    var test = suite.tests[ currentTest ];
    log( "\n---- " + test.name + " ----" );
    try {
        test.func();
    } catch (caught) {
        // if this is an input request, let the input system handle it
        if (caught === inputRequest) return;

        log( "error: " + caught.toString() );
    }

    // postpone to run the next test
    postponeNext();
}

function inputHandlerChooseImage (event) {
    var chosen = event.target;

    // clear the input area
    resetInput();

    // call the input handler
    try {
        inputCallback( chosen );
    } catch (caught) {
        // they want more input, wait for the event
        if (caught === inputRequest) return;

        log( "error: " + caught.toString() );
    }

    // postpone to run the next test
    postponeNext();
}

Runner.inputChooseImage = function (choices, callback) {
    input.appendChild( document.createTextNode(
        "Click the image below which looks like the test table." ) );
    input.appendChild( document.createElement( 'br' ) );

    inputCallback = function (chosen) {
        callback( choices[ chosen.getAttribute( "choice" ) ] );
    }

    for (var idx = 0; idx < choices.length; idx++) {
        var choice = choices[ idx ];
        var img = document.createElement( 'img' );
        img.src = 'images/' + choice.image;
        img.title = choice.title;
        img.className = "input-choose-image";
        img.setAttribute( "choice", idx );
        attach( img, 'click', inputHandlerChooseImage );
        input.appendChild( img );
    }

    throw inputRequest;
};

/** Sets up and starts a new test run.
 * This is called when the "Run Tests" button is clicked. The suites to
 * be run are selected based on the checkboxes in the input area.
 */
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

// one-time initialization code
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
