import { Crossroad } from '../dist/crossroad.js';

describe('Crossroad', () => {
    let crossroad;

    beforeEach(() => {
        crossroad = new Crossroad();
    });

    it('should have zero utilisation', () => {
        let utilisation = crossroad.getUtilisation();
        expect(utilisation).to.equal(0);
    });
});
