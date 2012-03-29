(function(){ // anonymous closure scope

var suite = Runner.addSuite( "centered borders" );

function promptHoriz32() {
    Runner.inputChooseImage([
            {   image: 'border-center/horiz-3-2-up.png',
                title: 'larger portion in upper cell' },
            {   image: 'border-center/horiz-3-2-down.png',
                title: 'larger portion in lower cell' }
        ], function (choice) {
            log( choice.title );
        });
}

function promptVert32() {
    Runner.inputChooseImage([
            {   image: 'border-center/vert-3-2-left.png',
                title: 'larger portion in left cell' },
            {   image: 'border-center/vert-3-2-right.png',
                title: 'larger portion in right cell' }
        ], function (choice) {
            log( choice.title );
        });
}


suite.addTest( "top 3px local", function() {
    table.cc.style.borderTop = '3px solid black';
    table.ec.style.borderTop = '2px solid black';
    promptHoriz32();
});

suite.addTest( "top 3px remote", function() {
    table.nc.style.borderBottom = '3px solid black';
    table.ec.style.borderTop = '2px solid black';
    promptHoriz32();
});

suite.addTest( "top 3px both", function() {
    table.cc.style.borderTop = '3px solid black';
    table.nc.style.borderBottom = '3px solid black';
    table.ec.style.borderTop = '2px solid black';
    promptHoriz32();
});


suite.addTest( "bottom 3px local", function() {
    table.cc.style.borderBottom = '3px solid black';
    table.ec.style.borderBottom = '2px solid black';
    promptHoriz32();
});

suite.addTest( "bottom 3px remote", function() {
    table.sc.style.borderTop = '3px solid black';
    table.ec.style.borderBottom = '2px solid black';
    promptHoriz32();
});

suite.addTest( "bottom 3px both", function() {
    table.cc.style.borderBottom = '3px solid black';
    table.sc.style.borderTop = '3px solid black';
    table.ec.style.borderBottom = '2px solid black';
    promptHoriz32();
});


suite.addTest( "left 3px local", function() {
    table.cc.style.borderLeft = '3px solid black';
    table.sc.style.borderLeft = '2px solid black';
    promptVert32();
});

suite.addTest( "left 3px remote", function() {
    table.wc.style.borderRight = '3px solid black';
    table.sc.style.borderLeft = '2px solid black';
    promptVert32();
});

suite.addTest( "left 3px both", function() {
    table.cc.style.borderLeft = '3px solid black';
    table.wc.style.borderRight = '3px solid black';
    table.sc.style.borderLeft = '2px solid black';
    promptVert32();
});


suite.addTest( "right 3px local", function() {
    table.cc.style.borderRight = '3px solid black';
    table.sc.style.borderRight = '2px solid black';
    promptVert32();
});

suite.addTest( "right 3px remote", function() {
    table.ec.style.borderLeft = '3px solid black';
    table.sc.style.borderRight = '2px solid black';
    promptVert32();
});

suite.addTest( "right 3px both", function() {
    table.cc.style.borderRight = '3px solid black';
    table.ec.style.borderLeft = '3px solid black';
    table.sc.style.borderRight = '2px solid black';
    promptVert32();
});


})(); // end anonymous closure scope
// vim: se sts=4 sw=4 et :miv
