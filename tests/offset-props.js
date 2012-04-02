(function(){ // anonymous closure scope

function getProps() {
    return {
        offsetTop:      table.cc.offsetTop,
        offsetLeft:     table.cc.offsetLeft,
        offsetWidth:    table.cc.offsetWidth,
        offsetHeight:   table.cc.offsetHeight
    };
}

function assertProp (props, name) {
    var delta = table.cc[ name ] - props[ name ];
    if (0 == delta) return '==';
    if (delta > 0) return '+' + delta;
    else return '' + delta;
}

function assertProps (props) {
    log( 'offsetTop:     ' + assertProp( props, 'offsetTop' ) + '\n'
       + 'offsetLeft:    ' + assertProp( props, 'offsetLeft' ) + '\n'
       + 'offsetWidth:   ' + assertProp( props, 'offsetWidth' ) + '\n'
       + 'offsetHeight:  ' + assertProp( props, 'offsetHeight' ) );
}

var suite = Runner.addSuite( 'offset properties' );

suite.addTest( 'top local', function() {
    var props = getProps();
    table.cc.style.borderTop = '2px solid black';
    assertProps( props );
});

suite.addTest( 'top remote', function() {
    var props = getProps();
    table.nc.style.borderBottom = '2px solid black';
    assertProps( props );
});

suite.addTest( 'top both', function() {
    var props = getProps();
    table.cc.style.borderTop = '2px solid black';
    table.nc.style.borderBottom = '2px solid black';
    assertProps( props );
});

suite.addTest( 'left local', function() {
    var props = getProps();
    table.cc.style.borderLeft = '2px solid black';
    assertProps( props );
});

suite.addTest( 'left remote', function() {
    var props = getProps();
    table.wc.style.borderRight = '2px solid black';
    assertProps( props );
});

suite.addTest( 'left both', function() {
    var props = getProps();
    table.cc.style.borderLeft = '2px solid black';
    table.wc.style.borderRight = '2px solid black';
    assertProps( props );
});

suite.addTest( 'bottom local', function() {
    var props = getProps();
    table.cc.style.borderBottom = '2px solid black';
    assertProps( props );
});

suite.addTest( 'bottom remote', function() {
    var props = getProps();
    table.sc.style.borderTop = '2px solid black';
    assertProps( props );
});

suite.addTest( 'bottom both', function() {
    var props = getProps();
    table.cc.style.borderBottom = '2px solid black';
    table.sc.style.borderTop = '2px solid black';
    assertProps( props );
});

suite.addTest( 'right local', function() {
    var props = getProps();
    table.cc.style.borderRight = '2px solid black';
    assertProps( props );
});

suite.addTest( 'right remote', function() {
    var props = getProps();
    table.ec.style.borderLeft = '2px solid black';
    assertProps( props );
});

suite.addTest( 'right both', function() {
    var props = getProps();
    table.cc.style.borderRight = '2px solid black';
    table.ec.style.borderLeft = '2px solid black';
    assertProps( props );
});

})(); // end anonymous closure scope
// vim: se sts=4 sw=4 et :miv
