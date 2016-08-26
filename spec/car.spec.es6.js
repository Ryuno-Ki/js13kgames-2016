import { Car } from '../dist/car.js';

describe('Car', () => {
    let car;

    beforeEach(() => {
        car = new Car();
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
