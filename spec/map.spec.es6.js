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
    
    it('should have a static dict of its DSL', () => {
        let mapSigns = MapModel.SIGNS;
        let signKeys = [];
        signKeys.push('LEFT_TOP');
        signKeys.push('RIGHT_TOP');
        signKeys.push('RIGHT_BOTTOM');
        signKeys.push('LEFT_BOTTOM');
        signKeys.push('HORIZONTAL');
        signKeys.push('VERTICAL');
        signKeys.push('CROSSROAD');
        expect(mapSigns).to.include.keys(signKeys);
    });

    it('should know the height of the area to draw on', () => {
        let height = map.getCanvasHeight();
        expect(height).to.be.above(0);
    });

    it('should know the width of the area to draw on', () => {
        let width = map.getCanvasWidth();
        expect(width).to.be.above(0);
    });

    describe('when selecting the correct tile', () => {
        it('should pick right bottom curve for the top left corner', () => {
            let environment = {
                above: null,
                below: MapModel.SIGNS.ANY,
                leftHand: null,
                rightHand: MapModel.SIGNS.ANY
            };
            let tile = map.pickTile(environment);
            expect(tile).to.equal(MapModel.SIGNS.RIGHT_BOTTOM);
        });

        it('should pick left bottom curve for the top right corner', () => {
            let environment = {
                above: null,
                below: MapModel.SIGNS.ANY,
                leftHand: MapModel.SIGNS.ANY,
                rightHand: null
            };
            let tile = map.pickTile(environment);
            expect(tile).to.equal(MapModel.SIGNS.LEFT_BOTTOM);
        });

        it('should pick left top curve for the bottom right corner', () => {
            let environment = {
                above: MapModel.SIGNS.ANY,
                below: null,
                leftHand: MapModel.SIGNS.ANY,
                rightHand: null
            };
            let tile = map.pickTile(environment);
            expect(tile).to.equal(MapModel.SIGNS.LEFT_TOP);
        });

        it('should pick right top curve for the bottom left corner', () => {
            let environment = {
                above: MapModel.SIGNS.ANY,
                below: null,
                leftHand: null,
                rightHand: MapModel.SIGNS.ANY
            };
            let tile = map.pickTile(environment);
            expect(tile).to.equal(MapModel.SIGNS.RIGHT_TOP);
        });
    });

    it('should generate a JSON representation of the map', () => {
        map = new MapModel(360, 300);
        let jsonMap = map.calculateMap();
        expect(jsonMap).to.be.a('string');

        let parsedMap = JSON.parse(jsonMap);
        let mapData = parsedMap.map;
        let numRows = parsedMap.numRows;
        let numCols = parsedMap.numCols;

        expect(numRows).to.equal(6);
        expect(numCols).to.equal(5);

        expect(mapData).to.be.an('array');
        expect(mapData.length).to.equal(numRows);
        expect(mapData[0].length).to.equal(numCols);
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
