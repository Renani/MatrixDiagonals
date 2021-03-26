/**
 * Contains Matrix functionality for finding max product of adjacent values in rows, columns, diagonal and antidiagonal.
 */
export class MatrixFun {

    constructor(matrix) {
        this.matrix = matrix;

        //Padding the matrix with 1 for out of bounds values -( Alternative value would be 0)
        this.paddingValue = 1;

        //Note: the functions toString only returns [native code] if you do NOT bind methods
    }

    /** 
     * Calculates the position of a diagional value 
     * for a column
     * @param {int} currentIndex 
     * @param {int} squareLength 
     * @returns  returns index + (squareLength*index )
     */
    getDiagonalIndex(index, squareLength) {
        if (index === undefined || squareLength === undefined) { console.error("Missing parameters:index, squarelength ", [index, squareLength]) }
        return (index + squareLength * index);
    }
    /**
     * Calculates the position of an antidiagonal
     * value for a column index.
     * @param {int} index 
     * @param {int} squareLength 
     * @returns 
     */
    getAntiDiagonalIndex(index, squareLength) {
        if (index === undefined || squareLength === undefined) { console.error("Missing parameters:index, squarelength ", [index, squareLength]) }
        return ((squareLength - index - 1) + squareLength * index);
    }
    /**
     * Creates row-wise indexes.
     * 
     * Parameters
     *   col = Squarelength
     *   row = squareLength
     * 
     * @param {int} col 
     * @param {int} row 
     * @returns int [] of indexes in the first row
     */
    getRowIndexes(col, row) {
        return [...Array(col).keys()].map(element => element * row);

    }
    /**
     * This method does the actual calcuation of product between "range" values.
     * The function passed as a parameter provides the index of values to be used,
     * and is called 0...squarelength-1 times, with the counter as parameter. if the 
     * counter is increased beyond squarelength this method return the padding value,
     * i.e. increasing the dimension of the matrix. The padding value is hard-coded to
     * 1. 
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
            let localMax = [...new Array(range)].map((el, counter) => {
                let adjacentIndex = ind + counter;

                //Padding the matrix with 1 (0 is another alternative if you want to discard the last (range-1) values)
                if (adjacentIndex >= squareLength) { return this.paddingValue }

                let cInd = getIndex(adjacentIndex, squareLength);
                candidates.push(cInd);
                return this.matrix[cInd];
            }
            )
                .reduce((acc, el) => acc * el);

            if (localMax > maxDiagonal) {
                maxDiagonal = localMax;
                winners = candidates;
            }
        });

        return [maxDiagonal, winners];
    }

    /**
     * Multiplication of array of numbers.
     * @param {Number} numbers 
     * @returns 
     */
    calculateProduct(numbers) {
        return numbers.reduce((acc, element) => acc * element);
    }

}

