const handleInputData = (event, setState) => {
    setState((prevState) => ({
        ...prevState,
        [event.target.name] : event.target.value
    })) 
}

export default handleInputData