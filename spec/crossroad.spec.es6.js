let jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head></head><body></body></html>');
global.window = document.defaultView;

let CrossroadModule = require('../dist/crossroad.js').game;
let CrossroadModel = CrossroadModule.models.Crossroad;
let CrossroadView = CrossroadModule.views.Crossroad;

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

describe('Crossroad view', () => {
    let crossroad;

    beforeEach(() => {
        crossroad = new CrossroadView();
    });

    it('should render a svg tile', () => {
        let tileNode = crossroad.render();
        expect(tileNode).not.to.be.null;
    });
});
