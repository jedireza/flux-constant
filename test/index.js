var Lab = require('lab');
var Code = require('code');
var FluxConstant = require('../index');


var lab = exports.lab = Lab.script();


lab.experiment('FluxConstant', function () {

    lab.test('it loads', function (done) {

        Code.expect(FluxConstant).to.be.a.function();
        done();
    });


    lab.test('it creates a new constant', function (done) {

        var TEST_IT = new FluxConstant('TEST_IT');

        Code.expect(TEST_IT).to.be.an.instanceOf(FluxConstant);
        done();
    });


    lab.test('it creates a new constant with an id', function (done) {

        var TEST_IT = new FluxConstant('TEST_IT', '99');

        Code.expect(TEST_IT).to.be.an.instanceOf(FluxConstant);
        Code.expect(TEST_IT.id).to.be.equal('99');
        done();
    });


    lab.test('it demonstrates toString', function (done) {

        var TESTING_IT = new FluxConstant('TESTING_IT');

        Code.expect(TESTING_IT.toString()).to.equal('TESTING_IT');
        done();
    });


    lab.test('it demonstrates stringify', function (done) {

        FluxConstant.lastId = 0;

        var fixture = '{"id":"1","name":"STRINGIFY_IT"}';
        var SERIALIZE_IT = new FluxConstant('STRINGIFY_IT');

        Code.expect(SERIALIZE_IT.stringify()).to.equal(fixture);
        done();
    });


    lab.test('it demonstrates parse', function (done) {

        var fixture = '{"id":"5","name":"PARSE_IT"}';
        var PARSE_IT = FluxConstant.parse(fixture);

        Code.expect(PARSE_IT).to.be.an.instanceOf(FluxConstant);
        Code.expect(PARSE_IT.name).to.equal('PARSE_IT');
        Code.expect(PARSE_IT.id).to.equal('5');
        Code.expect(PARSE_IT.stringify()).to.equal(fixture);

        done();
    });


    lab.test('it demonstrates parse without an id', function (done) {

        FluxConstant.lastId = 0;

        var payload = '{"name":"PARSE_IT"}';
        var PARSE_IT = FluxConstant.parse(payload);

        Code.expect(PARSE_IT).to.be.an.instanceOf(FluxConstant);
        Code.expect(PARSE_IT.name).to.equal('PARSE_IT');
        Code.expect(PARSE_IT.id).to.equal('1');

        done();
    });


    lab.test('it creates a set of constants', function (done) {

        var Set = FluxConstant.set([ 'ONE', 'TWO', 'THREE' ]);

        Code.expect(Set).to.be.an.object();
        Code.expect(Set.ONE).to.be.an.instanceOf(FluxConstant);
        Code.expect(Set.TWO).to.be.an.instanceOf(FluxConstant);
        Code.expect(Set.THREE).to.be.an.instanceOf(FluxConstant);
        Code.expect(Set.ONE.toString()).to.equal('ONE');
        Code.expect(Set.TWO.toString()).to.equal('TWO');
        Code.expect(Set.THREE.toString()).to.equal('THREE');

        done();
    });
});
