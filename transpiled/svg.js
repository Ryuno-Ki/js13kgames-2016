(function() {
  var AbstractSvgView, base, root;

  AbstractSvgView = (function() {
    function AbstractSvgView() {}

    AbstractSvgView.prototype.getTileContext = function() {
      var svgNode, svgns;
      svgns = this.getTileContextNamespace();
      svgNode = document.createElementNS(svgns, 'svg');
      svgNode.setAttribute('viewBox', '0 0 100 100');
      svgNode.setAttribute('xmlns', svgns);
      svgNode.setAttribute('version', '1.1');
      return svgNode;
    };

    AbstractSvgView.prototype.getTileContextNamespace = function() {
      return 'http://www.w3.org/2000/svg';
    };

    return AbstractSvgView;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).views == null) {
    base.views = {};
  }

  root.game.views.AbstractSvg = AbstractSvgView;

}).call(this);
