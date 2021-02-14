import React, {ChangeEvent, FC, ReactElement, useEffect, useState, KeyboardEvent, useRef} from "react";
import classNames from 'classnames'

import Input, {InputProps} from "../Input/input";
import Icon from "../Icon";
import Transition from "../Transition";

import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject {
    value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {fetchSuggestions, renderOption, onSelect, value, ...restProps} = props

    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const [highIndex, setHighIndex] = useState(-1)
    const [showDropdown, setShowDropdown] = useState(false)

    const triggerSearch = useRef(false)
    const autoCompleteRef = useRef(null)

    const debounceValue = useDebounce(inputValue, 300)
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            const result = fetchSuggestions(inputValue)

            if (result instanceof Promise) {
                setLoading(true)
                result.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                })
            } else {
                setSuggestions(result)
                if (result.length > 0) {
                    setShowDropdown(true)
                }
            }
        } else {
            setShowDropdown(false)
        }
        setHighIndex(-1)
    }, [debounceValue])

    useClickOutside(autoCompleteRef, () => {
        setSuggestions([])
        setShowDropdown(false)
    })


    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length - 1) {
            index = suggestions.length - 1
        }
        setHighIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highIndex]) {
                    handleSelect(suggestions[highIndex])
                }
                break;

            case 38:
                highlight(highIndex - 1)
                break;

            case 40:
                highlight(highIndex + 1)
                break;

            case 27:
                setSuggestions([])
                setShowDropdown(false)
                break;
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        triggerSearch.current = true
        const value = e.target.value.trim()
        setInputValue(value)
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        setShowDropdown(false)
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        return (
            <Transition in={showDropdown || loading} timeout={100} animation="zoom-in-top">
                <ul className="mo-suggestion-list">

                    {loading && <ul className="suggestion-loading-icon "><Icon icon="spinner" spin/></ul>}
                    {!loading && suggestions.map((item, index) => {
                        const classnames = classNames('suggestion-item', {
                            'is-active': index === highIndex
                        })
                        return (
                            <li key={index} className={classnames}
                                onClick={() => handleSelect(item)}>{renderTemplate(item)}</li>
                        )
                    })}
                </ul>
            </Transition>

        )
    }
    return <div className="mo-auto-complete" ref={autoCompleteRef}>
        <Input value={inputValue} onChange={handleChange} {...restProps} onKeyDown={handleKeyDown}/>
        {(suggestions.length > 0) && generateDropdown()}
    </div>
}

export default AutoComplete;