import React from "react";

const Field = (props) => {
    return(
        <BuildField {...props} type={"text"} />
    );
}

const FieldPassword = (props) => {
    return(
        <BuildField {...props} type={"password"} />
    );
}

const Submit = (props) => {
    const { id, text, name } = props;

    return (
        <>
            <input type="submit" id={id || null} value={text || "Submit"} name={name || null} />
        </>
    );
}

const BuildLabel = (props) => {
    return (<label htmlFor={props.id || null}>{props.labelText}</label>);
}

const BuildField = (props) => {
    const { id, labelText, name, onError, type } = props;

    return (
        <>
            { labelText && <BuildLabel id={id} labelText={labelText} /> }
            { props.br && <br /> }
            <input type={type} id={id || null} className={id || null} name={name} />
            {onError && onError[name] ? <div className="form-error">{onError[name]}</div> : null}
        </>
    );
}

export {
    Field,
    FieldPassword,
    Submit
}