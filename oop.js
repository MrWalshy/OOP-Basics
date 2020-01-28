const util = require("util");
// ==========================
// CONSTRUCTOR FUNCTION
// ==========================

// A function being used as a blueprint is known as a 'Constructor Function'
// It is convention to capitalise a constructor functions name
function House(bedrooms, bathrooms, numSqft){
    // Properties are attatched onto the keyword 'this'
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.numSqft = numSqft;
}

// The keyword 'this' is not explicitly binding or placed inside the declared object
let firstHouse = House(2, 2, 1000);
console.log(firstHouse); // undefined

// The 'new' keyword
let secondHouse = new House(2, 2, 1000);
console.log(secondHouse);

// CREATE A CONSTRUCTOR FUNCTION FOR A DOG (ME TIME!)
// Constructor here
function Dog(name, age){
    this.name = name;
    this.age = age;
    this.bark = function(){
        console.log(this.name + " just barked!");
    };
}

// Create instances of the constructor function
let joey = new Dog("Joey", 1);
let bella = new Dog("Bella", 2);

// Call the 'bark' method on each instance
joey.bark();
bella.bark();

// ==========================
// MULTIPLE CONSTRUCTOR FUNCTIONS
// ==========================
function Car(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    // Properties can be set on 'this' to act as preset values
    this.numWheels = 4;
}

function Motorbike(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 2;
}

// There is a lot of duplication between Car & Motorbike. Is there
// a way to "borrow" the Car function, then invoke it in the Motorcycle function?
function Car2(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    // Properties can be set on 'this' to act as preset values
    this.numWheels = 4;
}

function Motorbike2(make, model, year){
    // 'Car.call()' is passed 'this' to represent the current instance
    // of the Motorbike2 constructor
    Car.call(this, make, model, year);
    this.numWheels = 2;
}

let vehicle1 = new Motorbike2("BMW", "Super", "1997");
let vehicle2 = new Car2("BMW", "116i", "2017");
console.log(vehicle1, vehicle2);

function Motorbike3(make, model, year){
    // Using 'apply'
    Car.apply(this, [make, model, year]);
    this.numWheels = 2;
}

function Motorbike4(make, model, year){
    // Using 'apply' with the 'arguments' array
    // The 'arguments' array passes in arguments
    Car.apply(this, arguments);
    this.numWheels = 2;
}

let vehicle3 = new Motorbike4("Ducati", "Pacer", "1997");
let vehicle4 = new Car2("Honda", "Civic", "2007");
console.log(vehicle3, vehicle4);

// ==========================
// PROTOTYPE OBJECT (__proto__)
// ==========================

function Human(name){
    this.name = name;
}
console.log(Human.prototype);

// 'morgan' is an object created from the 'Human' constructor
let morgan = new Human("Morgan");

// Using the 'new' keyword has established a link between the
// object & the prototype property
console.log(morgan.__proto__ === Human.prototype); // true
// 'Human.prototype' object has a property called 'constructor',
// this points back to the function
console.log(Human.prototype.constructor === Human); // true

// ==========================
// PROTOTYPE CHAIN
// ==========================
// The 'prototype' is shared amongst all objects that are created
// with the related 'constructor function'
function Animal(name){
    this.name = name;
}

let dog = new Animal("dog");

// Adding a property to the 'prototype'
Animal.prototype.isAnAnimal = true;

// Anything inside the 'Animal' prototype can be accessed by any
// instance of 'Animal' through the '__proto__' object.
// This is an example of a 'prototype chain'
console.log(dog.isAnAnimal); // true

let arr = new Array;
arr.push(10);
console.dir(arr); // Do this in chrome console, look at '__proto__'
                  // to see associated methods

// Looks to see if 'arr' has a property in '__proto__' of 'length'
console.log(arr.hasOwnProperty("length"));

// EXERCISE (ME TIME!)
// If a 'constructor' contains a function, using the 'new' keyword
// redefines the function for every 'instance' of the 'constructor'

// Place the function on the 'constructors' prototype to make it
// accessible to all instances

function Vehicle(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;

    this.isRunning = false;
}

Vehicle.prototype.turnOn = function(){
    this.isRunning = true;
}

Vehicle.prototype.turnOff = function(){
    this.isRunning = false;
}

Vehicle.prototype.honk = function(){
    if(this.isRunning){
        return "beep";
    }
}

let fastCar = new Vehicle("Rapid", "One", "1998");

fastCar.turnOn();
console.log(fastCar.honk());
fastCar.turnOff();
console.log(fastCar);


// ==========================
// CLOSURES
// ==========================
// A closure uses variables from outside its definition

function outer(){
    let data = "closures are ";
    return function inner(){
        let innerData = "awesome";
        return data + innerData;
    }
}

console.log(outer()); // Returns the definition of 'inner()'
console.log(outer()()); // Returns 'closures are awesome'


function outer2(a){
    return function inner2(b){
        // 'inner2()' is making use of var 'a', defined in 'outer2()'
        // When 'inner2()' is called, 'outer2' has returned
        // The function 'inner2()' is a closure
        return a + b;
    }
}

// The closure can be called directly, (4) is the closure
console.log(outer2(5)(4));
// Or the return function of 'outer2' can be passed into a variable
let storeOuter = outer2(5);
console.log(storeOuter(5));

// The inner function has to be returned for this to work
// The inner function does not have to be given a name, it can be 
// anonymous

// PRIVATE VARIABLES
function counter(){
    let count = 0;
    return function(){
        return ++count;
    }
}
// These are the closures to the 'counter()' function
counter1 = counter();
counter2 = counter();

console.log(counter1());
console.log(counter1());
console.log(counter2());
// 'counter1' is not affected by 'counter2'
console.log(counter1());

// console.log(count); // Returns a 'reference' error as 'count' 
// is private to counter()