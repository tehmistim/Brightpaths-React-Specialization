var test = require('unit.js');
var esprima = require('esprima')
const fs = require('fs');
const source = fs.readFileSync('js/shoppinggame.js', 'utf8');

let prodKeysNode;
let prodObjNode;
let magProdKeysNode;
let magProdObjNode;


    esprima.parseModule(source, {}, function (node) {
        if (node.type == 'VariableDeclarator' &&
            node.id.name == 'prodKeys') {
            prodKeysNode = node;
        }

        if (node.type == 'VariableDeclarator' &&
            node.id.name == 'prodObj') {
            prodObjNode = node;
        }

        if (node.type == 'VariableDeclarator' &&
            node.id.name == 'magProdKeys') {
            magProdKeysNode = node;
        }

        if (node.type == 'VariableDeclarator' &&
            node.id.name == 'magProdObj') {
            magProdObjNode = node;
        }

    });


describe('Shopping Master game - Load master data', function () {

    describe("Use Object.keys() to find the property names of `Product`", () => {
        it('Should populate `prodKeys` with the property names of `Product` using Object.keys() call in the loadProducts() function. @Object-keys-call-Product', function () {

            const prodKeysNotPopulated = (prodKeysNode.init && prodKeysNode.init.type == 'ArrayExpression' &&
                prodKeysNode.init.elements.length == 0) ? true : false;

            test.assert(!prodKeysNotPopulated, "Have you populated `prodKeys` with the property names of `Product`?");

            const objectKeyUsed = (prodKeysNode.init &&
                prodKeysNode.init.type == 'CallExpression' &&
                prodKeysNode.init.callee &&
                prodKeysNode.init.callee.object.name == 'Object' &&
                prodKeysNode.init.callee.property.name == 'keys') ? true : false;

            const objidentifier = (prodKeysNode.init.arguments &&
                prodKeysNode.init.arguments.length > 0 &&
                prodKeysNode.init.arguments[0].type == 'Identifier') ? prodKeysNode.init.arguments[0].name : null;

            let objVariablePassed = false;

            esprima.parseModule(source, {}, function (node) {
                if (node.type == 'VariableDeclarator' &&
                    node.id &&
                    node.id.name == objidentifier &&
                    node.init &&
                    node.init.type == 'NewExpression' &&
                    node.init.callee &&
                    node.init.callee.name == 'Product') {
                    objVariablePassed = true;
                }

            });

            const proObjectPassed = (prodKeysNode.init.arguments &&
                prodKeysNode.init.arguments.length > 0 &&
                prodKeysNode.init.arguments[0].type == 'NewExpression' &&
                prodKeysNode.init.arguments[0].callee &&
                prodKeysNode.init.arguments[0].callee.name == 'Product')
                ||
                objVariablePassed ? true : false;

            test.assert(objectKeyUsed && proObjectPassed, "Have you called `Object.keys()` method, passing a `new Product()` object as the argument?");
        });
    });

    describe("Create and assign an instance of `Product` to `prodObj`", () => {
        it('Should create and assign an instance of `Product` to `prodObj` inside loadProducts() function. @create-prodObj', function () {

            const proObjAssigned = (prodObjNode.init != null &&
                                   prodObjNode.init.type == 'NewExpression' &&
                                   prodObjNode.init.callee &&
                                   prodObjNode.init.callee.name == 'Product') ? true : false;
           
            test.assert(proObjAssigned, "Have you created and assigned an instance of `Product` to `prodObj`?");
        });
    });

    describe("Use Object.keys() to find the property names of `MagicProduct`", () => {
        it('Should populate `magProdKeys` with the property names of `MagicProduct` using Object.keys() call inside loadMagicProducts() function. @Object-keys-call-MagicProduct', function () {

            const magProdKeysNotPopulated = (magProdKeysNode.init && magProdKeysNode.init.type == 'ArrayExpression' &&
                        magProdKeysNode.init.elements.length == 0) ? true : false;

            test.assert(!magProdKeysNotPopulated, "Have you populated `magProdKeys` with the property names of `MagicProduct`?");

            const objectKeyUsed = (magProdKeysNode.init &&
                magProdKeysNode.init.type == 'CallExpression' &&
                magProdKeysNode.init.callee &&
                magProdKeysNode.init.callee.object.name == 'Object' &&
                magProdKeysNode.init.callee.property.name == 'keys') ? true : false;

            const objidentifier = (magProdKeysNode.init.arguments &&
                magProdKeysNode.init.arguments.length > 0 &&
                magProdKeysNode.init.arguments[0].type == 'Identifier') ? magProdKeysNode.init.arguments[0].name : null;


            let objVariablePassed = false;

            esprima.parseModule(source, {}, function (node) {
                if (node.type == 'VariableDeclarator' &&
                    node.id.name == objidentifier &&
                    node.init.type == 'NewExpression' &&
                    node.init.callee.name == 'MagicProduct') {
                    objVariablePassed = true;
                }

            });

            const magProObjectPassed = (magProdKeysNode.init.arguments &&
                magProdKeysNode.init.arguments.length > 0 &&
                magProdKeysNode.init.arguments[0].type == 'NewExpression' &&
                magProdKeysNode.init.arguments[0].callee.name == 'MagicProduct')
                ||
                objVariablePassed ? true : false;

            test.assert(objectKeyUsed && magProObjectPassed, "Have you called `Object.keys()` method, passing a `new MagicProduct()` object as the argument?");
        });
    });

    describe("Create and assign an instance of `MagicProduct` to `magProdObj`", () => {
        it('Should create and assign an instance of `MagicProduct` to `magProdObj` inside loadMagicProducts() function. @create-magProdObj', function () {

            const magProdObjAssigned = (magProdObjNode.init != null &&
                                        magProdObjNode.init.type == 'NewExpression' &&
                                        magProdObjNode.init.callee &&
                                        magProdObjNode.init.callee.name == 'MagicProduct') ? true : false;
           
            test.assert(magProdObjAssigned, "Have you created and assigned an instance of `MagicProduct` to `magProdObj`?");
        });
    });
});