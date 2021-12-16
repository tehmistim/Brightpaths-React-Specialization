var test = require('unit.js');
const shoppinggame = require('../js/shoppinggame');
var esprima = require('esprima')
const fs = require('fs');

const source = fs.readFileSync('js/shoppinggame.js', 'utf8');

let playerDef;
let prodNode;
let defineProperties;
let daysToExpireCall;
let magProdNode;
let productCallInvocation;
let objectCreateCall;
let ratingClassDecl;
let fieldDeclInRatingCls = false;

try {
    esprima.parseModule(source, {}, function (node) {
        if (node.type == 'VariableDeclarator' &&
            node.id.name == 'player' &&
            node.init.type == 'ObjectExpression') {
            playerDef = node;
        }

        if (node.id && node.id.name === "Product" && node.type === "FunctionDeclaration") {
            prodNode = node;
        }

        if (node.type === "ExpressionStatement" &&
            node.expression.type === "CallExpression" &&
            node.expression.callee.object &&
            node.expression.callee.object.name === "Object" &&
            node.expression.callee.property &&
            node.expression.callee.property.name === "defineProperty") {

            defineProperties = node;

        }

        if (node.type === "ReturnStatement" &&
            node.argument &&
            node.argument.callee &&
            node.argument.callee.name === "dateDiff") {
            daysToExpireCall = node;
        }

        if (node.id && node.id.name === "MagicProduct" && node.type === "FunctionDeclaration") {
            magProdNode = node;
        }

        if (node.type === "ExpressionStatement" &&
            node.expression &&
            node.expression.type === "CallExpression" &&
            node.expression.callee &&
            node.expression.callee.object &&
            node.expression.callee.object.name === "Product" &&
            node.expression.callee.property &&
            node.expression.callee.property.name === "call") {
            productCallInvocation = node;
        }

        if (node.type === "AssignmentExpression" &&
            node.right &&
            node.right.type === "CallExpression" &&
            node.right.callee.object &&
            node.right.callee.object.name === "Object" &&
            node.right.callee.property &&
            node.right.callee.property.name === "create") {

            objectCreateCall = node;
        }

        if (node.type === "ClassDeclaration" &&
            node.id.name === "Rating") {

            ratingClassDecl = node;
        }
    });
} catch (e) {
    fieldDeclInRatingCls = true;
}



const today = new Date();
const oneYearLater = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay());


