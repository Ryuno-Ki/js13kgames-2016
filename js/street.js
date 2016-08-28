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

    render(node) {
        let el = document.createElement('svg');
        let svgProperties = {
            viewBox: '0 0 100 100',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
            height: '60',
            width: '60'
        };
        
        for (let prop in svgProperties) {
            if (svgProperties.hasOwnProperty(prop)) {
                el.setAttribute(prop, svgProperties[prop]);
            }
        }

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
        node.appendChild(el);
    }
}

export { StreetModel };
