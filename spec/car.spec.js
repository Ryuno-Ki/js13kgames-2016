'use strict';

var CarModule = require('../transpiled/car.js').game;
var CarModel = CarModule.models.Car;
var CarView = CarModule.views.Car;

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

describe('Car view', function () {
    var car = void 0;

    beforeEach(function () {
        car = new CarView();
    });

    it('should render', function () {
        var renderedSprite = car.render();
        expect(renderedSprite.nodeName.toLowerCase()).to.equal('svg');
        expect(renderedSprite.className).to.contain('car');
    });
});
//# sourceMappingURL=car.spec.js.map
