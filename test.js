// @ts-check
const assert = require("assert");

const { Types, Container } = require('.');

const container = Container();

container.Register('version', { 
    type: Types.Instance, 
    obj: 1
});

container.Register('magicString', {
    type: Types.Instance,
    obj: 'STRING!'
})

container.Register('getVer', {
    args: ['version'],
    type: Types.Function,
    obj: ver => ver * 2
});

class Test {
    /**
     * @param {number} someInt 
     * @param {string} magicString
     */
    constructor(someInt, magicString) {
        this.version = someInt;
        this.magicString = magicString;
    }

    getVer() {
        return this.version;
    }

    getMagic() {
        return this.magicString;
    }
};

container.Register('Test', {
    args: ['getVer', 'magicString'],
    type: Types.Newable,
    obj: Test
});

let test = container.Resolve('Test');
assert(test.getVer() === 2);
assert(test.getMagic() === 'STRING!');

container.Forget('version');
assert(container.Resolve('version') === undefined);
