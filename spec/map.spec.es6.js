let jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head></head><body></body></html>');
global.window = document.defaultView;

let MapModel = require('../transpiled/map.js').game.models.Map;
let MapView = require('../transpiled/map.js').game.views.Map;

describe('Map model', () => {
    let map;

    beforeEach(() => {
        map = new MapModel();
    });

    it('should know the height of the area to draw on', () => {
        let height = map.getCanvasHeight();
        expect(height).to.be.above(0);
    });

    it('should know the width of the area to draw on', () => {
        let width = map.getCanvasWidth();
        expect(width).to.be.above(0);
    });

    it('should generate a JSON representation of the map', () => {
        let jsonMap = map.calculateMap();
        expect(jsonMap).to.be.a('string');

        let parsedMap = JSON.parse(jsonMap);
        expect(parsedMap.map).to.be.an('array');
        expect(parsedMap.numRows).to.be.above(0);
        expect(parsedMap.numCols).to.be.above(0);
    });
});

describe('Map view', () => {
    let map;

    beforeEach(() => {
        let node  = document.createElement('div');
        node .setAttribute('id', 'map');
        document.body.appendChild(node );
        node  = document.getElementById('map');
        map = new MapView(node);
    });

    afterEach(() => {
        while(document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render the map state of the model', () => {
        let mapModel = new MapModel();
        let mapState = JSON.parse(mapModel.calculateMap());
        let mapNode  = document.getElementById('map');

        expect(mapNode).not.to.be.null;
        map.render(mapState);

        let numTiles = mapState.numRows * mapState.numCols;
        expect(mapNode.children.length).to.equal(numTiles);
    });
});
