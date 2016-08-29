let CrossroadModel = require('../dist/crossroad.js').game.models.Crossroad;

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
