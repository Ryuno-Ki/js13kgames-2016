let TrafficLightModel = require('../dist/trafficLight.js').game.models.TrafficLight;

describe('TrafficLight', () => {
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
