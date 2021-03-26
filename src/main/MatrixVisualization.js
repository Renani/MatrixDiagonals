/**
 *  Creates visualization components
 * 
 */
import React, { Component } from 'react';
import MatrixTable from './Matrixtable'
import {
    Segment,

} from 'semantic-ui-react';




class MatrixVisualization extends Component {
    static getAntiDiagonalContent(antiDiagonalResult, columnlength, matrix, mfun, createContentForAntidiagonal) {


        const antiDiagonalIndex = [...new Array(20)].map((el, ind) => { return mfun.getAntiDiagonalIndex(ind, columnlength) });
        const antiDiagonalContent = <div><h3> Product:{antiDiagonalResult[0]}</h3><MatrixTable data={matrix} mark={antiDiagonalIndex} markSpecial={antiDiagonalResult[1]} key={this.activeItem}></MatrixTable></div>;
        const callStack = this.getcallStackForAntiDiagonal();

        const antiDiagonalExplanation = <Segment textAlign="left">
            <Segment>Alternative would be transposing the matrix</Segment>
                     Initiating calculation from <a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/App.js" >App.js</a> with diagional index finder method.
                                <pre>{callStack[0]}</pre>
                                antidiagonal index finder method defined in <a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a>;
                                <pre>{callStack[1]}</pre>
                                This calculation method calls indexfinder and finds it's adjacent values defined in<a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a>.
                                This method is used for all type of iterations:
                                <pre>{callStack[2]}</pre>
                                Seperated the actual Multiplication in a seperate method. I can imagine a situation where there will be need to change this operation. Defined in<a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a>.
                                <pre>{callStack[3]}</pre>
                </Segment>
        return [antiDiagonalContent, antiDiagonalExplanation]
    }

static getCallStackForColumnCalculation (){
    const methodInitiate =  
`
calculateColumnwise(squareLength, mfun) {
    const rowResult = [];
    [...new Array(squareLength)].forEach((_, offset) =>
      rowResult.push(mfun.CalculateProductForRange(squareLength, (colInd, colLength) => (colInd + (colLength*offset)), 4))
    )
    return rowResult;
  }
`;
    const methodFinder = undefined;

    const commons = this.getCommonMethods();
    return [methodInitiate, methodFinder, ...commons];
}

static getCallStackForRowCalculation () {
    const methodInitiate =`
//We are re-using the same product calculation method. We only need to adjust the order of iteration.
calculateRows(squareLength, mfun) {
    let rowIndex = mfun.getRowIndexes(squareLength, squareLength);
    const rowResult = [];
    [...new Array(squareLength)].forEach((_, offset) =>
    rowResult.push(mfun.CalculateProductForRange(squareLength, (colInd, colLength) => (rowIndex[colInd] + offset), 4))
    )
    return rowResult;
} 
`;

    const methodFinder=`
/**
 * Creates row-wise indexes.
 * Parameters
 *   col = Squarelength
 *   row = squareLength
 * @param {int} col 
 * @param {int} row 
 * @returns int [] of indexes in the first row
 */
getRowIndexes(col, row) {
    return [...Array(col).keys()].map(element => element * row);

}
 `;
    let commons = this.getCommonMethods();
    return [methodInitiate, methodFinder, ...commons];
    }

    static getcallStackForAntiDiagonal() {
        const methodInitiate = `
/**
 * Method to initiate calculation of antidiagonal
 * @param {int} columnlength 
 * @param {MatrixFun} mfun 
 * @returns [int max, [...indexes]]
 */
calculateAntidiagonal(columnlength, mfun) {
    let antiDiagonal = mfun.CalculateProductForRange(columnlength, 
        (colInd, colLength) => mfun.getAntiDiagonalIndex(colInd, colLength), 4)
    return antiDiagonal;
}
        `;

        const methodIndexfinder =`
/**
* Calculates the position of an antidiagonal
* value for a column index.
* @param {int} index 
* @param {int} squareLength 
* @returns 
*/
getAntiDiagonalIndex(index, squareLength) {
    if (index === undefined || squareLength === undefined) { 
        console.error("Missing parameters:index, squarelength ", [index, squareLength])
    }
    return ((squareLength - index - 1) + squareLength * index);
}
    `;
       let commons = this.getCommonMethods();
        return [methodInitiate, methodIndexfinder, ...commons];
    }

