let AbstractSvgModule = require('../transpiled/svg.js').game;
let AbstractSvgView = AbstractSvgModule.views.AbstractSvg;

describe('AbstractSvg view', () => {
    let abstractSvg;

    beforeEach(() => {
        abstractSvg = new AbstractSvgView();
    });

    it('should provide a namespace', () => {
        let namespace = abstractSvg.getTileContextNamespace();
        expect(namespace).to.equal('http://www.w3.org/2000/svg');
    });

    it('should provide a context', () => {
        let context = abstractSvg.getTileContext();
        expect(context.nodeName.toLowerCase()).to.equal('svg');
        expect(context.getAttribute('viewBox')).to.exist;
    });
});
