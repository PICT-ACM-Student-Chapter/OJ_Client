import React, {Component} from "react";
import axios from "axios";
import UserContext from "./User";

const GlobalContext = React.createContext(undefined, undefined);

class GlobalProvider extends Component {

    static contextType = UserContext

    // Context state
    state = {
        contests: null,
        contest: null,
        contestID: null,

    };

    getContests = (setIsLoading) => {
        if (this.state.contests === null) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/contests`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(
                (res) => {
                    this.setState({contests: res.data});
                }
            ).then(() => {
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }

    getContestDetail = (contestId, setStarted, setIsLoading) => {

        if (this.state.contest === null || this.state.contestID !== contestId) {

            setIsLoading(true)

            const user = this.context

            user.setRank(null)
            user.setScore(null)

            axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${contestId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(
                (res) => {
                    res.data.questions = []
                    this.setState({contest: res.data, contestID: contestId});

                    if (res.data.status === 'STARTED') {
                        setStarted(true)
                    }
                }
            )
                .then(() => {
                    console.log(this.state.contestID)
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setIsLoading(false)
            if (this.state.contest.status === 'STARTED') {
                setStarted(true)
            }
        }
    }


    render() {
        const {children} = this.props;
        const {contests, contest,} = this.state;
        const {getContests, getContestDetail} = this;

        return (
            <GlobalContext.Provider
                value={{
                    contests,
                    contest,
                    getContests,
                    getContestDetail
                }}>
                {" "}
                {children}{" "}
            </GlobalContext.Provider>
        );
    }
}

export default GlobalContext;

export {GlobalProvider};


//contest, questionsDetails, question, languages