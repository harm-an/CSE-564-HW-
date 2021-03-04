import React from "react";
import "../App.css"
import Select from 'react-select'
import { ReactComponent as Logo } from '../icons/logo.svg';

// const options = [
//     { value: 'countries', label: 'Countries' },
//     { value: 'draft_years', label: 'Draft Years' },
//     { value: 'countries', label: 'Countries' },
//     { value: 'draft_years', label: 'Draft Years' },
//     { value: 'countries', label: 'Countries' },
//     { value: 'draft_years', label: 'Draft Years' },
//     { value: 'countries', label: 'Countries' },
//     { value: 'draft_years', label: 'Draft Years' }
//   ]

const options = require("../data/dropDownOptions.json")
  
class ToolBar extends React.Component {

    changeAttr = (selected) => {
        //console.log(selected.value)
        this.props.onDropDownChange(selected.value)
        //alert(event.target.val);
    }
    render() {

        return (
            <div className="toolbar">
                <Logo className="mylogo"/>
                <Select 
                    options={options}
                    defaultValue={options[0]} 
                    className = "dropDown"
                    label="Hello"
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                        ...theme.colors,
                          text: 'white',
                          primary25: '#82FC6B',
                          neutral0: '#05050F',
                        },
                    })}
                    styles={
                        {
                            option: provided => ({
                                ...provided,
                                color: 'white'
                            }),
                            control: provided => ({
                                ...provided,
                                color: 'white'
                            }),
                            focus: provided => ({
                                ...provided,
                                color: 'white'

                            })
                        }
                    }
                    onChange={this.changeAttr}
                    />
                    <text class="project-title">MINI PROJECT 1: NBA 2K21 DATA VISUALIZATION</text>
            </div>
        )
    }
}

export default ToolBar