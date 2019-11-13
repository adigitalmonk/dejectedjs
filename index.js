// @ts-check
const Types = {
    Newable: 'newable',
    Function: 'function',
    Instance: 'instance'
}

/**
 * @param {object} objects
 * @param {string} resolvableName
 * @returns
 */
function Instantiate(objects, resolvableName) {
    const resolveable = objects[resolvableName];
    let args;
    switch (resolveable.type) {
        case Types.Instance:
            return resolveable.obj;
        case Types.Newable:
            args = resolveable.args.map((subResolveable) => {
                return Instantiate(objects, subResolveable);
            });
            return new resolveable.obj(...args);
        case Types.Function:
            args = resolveable.args.map((subResolveable) => {
                return Instantiate(objects, subResolveable);
            });
            return resolveable.obj.apply(null, args);
    }
};

/**
 * @returns {object} 
 */
function Container() {
    const objects = {};
    const Register = (registeredName, registeredObject) => {
        objects[registeredName] = registeredObject;
    };

    const Forget = (registeredName) => {
        delete objects[registeredName];
    };

    const Resolve = (resolvableName) => {
        // Unregistered instance
        if (!objects[resolvableName]) {
            // TODO: Throw exception?
            return undefined;
        }

        return Instantiate(objects, resolvableName);
    };

    return {
        Register,
        Resolve,
        Forget
    }
};

module.exports = {
    Types,
    Container
}
