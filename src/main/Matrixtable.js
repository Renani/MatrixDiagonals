
import React, { Component } from 'react';


import { select, local } from 'd3-selection';

class MatrixTable extends Component {
 
    componentDidMount() {

        this.createTable();

    }
    componentDidUpdate() {
        this.createTable();
    }


    createTable() {
        let thisState = local();
        let toBeMarked = this.props.mark;
        let toBeSpeciallyMarked = this.props.markSpecial;
        let cData = this.props.data;

        let svg = select(this.node);
        svg.append("g")
            .selectAll("g")
            .data(cData)
            .enter()
            .append("g") //removing
            .selectAll("text") // these
            .data(function (d, i, j, k) { thisState.set(this, i); return d }) //lines
            .enter() //text displays normally
            .append("text")
            .text(function (d, i, j) { return d; })
            .attr("x", function (d, i) { return (i * 40) + 20; })
            .attr("y", function (d, i) { return (thisState.get(this) * 40) + 90; })

            .attr("font-family", "Helvetica")
            .attr("font-size", "20px")
            .attr("fill", function (d, i) {
                let needle = thisState.get(this) * 20 + i;
                let color = "black"
                if (toBeMarked) {

                    if (toBeMarked.findIndex((el) => el === needle) !== -1) {
                        color = "Orange";
                    } else
                        color = "green";
                }

                if (toBeSpeciallyMarked) {
                    if (toBeSpeciallyMarked.findIndex((el) => el === needle) !== -1) {
                        color = "Red";
                    }
                }

                return color;

            })
    }


    render() {

        return ( <div className="svg-container">
                   <svg ref={node => this.node = node} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" className="svg-content">
                 </svg>
                </div >
        )
    }

}

export default MatrixTable;