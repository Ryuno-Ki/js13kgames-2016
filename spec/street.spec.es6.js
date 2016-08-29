let jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head></head><body></body></html>');

import { StreetModel, StreetView } from '../dist/street.js';

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

describe('Street view', () => {
    let street;

    beforeEach(() => {
        street = new StreetView();
    });

    it('should render a svg tile', () => {
        let tileNode = street.render();
        expect(tileNode).not.to.be.null;
    });

    it('should show a car on enter', () => {
        let tileNode = street.render();
        let carsOnTile = street.getCarsOnIt();
        expect(carsOnTile).to.equal(0);

        let carMock = {};
        street.enter(carMock);
        expect(carsOnTile).to.be.greater.than(0);
    });

    it('should emit an event if a car is about to leave its tile', (done) => {
        let carMock = {};
        street.enter(carMock);
        expect(street).to.trigger('car-leaving');
    });
});
