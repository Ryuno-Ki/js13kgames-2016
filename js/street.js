class StreetModel {
    constructor() {
        this.utilisation = 0;
    }

    getUtilisation() {
        return this.utilisation;
    }
}

class StreetView {
    constructor(precursor, successor) {
        this.precursor = precursor || null;
        this.successor = successor || null;
    }

    render() {
        let el = document.createElement('svg');
        el.setAttribute('viewBox', '0 0 100 100');
        el.setAttribute('version', '1.1');
        el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        el.setAttribute('height', '60');
        el.setAttribute('width', '60');

        let g = document.createElement('g');
        let leftBoundary = document.createElement('path');
        leftBoundary.setAttribute('d', 'M0 33H100');
        let rightBoundary = document.createElement('path');
        leftBoundary.setAttribute('d', 'M0 67H100');
        let middleBoundary = document.createElement('path');
        middleBoundary.setAttribute('d', 'M0 50H10');

        g.appendChild(leftBoundary);
        g.appendChild(middleBoundary);
        g.appendChild(rightBoundary);
        el.appendChild(g);
        return el;
    }

    enter() {
    }
}

export { StreetModel, StreetView };
