import { Street } from '../dist/street.js';

describe('Street', () => {
    let street;

    beforeEach(() => {
        street = new Street();
    });

    it('should have zero utilisation', () => {
        let utilisation = street.getUtilisation();
        expect(utilisation).to.equal(0);
    });
});
