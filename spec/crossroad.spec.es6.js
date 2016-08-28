import { CrossroadModel } from '../dist/crossroad.js';

describe('Crossroad model', () => {
    let crossroad;

    beforeEach(() => {
        crossroad = new CrossroadModel();
    });

    it('should have zero utilisation', () => {
        let utilisation = crossroad.getUtilisation();
        expect(utilisation).to.equal(0);
    });
});
