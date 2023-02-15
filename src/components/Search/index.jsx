import React from 'react'
import debounce from 'lodash.debounce'
import { SearchContext } from '../../App'

import styles from '../Search/search.module.scss'

const Search = () => {
    const [value, setValue] = React.useState('')
    const { setSearchValue } = React.useContext(SearchContext)
    const inputRef = React.useRef()

    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 1000),
        []
    )

    const onChangeInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                enableBackground='new 0 0 50 50'
                height='50px'
                id='Layer_1'
                version='1.1'
                viewBox='0 0 50 50'
                width='50px'
            >
                <rect
                    fill='none'
                    height='50'
                    width='50'
                />
                <circle
                    cx='21'
                    cy='20'
                    fill='none'
                    r='16'
                    stroke='#000000'
                    strokeLinecap='round'
                    strokeMiterlimit='10'
                    strokeWidth='2'
                />
                <line
                    fill='none'
                    stroke='#000000'
                    strokeMiterlimit='10'
                    strokeWidth='4'
                    x1='32.229'
                    x2='45.5'
                    y1='32.229'
                    y2='45.5'
                />
            </svg>

            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder='Поиск пиццы...'
            />

            {value && (
                <svg
                    onClick={onClickClear}
                    className={styles.clearIcon}
                    enableBackground='new 0 0 24 24'
                    height='24px'
                    id='Layer_1'
                    version='1.1'
                    viewBox='0 0 24 24'
                    width='24px'
                >
                    <path d='M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z' />
                </svg>
            )}
        </div>
    )
}

export default Search
