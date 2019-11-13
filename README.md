# DejectedJS

A simple light-weight dependency injection tool.  See below Usage for a walk through and refer to `test.js` for examples.

# Usage

Import the `Conatiner` function and `Types` "enum" and create a new container.

```javascript
const { Types, Container } = require('.');
const container = Container();
```

You can register three types of objects into the container.
- Instances
- Functions
- "Newables"

The structure to pass in a new object is of the below structure.
Please note that this isn't valid JavaScript, it's only for example purposes.

```javascript
registerable = {
    args: ['some', 'array']
    type: Types.{Instance, Function, Newable}
    obj: {} // subjective
}
```

The arguments are expected to be things that you have already registered.  You can register in any order, resolution only happens when `Resolve` is called.

Instances are objects that have been previously created.  It can be anything really, the container will return exactly what is given.  Arguments are not necessary for instances (since they are already created).

```javascript
container.Register('version', { 
    type: Types.Instance, 
    obj: 1
});
```

Functions are any callable and the arguments are passed in as the function arguments.

```javascript
container.Register('getVersion', {
    args: ['version']
    type: Types.Function,
    obj: version => version
});
```

Newables are any object that you can call New on.

```javascript
class Test {
    constructor(theVersion) {
        this.version = theVersion;
    }

    getVer() {
        return this.version;
    }
};

container.Register('Test', {
    args: ['getVersion'],
    type: Types.Newable,
    obj: Test
});
```

You can require as many arguments as you need for injection purposes, they will be passed in to the function or constructor in the order defined in the `args` array.

Now that we've got everything registered, we can resolve our instance as needed.

```javascript
let test = container.Resolve('Test');
console.log(test.getVersion()); // 1
```

Lifecycle of the container is currently not implemented, but you can use the `Forget` function to remove an intem from the container.

```javascript
container.Forget('version');
container.Resolve('version'); // undefined
```


# TODO:
- Built in creation of child containers ?
- Item life cycle events?
- Better tests