/**
 * Contains Matrix functionality for finding max product of adjacent values in rows, columns, diagonal and antidiagonal.
 */
export class MatrixFun {

    constructor(matrix) {
        this.matrix = matrix;

        //Padding the matrix with 1 for out of bounds values -( Alternative value would be 0)
        this.paddingValue=1;

        //Note: the functions toString only returns [native code] if you do NOT bind methods
    }

    /** 0-19
     * Sum(j and i)
     * @param {*} currentIndex 
     * @param {*} squareLength 
     * @returns 
     */
    getDiagonalIndex(index, squareLength) {
        if (index === undefined || squareLength === undefined) { console.error("Missing parameters:index, squarelength ", [index, squareLength]) }
        return (index + squareLength * (index))
    }

    getAntiDiagonalIndex(index, squareLength) {
        if (index === undefined || squareLength === undefined) { console.error("Missing parameters:index, squarelength ", [index, squareLength]) }
        return ((squareLength - index - 1) + squareLength * index);
    }
    /**
     * Creates row-wise indexes.
     * (fany implementation, but not sure if it is particular fast or understandable - probably )
     * inspired by Matlab 
     * @param {int} col 
     * @param {int} row 
     * @returns 
     */
    getRowIndexes(col, row) {
        return [...Array(col).keys()].map(element => element * row);
      
    }
    
    CalculateProductForRange(squareLength, getIndex, range) {
        let maxDiagonal = 0;
        let winners = [];

        //Matlab inspired - stream from array instead of for(...)
        [...new Array(squareLength)].forEach((_, ind) => {

            let candidates = [];
            let localMax = [...new Array(range)].map((el, counter) => {
                let adjacentIndex=ind + counter;
                
                //Padding the matrix with 1 (0 is another alternative if you want to discard the last (range-1) values)
                if (adjacentIndex>=squareLength) { return this.paddingValue }

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
 

    calculateProduct(numbers) {
        return numbers.reduce((acc, element) => acc * element);
    }

}

