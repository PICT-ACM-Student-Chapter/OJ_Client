import React, {Component} from 'react'

const ThemeContext = React.createContext()

class ThemeProvider extends Component {


    // Context state
    state = {
        theme: 'light'
    }

    //check if theme exists in local storage
    componentDidMount() {
        if (localStorage.getItem('theme')) {
            if (localStorage.getItem('theme') === 'dark') {
                this.setState({theme: 'dark'})
            }
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // dark mode
            this.setState({
                theme: 'dark'
            })
        }
    }

    // Method to update state
    setTheme = (theme) => {
        this.setState(() => ({theme: theme}))
        localStorage.setItem('theme', theme)
    }

    render() {
        const {children} = this.props
        const {theme} = this.state
        const {setTheme} = this

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        )
    }
}

export default ThemeContext

export {ThemeProvider}
