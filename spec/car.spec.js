'use strict';

var CarModel = require('../transpiled/car.js').game.models.Car;

describe('Car model', function () {
    var car = void 0;

    beforeEach(function () {
        car = new CarModel();
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
