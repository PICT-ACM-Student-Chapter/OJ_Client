import React, {Component} from "react";

const UserContext = React.createContext(undefined, undefined);

class UserProvider extends Component {
    // Context state
    state = {
        user: null,
    };





    // Method to update state
    setUser = (user) => {
        this.setState({user});
    };




    dispose = () => {
        this.setState({
            user: null,

        })
    }



    render() {
        const {children} = this.props;
        const {user, } = this.state;
        const {setUser, } = this;

        return (
            <UserContext.Provider
                value={{
                    user,
                    setUser
                }}>
                {" "}
                {children}{" "}
            </UserContext.Provider>
        );
    }
}

export default UserContext;

export {UserProvider};