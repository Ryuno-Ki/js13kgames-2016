let jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head></head><body></body></html>');
global.window = document.defaultView;

let CarView = require('../transpiled/car.js').game.views.Car;
let StreetModule = require('../transpiled/street.js').game;
let StreetModel = StreetModule.models.Street;

let AbstractStreetView = StreetModule.views.AbstractStreet;
let VerticalStreetView = StreetModule.views.VerticalStreet;
let HorizontalStreetView = StreetModule.views.HorizontalStreet;

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

describe('Horizontal street view', () => {
    let street;

    beforeEach(() => {
        street = new HorizontalStreetView();
    });

    it('should inherit from AbstractStreetView', () => {
        expect(street).to.be.an.instanceof(AbstractStreetView);
    });

    it('should render a svg tile', () => {
        let tileNode = street.render();
        expect(tileNode.nodeName.toLowerCase()).to.equal('svg');
        expect(tileNode.className).to.contain('street');
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

describe('Vertical street view', () => {
    let street;

    beforeEach(() => {
        street = new VerticalStreetView();
    });

    it('should inherit from AbstractStreetView', () => {
        expect(street).to.be.an.instanceof(AbstractStreetView);
    });

    it('should render a svg tile', () => {
        let tileNode = street.render();
        expect(tileNode.nodeName.toLowerCase()).to.equal('svg');
    });
});
