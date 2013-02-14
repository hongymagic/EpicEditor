/*global createContainer:false, removeContainer:false, rnd:false, getIframeDoc:false */

describe('.getSelection()', function () {
  var testEl
    , id
    , editor
    , wrapperIframe
    , innerWrapper;

  before(function (done) {
    id = rnd();
    testEl = createContainer(id)
    editor = new EpicEditor({ basePath: '/epiceditor/', container: testEl }).load()
    wrapperIframe = document.getElementById(id).getElementsByTagName('iframe')[0];
    innerWrapper = getIframeDoc(wrapperIframe);
    done();
  });

  after(function (done) {
    if (editor.is('loaded')) {
      editor.unload();
    }
    removeContainer(id);
    done();
  })

  it('should return Selection object', function () {
    var selection = editor.getSelection();
    expect(selection).to.be.a(editor.editorIframe.contentWindow.Selection)
  });

  it('should have rangeCount property', function () {
    var selection = editor.getSelection();
    expect(selection).to.have.property('rangeCount');
  });

  it('should have default rangeCount of 0', function () {
    var selection = editor.getSelection();
    expect(selection.rangeCount).to.be(0);
  });
});
