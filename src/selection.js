/**
 * EpicEditor#selection module
 */
(function (editor) {

  function _getSelection(editor) {
    return editor.editorIframeDocument.getSelection();
  }

  function Selection(editor) {
    this.editor = editor;
  }

  Selection.prototype.prepend = function (text) {
    var selection = _getSelection(this.editor);
    var iframeDocument = this.editor.editorIframeDocument;
    var range;
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
      range.insertNode(iframeDocument.createTextNode(text));
      selection.removeAllRanges();
      selection.addRange(range);
    }
    return this;
  };

  Selection.prototype.append = function (text) {
    var selection = _getSelection(this.editor);
    var iframeDocument = this.editor.editorIframeDocument;
    var range;
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      range.insertNode(iframeDocument.createTextNode(text));
      selection.removeAllRanges();
      selection.addRange(range);
    }
    return this;
  };

  EpicEditor.prototype.selection = function () {
    return new Selection(this);
  };

})(EpicEditor);
