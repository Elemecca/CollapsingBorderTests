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
    return (table.cc[ name ] != props[ name ]) ? 'yes' : 'no';
}

function assertProps (props) {
    log( 'offsetTop:     ' + assertProp( props, 'offsetTop' ) + '\n'
       + 'offsetLeft:    ' + assertProp( props, 'offsetLeft' ) + '\n'
       + 'offsetWidth:   ' + assertProp( props, 'offsetWidth' ) + '\n'
       + 'offsetHeight:  ' + assertProp( props, 'offsetHeight' ) );
}

addTest( 'offsets / top / local', function() {
    var props = getProps();
    table.cc.style.borderTop = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / top / remote', function() {
    var props = getProps();
    table.nc.style.borderBottom = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / top / both', function() {
    var props = getProps();
    table.cc.style.borderTop = '2px solid black';
    table.nc.style.borderBottom = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / left / local', function() {
    var props = getProps();
    table.cc.style.borderLeft = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / left / remote', function() {
    var props = getProps();
    table.wc.style.borderRight = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / left / both', function() {
    var props = getProps();
    table.cc.style.borderLeft = '2px solid black';
    table.wc.style.borderRight = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / bottom / local', function() {
    var props = getProps();
    table.cc.style.borderBottom = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / bottom / remote', function() {
    var props = getProps();
    table.sc.style.borderTop = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / bottom / both', function() {
    var props = getProps();
    table.cc.style.borderBottom = '2px solid black';
    table.sc.style.borderTop = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / right / local', function() {
    var props = getProps();
    table.cc.style.borderRight = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / right / remote', function() {
    var props = getProps();
    table.ec.style.borderLeft = '2px solid black';
    assertProps( props );
});

addTest( 'offsets / right / both', function() {
    var props = getProps();
    table.cc.style.borderRight = '2px solid black';
    table.ec.style.borderLeft = '2px solid black';
    assertProps( props );
});

})(); // end anonymous closure scope
// vim: se sts=4 sw=4 et :miv
