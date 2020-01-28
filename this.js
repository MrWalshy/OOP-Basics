// ==========================
// Global
// ==========================

// The global scope is represented by the 'window' object
// The global execution context is when 'this' is not inside of a declared object

// let does not bind to the global scope when declaring variables
// Use
console.log(this); // window

function whatIsThis(){
    // this refers to the global object
    return this;
}

function variablesInThis(){
    // This function belongs to the global scope (window object)
    // attatches person to the global scope
    this.person = "Bob";
}

variablesInThis();

console.log(person); // Bob

console.log(whatIsThis()); // window object

// ==========================
// Implicit/Object
// ==========================
// When the keyword 'this' is inside of a declared object
const newPerson = {
    firstName: "Fred",
    sayHi: function(){
        // arrow functions not working here
        return "Hi " + this.firstName;
    },
    determineContext: function(){
        // 'this' refers to the parent object 'newPerson'
        return this === newPerson;
    },
    // NESTED OBJECT
    dog: {
        sayHello: function(){
            // 'this' refers to the dog object, not its parent
            return "Hello " + this.firstName;
        },
        determineContext: function(){
            return this === newPerson;
        }
    }
}

console.log(newPerson.sayHi());
console.log(newPerson.determineContext());

console.log(newPerson.dog.sayHello()); // Hello undefined

// ==========================
// Explicit Binding
// ==========================
// Choose what we want the context of 'this' to be using:
// call, apply, or bind (methods that can only be used by functions)

// Here, the 'call' method is setting 'newPerson' as 'this'
console.log(newPerson.dog.sayHello.call(newPerson)); // Hello Fred

// 'apply' is almost identical to call, except with more parameters
const personA = {
    firstName: "Bobbs",
    sayHi: function(){
        return "Hi " + this.firstName;
    },
    addNumbers: function(a, b, c, d){
        return this.firstName + " just calculated " + (a + b + c + d);
    }
}

const ellie = {
    firstName: "Ellie"
}

console.log(personA.sayHi()); // Hi Bobbs
console.log(personA.sayHi.apply(ellie));

// adding extra args
console.log(personA.addNumbers(1, 1, 1, 1));
console.log(personA.addNumbers.call(ellie, 1, 1, 1, 1));
console.log(personA.addNumbers.apply(ellie, [1, 1, 1, 1])); // Uses an array to hold the arguments

// 'bind'
// The parameters work like the 'call' method, except that 'bind' returns
// a function with the context of 'this' already bound.
let ellieCalc = personA.addNumbers.bind(ellie, 1, 1, 1, 2); // function(){}
console.log(ellieCalc());

// Using 'bind' does not require all the arguments up front (this is called partial application)
let ellieCalc2 = personA.addNumbers.bind(ellie, 1, 2);
// the rest of the arguments can be added inside the function returned from bind
console.log(ellieCalc2(1, 1)); // Ellie just calculated 5

// It is common to lose the context of 'this' in functions that are not
// immediately executed.
const morgan = {
    firstName: "Morgan",
    sayHi: function(){
        // setTimout is executed in the global context
        setTimeout(function(){
            console.log("Hi " + this.firstName);
        }, 1000);
    }
}

morgan.sayHi();

// 'bind' can be used to set the correct context of this
const morgan2 = {
    firstName: "Morgan",
    sayHi: function(){
        setTimeout(function(){
            console.log("Hi " + this.firstName);
            // .bind(this) is telling setTimout to refer to its parent object
            // with the keyword 'this'
        }.bind(this), 1000);
    }
}

morgan2.sayHi();

// ==========================
// The 'new' keyword
// ==========================
// The context of 'this' can be set using the 'new' keyword
function Person(firstName, lastName){
    // 'this' will refer to the instance of the object created
    this.firstName = firstName,
    this.lastName = lastName
}

// Creating a new instance of the Person object
const bob = new Person("Bob", "Schrader");
// Logging the created instances 'this' values
console.log(bob.firstName + " " + bob.lastName);