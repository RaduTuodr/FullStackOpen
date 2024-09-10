import { useState } from "react"

const Toggable = (props) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <>
            <div style={hideWhenVisible}>
                <button class='btn btn-outline-secondary' onClick={toggleVisibility} >
                    {props.viewButtonLabel}
                </button>
            </div>

            <div style={showWhenVisible}>
                {props.children}
                <button class='btn btn-outline-secondary' onClick={toggleVisibility}>
                    {props.hideButtonLabel}
                </button>
            </div>
        </>
    )
}

export default Toggable