    static getcallStackForDiagonal() {
        const methodInitiate = `
/**
*  Method to initate the calculation
* Althought these methods are short enough to be inlined 
* it is a central part of the logic so it makes 
* sense to seperate them and it could be advantageous for test.
* @param {*} columnlength 
* @param {*} mfun 
* @returns [int max, [...indexes]]
*/
calculateDiagonal(columnlength, mfun) {
        let diagonalMax = mfun.CalculateProductForRange(
        columnlength, 
        (colInd, colLength) =>
         mfun.getDiagonalIndex(colInd, colLength), 
         4);
    return diagonalMax;
}`;

    const methodIndexfinder = `
/** 
 * Calculates the position of a diagional value 
 * for a column
 * @param {int} currentIndex 
 * @param {int} squareLength 
 * @returns  returns index + (squareLength*index )
 */
getDiagonalIndex(index, squareLength) {
    if (index === undefined || squareLength === undefined) { 
        console.error("Missing parameters:index, squarelength ", 
            [index, squareLength]) 
    }
    return (index + squareLength * index);
}
`;
       const commonMethod = this.getCommonMethods();
       return [methodInitiate, methodIndexfinder, ...commonMethod]
    }
    static getCommonMethods() {
        const methodCalculator = 
`
/**
 * This method does the actual calcuation of 
 * product between "range" values.
 * The function passed as a parameter provides 
 * the index of values to be used,
 * and is called 0...squarelength-1 times, 
 * with the counter as parameter. if the 
 * counter is increased beyond squarelength 
 * this method return the padding value,
 * i.e. increasing the dimension of the matrix.
 * The padding value is hard-coded to 1. 
 * @param {int} squareLength 
 * @param {func(currentIndex, squareLength) return index of value} getIndex 
 * @param {int} range 
 * @returns [int max, [...indexes]]
 */
CalculateProductForRange(squareLength, getIndex, range) {
let maxDiagonal = 0;
let winners = [];

//Stream of indexes vs for-loop?
[...new Array(squareLength)].forEach((_, ind) => {

    let candidates = [];
    let localMax = [...new Array(range)].map((el, counter) => 
    {
        let adjacentIndex = ind + counter;

//Padding the matrix with 1 (0 is another 
//alternative if you want to discard the last (range-1) values)
        if (adjacentIndex >= squareLength) { 
            return this.paddingValue 
        }

        let cInd = getIndex(adjacentIndex, squareLength);
        candidates.push(cInd);
        return this.matrix[cInd];
    })
    .reduce((acc, el) => acc * el);

    if (localMax > maxDiagonal) {
        maxDiagonal = localMax;
        winners = candidates;
    }
});

return [maxDiagonal, winners];
}
`;

        const methodMulti = 
`
/**
 * Multiplication of array of numbers.
 * @param {Number} numbers 
 * @returns 
 */
calculateProduct(numbers) {
return numbers.reduce((acc, element) => acc * element);
}`


        return [ methodCalculator, methodMulti];

    }

    static getDiagonalContent(diagonalResult, columnlength, matrix, mfun, createContentForDiagonal) {
        //Creating view information for diagonals    
        const diagonalIndexes = [...new Array(20)].map((el, ind) => { return mfun.getDiagonalIndex(ind, columnlength) });
        const diagonalContent = <div><h3> Product:{diagonalResult[0]}</h3> <MatrixTable data={matrix} mark={diagonalIndexes} markSpecial={diagonalResult[1]} key={this.activeItem}></MatrixTable></div>;
        const callStack = this.getcallStackForDiagonal();
        

        const diagonalExplanation = <Segment textAlign="left">
            <Segment>In Matlab it would have simply been creating identity matrix with equal dimensions and multiply</Segment>
                                Initiating calculation from <a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/App.js" >App.js</a> with diagional index finder method.
                                <pre>{callStack[0]}</pre>
                                The Diagonal index finder method defined in <a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a>;
                                <pre>{callStack[1]}</pre>
                                This calculation method calls indexfinder and finds it's adjacent values defined in<a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a>.
                                This method is used for type of iteration:
                                <pre>{callStack[2]}</pre>
                                Seperated the actual Multiplication in a seperate method. I can imagine a situation where there will be need to change this operation. Defined in<a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a>.
                                <pre>{callStack[3]}</pre>

        </Segment>
        return [diagonalContent, diagonalExplanation]
    }

    static getMultipleResultsContent(rowResult, matrix) {
        return rowResult.map((el, ind) => <div><h3>Number {ind}. Product:{el[0]}</h3><MatrixTable key={ind} data={matrix} markSpecial={el[1]} ></MatrixTable></div>);
    }
    static getRowExplanation () {
        const callStack = this.getCallStackForRowCalculation();
        const explanation = 
        <Segment textAlign="left"> 
            We are calling the same method for diagionals, but now we have 20 more sets to iterate. 
            <a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/App.js" >App.js</a>.
            <pre>{callStack[0]}</pre>
            <a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a> 
            we have a method to create array of the first indexes. To get index of a row for a column we just have to add the column offset.
            <pre>{callStack[1]}</pre>
            This calculation method calls indexfinder and finds it's adjacent values defined in
            <a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a>.This method is used for type of iteration:
            <pre>{callStack[2]}</pre>
            Seperated the actual Multiplication in a seperate method. 
            I can imagine a situation where there will be need to change this operation. 
            Defined in<a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a>.
            <pre>{callStack[3]}</pre>
        </Segment>
        return explanation;
    }

    static getColumnExplanation () {
        const callStack = this.getCallStackForColumnCalculation();
        const explanation = 
        <Segment textAlign="left"> 
            Simple iteration like we did for rows, but much simpler now that values are in rows. No need for a separate index finder method here; we can define it directly in this method.
            <a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/App.js" >App.js</a>.
            <pre>{callStack[0]}</pre>
            This calculation method calls indexfinder and finds it's adjacent values defined in
            <a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a>.This method is used for type of iteration:
            <pre>{callStack[2]}</pre>
            Seperated the actual Multiplication in a seperate method. 
            I can imagine a situation where there will be need to change this operation. 
            Defined in<a href="https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js"> MatrixFun.js</a>.
            <pre>{callStack[3]}</pre>
        </Segment>
        return explanation;
    }


}

export default MatrixVisualization
