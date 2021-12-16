var test = require('unit.js');
const shoppinggame = require('../js/shoppinggame');
var esprima = require('esprima')
const fs = require('fs');

const source = fs.readFileSync('js/shoppinggame.js', 'utf8');

let calculateBillNode;
let findPointsForExpDateNode;
let calculatePointsNode;

esprima.parseModule(source, {}, function (node) {
    if (node.type == 'VariableDeclarator' &&
        node.id.name == 'calculateBill' &&
        node.init.type == 'ArrowFunctionExpression') {
            calculateBillNode = node;
    }

    if (node.type == 'VariableDeclarator' &&
        node.id.name == 'findPointsForExpDate' &&
        node.init.type == 'ArrowFunctionExpression') {
            findPointsForExpDateNode = node;
    }

    if (node.type == 'VariableDeclarator' &&
        node.id.name == 'calculatePoints' &&
        node.init.type == 'ArrowFunctionExpression') {
            calculatePointsNode = node;
    }
});

const today = new Date();
const oneYearLater = new Date();
oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

const daysLater = new Date();
daysLater.setDate(daysLater.getDate() + 3);

describe('Shopping Master game - Implement points calculation logic', function () {
    describe("Calculate the total bill", () => {
        it('Should calculate and return the total bill after adding the price of the bought product in `calculateBill()` function. @calculate-total-bill', function () {
            
            //console.log(calculateBillNode.init.body.body.length);

            test.assert(calculateBillNode.init.body.body.length > 0, "Have you implemented `calculateBill()` function?");

            const isReturn = (calculateBillNode.init.body &&
                            calculateBillNode.init.body.body &&
                            calculateBillNode.init.body.body.length > 0 &&
                            calculateBillNode.init.body.body[0] &&
                            calculateBillNode.init.body.body[0].type == 'ReturnStatement') ? true : false;

            const isBinaryExp = (calculateBillNode.init.body.body[0].argument &&
                                calculateBillNode.init.body.body[0].argument.type == 'BinaryExpression') ? true : false;

            const isAddition = (calculateBillNode.init.body.body[0].argument &&
                calculateBillNode.init.body.body[0].argument.operator == '+') ? true : false;

            const leftOperand = ((calculateBillNode.init.body.body[0].argument &&
                calculateBillNode.init.body.body[0].argument.left &&
                calculateBillNode.init.body.body[0].argument.left.name == 'tBill')
                ||
                (calculateBillNode.init.body.body[0].argument &&
                    calculateBillNode.init.body.body[0].argument.left &&
                    calculateBillNode.init.body.body[0].argument.left.object &&
                    calculateBillNode.init.body.body[0].argument.left.object.name == 'prod' &&
                    calculateBillNode.init.body.body[0].argument.left.property &&
                    calculateBillNode.init.body.body[0].argument.left.property.name == 'price')) ? true : false;
               

            const rightOperand =  ((calculateBillNode.init.body.body[0].argument &&
                calculateBillNode.init.body.body[0].argument.right &&
                calculateBillNode.init.body.body[0].argument.right.object &&
                calculateBillNode.init.body.body[0].argument.right.object.name == 'prod' &&
                calculateBillNode.init.body.body[0].argument.right.property &&
                calculateBillNode.init.body.body[0].argument.right.property.name == 'price')
                ||
                (calculateBillNode.init.body.body[0].argument &&
                    calculateBillNode.init.body.body[0].argument.right &&
                    calculateBillNode.init.body.body[0].argument.right.name == 'tBill')) ? true : false;
                            

                //console.log(`isReturn ${isReturn} isBinaryExp ${isBinaryExp} isAddition ${isAddition} leftOperand ${leftOperand} rightOperand ${rightOperand}`);
            test.assert(isReturn && isBinaryExp && isAddition && leftOperand && rightOperand, "Have you calculated and returned the total bill by adding `tBill` to `prod.price`?");
            
        });
    });

    describe("Find points for expiry date of the product ", () => {
        it('Should find and return the points awarded for the number of days to expire, of a product in `findPointsForExpDate()` function. @find-points-for-expDate', function () {

            test.assert(findPointsForExpDateNode.init.body.body.length > 0, "Have you implemented `findPointsForExpDate()` function?");
            
            const pr1 = new shoppinggame.Product(1, 'test1', 100, oneYearLater);

            const pr2 = new shoppinggame.Product(1, 'test1', 100, daysLater);
            
            const result1 = shoppinggame.findPointsForExpDate(pr1);
            const result2 = shoppinggame.findPointsForExpDate(pr2);

            //console.log(`Days to expire pr1 : ` + pr1.daysToExpire);
            //console.log(`Days to expire pr2 : ` + pr2.daysToExpire);

            //console.log(result1);
            //console.log(result2);

            test.assert(result2 == 10, "Have you checked and returned 10 if the product has less than 30 days to expire?");
            test.assert(result1 == 0, "Have you checked and returned 0 if the product has more than 30 days to expire (else block)?");

            // const isBodyIfStmt = findPointsForExpDateNode.init.body.body[0].type == 'IfStatement' ? true : false;
            
            // const testCorrect = (findPointsForExpDateNode.init.body.body[0].test.type == 'BinaryExpression' &&
            //                 findPointsForExpDateNode.init.body.body[0].test.operator == '<' &&
            //                 findPointsForExpDateNode.init.body.body[0].test.left &&
            //                 findPointsForExpDateNode.init.body.body[0].test.left.object.name == 'prod' &&
            //                 findPointsForExpDateNode.init.body.body[0].test.left.property.name == 'daysToExpire' &&
            //                 findPointsForExpDateNode.init.body.body[0].test.right &&
            //                 findPointsForExpDateNode.init.body.body[0].test.right.type == 'Literal' &&
            //                 findPointsForExpDateNode.init.body.body[0].test.right.value == 30 &&
            //                 Number.isInteger(findPointsForExpDateNode.init.body.body[0].test.right.value)) ? true : false;

            // test.assert(testCorrect == true, "Have you checked if `prod.daysToExpire` is less than the integer value 30 in your `if` statement?");

            // const consequentCorrect = ((findPointsForExpDateNode.init.body.body[0].consequent &&
            //             findPointsForExpDateNode.init.body.body[0].consequent.type == 'BlockStatement' &&
            //             findPointsForExpDateNode.init.body.body[0].consequent.body.length > 0 &&
            //             findPointsForExpDateNode.init.body.body[0].consequent.body[0].type == 'ReturnStatement'  &&
            //             findPointsForExpDateNode.init.body.body[0].consequent.body[0].argument &&
            //             findPointsForExpDateNode.init.body.body[0].consequent.body[0].argument.type == 'Literal' &&
            //             findPointsForExpDateNode.init.body.body[0].consequent.body[0].argument.value == 10 &&
            //             Number.isInteger(findPointsForExpDateNode.init.body.body[0].consequent.body[0].argument.value))
            //             ||
            //             (findPointsForExpDateNode.init.body.body[0].consequent &&
            //                 findPointsForExpDateNode.init.body.body[0].consequent.type == 'ReturnStatement' &&
            //                 findPointsForExpDateNode.init.body.body[0].consequent.argument &&
            //                 findPointsForExpDateNode.init.body.body[0].consequent.argument.type == 'Literal' &&
            //                 findPointsForExpDateNode.init.body.body[0].consequent.argument.value == 10 &&
            //                 Number.isInteger(findPointsForExpDateNode.init.body.body[0].consequent.argument.value))) ? true : false;

            // test.assert(consequentCorrect == true, "Have you returned the integer value 10, if the condition satisfies?");

            // const alternateCorrect = ((findPointsForExpDateNode.init.body.body[0].alternate &&
            //             findPointsForExpDateNode.init.body.body[0].alternate.type == 'BlockStatement' &&
            //             findPointsForExpDateNode.init.body.body[0].alternate.body.length > 0 &&
            //             findPointsForExpDateNode.init.body.body[0].alternate.body[0].type == 'ReturnStatement' &&
            //             findPointsForExpDateNode.init.body.body[0].alternate.body[0].argument &&
            //             findPointsForExpDateNode.init.body.body[0].alternate.body[0].argument.type == 'Literal' &&
            //             findPointsForExpDateNode.init.body.body[0].alternate.body[0].argument.value == 0 &&
            //             Number.isInteger(findPointsForExpDateNode.init.body.body[0].alternate.body[0].argument.value)) 
            //             ||
            //             (findPointsForExpDateNode.init.body.body[0].alternate &&
            //                 findPointsForExpDateNode.init.body.body[0].alternate.type == 'ReturnStatement' &&
            //                 findPointsForExpDateNode.init.body.body[0].alternate.argument &&
            //                 findPointsForExpDateNode.init.body.body[0].alternate.argument.type == 'Literal' &&
            //                 findPointsForExpDateNode.init.body.body[0].alternate.argument.value == 0 &&
            //                 Number.isInteger(findPointsForExpDateNode.init.body.body[0].alternate.argument.value)))? true : false;

           
            // test.assert(alternateCorrect == true, "Have you returned the integer value 0 if the condition does not satisfy?");
            
            
           
        });
    }); 

    describe("Set the score of the player ", () => {
        it('Should set the score of the player by setting the `score` property of the `player` object in `calculatePoints()` function. @set-player-score', function () {

            const scoreCalcExp = calculatePointsNode.init.body.body.find(element => element.type == 'ExpressionStatement');
            

            test.assert(scoreCalcExp, "Have you set the `score` property of the `player` object?");

            const expLeftCorrect = scoreCalcExp.expression.type == 'AssignmentExpression' &&
                            scoreCalcExp.expression.operator == '=' &&
                            scoreCalcExp.expression.left &&
                            scoreCalcExp.expression.left.object.name == 'player' &&
                            scoreCalcExp.expression.left.property.name == 'score';


            const expRightCorrect = scoreCalcExp.expression.right &&
                                scoreCalcExp.expression.right.type == 'BinaryExpression' &&
                                scoreCalcExp.expression.right.operator == '+' &&
                                scoreCalcExp.expression.right.left &&
                                scoreCalcExp.expression.right.left.type == 'BinaryExpression' &&
                                scoreCalcExp.expression.right.left.operator == '+' &&
                                scoreCalcExp.expression.right.left.left &&
                                scoreCalcExp.expression.right.left.left.object.name == 'player' &&
                                scoreCalcExp.expression.right.left.left.property.name == 'score' &&
                                scoreCalcExp.expression.right.left.right &&
                                scoreCalcExp.expression.right.left.right.name == 'pointsToBill' &&
                                scoreCalcExp.expression.right.right &&
                                scoreCalcExp.expression.right.right.name == 'pointsForExpDate'
            

            test.assert((expLeftCorrect == true &&
                expRightCorrect == true), "Have you set the new value of `player.score` by adding up `player.score`, `pointsToBill` & `pointsForExpDate` values?");


            shoppinggame.player.score = 100;
            const mp1 = new shoppinggame.MagicProduct(16, 'Christmas cake', 1000, oneYearLater, 10, true);
            
            shoppinggame.calculatePoints(mp1,100);

            //console.log(shoppinggame.player.score);

            test.assert(shoppinggame.player.score == 115, "Have you added product points to the player's score if the product is a bonus product, when the passed in product instance is a `MagicProduct`?");
            
            shoppinggame.player.score = 100;
            const mp2 = new shoppinggame.MagicProduct(17, 'honey', 200, oneYearLater, 20, false);

            shoppinggame.calculatePoints(mp2,100);

            //console.log(shoppinggame.player.score);

            test.assert(shoppinggame.player.score == 85, "Have you deducted product points from the player's score if the product is not a bonus product, when the passed in product instance is a `MagicProduct`?");
            
            // const ifStatement = calculatePointsNode.init.body.body.find(element => element.type == 'IfStatement');
        
            // test.assert(ifStatement, "Have you added to or subtracted from the player's score if the product is a `MagicProduct`?");
        
            // const magicProductIf = (ifStatement.test &&
            //                 ifStatement.test.type == 'BinaryExpression' &&
            //                 ifStatement.test.operator == 'instanceof' &&
            //                 ifStatement.test.left.name == `prod` &&
            //                 ifStatement.test.right.name == `MagicProduct`) ? true : false;

            // const magicProductIfConsequent = ifStatement.consequent &&
            //                         ifStatement.consequent.type == 'BlockStatement'

        });
    });  
});











