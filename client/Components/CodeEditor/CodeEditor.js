import React, { Component } from 'react'
import axios from 'axios'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import MenuItem from '@material-ui/core/MenuItem'
import configEditor from './EditorConfigFunction'

class AceEditor extends Component {
  constructor() {
    super()
    this.state = {
      code: '',
      codeResponse: '',
      codeError: '',
      editor: {},
      editorTheme: 'monokai'
    }
    this.configEditorBinded = configEditor.bind(this)
  }

  componentDidMount() {
    this.setState({ editor: ace.edit('ace') }, function() {
      const { editor } = this.state
      const editorSession = editor.getSession()
      this.configEditorBinded(editor, editorSession, this.state.editorTheme)
    })
  }

  runCode = () => {
    this.setState({ codeResponse: '', codeError: '' }, () => {
      return axios
        .post('/api/code/runcode', { code: this.state.code })
        .then(({ data }) => {
          this.setState({
            codeResponse: String(data)
          })
        })
        .catch(({ response: { data } }) => {
          this.setState({ codeError: data })
        })
    })
  }

  submit = () => {
    const { editor } = this.state
    axios.post('/api/code', { body: this.state.code }).then(() => {
      editor.setValue('')
      this.setState({
        code: '',
        codeResponse: '',
        codeError: ''
      })
    })
  }

  showSavedCode = () => {
    const { editor } = this.state

    axios.get('/api/code').then(({ data: { body } }) => {
      this.setState({ code: body }, () => {
        editor.setValue(this.state.code)
      })
    })
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.state.editor.setTheme(`ace/theme/${this.state.editorTheme}`)
    })
  }

  render() {
    return (
      <div>
        <Select
          value={this.state.editorTheme}
          onChange={this.handleChange}
          input={<OutlinedInput name="editorTheme" />}
        >
          {['monokai', 'github', 'tomorrow', 'kuroir'].map(el => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>

        <div id="ace" style={{ width: '50%' }} />
        {this.state.codeResponse &&
          this.state.codeResponse
            .split('\n')
            .map((el, index) => <li key={index}>{el}</li>)}
        {this.state.codeError && <div>{this.state.codeError}</div>}
        <button type="button" onClick={this.runCode}>
          run code
        </button>

        <button type="button" onClick={this.submit}>
          submit
        </button>
        <button type="button" onClick={this.showSavedCode}>
          test reshowing
        </button>
      </div>
    )
  }
}

export default AceEditor
