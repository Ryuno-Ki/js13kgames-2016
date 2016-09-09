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
        let environment;

        beforeEach(() => {
            environment = {
                above: MapModel.SIGNS.ANY,
                below: MapModel.SIGNS.ANY,
                leftHand: MapModel.SIGNS.ANY,
                rightHand: MapModel.SIGNS.ANY
            };
        });

        it('should pick right bottom curve for the top left corner', () => {
            environment.above = null;
            environment.leftHand = null;
            let tile = map.filterTileCandidates(environment);
            expect(tile).to.deep.equal([MapModel.SIGNS.RIGHT_BOTTOM]);
        });

        it('should pick left bottom curve for the top right corner', () => {
            environment.above = null;
            environment.rightHand = null;
            let tile = map.filterTileCandidates(environment);
            expect(tile).to.deep.equal([MapModel.SIGNS.LEFT_BOTTOM]);
        });

        it('should pick left top curve for the bottom right corner', () => {
            environment.below = null;
            environment.rightHand = null;
            let tile = map.filterTileCandidates(environment);
            expect(tile).to.deep.equal([MapModel.SIGNS.LEFT_TOP]);
        });

        it('should pick right top curve for the bottom left corner', () => {
            environment.below = null;
            environment.leftHand = null;
            let tile = map.filterTileCandidates(environment);
            expect(tile).to.deep.equal([MapModel.SIGNS.RIGHT_TOP]);
        });

        it('should pick a street or curve on the top edge', () => {
            environment.above = null;
            let tile = map.filterTileCandidates(environment).sort();
            let expectedTiles = [];
            expectedTiles.push(MapModel.SIGNS.HORIZONTAL);
            expectedTiles.push(MapModel.SIGNS.LEFT_BOTTOM);
            expectedTiles.push(MapModel.SIGNS.RIGHT_BOTTOM);
            expectedTiles.sort();
            expect(tile).to.deep.equal(expectedTiles);
        });

        it('should pick the horizontal or top curve on the bottom edge', () => {
            environment.below = null;
            let tile = map.filterTileCandidates(environment).sort();
            let expectedTiles= [];
            expectedTiles.push(MapModel.SIGNS.HORIZONTAL);
            expectedTiles.push(MapModel.SIGNS.LEFT_TOP);
            expectedTiles.push(MapModel.SIGNS.RIGHT_TOP);
            expectedTiles.sort();
            expect(tile).to.deep.equal(expectedTiles);
        });

        it('should pick the vertical street on the left edge', () => {
            environment.leftHand = null;
            let tile = map.filterTileCandidates(environment).sort();
            let expectedTiles= [];
            expectedTiles.push(MapModel.SIGNS.VERTICAL);
            expectedTiles.push(MapModel.SIGNS.RIGHT_TOP);
            expectedTiles.push(MapModel.SIGNS.RIGHT_BOTTOM);
            expectedTiles.sort();
            expect(tile).to.deep.equal(expectedTiles);
        });

        it('should pick the vertical street on the right edge', () => {
            environment.rightHand = null;
            let tile = map.filterTileCandidates(environment).sort();
            let expectedTiles= [];
            expectedTiles.push(MapModel.SIGNS.VERTICAL);
            expectedTiles.push(MapModel.SIGNS.LEFT_TOP);
            expectedTiles.push(MapModel.SIGNS.LEFT_BOTTOM);
            expectedTiles.sort();
            expect(tile).to.deep.equal(expectedTiles);
        });

        it('should pick either horizontal or left bottom curve', () => {
            environment.above = MapModel.SIGNS.HORIZONTAL;
            // HORIZONTAL covers RIGHT_TOP and RIGHT_BOTTOM as well.
            // Top curves, VERTICAL and CROSSROAD are not possible
            // due to above == null
            environment.leftHand = MapModel.SIGNS.HORIZONTAL;
            let tile = map.filterTileCandidates(environment).sort();
            let expectedTiles = [];
            expectedTiles.push(MapModel.SIGNS.LEFT_BOTTOM);
            expectedTiles.push(MapModel.SIGNS.HORIZONTAL);
            expectedTiles.sort();
            expect(tile).to.deep.equal(expectedTiles);
        });

        it('should pick either horizontal or left bottom curve', () => {
            environment.above = MapModel.SIGNS.HORIZONTAL;
            // HORIZONTAL covers RIGHT_TOP and RIGHT_BOTTOM as well.
            // Top curves, VERTICAL and CROSSROAD are not possible
            // due to above == HORIZONTAL
            environment.leftHand = MapModel.SIGNS.HORIZONTAL;
            let tile = map.filterTileCandidates(environment).sort();
            let expectedTiles = [];
            expectedTiles.push(MapModel.SIGNS.LEFT_BOTTOM);
            expectedTiles.push(MapModel.SIGNS.HORIZONTAL);
            expectedTiles.sort();
            expect(tile).to.deep.equal(expectedTiles);
        });

        it('should pick either crossroad or left top curve', () => {
            environment.above = MapModel.SIGNS.VERTICAL;
            // VERTICAL covers LEFT_BOTTOM and RIGHT_BOTTOM as well.
            // RIGHT_BOTTOM, HORIZONTAL and VERTICAL are not possible
            // due to leftHand == HORIZONTAL
            environment.leftHand = MapModel.SIGNS.HORIZONTAL;
            let tile = map.filterTileCandidates(environment).sort();
            let expectedTiles = [];
            expectedTiles.push(MapModel.SIGNS.LEFT_TOP);
            expectedTiles.push(MapModel.SIGNS.CROSSROAD);
            expectedTiles.sort();
            expect(tile).to.deep.equal(expectedTiles);
        });

        it('should pick either vertical or right top curve', () => {
            environment.above = MapModel.SIGNS.VERTICAL;
            environment.leftHand = MapModel.SIGNS.VERTICAL;
            // VERTICAL covers LEFT_BOTTOM and RIGHT_BOTTOM as well.
            // Left curves, HORIZONTAL and CROSSROAD are not possible
            // due to leftHand == null
            let tile = map.filterTileCandidates(environment).sort();
            let expectedTiles = [];
            expectedTiles.push(MapModel.SIGNS.RIGHT_TOP);
            expectedTiles.push(MapModel.SIGNS.VERTICAL);
            expectedTiles.sort();
            expect(tile).to.deep.equal(expectedTiles);
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
        let mapNode = map.render(mapState);

        let numTiles = mapState.numRows * mapState.numCols;
        expect(mapNode.children.length).to.equal(numTiles);
    });

    it('should spawn cars on the map', () => {
        let mapModel = new MapModel();
        let mapState = JSON.parse(mapModel.calculateMap());
        map.render(mapState);
        let tileToSpawn = map.spawnCar();
        let carOnTile = tileToSpawn.querySelector('.car');
        expect(carOnTile).not.to.be.null;
    });

    it('should spawn a new car on click', () => {
        let mapModel = new MapModel();
        let mapState = JSON.parse(mapModel.calculateMap());
        let renderedMap = map.render(mapState);

        // Old style for creating and dispatching events
        let clickEvent = document.createEvent('Event');
        clickEvent.initEvent('click', true, true);
        renderedMap.dispatchEvent(clickEvent);

        let carOnTile = renderedMap.querySelector('.car');
        expect(carOnTile).not.to.be.null;
    });

    it('should move the car to the next tile', () => {
        let mapModel = new MapModel();
        let mapState = JSON.parse(mapModel.calculateMap());
        let renderedMap = map.render(mapState);

        // Old style for creating and dispatching events
        let clickEvent = document.createEvent('Event');
        clickEvent.initEvent('click', true, true);
        renderedMap.dispatchEvent(clickEvent);

        let carOnTile = renderedMap.querySelector('.car');
        let tileWithCar = carOnTile.parentNode;
        expect(tileWithCar.previousSibling.querySelector('.car')).to.be.null;

        let animationEndEvent = document.createEvent('Event');
        animationEndEvent.initEvent('animationend', true, true);
        carOnTile.dispatchEvent(animationEndEvent);
        expect(tileWithCar.previousSibling.querySelector('.car')).not.to.be.null;
    });
});
