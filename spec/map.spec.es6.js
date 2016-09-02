let MapModel = require('../transpiled/map.js').game.models.Map;

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
        expect(parsedMap).to.be.an('array');
        expect(parsedMap.length).to.be.above(0);
        expect(parsedMap[0]).to.be.an('array');
        expect(parsedMap[0].length).to.be.above(0);
        expect(parsedMap[0][0]).to.be.a('string');
    });
});
