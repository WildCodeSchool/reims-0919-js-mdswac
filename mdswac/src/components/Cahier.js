import React from 'react'
import Output from './Output'
import Middle from './Middle'
import Input from './Input'
import CounterBar from './CounterBar'
import Navbar from './Navbar'
import Keyword from './Keyword'

var MarkdownIt = require('markdown-it'),
  md = new MarkdownIt()

class Cahier extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mdText: '',
      renderedText: '',
      mostUsedWord: ''

    }
  }
  handleReset = () => {
    this.setState({ mdText: '***Tu fais quoi cet après-midi ? Tu viens à la démo ? ***', renderedText: "NON, je peux pas ! j'ai Star Wars ! " , mostUsedWord :"Star Wars !!!"})
  }

  handleChange = event => {
    this.setState({
      mdText: event.target.value,
      renderedText: md.render(event.target.value)
    })
    this.handleKeyword()
  }

  handleKeyword = () => {
    let countWord = []
    this.state.mdText.replace('\n', ' ').split(" ").forEach(word => {
      if (countWord.filter(test => test[0] === word).length === 0) {
        const result = [word, 1]
        countWord = [...countWord, result]
      } else {
        countWord.forEach(test => {
          if (test[0] === word) {
            test[1] += 1
          }
        })
      }
    })   
    
    let final = countWord
      .sort((number1, number2) => {
          if (number1[1] === number2[1])
            return number1[0] > number2[0] ? 1 : -1;
          else
            return number1[1] - number2[1];  
          })
      .map((number) => number[0])
    final.reverse()
    this.setState({mostUsedWord: final[0]})
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <Navbar />
          <div className='cahier'>
            <Input
              mdText={this.state.mdText}
              handleChange={this.handleChange}
            />
            <Middle handleReset={this.handleReset}/>
            <Output renderedText={this.state.renderedText} />
          </div>
          <CounterBar mdText={this.state.mdText} handleKeyword={this.handleKeyword} mostUsedWord={this.state.mostUsedWord}/>
          <Keyword mdText={this.state.mdText}/>
        </header>
      </div>
    )
  }
}

export default Cahier