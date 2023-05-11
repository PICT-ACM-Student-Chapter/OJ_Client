import React, { Component } from "react";
import axios from "axios";
import UserContext from "./User";

const GlobalContext = React.createContext(undefined, undefined);

class GlobalProvider extends Component {
    static contextType = UserContext;

    // Context state
    state = {
        contests: null,
        isContestsLoading: true,
        contest: null,
        contestID: null,
        question: {},
        allQuestions: [],
        questionID: null,
        languages: [],
        isContestLive: true,
        apiError: null,
        apiErrorMsg: "",
        bugoffDetails: {},
    };

    dispose = () => {
        this.setState({
            contests: null,
            isContestsLoading: true,
            contest: null,
            contestID: null,
            question: {},
            allQuestions: [],
            questionID: null,
            languages: [],
            isContestLive: true,
            apiError: null,
            apiErrorMsg: "",
            bugoffDetails: {},
        });
    };

    getContests = () => {
        this.setState({ isContestsLoading: true });
        if (this.state.contests === null) {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/contests/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        contests: res.data,
                        isContestsLoading: false,
                    });
                });
        } else {
            this.setState({ isContestsLoading: false });
        }
    };

    setContests = (contests) => {
        this.setState({ contests: contests });
    };

    getContestDetail = (contestId, setIsLoading) => {
        if (this.state.contest === null || this.state.contestID !== contestId) {
            setIsLoading(true);

            const user = this.context;

            user.setRank(null);
            user.setScore(null);

            axios
                .get(
                    `${process.env.REACT_APP_BASE_URL}/contests/${contestId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    res.data.questions = [];
                    this.setState({ contest: res.data, contestID: contestId });
                })
                .then(() => {
                    console.log(this.state.contestID);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setIsLoading(false);
        }
    };

    getAllLanguages = () => {
        if (this.state.languages.length === 0) {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/languages/`)
                .then((res) => {
                    this.setState({ languages: res.data });
                });
        }
    };

    getAllQuestions = (contestId, setIsQueLoading) => {
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/contests/${contestId}/questions`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                let ques = res.data;
                console.log(ques);
                ques.sort(
                    (a, b) =>
                        parseInt(a.contest_que.order) -
                        parseInt(b.contest_que.order)
                );

                this.setState({ allQuestions: ques });
            })
            .then((_) => {
                setIsQueLoading(false);
            });
    };

    getQuestionDetail = async (
        questionId,
        setLoading,
        setTCsLoading,
        setCurrentLanguage
    ) => {
        if (
            this.state.question === {} ||
            this.state.questionID !== questionId
        ) {
            const reqConfig = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };

            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/questions/${questionId}`,
                    reqConfig
                );

                this.setState({ question: res.data, questionID: questionId });
                setLoading(false);

                for (let i of res.data.test_cases) {
                    const inpRes = await axios.get(i.input);
                    i.input = inpRes.data;
                    const outRes = await axios.get(i.output);
                    i.output = outRes.data;
                }

                this.setState({ question: res.data });
                setTCsLoading(false);

                if (localStorage.getItem("preferredLanguage")) {
                    for (let i of this.state.languages)
                        if (
                            i.id ===
                            parseInt(localStorage.getItem("preferredLanguage"))
                        ) {
                            setCurrentLanguage(i);
                        }
                } else setCurrentLanguage(this.state.languages[0]);
            } catch (e) {
                console.log(e);
            }
        } else {
            setLoading(false);
            setTCsLoading(false);
            if (localStorage.getItem("preferredLanguage")) {
                for (let i of this.state.languages)
                    if (
                        i.id ===
                        parseInt(localStorage.getItem("preferredLanguage"))
                    ) {
                        setCurrentLanguage(i);
                    }
            } else setCurrentLanguage(this.state.languages[0]);
        }
    };

    getBugoffQuestionDetails = async (
        questionId,
        setLoading,
        setTCsLoading,
        setCurrentLanguage
    ) => {
        let lang;
        if (localStorage.getItem("preferredLanguage")) {
            for (let i of this.state.languages)
                if (
                    i.id === parseInt(localStorage.getItem("preferredLanguage"))
                ) {
                    setCurrentLanguage(i);
                    lang = i;
                }
        } else {
            setCurrentLanguage(this.state.languages[0]);
            lang = this.state.languages[0];
        }
        console.log("Saved::::", JSON.parse(localStorage.getItem("codes"+questionId)))
        let savedCodes = JSON.parse(localStorage.getItem("codes"+questionId))
        console.log(this.state.bugoffDetails)
        if (
            this.state.bugoffDetails === {} ||
            this.state.questionID !== questionId || (
                savedCodes ? !savedCodes[lang.id] : true
            )
        ) {
            const reqConfig = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };

            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/questions/${questionId}/${lang.id}`,
                    reqConfig
                );

                console.log("HAPPY HACKING: ", res.data);
                let codeStorage = JSON.parse(localStorage.getItem("codes" + questionId)) || {}

                codeStorage[parseInt(localStorage.getItem("preferredLanguage"))] = res.data.incorrect_code

                localStorage.setItem("codes" + questionId, JSON.stringify(codeStorage))
                localStorage.setItem("incorrect_code"+questionId, res.data.incorrect_code);
                this.setState({
                    bugoffDetails: res.data,
                    questionID: questionId,
                });
                setLoading(false);

                setTCsLoading(false);
            } catch (e) {
                console.log(e);
            }
        } else {
            setLoading(false);
            setTCsLoading(false);
        }
    };

    setIsContestLive = (isLive) => {
        this.setState({ isContestLive: isLive });
    };

    setApiError = (err) => {
        this.setState({ apiError: err });
    };

    setApiErrorMsg = (err) => {
        this.setState({ apiErrorMsg: err });
    };

    render() {
        const { children } = this.props;
        const {
            contests,
            contest,
            languages,
            question,
            bugoffDetails,
            isContestLive,
            apiError,
            apiErrorMsg,
            isContestsLoading,
            allQuestions,
        } = this.state;
        const {
            getContests,
            dispose,
            setContests,
            getContestDetail,
            getAllLanguages,
            getQuestionDetail,
            setIsContestLive,
            setApiError,
            setApiErrorMsg,
            getAllQuestions,
            getBugoffQuestionDetails,
        } = this;

        return (
            <GlobalContext.Provider
                value={{
                    contests,
                    isContestsLoading,
                    contest,
                    languages,
                    question,
                    isContestLive,
                    apiError,
                    apiErrorMsg,
                    allQuestions,
                    bugoffDetails,
                    dispose,
                    getContests,
                    setContests,
                    getContestDetail,
                    getAllLanguages,
                    getQuestionDetail,
                    setIsContestLive,
                    setApiError,
                    setApiErrorMsg,
                    getAllQuestions,
                    getBugoffQuestionDetails,
                }}
            >
                {" "}
                {children}{" "}
            </GlobalContext.Provider>
        );
    }
}

export default GlobalContext;

export { GlobalProvider };

//contest, questionsDetails, question, languages
