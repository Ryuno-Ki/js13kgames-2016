let jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head></head><body></body></html>');
global.window = document.defaultView;

let CurveModule = require('../transpiled/curve.js').game;
let AbstractCurveView = CurveModule.views.AbstractCurve;
let LeftTopCurveView = CurveModule.views.LeftTopCurve;
let RightTopCurveView = CurveModule.views.RightTopCurve;
let LeftBottomCurveView = CurveModule.views.LeftBottomCurve;
let RightBottomCurveView = CurveModule.views.RightBottomCurve;

let NotImplementedError = require('../transpiled/errors.js').game.errors.NotImplemented;

describe('Abstract curve view', () => {
    let abstractCurve;

    beforeEach(() => {
        abstractCurve = new AbstractCurveView();
    });

    it('should raise an error on render()', () => {
        expect(abstractCurve.render).to.throw(NotImplementedError);
    });
});

describe('Left-top curve view', () => {
    let curve;

    beforeEach(() => {
        curve = new LeftTopCurveView();
    });

    it('should render a svg tile', () => {
        let tileNode = curve.render();
        expect(tileNode.nodeName.toLowerCase()).to.equal('svg');
    });
});

describe('Right-top curve view', () => {
    let curve;

    beforeEach(() => {
        curve = new RightTopCurveView();
    });

    it('should render a svg tile', () => {
        let tileNode = curve.render();
        expect(tileNode.nodeName.toLowerCase()).to.equal('svg');
    });
});

describe('Left-bottom curve view', () => {
    let curve;

    beforeEach(() => {
        curve = new LeftBottomCurveView();
    });

    it('should render a svg tile', () => {
        let tileNode = curve.render();
        expect(tileNode.nodeName.toLowerCase()).to.equal('svg');
    });
});

describe('Right-bottom curve view', () => {
    let curve;

    beforeEach(() => {
        curve = new RightBottomCurveView();
    });

    it('should render a svg tile', () => {
        let tileNode = curve.render();
        expect(tileNode.nodeName.toLowerCase()).to.equal('svg');
    });
});
