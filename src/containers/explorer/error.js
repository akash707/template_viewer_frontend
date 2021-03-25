const Error = (props) => {
    return (
        <div>
            <h1>Errors</h1>
            {
                props.errors.map((error, index) => {
                    return (
                        <p key={index}className="error">{error}</p>
                    )
                })
            }
        </div>
    )
}

export default Error;