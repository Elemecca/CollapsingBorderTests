A number of aspects of CSS's collapsing border model for tables are
either explicity declared implementation-defined or inadequately
specified. This is a suite of tests that explore the differences
between browsers in the handling of those areas.

To run the tests, open ``runner.html`` in the browser you want to test.
The test table will be in the top left, the input area will be in the
bottom left, and the output area will be to the right. Check the boxes
next to the suites you want to run and click the "Run Tests" button. If
a prompt appears in the input area respond according to the provided
instructions. When the test run is complete the suite selection list
will re-appear.

Test Cases
==========

offset properties (``offset-props.js``)
    Tests how various border styles affect the ``offsetTop``,
    ``offsetLeft``, ``offsetWidth``, and ``offsetHeight`` properties of
    table cells in JavaScript. These effects are implementation-defined
    because the properties' values are specified relative to the
    element's border edge and CSS fails to specify what the border edge
    means for cells in a table with collapsing borders.

centered borders (``border-center.js``)
    The border lines of a table with collapsed borders are drawn
    centered over the division between cells. When a border is an odd
    number of pixels thick it cannot be centered evenly over the
    zero-width division line. The CSS specification explicitly declares
    which cell gets the extra pixel to be implementation-defined. The
    browser may choose, but must act consistently. This suite tests
    which direction the browser chooses to round.


.. vim: se sts=4 sw=4 et :miv
