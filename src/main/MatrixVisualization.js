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


        let antiDiagonalIndex = [...new Array(20)].map((el, ind) => { return mfun.getAntiDiagonalIndex(ind, columnlength) });
        let antiDiagonalContent = <MatrixTable data={matrix} mark={antiDiagonalIndex} markSpecial={antiDiagonalResult[1]} key={this.activeItem}></MatrixTable>;
        let antiDiagonalExplanation = <Segment textAlign="left">
            <Segment>Hadde vært greit med en funksjon for å transponere identitetsmatrise, men det er heller ingen problem å beregne indeksene</Segment>
                                          createContentForAntidiagonal initiating callstack:
                                          <pre>{createContentForAntidiagonal.toString()}</pre>
                                          CalculateProductForRange - Method used by both diagonals:
                                          <pre>{mfun.CalculateProductForRange.toString()}</pre>
                                          Calculate indexes - getAntiDiagonalIndex:
                                          <pre>{mfun.getAntiDiagonalIndex.toString()}</pre> </Segment>
        return [antiDiagonalContent, antiDiagonalExplanation]
    }

    static getDiagonalContent(diagonalResult, columnlength, matrix, mfun, createContentForDiagonal) {
        //Creating view information for diagonals    
        let diagonalIndexes = [...new Array(20)].map((el, ind) => { return mfun.getDiagonalIndex(ind, columnlength) });
        let diagonalContent = <MatrixTable data={matrix} mark={diagonalIndexes} markSpecial={diagonalResult[1]} key={this.activeItem}></MatrixTable>;
        let diagonalExplanation = <Segment textAlign="left">
            <Segment>Jeg hadde nok foretrukket en Matlab tilnærming her - altså lage en identitetsmatrise og gjort en matrise operasjon. Dette er dog en grei implementasjon</Segment>
                                createContentForDiagonal initiating callstack:
                                <pre>{createContentForDiagonal.toString()}</pre>
                                CalculateProductForRange - Method used by both diagonals:
                                <pre>{mfun.CalculateProductForRange.toString()}</pre>
                                Calculate index: <pre>{mfun.getDiagonalIndex.toString()}</pre>
        </Segment>
        return [diagonalContent, diagonalExplanation]
    }

    static getRowContent(rowResult, matrix){
       return  rowResult.map((el,ind)=><div><h3>Row number {ind}</h3><MatrixTable key={ind} data={matrix}  markSpecial={el[1]} ></MatrixTable></div>);

    }

}

export default MatrixVisualization