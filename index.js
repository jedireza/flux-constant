var FluxConstant = function FluxConstant(name, id) {

    this.id = String(id || (FluxConstant.lastId += 1));
    this.name = String(name);
};


FluxConstant.lastId = 0;


FluxConstant.prototype.toString = function () {

    return this.name;
};


FluxConstant.prototype.stringify = function () {

    return '{"id":"' + this.id + '","name":"' + this.name + '"}';
};


FluxConstant.parse = function (payload) {

    var data = JSON.parse(payload);
    return new FluxConstant(data.name, data.id);
};


FluxConstant.set = function (list) {

    var set = {};

    list.forEach(function (item) {

        set[item] = new FluxConstant(item);
    });

    return set;
};


module.exports = FluxConstant;
