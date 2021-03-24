//Based on http://bl.ocks.org/eesur/9937740.
import React, { Component } from 'react';
import './App.css';

import { select } from 'd3-selection';

class MatrixTable extends Component {

    constructor(props) {
        super(props);
    }

    createTable() {
        const body = d3.select("#page-wrap");

        // append a table element to the body
        const table = body.append("table");

        // append entering rows to the table via data-join (Since selectAll is called on the selected table element, it establishes a new parent node of table instead of the default html)
        const tr = table.selectAll("tr")
            .data(this.props.data)
            .enter()
            .append("tr");

        // append entering cells to each row
        const td = tr.selectAll("td")
            .data(function (d) { return d; })
            .enter()
            .append("td");


        // add content from the dataset
        const content = td.text(function (d) { return d; });

        // manipulate colour of specific cells and rows: j is row ,and i is column
        td.style("color", function (d, i, j) { return (j < 2 && i < 2) ? null : "red"; });

    }


    render() {

        return (
            <div id="page-wrap" ref={node => this.node = node} >  </div>
        )
    }
}


export default MatrixTable;