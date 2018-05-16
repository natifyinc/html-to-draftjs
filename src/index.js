import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from './library';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';

// in constructor, I use your code above, but I change outputEditorState to inputEditorState
// in the first Editor, I use this.state.inputEditorState as editorState

class Playground extends Component {

  // state = {
  //   outputEditorState: undefined,
  // }

  constructor(props) {
    super(props)
    const html = '';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks, contentBlock.entityMap);
      const inputEditorState = EditorState.createWithContent(contentState);
      this.state = {
        inputEditorState,
      };
    }
  }

  onInputEditorChange = (inputEditorState) => {
    const rawContent = convertToRaw(inputEditorState.getCurrentContent());
    const html = draftToHtml(rawContent);
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const outputEditorState = EditorState.createWithContent(contentState);
      this.setState({
        inputEditorState,
        outputEditorState,
      });
    }
  }

  render() {
    // value={this.state.inputEditorState && draftToHtml(convertToRaw(this.state.inputEditorState.getCurrentContent()))}
    return (
      <div>
        <div style={{ height: 200 }}>
          <Editor
            editorState={this.state.inputEditorState}
            onEditorStateChange={this.onInputEditorChange}
            mention={{
              separator: ' ',
              trigger: '@',
              suggestions: [
                { text: 'A', value: 'a', url: 'href-a' },
                { text: 'AB', value: 'ab', url: 'href-ab' },
                { text: 'ABC', value: 'abc', url: 'href-abc' },
                { text: 'ABCD', value: 'abcd', url: 'href-abcd' },
                { text: 'ABCDE', value: 'abcde', url: 'href-abcde' },
                { text: 'ABCDEF', value: 'abcdef', url: 'href-abcdef' },
                { text: 'ABCDEFG', value: 'abcdefg', url: 'href-abcdefg' },
              ],
            }}
          />
        </div>
        <div style={{ height: 200 }}>
          <textarea
            disabled
            className="demo-content"
            value={this.state.inputEditorState && draftToHtml(convertToRaw(this.state.inputEditorState.getCurrentContent()))}
          />
        </div>
        <div style={{ height: 200 }}>
        <Editor
          editorState={this.state.outputEditorState}
        />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Playground />,
  document.getElementById('root')
);
