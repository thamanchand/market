import React from 'react'
import {GITHUB_USERNAME} from '../PUBLIC_KEY.js'

const BASE_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/freemarket/contents`

export function SelectDB(data,path,filename){
  class SelectDB extends React.Component{
    constructor(props){
      super(props)
      this.state={
        options:[]
        // options:data[path][0].map(x=>x.title)
      }
    }
    handleChange = e => {
      this.props.onChange(e.target.value);
    };
    componentDidMount(){
      // fetch("https://api.github.com/repos/marchingband/freemarket/contents/content/regionsAndCarriers/carriers.json",{ method:"GET" })
      fetch(`${BASE_URL}/content/${path}/${filename}.json`,{ method:"GET" })
      .then(r=>r.json())
      .then(r=>{
        var data = JSON.parse(atob(r.content))
        var options = data[filename] ? data[filename].map(x=>x.title) : []
        this.setState({options})
      })
    }
    
    render(){
      const {forID,value,classNameWrapper,setActiveStyle,setInactiveStyle} = this.props
      return(
        <div>
          <select
            id={forID}
            value={value || ''}
            onChange={this.handleChange}
            className={classNameWrapper}
            onFocus={setActiveStyle}
            onBlur={setInactiveStyle}
          >
            <option value={""} disabled={true} selected={true} hidden={true}>Please Choose...</option>
            {this.state.options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
    }
  }
  return SelectDB
}