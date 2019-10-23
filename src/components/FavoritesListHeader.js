import React from 'react'

export default (props) => {
    return <div className={"favorites-header-container"}>
        <div className={"favorites-title-container"}>
            <h2>Избранное</h2>
        </div>
        <form className={"new-favorite-form"} onSubmit={props.handleSubmit}>
            <input
                placeholder={"Добавить новый город"}
                className={"add-favorite-input"}
                value={props.state.favoritesInput}
                onChange={props.handleChange}
            />
            <button className={"favorites-action-button"}>+</button>
        </form>
    </div>

}
