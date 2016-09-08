let TrafficLightModule = require('../transpiled/trafficLight.js').game;
let TrafficLightModel = TrafficLightModule.models.TrafficLight;
let TrafficLightView = TrafficLightModule.views.TrafficLight;

describe('TrafficLight module', () => {
    let trafficLight;

    beforeEach(() => {
        trafficLight = new TrafficLightModel();
    });

    it('should have three states: red, yellow, green', () => {
        let states = trafficLight.getStates();
        expect(states).to.deep.equal(['red', 'yellow', 'green']);
    });

    it('default to red state', () => {
        let state = trafficLight.getState();
        expect(state).to.equal('red');
    });

    it('should cycle through the states', () => {
        let state = trafficLight.getState();
        expect(state).to.equal('red');

        trafficLight.cycle();
        state = trafficLight.getState();
        expect(state).to.equal('yellow');

        trafficLight.cycle();
        state = trafficLight.getState();
        expect(state).to.equal('green');

        trafficLight.cycle();
        state = trafficLight.getState();
        expect(state).to.equal('yellow');

        trafficLight.cycle();
        state = trafficLight.getState();
        expect(state).to.equal('red');
    });
});

describe('TrafficLight view', () => {
    let trafficLight;

    beforeEach(() => {
        trafficLight = new TrafficLightView();
    });

    it('should render', () => {
        let renderedSprite = trafficLight.render();
        expect(renderedSprite.nodeName.toLowerCase()).to.equal('svg');
        expect(renderedSprite.className).to.contain('traffic-light');
    });
});
