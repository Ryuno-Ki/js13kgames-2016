let jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head></head><body></body></html>');
global.window = document.defaultView;

let CarView = require('../transpiled/car.js').game.views.Car;
let StreetModule = require('../transpiled/street.js').game;
let StreetModel = StreetModule.models.Street;

let AbstractStreetView = StreetModule.views.AbstractStreet;
let StreetView = StreetModule.views.Street;

let NotImplementedError = require('../transpiled/errors.js').game.errors.NotImplemented;

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

describe('Abstract street view', () => {
    let abstractStreet;

    beforeEach(() => {
        abstractStreet = new AbstractStreetView();
    });

    it('should have a precursor', () => {
        let precursor = abstractStreet.getTileBefore();
        expect(precursor).to.be.null;
    });

    it('should have a successor', () => {
        let successor = abstractStreet.getTileAfter();
        expect(successor).to.be.null;
    });

    it('should provide a name space for its context', () => {
        let namespace = abstractStreet.getTileContextNamespace();
        expect(namespace).to.equal('http://www.w3.org/2000/svg');
    });

    it('should provide a context to render in', () => {
        let svgNode = abstractStreet.getTileContext();
        expect(svgNode.nodeName.toLowerCase()).to.equal('svg');
    });

    it('should throw an error on calls of render()', () => {
        expect(abstractStreet.render).to.throw(NotImplementedError);
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
        carsOnTile = street.getCarsOnIt();
        expect(carsOnTile).to.be.above(0);
    });

    it('should emit an event if a car is about to leave its tile', (done) => {
        let eventFired = false;
        let car = new CarView();
        car.on('car-leaving', () => {
            eventFired = true;
            done();
        });

        street.enter(car);
        expect(eventFired).to.be.true;
    });
});
