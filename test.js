
// public variables
var addTest, runTests, table, log, resetTable;

(function(){ // anonymous closure scope

var tests = {};

// DOM node references
var input, output, tableWrapper, tableBase;

log = function log (text) {
    var height = output.clientHeight;
    var scroll = output.scrollTop == output.scrollHeight - height;

    output.appendChild( document.createTextNode( text + "\n" ) );
    if (scroll) output.scrollTop = output.scrollHeight - height;
}

resetTable = function resetTable() {
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

addTest = function addTest (name, func) {
    if (name in tests) throw new Error(
        "test named '" + name + "' already exists" );
    tests[ name ] = func;
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

    log( "starting test run" );

    for (var name in tests) {
        if (!tests.hasOwnProperty( name )) continue;
        log( "\n---- " + name + " ----" );
        
        try {
            tests[ name ]();
        } catch (caught) {
            log( "error: " + caught.toString() );
        }

        resetTable();
    }

    log( "\n----------\ndone" );
}

})(); // end anonymous closure scope
// vim: se sts=4 sw=4 et :miv
