var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState, useRef } from "react";
import classNames from 'classnames';
import Input from "../Input/input";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, renderOption = props.renderOption, onSelect = props.onSelect, value = props.value, restProps = __rest(props, ["fetchSuggestions", "renderOption", "onSelect", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highIndex = _d[0], setHighIndex = _d[1];
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    var triggerSearch = useRef(false);
    var autoCompleteRef = useRef(null);
    var debounceValue = useDebounce(inputValue, 300);
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            var result = fetchSuggestions(inputValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(result);
                if (result.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighIndex(-1);
    }, [debounceValue]);
    useClickOutside(autoCompleteRef, function () {
        setSuggestions([]);
        setShowDropdown(false);
    });
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length - 1) {
            index = suggestions.length - 1;
        }
        setHighIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highIndex]) {
                    handleSelect(suggestions[highIndex]);
                }
                break;
            case 38:
                highlight(highIndex - 1);
                break;
            case 40:
                highlight(highIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                setShowDropdown(false);
                break;
        }
    };
    var handleChange = function (e) {
        triggerSearch.current = true;
        var value = e.target.value.trim();
        setInputValue(value);
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, timeout: 100, animation: "zoom-in-top" },
            React.createElement("ul", { className: "mo-suggestion-list" },
                loading && React.createElement("ul", { className: "suggestion-loading-icon " },
                    React.createElement(Icon, { icon: "spinner", spin: true })),
                !loading && suggestions.map(function (item, index) {
                    var classnames = classNames('suggestion-item', {
                        'is-active': index === highIndex
                    });
                    return (React.createElement("li", { key: index, className: classnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return React.createElement("div", { className: "mo-auto-complete", ref: autoCompleteRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange }, restProps, { onKeyDown: handleKeyDown })),
        (suggestions.length > 0) && generateDropdown());
};
export default AutoComplete;
