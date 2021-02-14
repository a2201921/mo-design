import React from 'react'
import ReactDOM from 'react-dom'
import Upload from './components/Upload'

export { default as AutoComplete } from './components/AutoComplete'
export { default as Button } from './components/Button'
export { default as Icon } from './components/Icon'
export { default as Input } from './components/Input'
export { default as Menu } from './components/Menu'
export { default as Progress } from './components/Progress'
export { default as Transition } from './components/Transition'
export { default as Upload } from './components/Upload'



const App = () => {
    return (<Upload
        action="https://jsonplaceholder.typicode.com/posts"
        name="fileName"
        data={{ 'key': 'value' }}
        accept=".jpg"
        multiple
        drag
        headers={{ 'X-Powered-By': 'mo-design' }}
    >
        Click to upload
    </Upload>)
}

ReactDOM.render(<App />, document.getElementById('root'))