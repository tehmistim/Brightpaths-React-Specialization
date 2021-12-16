var test = require('unit.js');
var esprima = require('esprima')
const fs = require('fs');

const source = fs.readFileSync('js/shoppinggame.js', 'utf8');

let initFuncNode;
let shopFuncNode;

esprima.parseModule(source, {}, function (node) {

    if (node.type == 'FunctionDeclaration' &&
        node.id.name == 'init') {
        initFuncNode = node;
    }

    if (node.type == 'VariableDeclarator' &&
        node.id.name == 'shop' &&
        node.init.type == 'ArrowFunctionExpression') {
        shopFuncNode = node;
    }
});

describe('Shopping Master game - Implement the shopping functionality', function () {
    describe("Assign player name", () => {
        it('Should assign the user entered name to the `name` property of the `player` object in `init()` function. @assign-player-name', function () {

            const anonymFunc = initFuncNode.body.body[0].consequent.body[8].expression.arguments[1];

            const playerNameSet = (anonymFunc.body.body.length == 3 &&
                        anonymFunc.body.body[0].type == 'ExpressionStatement' &&
                        anonymFunc.body.body[0].expression.type == 'AssignmentExpression' &&
                        anonymFunc.body.body[0].expression.operator == '=' &&
                        anonymFunc.body.body[0].expression.left.object.name == 'player' &&
                        anonymFunc.body.body[0].expression.left.property.name == 'name' &&
                        anonymFunc.body.body[0].expression.right.name == 'name') ? true : false;


            test.assert(playerNameSet, "Have you set the `name` property of the `player` object to the user entered name where the question 'What's your name'? is asked from the user in the `init()` function?");

        });
    });

    describe("Set the product", () => {
        it('Should set the `product` variable to the located product by calling `getProduct()` function if `lastProd` parameter value is `undefined` (use `Object.is()` method to check) if not set it to `lastProd` in the `shop()` function. @set-product', function () {

            const hasConditionalExpression = shopFuncNode.init.body.body[2].declarations[0].init.type == 'ConditionalExpression' ? true : false;

            test.assert(hasConditionalExpression, "Have you used conditional (ternary) operator for the expression?")

            const objectIsUsed = ((shopFuncNode.init.body.body[2].declarations[0].init.test &&
                shopFuncNode.init.body.body[2].declarations[0].init.test.type == 'CallExpression' &&
                shopFuncNode.init.body.body[2].declarations[0].init.test.callee &&
                shopFuncNode.init.body.body[2].declarations[0].init.test.callee.object.name == 'Object' &&
                shopFuncNode.init.body.body[2].declarations[0].init.test.callee.property.name == 'is' &&
                shopFuncNode.init.body.body[2].declarations[0].init.test.arguments &&
                shopFuncNode.init.body.body[2].declarations[0].init.test.arguments[0].name == 'lastProd' &&
                shopFuncNode.init.body.body[2].declarations[0].init.test.arguments[1].name == 'undefined') 
                ||
                (shopFuncNode.init.body.body[2].declarations[0].init.test.argument &&
                    shopFuncNode.init.body.body[2].declarations[0].init.test.argument.type == 'CallExpression' &&
                    shopFuncNode.init.body.body[2].declarations[0].init.test.argument.callee &&
                    shopFuncNode.init.body.body[2].declarations[0].init.test.argument.callee.object.name == 'Object' &&
                    shopFuncNode.init.body.body[2].declarations[0].init.test.argument.callee.property.name == 'is' &&
                    shopFuncNode.init.body.body[2].declarations[0].init.test.argument.arguments[0].name == 'lastProd' &&
                    shopFuncNode.init.body.body[2].declarations[0].init.test.argument.arguments[1].name == 'undefined')) ? true : false;

            test.assert(objectIsUsed, "Have you used `Object.is()` method to check the condition (if `lastProd` is `undefined`)?");


            const isConsequentCorrect = ((shopFuncNode.init.body.body[2].declarations[0].init.consequent &&
                shopFuncNode.init.body.body[2].declarations[0].init.consequent.type == 'CallExpression' &&
                shopFuncNode.init.body.body[2].declarations[0].init.consequent.callee &&
                shopFuncNode.init.body.body[2].declarations[0].init.consequent.callee.name == 'getProduct' &&
                shopFuncNode.init.body.body[2].declarations[0].init.consequent.arguments &&
                shopFuncNode.init.body.body[2].declarations[0].init.consequent.arguments[0].name == 'prodList' &&
                shopFuncNode.init.body.body[2].declarations[0].init.consequent.arguments[1].name == 'prId') 
                ||
                (shopFuncNode.init.body.body[2].declarations[0].init.consequent &&
                    shopFuncNode.init.body.body[2].declarations[0].init.consequent.type == 'Identifier' &&
                    shopFuncNode.init.body.body[2].declarations[0].init.consequent.name == 'lastProd')) ? true : false;

            test.assert(isConsequentCorrect, "Have you called `getProduct()` function with parameters `prodList` followed by `prId` if the condition is truthy?");

            const isAlternateCorrect = ((shopFuncNode.init.body.body[2].declarations[0].init.alternate &&
                shopFuncNode.init.body.body[2].declarations[0].init.alternate.type == 'Identifier' &&
                shopFuncNode.init.body.body[2].declarations[0].init.alternate.name == 'lastProd')
                ||
                (shopFuncNode.init.body.body[2].declarations[0].init.alternate &&
                    shopFuncNode.init.body.body[2].declarations[0].init.alternate.type == 'CallExpression' &&
                    shopFuncNode.init.body.body[2].declarations[0].init.alternate.callee &&
                    shopFuncNode.init.body.body[2].declarations[0].init.alternate.callee.name == 'getProduct' &&
                    shopFuncNode.init.body.body[2].declarations[0].init.alternate.arguments &&
                    shopFuncNode.init.body.body[2].declarations[0].init.alternate.arguments[0].name == 'prodList' &&
                    shopFuncNode.init.body.body[2].declarations[0].init.alternate.arguments[1].name == 'prId')) ? true : false;


            test.assert(isAlternateCorrect, "Have you put `lastProd` as the expression to execute if the condition is falsy?");

        });
    });

    describe("Populate product details", () => {
        it('Should populate `productDetails` with the details of the purchased product by calling its `getDetails()` method in the `shop()` function. @populate-productDetails', function () {

            const prodDetailsPopulated = (shopFuncNode.init.body.body[3].declarations &&
                shopFuncNode.init.body.body[3].declarations[0].type == 'VariableDeclarator' &&
                shopFuncNode.init.body.body[3].declarations[0].id.name == 'productDetails' &&
                shopFuncNode.init.body.body[3].declarations[0].init &&
                shopFuncNode.init.body.body[3].declarations[0].init.type == 'CallExpression' &&
                shopFuncNode.init.body.body[3].declarations[0].init.callee.object.name == 'product' &&
                shopFuncNode.init.body.body[3].declarations[0].init.callee.property.name == 'getDetails') ? true : false;

            test.assert(prodDetailsPopulated, "Have you populated `productDetails` by calling the `getDetails()` method of the passed in product?");
        });
    });

    describe("Validate player preference", () => {
        it('Should validate the player entered preference (Y/N) to buy the product offered using regular expressions in the `shop()` function. @validate-using-regex', function () {

            const regexYesTestCorrect = (shopFuncNode.init.body.body[4].expression.arguments[1].body.body[0].declarations &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[0].declarations[0].id.name == 'regexYes' &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[0].declarations[0].init &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[0].declarations[0].init.type == 'NewExpression' &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[0].declarations[0].init.callee &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[0].declarations[0].init.callee.name == 'RegExp' &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[0].declarations[0].init.arguments.length == 2 &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[0].declarations[0].init.arguments[0].value == 'y' &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[0].declarations[0].init.arguments[1].value == 'i') ? true : false;


            test.assert(regexYesTestCorrect, "Have you set `regexYes` to `new RegExp('y', 'i')`?");

            const regexNoTestCorrect = (shopFuncNode.init.body.body[4].expression.arguments[1].body.body[1].declarations &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[1].declarations[0].id.name == 'regexNo' &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[1].declarations[0].init &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[1].declarations[0].init.type == 'NewExpression' &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[1].declarations[0].init.callee &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[1].declarations[0].init.callee.name == 'RegExp' &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[1].declarations[0].init.arguments.length == 2 &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[1].declarations[0].init.arguments[0].value == 'n' &&
                shopFuncNode.init.body.body[4].expression.arguments[1].body.body[1].declarations[0].init.arguments[1].value == 'i') ? true : false;


            test.assert(regexNoTestCorrect, "Have you set `regexNo` to `new RegExp('n', 'i')`?");

        });
    });

    describe("Define and set new property `status` in the `player` object", () => {
        it('Should define and set new property `status` in the `player` object using `Object.defineProperty()` method in the `shop()` function. @define-property-status', function () {

            const statusPropertySet = (shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body.length == 2 &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].type == 'ExpressionStatement' &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.type == 'CallExpression' &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.callee.object.name == 'Object' &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.callee.property.name == 'defineProperty' &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.arguments.length == 3 &&  
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.arguments[0].type == 'Identifier' &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.arguments[0].name == 'player' &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.arguments[1].type == 'Literal' &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.arguments[1].value == 'status' &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.arguments[2].type == 'ObjectExpression' &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.arguments[2].properties.length == 1 &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.arguments[2].properties[0].key.name == 'value' &&
                            shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].consequent.body[0].expression.arguments[2].properties[0].value.value == 'Shopping Master') ? true : false;


            test.assert(statusPropertySet, "Have you defined and set the `status` property in the `player` object with a `String` value of 'Shopping Master'?");
        });
    });     

    describe("Set the value of `items` property of the `player` object", () => {
        it('Should set the value of `items` property of the `player` object with the value of `iCount` variable in the `shop()` function. @set-property-items', function () {
        
            const itemsPropertySet = (shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body.length == 3 &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].type == 'ExpressionStatement' &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.type == 'CallExpression' &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.callee &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.callee.object.name == 'Object' &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.callee.property.name == 'defineProperty' &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.arguments.length == 3 &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.arguments[0].type == 'Identifier' &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.arguments[0].name == 'player' &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.arguments[1].type == 'Literal' &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.arguments[1].value == 'items' &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.arguments[2].type == 'ObjectExpression' &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.arguments[2].properties.length == 1 &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.arguments[2].properties[0].key.name == 'value' &&
                                     shopFuncNode.init.body.body[4].expression.arguments[1].body.body[2].consequent.body[3].alternate.body[1].expression.arguments[2].properties[0].value.name == 'iCount') ? true : false;


            test.assert(itemsPropertySet, "Have you set the `items` property of the `player` object to the value of `iCount` variable?");
        });
    }); 
});