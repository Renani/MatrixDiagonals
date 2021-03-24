export class MatrixFun {
    constructor(matrix) {
        this.matrix = matrix;
    }

    /** 0-19
     * Sum(j and i)
     * @param {*} currentIndex 
     * @param {*} squareLength 
     * @returns 
     */
    getDiagonalIndex(index, squareLength) { if(index===undefined || squareLength===undefined){console.error("Missing parameters:index, squarelength ",[index, squareLength])} return (index + squareLength * (index)) }

    getAntiDiagonalIndex(index, squareLength) { return ((squareLength - index - 1) + squareLength * index) }
    /**
     * Creates row-wise indexes.
     * (fany implementation, but not sure if it is particular fast or understandable)
     * inspired by Matlab 
     * @param {int} col 
     * @param {int} row 
     * @returns 
     */
    getRowIndexes(col, row) {
        let row1 = [...Array(col).keys()].map(element => element * row);
        return row1.map((element, index) => row1.map((el, ind) => el + index)).flat();
    }

    getColumnIndexes(size) {
        return [...Array(size).keys()];
    }

    CalculateProductForRange(squareLength, getIndex, range) {
        let maxDiagonal=0;
        let winners =[];
        [...new Array(squareLength)].forEach((_, ind) => {
           
            let candidates=[];
            let localMax = [...new Array(range)].map((el, counter) => {
                    let cInd=getIndex(ind + counter,squareLength);
                    candidates.push(cInd);
                    return this.matrix[cInd];
                }
                )
                    .reduce((acc, el) => acc * el);

            if (localMax > maxDiagonal) {
                maxDiagonal = localMax;
                winners=candidates;
            }
        });
        
        return [maxDiagonal,winners];
    }
    /**
       * Calculates columnwise product for square matrix.
       * Let the matrix by of the shape NxN, it will return
       * a matrix in shape if (N/range)XN.
       * For example, 20x20 will become 5x20.
       * The matrix returned is flattened.
       * @param {nXn matrix flattened} matrix 
       * @param {int} range 
       * @returns {(n/range)Xn matrix}
       */
    calculateColumnwiseProduct(matrix, range) {

        let columns = [];
        let columWiseProduct = [];
        matrix.forEach(element => {
            columns.push(element);
            if (columns.length === range) {
                const product = this.calculateProduct(columns);
                columns = [];
                columWiseProduct.push(product)
            }
        });
        return columWiseProduct;
    }


    calculateProduct(numbers) {
        return numbers.reduce((acc, element) => acc * element);
    }

}

