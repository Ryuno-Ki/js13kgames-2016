import { TrafficLight } from '../dist/trafficLight.js';

describe('TrafficLight', () => {
    let trafficLight;

    beforeEach(() => {
        trafficLight = new TrafficLight();
    });

    it('should have three states: green, yellow, red', () => {
        let states = trafficLight.getStates();
        expect(states).to.equal(['green', 'yellow', 'red']);
    });

    it('default to red state', () => {
        let state = trafficLight.getState();
        expect(state).to.equal('red');
    });

    it('should cycle through the states', () => {
        let state = trafficLight.getState();
        expect(state).to.equal('red');

        trafficLight.cycle();
        expect(state).to.equal('yellow');

        trafficLight.cycle();
        expect(state).to.equal('green');

        trafficLight.cycle();
        expect(state).to.equal('yellow');

        trafficLight.cycle();
        expect(state).to.equal('red');
    });
});
