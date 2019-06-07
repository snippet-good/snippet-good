import React, { Component } from 'react'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import MenuItem from '@material-ui/core/MenuItem'
import configEditor from './configeditor'
import { runCodeResultThunk } from '../../store/codeEditor/actions'
import { connect } from 'react-redux'
import OutputAndButtons from './OutputAndButtons'

class AceEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      codeResponse: '',
      codeError: '',
      editor: {},
      editorTheme: 'monokai',
      editorId: this.props.editorId ? `ace-${this.props.editorId}` : 'ace'
    }
    this.configEditorBinded = configEditor.bind(this)
  }

  componentDidMount() {
    const { code, theme, handleCodeChange } = this.props
    this.setState(
      curState => {
        const editor = ace.edit(curState.editorId)
        if (code) editor.setValue(code)
        if (theme) editor.setTheme(`ace/theme/${theme}`)
        return { ...curState, editor }
      },
      function() {
        const { editor, editorTheme } = this.state
        const editorSession = editor.getSession()
        this.configEditorBinded(
          editor,
          editorSession,
          editorTheme,
          !theme,
          handleCodeChange
        )
      }
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      this.state.editor.setValue(this.props.code)
    }
    if (prevProps.theme !== this.props.theme) {
      this.state.editor.setTheme(`ace/theme/${this.props.theme}`)
    }
  }

  runCode = () => {
    this.setState({ codeResponse: '', codeError: '' }, () => {
      return this.props
        .runCodeResult(this.state.code)
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

  clearCodeResults = () => {
    this.setState({ codeResponse: '', codeError: '' })
  }

  saveCodeToDatabase = () => {
    const { editor, code } = this.state
    return this.props.saveItemWithCodeField(code).then(() => {
      editor.setValue('')
      this.setState({
        code: '',
        codeResponse: '',
        codeError: ''
      })
    })
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.state.editor.setTheme(`ace/theme/${this.state.editorTheme}`)
    })
  }

  render() {
    const { editorTheme, codeError, codeResponse, editorId } = this.state
    const { showRunButton, saveButtonText, theme } = this.props
    const { runCode, clearCodeResults, saveCodeToDatabase } = this
    return (
      <div>
        {!theme && (
          <Select
            value={editorTheme}
            onChange={this.handleChange}
            input={<OutlinedInput name="editorTheme" />}
          >
            {['monokai', 'github', 'tomorrow', 'kuroir'].map(el => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        )}

        <div id={editorId} />
        <OutputAndButtons
          {...{
            codeResponse,
            showRunButton,
            runCode,
            clearCodeResults,
            codeError,
            saveButtonText,
            saveCodeToDatabase
          }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    runCodeResult: code => runCodeResultThunk(code),
    createStretchAnswer: code => dispatch(createStretchAnswerThunk(code))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AceEditor)
