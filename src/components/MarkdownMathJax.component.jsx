import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';

const MarkdownMathJaxComponent = (props) => {
    const [newProps, setNewProps] = useState({})

    useEffect(()=>{
        setNewProps({
        ...props,
            allowDangerousHtml: true,
            plugins: [
            RemarkMathPlugin,
        ],
            renderers: {
        ...props.renderers,
                math: (props) =>
                <MathJax.Node formula={props.value} />,
                inlineMath: (props) =>
                <MathJax.Node inline formula={props.value} />
        }
        });
        // eslint-disable-next-line
    }, [props.value] )

    return (
        <MathJax.Provider input="tex">
            <ReactMarkdown {...newProps} />
        </MathJax.Provider>
    );
};

export default MarkdownMathJaxComponent;