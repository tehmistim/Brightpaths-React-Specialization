var test = require('unit.js');
const shoppinggame = require('../js/shoppinggame');


const today = new Date();
const oneYearLater = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay());

describe('Shopping Master game - Implement product identification logic', function () {

    describe("Implement `findProductById()` function to return an anonymous function.", () => {
        it('Should implement `findProductById()` function to return an anonymous function that takes in a `Product` instance and checks the equality of its `id` property to the passed in `id` to `findProductById()` function. @findProductById-function', function () {
            const result = shoppinggame.findProductById(1)

            test.assert(result instanceof Function,"Have you implemented `findProductById()` function to return an anonymous function?");
        
            const pr = new shoppinggame.Product(1, 'test1', 100, oneYearLater);

            const x = shoppinggame.findProductById(1).call(this,pr);

            const idPropUsed = shoppinggame.findProductById.toString().includes('.id')

            test.assert((idPropUsed && typeof x === "boolean"),"Have you returned the result of the equality comparison between the `id` property of the product and the passed in `id`, from the anonymous function?");

            
        });
    });

    describe("Generate and return a random integer between 1 and 20 from generateProductId() function.", () => {
        it('Should generate a random integer between 1 and 20 using built-in Math object functions and return it from generateProductId(). @generateProductId-function', function () {
            
            const randNo = shoppinggame.generateProductId();

            test.assert(randNo,"Have you completed the `generateProductId()` function?");

            test.assert(Number.isInteger(randNo) ,"Have you returned an integer from `generateProductId()` function?");

            const funcStr = shoppinggame.generateProductId.toString();
            const randomUsed = funcStr.includes('Math.random()');

            test.assert(randomUsed == true, "Have you used the `Math.random()` method to generate the random integer?");

            test.assert(randNo >= 1 && randNo <= 20 ,"Have you generated a random integer between 1 and 20 (including 1 & 20)?");

           
        });
    });

});