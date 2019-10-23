import React from 'react'

export default (props) => {
    return(
        <div id={"app-header"}>
            <div className={"header-text-container"}>
                <h1 className={"header-text"}>Погода здесь</h1>
            </div>
            <div className={"button-container"}>
                <button
                    onClick={props.refreshGeo}
                    className={"geo-refresh-button"}
                >Обновить геолокацию
                </button>
            </div>
        </div>
    )
}
