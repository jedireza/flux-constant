'use strict';

const Lab = require('lab');
const Code = require('code');
const FluxConstant = require('../index');


const lab = exports.lab = Lab.script();


lab.experiment('FluxConstant', () => {

    lab.test('it loads', (done) => {

        Code.expect(FluxConstant).to.be.a.function();
        done();
    });


    lab.test('it creates a new constant', (done) => {

        const TEST_IT = new FluxConstant('TEST_IT');

        Code.expect(TEST_IT).to.be.an.instanceOf(FluxConstant);
        done();
    });


    lab.test('it demonstrates string casting', (done) => {

        const TESTING_IT = new FluxConstant('TESTING_IT');

        Code.expect(TESTING_IT).to.be.an.instanceOf(FluxConstant);
        Code.expect(TESTING_IT.toString()).to.equal('TESTING_IT');

        done();
    });


    lab.test('it creates a set of constants', (done) => {

        const Set = FluxConstant.set(['ONE', 'TWO', 'THREE']);

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