describe('Shopping Master game - Define object-types/classes', function () {

    describe("Define the player object", () => {
        it('Should define the player object. @player-object', function () {

            test.assert(shoppinggame.player, "Have you defined a `player` object?");
            test.assert(shoppinggame.name
                && shoppinggame.name == 'unknown', "Have you defined a constant called `name` & initialised to a value of `unknown`?");
            test.assert(shoppinggame.score == 0, "Have you defined a constant called `score` & initialised to a value of `0`?");
            test.assert(shoppinggame.items == 0, "Have you defined a constant called `items` & initialised to a value of `0`?");
            test.assert(shoppinggame.player &&
                (shoppinggame.player.name == 'unknown' &&
                    shoppinggame.player.score == 0 &&
                    shoppinggame.player.items == 0)
                , "Have you added properties `name`, `score` & `items` to the `player` object?");

        });
    });


    describe("Add three methods to the player object", () => {

        it('Should add three methods to the player object. @player-object-methods', function () {


            const methods = playerDef && playerDef.init.properties.filter(element => element.value.type == 'FunctionExpression');

            //console.log(methods);

            test.assert(shoppinggame.player &&
                shoppinggame.player.getCurrentScore, "Have you added three methods out of which there's a method named `getCurrentScore()` to the `player` object?");
            test.assert(shoppinggame.player.addPoints, "Have you added three methods out of which there's a method named `addPoints()` to the `player` object?");
            test.assert(shoppinggame.player.deductPoints, "Have you added three methods out of which there's a method named `deductPoints()` to the `player` object?");

            let thisUsedIngetCurrentScore = false;
            let thisUsedInaddPoints = false;
            let thisUsedIndeductPoints = false;

            for (let i = 0; i < methods.length; i++) {

                if (methods[i].key.name == 'getCurrentScore' &&
                    methods[i].value.body.body[0].argument &&
                    methods[i].value.body.body[0].argument.object &&
                    methods[i].value.body.body[0].argument.object.type == 'ThisExpression') {
                    thisUsedIngetCurrentScore = true;
                }

                if (methods[i].key.name == 'addPoints' &&
                    methods[i].value.body.body[0].expression) {

                    if (methods[i].value.body.body[0].expression.operator == '=') {
                        thisUsedInaddPoints = (methods[i].value.body.body[0].expression.left.object &&
                            methods[i].value.body.body[0].expression.left.object.type == 'ThisExpression' &&
                            methods[i].value.body.body[0].expression.right.left.object &&
                            methods[i].value.body.body[0].expression.right.left.object.type == 'ThisExpression') ? true : false;
                    } else if (methods[i].value.body.body[0].expression.operator == '+=') {
                        thisUsedInaddPoints = (methods[i].value.body.body[0].expression.left.object &&
                            methods[i].value.body.body[0].expression.left.object.type == 'ThisExpression') ? true : false;
                    }
                }

                if (methods[i].key.name == 'deductPoints' &&
                    methods[i].value.body.body[0].expression) {

                    if (methods[i].value.body.body[0].expression.operator == '=') {
                        thisUsedIndeductPoints = (methods[i].value.body.body[0].expression.left.object &&
                            methods[i].value.body.body[0].expression.left.object.type == 'ThisExpression' &&
                            methods[i].value.body.body[0].expression.right.left.object &&
                            methods[i].value.body.body[0].expression.right.left.object.type == 'ThisExpression') ? true : false;
                    } else if (methods[i].value.body.body[0].expression.operator == '-=') {
                        thisUsedIndeductPoints = (methods[i].value.body.body[0].expression.left.object &&
                            methods[i].value.body.body[0].expression.left.object.type == 'ThisExpression') ? true : false;
                    }

                }

            }

            test.assert(thisUsedIngetCurrentScore &&
                thisUsedInaddPoints &&
                thisUsedIndeductPoints, "Have you used the `this` keyword for the `score` property within all three methods?");


            test.assert(shoppinggame.player.getCurrentScore() == shoppinggame.player.score, "Have you returned the player's score from the method?");
            shoppinggame.player.addPoints(10);
            test.assert(shoppinggame.player.score == 10, "Have you added the points to the current score of the player?");


            shoppinggame.player.deductPoints(10);
            test.assert(shoppinggame.player.score == 0, "Have you subtracted the points from the current score of the player?");



        });
    });

    describe("Define the Product object type", () => {

        it('Should define the Product object type. @Product-object', function () {
            test.assert(shoppinggame.Product, "Have you defined a `Product` object type?");

            test.assert(prodNode, "Have you used the constructor function syntax to define `Product`?");

            test.assert(prodNode.params.length == 4 &&
                prodNode.params.find(element => element.name == 'id') &&
                prodNode.params.find(element => element.name == 'name') &&
                prodNode.params.find(element => element.name == 'price') &&
                prodNode.params.find(element => element.name == 'expiryDate'),
                "Have you passed parameters `id`, `name`, `price` and `expiryDate` and to the constructor function?");
            
            test.assert((prodNode.params.length == 4 &&
                    prodNode.params[0].name == 'id' &&
                    prodNode.params[1].name == 'name' &&
                    prodNode.params[2].name == 'price' &&
                    prodNode.params[3].name == 'expiryDate'),
                    "Have you passed parameters `id`, `name`, `price` and `expiryDate` in this order to the constructor function?");
            

            test.assert(prodNode.body.body.find(element => (element.expression.type == 'AssignmentExpression' &&
                element.expression.left.object &&
                element.expression.left.object.type == 'ThisExpression' &&
                element.expression.right.name == 'id')), "Have you initialized `id` property using a `this.id = id` statement within the constructor function?");

            test.assert(prodNode.body.body.find(element => (element.expression.type == 'AssignmentExpression' &&
                element.expression.left.object &&
                element.expression.left.object.type == 'ThisExpression' &&
                element.expression.right.name == 'name')), "Have you initialized `name` property using a `this.name = name` statement within the constructor function?");

            test.assert(prodNode.body.body.find(element => (element.expression.type == 'AssignmentExpression' &&
                element.expression.left.object &&
                element.expression.left.object.type == 'ThisExpression' &&
                element.expression.right.name == 'price')), "Have you initialized `price` property using a `this.price = price` statement within the constructor function?");

            test.assert(prodNode.body.body.find(element => (element.expression.type == 'AssignmentExpression' &&
                element.expression.left.object &&
                element.expression.left.object.type == 'ThisExpression' &&
                element.expression.right.name == 'expiryDate')), "Have you initialized `expiryDate` property using a `this.expiryDate = expiryDate` statement within the constructor function?");
        });
    });

    describe("Implement the dateDiff() function", () => {

        it('Should implement the dateDiff() function to return the difference between two given dates. @dateDiff-function', function () {
            test.assert(shoppinggame.dateDiff, "Have you defined a function named `dateDiff()`?");

            const ans = shoppinggame.dateDiff(oneYearLater, today);

            test.assert(ans, "Have you completed the `dateDiff()` function to return the difference between two given dates in number of days?");
        });

    });

    describe("Add property daysToExpire to Product object type", () => {

        it('Should use Object.defineProperty() to define property daysToExpire. @Object-defineProperty', function () {

            test.assert(defineProperties, "Have you used `Object.defineProperty()` syntax to define a new property named `daysToExpire`?");

        });
    });

    describe("Call dateDiff() function inside the getter of daysToExpire property of Product", () => {

        it('Should call and return the dateDiff function in the getter of daysToExpire. @dateDiff-in-get', function () {

            test.assert(shoppinggame.Product, "Have you defined a `Product` object type?");

            const pr = new shoppinggame.Product(1, 'test', 100, oneYearLater);

            const thisUsed = (daysToExpireCall && daysToExpireCall.argument.arguments[0].object &&
                daysToExpireCall.argument.arguments[0].object.type === "ThisExpression") ? true : false;
            const newUsed = (daysToExpireCall && daysToExpireCall.argument.arguments[1].type === "NewExpression") ? true : false;


            test.assert(thisUsed && newUsed && pr.daysToExpire >= 0
                , "Have you called the `dateDiff()` function inside the getter with an: arg1: `this.expiryDate` & arg2: `new Date()`?");

        });
    });

    describe("Add method getDetails() to Product object type", () => {

        it('Should add a method named getDetails() to Product that returns product details. @getDetails-method', function () {

            test.assert(shoppinggame.Product, "Have you defined a `Product` object?");

            const pr1 = new shoppinggame.Product(1, 'test1', 100, oneYearLater);

            test.assert(pr1.getDetails, "Have you add a `getDetails()` method to `Product`?");

            const retValue = pr1.getDetails();
            test.assert(retValue === "Product Name: test1 , Product Price: 100", "Have you returned `Product Name: ${this.name} , Product Price: ${this.price}` from the method?")

        });
    });

    describe("Define MagicProduct object type", () => {

        it('Should define the MagicProduct object type. @MagicProduct-object', function () {

            test.assert(magProdNode, "Have you used the constructor function syntax to define `MagicProduct`?");

            test.assert(magProdNode.params.length == 6 &&
                magProdNode.params.find(element => element.name == 'id') &&
                magProdNode.params.find(element => element.name == 'name') &&
                magProdNode.params.find(element => element.name == 'price') &&
                magProdNode.params.find(element => element.name == 'expiryDate') &&
                magProdNode.params.find(element => element.name == 'points') &&
                magProdNode.params.find(element => element.name == 'isBonus'),
                "Have you passed parameters `id`, `name`, `price`, `expiryDate`, `points` and `isBonus` to the constructor function?");

            test.assert((magProdNode.params.length == 6 &&
                    magProdNode.params[0].name == 'id' &&
                    magProdNode.params[1].name  == 'name' &&
                    magProdNode.params[2].name  == 'price' &&
                    magProdNode.params[3].name  == 'expiryDate' &&
                    magProdNode.params[4].name  == 'points' &&
                    magProdNode.params[5].name  == 'isBonus'),
                    "Have you passed parameters `id`, `name`, `price`, `expiryDate`, `points` and `isBonus` in this order to the constructor function?");

            //

            const body = magProdNode.body.body;
            const bodyLength = body.length;
            const firstStmtIsCall = (bodyLength > 0 &&
                body[0].expression.type === "CallExpression") ? true : false;

            test.assert(productCallInvocation && firstStmtIsCall, "Have you called the `Product` class constructor as the 1st statement inside `MagicProduct`");

            const arguments = productCallInvocation.expression.arguments;

            const argsLength = arguments.length;
            const thisPassed = (argsLength > 0 && arguments[0].type === "ThisExpression") ? true : false;
            const otherPassed = (arguments.find(element => element.name == 'id') &&
                arguments.find(element => element.name == 'name') &&
                arguments.find(element => element.name == 'price') &&
                arguments.find(element => element.name == 'expiryDate')) ? true : false;

            test.assert(argsLength == 5 &&
                thisPassed &&
                otherPassed, "Have you passed `this, id, name, price, expiryDate` as parameters?");

            test.assert((argsLength == 5 &&
                    thisPassed &&
                    arguments[1].name == 'id' &&
                    arguments[2].name == 'name' &&
                    arguments[3].name == 'price' &&
                    arguments[4].name == 'expiryDate'), "Have you passed `this, id, name, price, expiryDate` in this order as parameters?");

            const isBonus = body.filter(element => element.expression.right &&
                element.expression.right.name == 'isBonus')
            const points = body.filter(element => element.expression.right &&
                element.expression.right.name == 'points');

            test.assert(isBonus.length > 0 &&
                points.length > 0, "Have you initialized `isBonus` & `points` properties?");


            const thisExpressions = body.filter(element => element.expression.left &&
                element.expression.left.object &&
                element.expression.left.object.type == 'ThisExpression');

            test.assert(thisExpressions.length == 2, "Have you used `this` to initialize `isBonus` & `points` properties?");
        });

    });

    describe("Create the link (inheritance) between Product & MagicProduct object types", () => {

        it('Should make the MagicProduct a child of Product. @object-inheritance', function () {

            test.assert(magProdNode, "Have you used the constructor function syntax to define `MagicProduct`?");

            const hasLink = shoppinggame.MagicProduct.prototype instanceof shoppinggame.Product;

            test.assert(hasLink == true, "Have you made the `MagicProduct` a sub class of `Product`?");

            // const protoUsed = (objectCreateCall.left && 
            //     objectCreateCall.left.object &&
            //     objectCreateCall.left.object.name == 'MagicProduct' &&
            //     objectCreateCall.left.property &&
            //     objectCreateCall.left.property.name == 'prototype') ? true : false;

            // const prodProtoPassed = (objectCreateCall.right.arguments.length > 0 &&
            //     objectCreateCall.right.arguments.object &&
            //     objectCreateCall.right.arguments.object.name == 'Product' &&
            //     objectCreateCall.right.arguments.property &&
            //     objectCreateCall.right.arguments.property.name == 'prototype') ? true : false;

            test.assert(objectCreateCall, "Have you used `Object.create()`, passing `Product.prototype` as a parameter to link `MagicProduct` and `Product`?");

        });
    });

    describe("Define Rating class", () => {

        it('Should define a class named Rating. @Rating-class', function () {

            test.assert(fieldDeclInRatingCls == false, "Have you done a Field declaration in the class body? It is an experimental feature according to MDN docs and we suggest you remove it.");

            test.assert(ratingClassDecl, "Have you defined a class named `Rating` using the `class` keyword?");


            const classBody = ratingClassDecl.body.body;

            // let constructorIndex = -1;
            // let setterIndex = -1;

            // if(classBody.length > 0 && classBody.length == 1) {
            //     constructorIndex = 0;
            //     setterIndex = 0;
            // } else if(classBody.length > 0 && classBody.length == 2) {
            //     constructorIndex = 0;
            //     setterIndex = 1;
            // }

            let constructorDefined, setterDefined = false;

            for (let i = 0; i < classBody.length; i++) {

                if (classBody[i] &&
                    classBody[i].kind == 'constructor' &&
                    classBody[i].key.name == 'constructor' &&
                    classBody[i].value.type == 'FunctionExpression' &&
                    classBody[i].value.body.body[0] &&
                    classBody[i].value.body.body[0].expression.left.object.type == 'ThisExpression' &&
                    classBody[i].value.body.body[0].expression.left.property.name == 'rate') {

                    constructorDefined = true;
                    break;
                }
            }

            for (let i = 0; i < classBody.length; i++) {

                if (classBody[i] &&
                    classBody[i].kind == 'set' &&
                    classBody[i].key.name == 'rating' &&
                    classBody[i].value.type == 'FunctionExpression') {

                    setterDefined = true;
                    break;
                }
            }


            test.assert(constructorDefined, "Have you added a constructor that initializes a property named `rate` to a default value?");


            //console.log(setterDefined);
            test.assert(setterDefined, "Have you added a setter that sets the value of a property named `rate`?");

            // let r = new shoppinggame.Rating();
            // const range1,range2,range3,range4 = false;

            const getRangeRate = (val) => {
                let rangeRating = { range: "", rate: "" };

                if (val > 1 && val <= 4) {
                    rangeRating.range = "> 1 && <= 4";
                    rangeRating.rate = "OK";
                } else if (val >= 5 && val <= 7) {
                    rangeRating.range = ">= 5 && <= 7";
                    rangeRating.rate = "GOOD";
                } else if (val > 7) {
                    rangeRating.range = "> 7";
                    rangeRating.rate = "EXCEPTIONAL";
                } else {
                    rangeRating.range = "== 1";
                    rangeRating.rate = "BAD";
                }
                return rangeRating;
            };



            let r = new shoppinggame.Rating();
            let rr;

            for (let i = 1; i <= 10; i++) {
                r.rating = i;
                rr = getRangeRate(i);

                test.assert(r.rate != "", "Have you set the `rate` property value in the setter according to the given logic?");

                test.assert(r.rate != "" && r.rate == rr.rate, "Have you set `this.rate` to the correct rate values?");
            }

        });
    });

});

