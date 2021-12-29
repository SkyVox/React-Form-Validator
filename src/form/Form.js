import React, { useState, useEffect } from "react";
import './form-default-style.css';

const Form = (props) => {
    const { onSubmit, validator } = props;
    const [ warning, setWarning ] = useState(null);
    const [ values, setValues ] = useState({});

    const reset = () => {
        setWarning({});
    }

    /**
     * This function simples validate the form elements
     * when user submit it.
     * 
     * @param {*} event - HTML submit form event.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        // Reset our informations.
        reset();

        const ret = {};

        Array.from(event.target.elements).forEach((element) => {
            const name = element.name;
            const validate = validator[name];

            if (validate) {
                let test = validate.makeTest(element);

                if (!test.valid) {
                    const warn = {...warning};
                    warn[name] = test.message;
                    setWarning(warn);
                }
            }

            if (name && element.value) {
                ret[name] = element.value;
            }
        });

        setValues(ret);
    }

    useEffect(() => {
        if (!warning) return;
        if (JSON.stringify(warning) !== JSON.stringify({}) || Object.keys(warning).length > 0) {
            setTimeout(() => {
                setWarning(null);
            }, 3000);
            return;
        }

        // Send the ret value to submit.
        onSubmit(values);
    }, [warning, values, onSubmit]);

    /**
     * Render all form childrens and accept the @warning props inside
     * the child element.
     */
    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                {
                    React.Children.map(props.children, child => {
                        if (React.isValidElement(child)) {
                            const name = child.props.name;

                            if (validator[name]) {
                                return React.cloneElement(child, {onError: warning});
                            }
                        }
                        return child;
                    })
                }
            </form>
        </div>
    );
}

export { Form }