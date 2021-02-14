import React from "react";
import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {AutoComplete, DataSourceType} from "./autoComplete";

interface GitHubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}

const simpleComplete = () => {

    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({items}) => {
                return items.slice(0, 10).map((item: any) => ({value: item.login, ...item}))
            })
    }

    const renderOption = (item: DataSourceType) => {
        const itemWithGithub = item as DataSourceType<GitHubUserProps>
        return <div>
            <h2>name:{itemWithGithub.login}</h2>
            <p>url: {itemWithGithub.url}</p>
        </div>
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            renderOption={renderOption}
        ></AutoComplete>
    )
}
storiesOf('AutoComplete Component', module)
    .add('AutoComplete simple', simpleComplete)