(this.webpackJsonpmatrisediagonals=this.webpackJsonpmatrisediagonals||[]).push([[0],{108:function(n,e,t){"use strict";t.r(e);var a=t(0),i=t.n(a),r=t(32),c=t.n(r),o=(t(97),t(14)),l=t(23),s=t(24),u=t(47),d=t(44),h=(t(98),t(99),function(){function n(e){Object(l.a)(this,n),this.matrix=e,this.paddingValue=1}return Object(s.a)(n,[{key:"getDiagonalIndex",value:function(n,e){return void 0!==n&&void 0!==e||console.error("Missing parameters:index, squarelength ",[n,e]),n+e*n}},{key:"getAntiDiagonalIndex",value:function(n,e){return void 0!==n&&void 0!==e||console.error("Missing parameters:index, squarelength ",[n,e]),e-n-1+e*n}},{key:"getRowIndexes",value:function(n,e){return Object(o.a)(Array(n).keys()).map((function(n){return n*e}))}},{key:"CalculateProductForRange",value:function(n,e,t){var a=this,i=0,r=[];return Object(o.a)(new Array(n)).forEach((function(c,l){var s=[],u=Object(o.a)(new Array(t)).map((function(t,i){var r=l+i;if(r>=n)return a.paddingValue;var c=e(r,n);return s.push(c),a.matrix[c]})).reduce((function(n,e){return n*e}));u>i&&(i=u,r=s)})),[i,r]}},{key:"calculateProduct",value:function(n){return n.reduce((function(n,e){return n*e}))}}]),n}()),g=t(123),m=t(125),x=t(2),j=function(n){Object(u.a)(t,n);var e=Object(d.a)(t);function t(){return Object(l.a)(this,t),e.apply(this,arguments)}return Object(s.a)(t,[{key:"componentDidMount",value:function(){this.createTable()}},{key:"componentDidUpdate",value:function(){this.createTable()}},{key:"createTable",value:function(){var n=Object(g.a)(),e=this.props.mark,t=this.props.markSpecial,a=this.props.data;Object(m.a)(this.node).append("g").selectAll("g").data(a).enter().append("g").selectAll("text").data((function(e,t,a,i){return n.set(this,t),e})).enter().append("text").text((function(n,e,t){return n})).attr("x",(function(n,e){return 40*e+20})).attr("y",(function(e,t){return 40*n.get(this)+90})).attr("font-family","Helvetica").attr("font-size","20px").attr("fill",(function(a,i){var r=20*n.get(this)+i,c="black";return e&&(c=-1!==e.findIndex((function(n){return n===r}))?"Orange":"green"),t&&-1!==t.findIndex((function(n){return n===r}))&&(c="Red"),c}))}},{key:"render",value:function(){var n=this;return Object(x.jsx)("div",{className:"svg-container",children:Object(x.jsx)("svg",{ref:function(e){return n.node=e},viewBox:"0 0 1000 1000",preserveAspectRatio:"xMidYMid meet",className:"svg-content"})})}}]),t}(a.Component),f=t(129),b=function(n){Object(u.a)(t,n);var e=Object(d.a)(t);function t(){return Object(l.a)(this,t),e.apply(this,arguments)}return Object(s.a)(t,null,[{key:"getAntiDiagonalContent",value:function(n,e,t,a,i){var r=Object(o.a)(new Array(20)).map((function(n,t){return a.getAntiDiagonalIndex(t,e)})),c=Object(x.jsxs)("div",{children:[Object(x.jsxs)("h3",{children:[" Product:",n[0]]}),Object(x.jsx)(j,{data:t,mark:r,markSpecial:n[1]},this.activeItem)]}),l=this.getcallStackForAntiDiagonal();return[c,Object(x.jsxs)(f.a,{textAlign:"left",children:[Object(x.jsx)(f.a,{children:"Alternative would be transposing the matrix"}),"Initiating calculation from ",Object(x.jsx)("a",{href:"https://github.com/Renani/MatrixDiagonals/blob/master/src/App.js",children:"App.js"})," with diagional index finder method.",Object(x.jsx)("pre",{children:l[0]}),"antidiagonal index finder method defined in ",Object(x.jsx)("a",{href:"https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js",children:" MatrixFun.js"}),";",Object(x.jsx)("pre",{children:l[1]}),"This calculation method calls indexfinder and finds it's adjacent values defined in",Object(x.jsx)("a",{href:"https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js",children:" MatrixFun.js"}),". This method is used for all type of iterations:",Object(x.jsx)("pre",{children:l[2]}),"Seperated the actual Multiplication in a seperate method. I can imagine a situation where there will be need to change this operation. Defined in",Object(x.jsx)("a",{href:"https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js",children:" MatrixFun.js"}),".",Object(x.jsx)("pre",{children:l[3]})]})]}},{key:"getcallStackForAntiDiagonal",value:function(){var n=this.getCommonMethods();return["\n    /**\n     * Method to initiate calculation of antidiagonal\n     * @param {int} columnlength \n     * @param {MatrixFun} mfun \n     * @returns [int max, [...indexes]]\n     */\n    calculateAntidiagonal(columnlength, mfun) {\n        let antiDiagonal = mfun.CalculateProductForRange(columnlength, \n            (colInd, colLength) => mfun.getAntiDiagonalIndex(colInd, colLength), 4)\n        return antiDiagonal;\n    }\n        ",'\n    /**\n    * Calculates the position of an antidiagonal\n    * value for a column index.\n    * @param {int} index \n    * @param {int} squareLength \n    * @returns \n    */\n    getAntiDiagonalIndex(index, squareLength) {\n       if (index === undefined || squareLength === undefined) { \n           console.error("Missing parameters:index, squarelength ", [index, squareLength])\n        }\n       return ((squareLength - index - 1) + squareLength * index);\n    }\n    '].concat(Object(o.a)(n))}},{key:"getcallStackForDiagonal",value:function(){var n=this.getCommonMethods();return["\n    /**\n    *  Method to initate the calculation\n    * Althought these methods are short enough to be inlined \n    * it is a central part of the logic so it makes \n    * sense to seperate them and it could be advantageous for test.\n    * @param {*} columnlength \n    * @param {*} mfun \n    * @returns [int max, [...indexes]]\n    */\n    calculateDiagonal(columnlength, mfun) {\n            let diagonalMax = mfun.CalculateProductForRange(columnlength, \n            (colInd, colLength) => mfun.getDiagonalIndex(colInd, colLength), 4);\n        return diagonalMax;\n    }",'\n    /** \n     * Calculates the position of a diagional value \n     * for a column\n     * @param {int} currentIndex \n     * @param {int} squareLength \n     * @returns  returns index + (squareLength*index )\n     */\n    getDiagonalIndex(index, squareLength) {\n        if (index === undefined || squareLength === undefined) { \n            console.error("Missing parameters:index, squarelength ", [index, squareLength]) \n        }\n        return (index + squareLength * index);\n    }\n    '].concat(Object(o.a)(n))}},{key:"getCommonMethods",value:function(){return['\n    /**\n     * This method does the actual calcuation of product between "range" values.\n     * The function passed as a parameter provides the index of values to be used,\n     * and is called 0...squarelength-1 times, with the counter as parameter. if the \n     * counter is increased beyond squarelength this method return the padding value,\n     * i.e. increasing the dimension of the matrix. The padding value is hard-coded to\n     * 1. \n     * @param {int} squareLength \n     * @param {func(currentIndex, squareLength) return index of value} getIndex \n     * @param {int} range \n     * @returns [int max, [...indexes]]\n     */\n    CalculateProductForRange(squareLength, getIndex, range) {\n        let maxDiagonal = 0;\n        let winners = [];\n\n        //Stream of indexes vs for-loop?\n        [...new Array(squareLength)].forEach((_, ind) => {\n\n            let candidates = [];\n            let localMax = [...new Array(range)].map((el, counter) => {\n                let adjacentIndex = ind + counter;\n\n                //Padding the matrix with 1 (0 is another \n                //alternative if you want to discard the last (range-1) values)\n                if (adjacentIndex >= squareLength) { return this.paddingValue }\n\n                let cInd = getIndex(adjacentIndex, squareLength);\n                candidates.push(cInd);\n                return this.matrix[cInd];\n            }\n            )\n                .reduce((acc, el) => acc * el);\n\n            if (localMax > maxDiagonal) {\n                maxDiagonal = localMax;\n                winners = candidates;\n            }\n        });\n\n        return [maxDiagonal, winners];\n        }\n       ',"\n       /**\n       * Multiplication of array of numbers.\n       * @param {Number} numbers \n       * @returns \n       */\n       calculateProduct(numbers) {\n        return numbers.reduce((acc, element) => acc * element);\n        }"]}},{key:"getDiagonalContent",value:function(n,e,t,a,i){var r=Object(o.a)(new Array(20)).map((function(n,t){return a.getDiagonalIndex(t,e)})),c=Object(x.jsxs)("div",{children:[Object(x.jsxs)("h3",{children:[" Product:",n[0]]})," ",Object(x.jsx)(j,{data:t,mark:r,markSpecial:n[1]},this.activeItem)]}),l=this.getcallStackForDiagonal();return[c,Object(x.jsxs)(f.a,{textAlign:"left",children:[Object(x.jsx)(f.a,{children:"In Matlab it would have simply been creating identity matrix with equal dimensions and multiply"}),"Initiating calculation from ",Object(x.jsx)("a",{href:"https://github.com/Renani/MatrixDiagonals/blob/master/src/App.js",children:"App.js"})," with diagional index finder method.",Object(x.jsx)("pre",{children:l[0]}),"The Diagonal index finder method defined in ",Object(x.jsx)("a",{href:"https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js",children:" MatrixFun.js"}),";",Object(x.jsx)("pre",{children:l[1]}),"This calculation method calls indexfinder and finds it's adjacent values defined in",Object(x.jsx)("a",{href:"https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js",children:" MatrixFun.js"}),". This method is used for type of iteration:",Object(x.jsx)("pre",{children:l[2]}),"Seperated the actual Multiplication in a seperate method. I can imagine a situation where there will be need to change this operation. Defined in",Object(x.jsx)("a",{href:"https://github.com/Renani/MatrixDiagonals/blob/master/src/main/MatrixFun.js",children:" MatrixFun.js"}),".",Object(x.jsx)("pre",{children:l[3]})]})]}},{key:"getRowContent",value:function(n,e){return n.map((function(n,t){return Object(x.jsxs)("div",{children:[Object(x.jsxs)("h3",{children:["Row number ",t,". Product:",n[0]]}),Object(x.jsx)(j,{data:e,markSpecial:n[1]},t)]})}))}}]),t}(a.Component),p=t(124),v=t(128),O=t(127),w=t(130),D=t(126),C=function(n){Object(u.a)(t,n);var e=Object(d.a)(t);function t(n){var a;Object(l.a)(this,t),(a=e.call(this,n)).handleItemClick=function(n,e){var t=e.name;a.setState({activeItem:t})};var i="08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08\n49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00\n81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65\n52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91\n22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80\n24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50\n32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70\n67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21\n24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72\n21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95\n78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92\n16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57\n86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58\n19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40\n04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66\n88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69\n04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36\n20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16\n20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54\n01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48".replace('"',"").split("\n"),r=[];i.forEach((function(n,e){r[e]=n.split(" ").map((function(n){return Number.parseInt(n)}))}));var c=r[0].length,s=r.flat(),u=new h(s),d=a.calculateDiagonal(c,u),g=b.getDiagonalContent(d,c,r,u,a.calculateDiagonal),m=g[0],j=g[1],f=a.calculateAntidiagonal(c,u),w=(g=b.getAntiDiagonalContent(f,c,r,u,a.calculateAntidiagonal))[0],D=g[1],C=a.calculateRows(c,u),k=b.getRowContent(C,r),I=a.calculateColumnwise(c,u),y=b.getRowContent(I,r),M=[].concat(Object(o.a)(C.map((function(n){return n[0]}))),Object(o.a)(I.map((function(n){return n[0]}))),[d[0],f[0]]).reduce((function(n,e){return n<e?e:n})),A=Object(x.jsxs)(p.a,{textAlign:"center",children:[" ",Object(x.jsxs)(v.a,{children:[Object(x.jsx)(O.a,{src:"https://www.flaticon.com/svg/vstatic/svg/261/261992.svg?token=exp=1616746093~hmac=1da234452297d55dfca6fe21e1ccca32",wrapped:!0,ui:!1}),Object(x.jsxs)(v.a.Content,{children:[Object(x.jsx)(v.a.Header,{children:"Max of four"}),Object(x.jsx)(v.a.Meta,{children:Object(x.jsx)("span",{className:"date",children:"diagonally, antiDiagonally, row-wise and columnwise..."})}),Object(x.jsx)(v.a.Description,{children:M})]}),Object(x.jsx)(v.a.Content,{extra:!0})]})]});return a.state={data:r,columnlength:c,activeItem:{},diagonalContent:m,diagonalExplanation:j,antiDiagonalContent:w,antiDiagonalExplanation:D,rowContent:k,colContent:y,columnResult:I,summaryContent:A},a}return Object(s.a)(t,[{key:"calculateDiagonal",value:function(n,e){return e.CalculateProductForRange(n,(function(n,t){return e.getDiagonalIndex(n,t)}),4)}},{key:"calculateAntidiagonal",value:function(n,e){return e.CalculateProductForRange(n,(function(n,t){return e.getAntiDiagonalIndex(n,t)}),4)}},{key:"calculateRows",value:function(n,e){var t=e.getRowIndexes(n,n),a=[];return Object(o.a)(new Array(n)).forEach((function(i,r){return a.push(e.CalculateProductForRange(n,(function(n,e){return t[n]+r}),4))})),a}},{key:"calculateColumnwise",value:function(n,e){var t=[];return Object(o.a)(new Array(n)).forEach((function(a,i){return t.push(e.CalculateProductForRange(n,(function(n,e){return n+e*i}),4))})),t}},{key:"componentDidMount",value:function(){console.debug("this.menus",this.menues),this.menues.scrollIntoView()}},{key:"componentDidUpdate",value:function(){this.menues.scrollIntoView({behavior:"smooth",block:"start"})}},{key:"render",value:function(){var n=this,e=this.state.activeItem,t="",a="";switch(e){case"Diagonal":t=this.state.diagonalContent,a=this.state.diagonalExplanation;break;case"AntiDiagonal":t=this.state.antiDiagonalContent,a=this.state.antiDiagonalExplanation;break;case"Rows":t=this.state.rowContent;break;case"Columnwise":t=this.state.colContent;break;case"Summary":t=this.state.summaryContent;break;default:t=""}return Object(x.jsxs)("div",{className:"App",children:[Object(x.jsx)("div",{className:"App-header",children:Object(x.jsx)("h2",{children:"M A T R I X"})}),Object(x.jsxs)("div",{className:"App-body",children:[Object(x.jsxs)(w.a,{columns:2,divided:!0,children:[Object(x.jsx)(w.a.Column,{children:t}),Object(x.jsx)(w.a.Column,{children:a})]}),Object(x.jsx)("div",{ref:function(e){return n.menues=e},children:Object(x.jsxs)(D.a,{attached:"bottom",tabular:!0,children:[Object(x.jsx)(D.a.Item,{name:"Diagonal",active:"Diagonal"===e,onClick:this.handleItemClick,children:"Diagonal"}),Object(x.jsx)(D.a.Item,{name:"AntiDiagonal",active:"AntiDiagonal"===e,onClick:this.handleItemClick,children:"AntiDiagonal"}),Object(x.jsx)(D.a.Item,{name:"Columnwise",active:"Columnwise"===e,onClick:this.handleItemClick,children:"Columnwise"}),Object(x.jsx)(D.a.Item,{name:"Rows",active:"Rows"===e,onClick:this.handleItemClick,children:"Rows"}),Object(x.jsx)(D.a.Item,{name:"Summary",active:"Summary"===e,onClick:this.handleItemClick,children:"Summary"})]})})]})]})}}]),t}(i.a.Component),k=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,131)).then((function(e){var t=e.getCLS,a=e.getFID,i=e.getFCP,r=e.getLCP,c=e.getTTFB;t(n),a(n),i(n),r(n),c(n)}))};c.a.render(Object(x.jsx)(i.a.StrictMode,{children:Object(x.jsx)(C,{})}),document.getElementById("root")),k(console.log)},97:function(n,e,t){},98:function(n,e,t){}},[[108,1,2]]]);
//# sourceMappingURL=main.c02d5add.chunk.js.map