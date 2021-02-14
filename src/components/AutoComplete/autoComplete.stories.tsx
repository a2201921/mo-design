import React from "react";
import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {AutoComplete, DataSourceType} from "./autoComplete";

interface LakerPlayerProps {
    value: string;
    number: number
}

interface GitHubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}

const simpleComplete = () => {
    // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuZma', 'McGee', 'rando']
    const lakersWithNumber = [
        {value: 'bradley', number: 3},
        {value: 'pope', number: 1},
        {value: 'caruso', number: 22},
        {value: 'cook', number: 21},
        {value: 'cousins', number: 22},
        {value: 'james', number: 23},
        {value: 'AD', number: 4},
    ]


    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
    // }

    // const handleFetch = (query: string) => {
    //     return lakersWithNumber.filter(player => player.value.includes(query))
    // }

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