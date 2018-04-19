'use babel';

import IndentatorView from './indentator-view';
import { CompositeDisposable } from 'atom';

export default {

  indentatorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.indentatorView = new IndentatorView(state.indentatorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.indentatorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'indentator:use': () => this.use()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.indentatorView.destroy();
  },

  serialize() {
    return {
      indentatorViewState: this.indentatorView.serialize()
    };
  },

  use() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      position = editor.getCursorBufferPosition()
    	editor.selectAll()
    	editor.autoIndentSelectedRows()
    	editor.clearSelections()
    	editor.setCursorBufferPosition(position)
    }
  }
};
