# flux-constant

Unique constants for Flux apps.

[![devDependency Status](https://david-dm.org/jedireza/flux-constant/dev-status.svg?theme=shields.io)](https://david-dm.org/jedireza/flux-constant#info=devDependencies)
[![Build Status](https://travis-ci.org/jedireza/flux-constant.svg?branch=master)](https://travis-ci.org/jedireza/flux-constant)


## Install

```js
$ npm install flux-constant
```


## Usage

Create constants one at a time.

```js
var FluxConstant = require('flux-constant');

var IMPORTANT_THING = new FluxConstant('IMPORTANT_THING');

console.log(IMPORTANT_THING);
// { id: '1', name: 'IMPORTANT_THING' }

console.log(IMPORTANT_THING.toString());
// 'IMPORTANT_THING'
```

Or create a set of them.

```js
var FluxConstant = require('flux-constant');

var Set = FluxConstant.set([
    'SEND_REQUEST',
    'RECEIVE_RESPONSE'
]);

console.log(Set);
/*
{
    SEND_REQUEST: { id: '2', name: 'SEND_REQUEST' },
    RECEIVE_RESPONSE: { id: '3', name: 'RECEIVE_RESPONSE' }
}
*/

console.log(Set.SEND_REQUEST instanceof FluxConstant);
// true
```


## Why

With a Flux application you may have a set of constants such as:

```js
var ContactConstants = {
    ActionTypes: {
        SEND_REQUEST: 'SEND_REQUEST',
        RECEIVE_RESPONSE: 'RECEIVE_RESPONSE'
    }
};

module.exports = ContactConstants;
```

You may have another set of constants that are really similar, but unreleated.

```js
var SignupConstants = {
    ActionTypes: {
        SEND_REQUEST: 'SEND_REQUEST',
        RECEIVE_RESPONSE: 'RECEIVE_RESPONSE'
    }
};

module.exports = SignupConstants;
```

We just created action types that could collide though. Let's compare a bit:

```js
var ContactConstants = require('./ContactConstants');
var SignupConstants = require('./SignupConstants');

ContactActionTypes = ContactConstants.ActionTypes;
SignupActionTypes = SignupConstants.ActionTypes;

console.log(ContactActionTypes.SEND_REQUEST === SignupActionTypes.SEND_REQUEST);
// true
```

That's not exactly what we wanted. This could bite us if we use these two sets
of constants in the same process.

For example, if a Flux store was depending on these constants, it may take
action on a payload it didn't intend to. This happens because we're just
comparing strings.

One way to fix this is creating longer, more unique names:

```js
var ContactConstants = {
    ActionTypes: {
        CONTACT_SEND_REQUEST: 'CONTACT_SEND_REQUEST',
        CONTACT_RECEIVE_RESPONSE: 'CONTACT_RECEIVE_RESPONSE'
    }
};

module.exports = ContactConstants;
```

This doesn't seem like a great way to move forward though. These names can get
out of control as the application grows. Also, prefixing with `CONTACT_` feels
like duplicating unnecessary information.

So instead of passing around strings let's create objects that are unique
(`new`). And best of all we can keep the simpler naming conventions.

```js
var FluxConstant = require('flux-constant');

var ContactConstants = {
    ActionTypes: {
        SEND_REQUEST: new FluxConstant('SEND_REQUEST'),
        RECEIVE_RESPONSE: new FluxConstant('RECEIVE_RESPONSE')
    }
};

module.exports = ContactConstants;
```

We'll do the same thing as above but demonstrate the `set` shortcut.

```js
var FluxConstant = require('flux-constant');

var SignupConstants = {
    ActionTypes: FluxConstant.set([
        'SEND_REQUEST',
        'RECEIVE_RESPONSE'
    ])
};

module.exports = SignupConstants;
```

And now they won't collide.

```js
var ContactConstants = require('./ContactConstants');
var SignupConstants = require('./SignupConstants');

ContactActionTypes = ContactConstants.ActionTypes;
SignupActionTypes = SignupConstants.ActionTypes;

console.log(ContactActionTypes.SEND_REQUEST === SignupActionTypes.SEND_REQUEST);
// false
```


## Unique strings

If for some reason we wanted to work with string values instead of object
instances, we can `stringify` an instance like so:

```js
var IMPORTANT_FOO = new FluxConstant('IMPORTANT_THING');

console.log(IMPORTANT_FOO.stringify());
// '{"id":"5","name":"IMPORTANT_THING"}'
```

`stringify` creates _deterministic_, `JSON` compatable strings. And since the
values are valid `JSON`, we're able to parse these values back into instances.

```js
var payload = '{"id":"5","name":"IMPORTANT_THING"}';
var IMPORTANT_BAR = FluxConstant.parse(payload);

console.log(IMPORTANT_BAR.id);
// '5'

console.log(IMPORTANT_BAR.name);
// 'IMPORTANT_THING'

console.log(IMPORTANT_BAR.stringify());
// '{"id":"5","name":"IMPORTANT_THING"}';
```

Remember for this to be useful, you must to stick with the `stringify` values.
And that's because the _instances_ are still unique.

```js
console.log(IMPORTANT_FOO === IMPORTANT_BAR);
// false

console.log(IMPORTANT_FOO.stringify() === IMPORTANT_BAR.stringify());
// true
```


## License

MIT


## Don't forget

What you create with `flux-constant` is more important than `flux-constant`.
