import { StreetModel } from '../dist/street.js';

describe('Street model', () => {
    let street;

    beforeEach(() => {
        street = new StreetModel();
    });

    it('should have zero utilisation', () => {
        let utilisation = street.getUtilisation();
        expect(utilisation).to.equal(0);
    });
});
