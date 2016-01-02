'use strict';

var FluxConstant = function FluxConstant(name) {

    this.name = name;
};


FluxConstant.prototype.toString = function () {

    return this.name;
};


FluxConstant.set = function (list) {

    var set = {};

    list.forEach(function (item) {

        set[item] = new FluxConstant(item);
    });

    return set;
};


module.exports = FluxConstant;
