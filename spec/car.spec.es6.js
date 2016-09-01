let CarModule = require('../transpiled/car.js').game;
let CarModel = CarModule.models.Car;
let CarView = CarModule.views.Car;

describe('Car model', () => {
    let car;

    beforeEach(() => {
        car = new CarModel();
    });

    it('should stand still', () => {
        let isDriving = car.isDriving();
        expect(isDriving).to.be.false;
    });

    it('should be able to start and stop', () => {
        let isDriving = car.isDriving();
        expect(isDriving).to.be.false;

        car.accelerate();
        isDriving = car.isDriving();
        expect(isDriving).to.be.true;

        car.stop();
        isDriving = car.isDriving();
        expect(isDriving).to.be.false;
    });
});

describe('Car view', () => {
    let car;

    beforeEach(() => {
        car = new CarView();
    });

    it('should render', () => {
        let renderedObject = car.render();
        expect(renderedObject.nodeName.toLowerCase()).to.equal('svg');
    });
});
