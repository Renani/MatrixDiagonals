
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import { MatrixFun } from './main/MatrixFun.js'

import MatrixVisualization from './main/MatrixVisualization'
import {
  Grid,
  Menu,
  Card,
  Image,
  Container
} from 'semantic-ui-react';
class App extends React.Component {

  constructor(props) {
    super(props)
    let text = "08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08\n" +
      "49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00\n" +
      "81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65\n" +
      "52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91\n" +
      "22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80\n" +
      "24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50\n" +
      "32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70\n" +
      "67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21\n" +
      "24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72\n" +
      "21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95\n" +
      "78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92\n" +
      "16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57\n" +
      "86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58\n" +
      "19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40\n" +
      "04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66\n" +
      "88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69\n" +
      "04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36\n" +
      "20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16\n" +
      "20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54\n" +
      "01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48";

    let lines = text.replace('"', "").split("\n");

    const matrix = [];
    lines.forEach((element, index) => { matrix[index] = element.split(" ").map(str => Number.parseInt(str)) });

    const columnlength = matrix[0].length;

    const flattened = matrix.flat();

    const mfun = new MatrixFun(flattened);
    //Calculating diagional
    let diagonal = this.calculateDiagonal(columnlength, mfun);
    //creating view for Diagonal
    let content = MatrixVisualization.getDiagonalContent(diagonal, columnlength, matrix, mfun, this.calculateDiagonal);
    const diagonalContent = content[0];
    const diagonalExplanation = content[1];

    //Calculating antidiagonal
    const antiDiagonal = this.calculateAntidiagonal(columnlength, mfun);
    //Creating view for antidiagonals
    content = MatrixVisualization.getAntiDiagonalContent(antiDiagonal, columnlength, matrix, mfun, this.calculateAntidiagonal);
    const antiDiagonalContent = content[0];
    const antiDiagonalExplanation = content[1];

    let rowResult = this.calculateRows(columnlength, mfun);
    let rowContent = MatrixVisualization.getMultipleResultsContent(rowResult, matrix);

    let columnResult = this.calculateColumnwise(columnlength, mfun);
    let colContent = MatrixVisualization.getMultipleResultsContent(columnResult, matrix);

     let maxResult=  [...rowResult.map(el=>el[0]), ...columnResult.map(el=>el[0]), diagonal[0], antiDiagonal[0]].reduce((ac, el)=>ac<el?el:ac);
    
    
    let maxContent =<Container textAlign="center"> <Card>
    <Image src='https://www.flaticon.com/svg/vstatic/svg/261/261992.svg?token=exp=1616746093~hmac=1da234452297d55dfca6fe21e1ccca32' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Max of four</Card.Header>
      <Card.Meta>
        <span className='date'>diagonally, antiDiagonally, row-wise and columnwise...</span>
      </Card.Meta>
      <Card.Description>
         {maxResult}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        
    </Card.Content>
  </Card>
  </Container>
    this.state = {
      data: matrix,
      columnlength: columnlength,
      activeItem: {},
      diagonalContent: diagonalContent,
      diagonalExplanation: diagonalExplanation,
      antiDiagonalContent: antiDiagonalContent,
      antiDiagonalExplanation: antiDiagonalExplanation,
      rowContent: rowContent,
      colContent: colContent,
      columnResult: columnResult,
      summaryContent: maxContent
    };

  }
  /**
   *  Method to initate the calculation
   * Althought these methods are short enough to be inlined 
   * it is a central part of the logic so it makes 
   * sense to seperate them and it could be advantageous for test.
   * @param {int} columnlength 
   * @param {MatrixFun} mfun 
   * @returns [int max, [...indexes]]
   */
    calculateDiagonal(columnlength, mfun) {
    let diagonalMax = mfun.CalculateProductForRange(columnlength, (colInd, colLength) => mfun.getDiagonalIndex(colInd, colLength), 4);
    return diagonalMax;

  }

  /**
   * Method to initiate calculation of antidiagonal
   * @param {int} columnlength 
   * @param {MatrixFun} mfun 
   * @returns [int max, [...indexes]]
   */
  calculateAntidiagonal(columnlength, mfun) {
    let antiDiagonal = mfun.CalculateProductForRange(columnlength, (colInd, colLength) => mfun.getAntiDiagonalIndex(colInd, colLength), 4)
    return antiDiagonal;
  }
  
  //We are re-using the same product calculation method. We only need to adjust the order of iteration.
  calculateRows(squareLength, mfun) {
    let rowIndex = mfun.getRowIndexes(squareLength, squareLength);
    const rowResult = [];
    [...new Array(squareLength)].forEach((_, offset) =>
      rowResult.push(mfun.CalculateProductForRange(squareLength, (colInd, colLength) => (rowIndex[colInd] + offset), 4))
    )
    return rowResult;
  }

  calculateColumnwise(squareLength, mfun) {
    const rowResult = [];
    [...new Array(squareLength)].forEach((_, offset) =>
      rowResult.push(mfun.CalculateProductForRange(squareLength, (colInd, colLength) => (colInd + (colLength*offset)), 4))
    )
    return rowResult;
  }

  //React lifecycle method. Ignore
  componentDidMount() {
    console.debug("this.menus", this.menues);
    this.menues.scrollIntoView();

  }
  //React lifecycle method. Ignore
  componentDidUpdate() {
    this.menues.scrollIntoView({ "behavior": "smooth", "block": "start" });
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    let activeItem = this.state.activeItem;
    let content = "";
    let explanation = "";
    switch (activeItem) {
      case "Diagonal":
        content = this.state.diagonalContent;
        explanation = this.state.diagonalExplanation;
        break;
      case "AntiDiagonal":
        content = this.state.antiDiagonalContent
        explanation = this.state.antiDiagonalExplanation
        break;
      case "Rows":
        content = this.state.rowContent;
        break;
      case "Columnwise":
        content = this.state.colContent;
        break;
      case "Summary":
        content = this.state.summaryContent;
        break;
      default: content="";
    }
    return (
      <div className="App">

        <div className="App-header">
          <h2>M A T R I X</h2>
        </div>

        <div className="App-body">



          <Grid columns={2} divided>
            <Grid.Column>
              {content}
            </Grid.Column>

            <Grid.Column>

              {explanation}


            </Grid.Column>
          </Grid>
          <div ref={el => this.menues = el}>
            <Menu attached='bottom' tabular>
              <Menu.Item
                name='Diagonal'
                active={activeItem === 'Diagonal'}
                onClick={this.handleItemClick}

              >
                Diagonal
                      </Menu.Item>

              <Menu.Item
                name='AntiDiagonal'
                active={activeItem === 'AntiDiagonal'}
                onClick={this.handleItemClick}
              >
                AntiDiagonal
                      </Menu.Item>

              <Menu.Item
                name='Columnwise'
                active={activeItem === 'Columnwise'}
                onClick={this.handleItemClick}
              >
                Columnwise
                      </Menu.Item>

              <Menu.Item
                name='Rows'
                active={activeItem === 'Rows'}
                onClick={this.handleItemClick}
              >
                Rows
                      </Menu.Item>

              <Menu.Item
                name='Summary'
                active={activeItem === 'Summary'}
                onClick={this.handleItemClick}
              >
                Summary
                      </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
