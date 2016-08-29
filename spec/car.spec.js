'use strict';

var Car = require('../dist/car.js').Car;

describe('Car', function () {
    var car = void 0;

    beforeEach(function () {
        car = new Car();
    });

    it('should stand still', function () {
        var isDriving = car.isDriving();
        expect(isDriving).to.be.false;
    });

    it('should be able to start and stop', function () {
        var isDriving = car.isDriving();
        expect(isDriving).to.be.false;

        car.accelerate();
        isDriving = car.isDriving();
        expect(isDriving).to.be.true;

        car.stop();
        isDriving = car.isDriving();
        expect(isDriving).to.be.false;
    });
});
//# sourceMappingURL=car.spec.js.map
