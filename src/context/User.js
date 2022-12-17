import React, {Component} from "react";
import axios from "axios";

const UserContext = React.createContext(undefined, undefined);

class UserProvider extends Component {
    // Context state
    state = {
        user: null,
        rank: null,
        score: null
    };


    // Method to update state
    setUser = (user) => {
        this.setState({user: user});
    };

    setRank = (rank) => {
        this.setState({rank: rank})
    }

    setScore = (score) => {
        this.setState({score: score})
    }

    loadUser = (id) => {

        axios.get(`${process.env.REACT_APP_BASE_URL}/auth/users/${id}/`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                this.setUser(res.data)
            })
            .catch(e => {
                console.log(e.data)
            })
    }

    dispose = () => {
        this.setState({
            user: null,
            rank: null,
            score: null
        })
        localStorage.removeItem('refresh-token')
        localStorage.removeItem('token')
    }


    render() {
        const {children} = this.props;
        const {user, rank, score} = this.state;
        const {setUser, loadUser, setScore, setRank, dispose} = this;

        return (
            <UserContext.Provider
                value={{
                    user,
                    rank,
                    score,
                    setUser,
                    loadUser,
                    dispose,
                    setScore,
                    setRank
                }}>
                {" "}
                {children}{" "}
            </UserContext.Provider>
        );
    }
}

export default UserContext;

export {UserProvider};
