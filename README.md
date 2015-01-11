# flux-constant

Unique constants for Flux apps.

[![devDependency Status](https://david-dm.org/jedireza/flux-constant/dev-status.svg?theme=shields.io)](https://david-dm.org/jedireza/flux-constant#info=devDependencies)
[![Build Status](https://travis-ci.org/jedireza/flux-constant.svg?branch=master)](https://travis-ci.org/jedireza/flux-constant)


## Install

```js
$ npm install flux-constant
```


## Usage

Create constants individually.

```js
var FluxConstant = require('flux-constant');

var IMPORTANT_THING = new FluxConstant('IMPORTANT_THING');

console.log(IMPORTANT_THING);
// { name: 'IMPORTANT_THING' }

console.log(IMPORTANT_THING.toString());
// IMPORTANT_THING
```

Create a set of constants.

```js
var FluxConstant = require('flux-constant');

var Set = FluxConstant.set([
    'SEND_REQUEST',
    'RECEIVE_RESPONSE'
]);

console.log(Set);
/*
{
    SEND_REQUEST: { name: 'SEND_REQUEST' },
    RECEIVE_RESPONSE: { name: 'RECEIVE_RESPONSE' }
}
*/

console.log(ActionTypes.SEND_REQUEST instanceof FluxConstant);
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

But we just created action types that could collide. Let's compare a bit:

```js
var ContactConstants = require('./ContactConstants');
var SignupConstants = require('./SignupConstants');

ContactActionTypes = ContactConstants.ActionTypes;
SignupActionTypes = SignupConstants.ActionTypes;

console.log(ContactActionTypes.SEND_REQUEST === SignupActionTypes.SEND_REQUEST);
// true
```

This could bite us if we use these two sets of constants in the same process.
For example if a store was using these action types, it could get confused
thinking an action was the one it was listening for, when it really wasn't.
This is because we're just comparing simple strings.

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
out of control as the application grows.

So instead of passing around strings we can create objects that are unique. And
best of all we can keep our simple naming conventions.

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

```js
var FluxConstant = require('flux-constant');

var SignupConstants = {
    ActionTypes: {
        SEND_REQUEST: new FluxConstant('SEND_REQUEST'),
        RECEIVE_RESPONSE: new FluxConstant('RECEIVE_RESPONSE')
    }
};

module.exports = SignupConstants;
```

And now they don't collide.

```js
var ContactConstants = require('./ContactConstants');
var SignupConstants = require('./SignupConstants');

ContactActionTypes = ContactConstants.ActionTypes;
SignupActionTypes = SignupConstants.ActionTypes;

console.log(ContactActionTypes.SEND_REQUEST === SignupActionTypes.SEND_REQUEST);
// false
```
