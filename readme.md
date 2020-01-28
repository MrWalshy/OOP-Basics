# The keyword 'this'

## What is 'this'?
- A reserved keyword in JS
- It is normally determined by how a function is called (execution context)
- Can be determined by four rules (global, object/implicit, explicit, new)
- If 'this' is set in the global context in a function, 'this' refers to either the global object(window in the browser) or undefined(strict mode)
- Value of 'this' can be explicitly set using 'call', 'apply', or 'bind'
- The 'new' keyword can also set the context of 'this'

## Four ways to always figure out what 'this' is
### global context
### object binding
### explicit binding
### 'new' keyword


## What is 'async'?
- Asynchronous code runs without interrupting code
- setTimout() is an example of a asynchronous function

# Object Oriented Programming
- A programming model based on the idea of objects
- Objects are constructed from 'classes'(a blueprint)
- An object created from a class is known as an 'instance'
- Classes should be made abstract & modular as often as possible
- In JS, a 'Constructor Function' is used to make a class
- Duplication can be avoided in multiple constructor functions by using 'call' or 'apply'

## What does the 'new' keyword do?
- First, it creates an empty object
- The keyword 'this' is set to the newly created empty object
- An implicit 'return this' is added to the end of the following function
- A property is added onto the empty object called "__proto__" (also called 'dunder(double-underscore) proto'). This links the prototype property on the constructor function to the empty object

## What is the 'prototype' object?
- Every constructor function has a property called "prototype"
- The 'prototype' object has a property called 'constructor', this points back to the constructor function
- When a object is created with the 'new' keyword, the '__proto__' property gets created. This links the object & the prototype property of the constructor function

## What are 'closures'?
- A closure is a function that uses variables defined in outer functions that have been prior returned
- If the inner function does not use any external variables, this is known as just a 'nested function'
- Closures can help with creating private variables