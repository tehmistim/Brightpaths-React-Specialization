var test = require('unit.js');
const shoppinggame = require('../js/shoppinggame');
var esprima = require('esprima')
const fs = require('fs');

const source = fs.readFileSync('js/shoppinggame.js', 'utf8');

let rateAndExitFunNode;
let exitLostNode;
let exitWonNode;

esprima.parseModule(source, {}, function (node) {
    if (node.type == 'VariableDeclarator' &&
        node.id.name == 'rateAndExit' &&
        node.init.type == 'ArrowFunctionExpression') {
        rateAndExitFunNode = node;
    }

    if (node.type == 'VariableDeclarator' &&
        node.id.name == 'exitLost' &&
        node.init.type == 'ArrowFunctionExpression') {
        exitLostNode = node;
    }

    if (node.type == 'VariableDeclarator' &&
        node.id.name == 'exitWon' &&
        node.init.type == 'ArrowFunctionExpression') {
        exitWonNode = node;
    }

});


describe('Shopping Master game - Implement game exit functionality', function () {
    describe("Create Rating object", () => {
        it('Should create an instance of the Rating class and assign it to a variable named playerRating in rateAndExit() function. @create-rating-object', function () {
        
            const ratingCreated = (rateAndExitFunNode.init.body.body.length == 2 &&
                            rateAndExitFunNode.init.body.body[0] &&
                            rateAndExitFunNode.init.body.body[0].type == 'VariableDeclaration' &&
                            rateAndExitFunNode.init.body.body[0].declarations.length == 1 &&
                            rateAndExitFunNode.init.body.body[0].declarations[0] &&
                            rateAndExitFunNode.init.body.body[0].declarations[0].type == 'VariableDeclarator' &&
                            rateAndExitFunNode.init.body.body[0].declarations[0].id.name == 'playerRating' &&
                            rateAndExitFunNode.init.body.body[0].declarations[0].init &&
                            rateAndExitFunNode.init.body.body[0].declarations[0].init.type == 'NewExpression' &&
                            rateAndExitFunNode.init.body.body[0].declarations[0].init.callee.name == 'Rating' &&
                            rateAndExitFunNode.init.body.body[0].declarations[0].init.arguments.length == 0) ? true : false;
                            

            test.assert(ratingCreated, "Have you created an object of the `Rating` class and assigned it to a variable named `playerRating`?");
        });
    }); 

    describe("Set user entered rating value to playerRating", () => {
        it('Should call `rating` setter method of `playerRating` to set user entered rate value in rateAndExit() function. @set-rating', function () {
            const ratingSet =  (rateAndExitFunNode.init.body.body[1] &&
                    rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[0].type == 'ExpressionStatement' &&
                    rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[0].expression.type == 'AssignmentExpression' &&
                    rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[0].expression.operator == '=' &&
                    rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[0].expression.left.object &&
                    rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[0].expression.left.object.name == 'playerRating' &&
                    rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[0].expression.left.property &&
                    rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[0].expression.left.property.name == 'rating' &&
                    rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[0].expression.right.name == 'r') ? true : false;


            test.assert(ratingSet, "Have you set the user entered rate value `r` to `playerRating` by calling the setter `rating` of the `Rating` class?");
        });
    });

    describe("Create a new object named target", () => {
        it('Should create a new object named `target` that has properties of both `player` & `Rating` objects using Object.assign() in rateAndExit() function. @set-target', function () {
        
            const targetSet = (rateAndExitFunNode.init.body.body[1] &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].type == 'VariableDeclaration' &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].type == 'VariableDeclarator' &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].id.name == 'target' &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].init &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].init.type == `CallExpression` &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].init.callee.object.name == `Object` &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].init.callee.property.name == 'assign' &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].init.arguments.length == 3 &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].init.arguments[0].type == 'ObjectExpression' &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].init.arguments[1].type == 'Identifier' &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].init.arguments[1].name == 'player' &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].init.arguments[2].type == 'Identifier' &&
                rateAndExitFunNode.init.body.body[1].expression.arguments[1].body.body[0].alternate.body[1].declarations[0].init.arguments[2].name == 'playerRating') ? true : false;


                test.assert(targetSet, "Have you created a new object named `target` by calling `Object.assign()` method, passing `{}`, `player` & `playerRating` as the three parameters?");
        });
    });

    describe("Set pointsToReach", () => {
        it('Should set `pointsToReach` variable with the value of <500 - player.getCurrentScore()> in exitLost() function. @set-pointsToReach', function () {
            const pointsToReachSet = (exitLostNode.init.body.body.length == 3 &&
                exitLostNode.init.body.body[0].type == 'VariableDeclaration' &&
                exitLostNode.init.body.body[0].declarations.length == 1 &&
                exitLostNode.init.body.body[0].declarations[0].type == 'VariableDeclarator' &&
                exitLostNode.init.body.body[0].declarations[0].id.name == 'pointsToReach' &&
                exitLostNode.init.body.body[0].declarations[0].init &&
                exitLostNode.init.body.body[0].declarations[0].init.type == 'BinaryExpression' &&
                exitLostNode.init.body.body[0].declarations[0].init.operator == '-' &&
                exitLostNode.init.body.body[0].declarations[0].init.left.type == 'Literal' &&
                exitLostNode.init.body.body[0].declarations[0].init.left.value == 500 &&
                exitLostNode.init.body.body[0].declarations[0].init.right.type == 'CallExpression' &&
                exitLostNode.init.body.body[0].declarations[0].init.right.callee.object.name == `player` &&
                exitLostNode.init.body.body[0].declarations[0].init.right.callee.property.name == 'getCurrentScore') ? true : false;
                

            test.assert(pointsToReachSet, "Have you set `pointsToReach` with a value of `(500 - player.getCurrentScore())`?");
        });
    });

    describe("Set finalStatus", () => {
        it('Should set `finalStatus` variable with the value of `player.status` in exitWon() function. @set-finalStatus', function () {
       
            const finalStatusSet = (exitWonNode.init.body.body.length == 3 &&
                exitWonNode.init.body.body[0].type == 'VariableDeclaration' &&
                exitWonNode.init.body.body[0].declarations &&
                exitWonNode.init.body.body[0].declarations[0].type == 'VariableDeclarator' &&
                exitWonNode.init.body.body[0].declarations[0].id.name == 'finalStatus' &&
                exitWonNode.init.body.body[0].declarations[0].init &&
                exitWonNode.init.body.body[0].declarations[0].init.object &&
                exitWonNode.init.body.body[0].declarations[0].init.object.name == 'player' &&
                exitWonNode.init.body.body[0].declarations[0].init.property &&
                exitWonNode.init.body.body[0].declarations[0].init.property.name == 'status') ? true : false;

            test.assert(finalStatusSet, "Have you set `finalStatus` with the value of `player.status`?");

        });
    });
});