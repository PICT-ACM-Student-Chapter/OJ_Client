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
        question: {},
        questionID: null,
        languages: [],
        isContestLive: true,
        apiError: null,
        apiErrorMsg: ''
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

    getAllLanguages = () => {
        if (this.state.languages.length === 0) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/languages`)
                .then(res => {
                    this.setState({languages: res.data});

                })
        }
    }

    getQuestionDetail = async (questionId, setLoading, setTCsLoading, setCurrentLanguage) => {

        if (this.state.question === {} || this.state.questionID !== questionId) {
            const reqConfig = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/questions/${questionId}`, reqConfig)

                this.setState({question: res.data, questionID: questionId});
                setLoading(false)

                for (let i of res.data.test_cases) {
                    const inpRes = await axios.get(i.input)
                    i.input = inpRes.data
                    const outRes = await axios.get(i.output)
                    i.output = outRes.data
                }

                this.setState({question: res.data});
                setTCsLoading(false)

                if (localStorage.getItem('preferredLanguage')) {
                    for (let i of this.state.languages)
                        if (i.id === parseInt(localStorage.getItem('preferredLanguage'))) {
                            setCurrentLanguage(i)
                        }
                } else
                    setCurrentLanguage(this.state.languages[0])
            } catch (e) {
                console.log(e)
            }
        } else {
            setLoading(false)
            setTCsLoading(false)
            if (localStorage.getItem('preferredLanguage')) {
                for (let i of this.state.languages)
                    if (i.id === parseInt(localStorage.getItem('preferredLanguage'))) {
                        setCurrentLanguage(i)
                    }
            } else
                setCurrentLanguage(this.state.languages[0])
        }
    }

    setIsContestLive = (isLive)=>{
        this.setState({isContestLive: isLive})
    }

    setApiError = (err)=>{
        this.setState({apiError: err})
    }

    setApiErrorMsg = (err)=>{
        this.setState({apiErrorMsg: err})
    }

    render() {
        const {children} = this.props;
        const {contests, contest, languages, question, isContestLive, apiError, apiErrorMsg} = this.state;
        const {getContests, getContestDetail, getAllLanguages, getQuestionDetail, setIsContestLive, setApiError, setApiErrorMsg} = this;

        return (
            <GlobalContext.Provider
                value={{
                    contests,
                    contest,
                    languages,
                    question,
                    isContestLive,
                    apiError,
                    apiErrorMsg,
                    getContests,
                    getContestDetail,
                    getAllLanguages,
                    getQuestionDetail,
                    setIsContestLive,
                    setApiError,
                    setApiErrorMsg
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