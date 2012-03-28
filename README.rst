A number of aspects of CSS's collapsing border model for tables are
either explicity declared implementation-defined or inadequately
specified. This is a suite of tests that explore the differences
between browsers in the handling of those areas.

To run the tests, simply open ``runner.html`` in the browser you want
to test and click the "Start Tests" button.

Test Cases
==========

``offset-props.js``
    Tests how various border styles affect the ``offsetTop``,
    ``offsetLeft``, ``offsetWidth``, and ``offsetHeight`` properties of
    table cells in JavaScript. These effects are implementation-defined
    because the properties' values are specified relative to the
    element's border edge and CSS fails to specify what the border edge
    means for cells in a table with collapsing borders.

.. vim: se sts=4 sw=4 et :miv
