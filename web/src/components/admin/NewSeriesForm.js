import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { NEW_SERIES } from "../../gql/mutation";


import "./style/NewSeriesForm.css";

const NewSeriesForm = () => {
    const [values, setValue] = useState();
    const onChange = event => {
        setValue({
            ...values,
            [event.target.name]: Number(event.target.value)
        });
    };

    const [completed, setCompleted] = useState(false);
    const [newSeries, { data, loading, error }] = useMutation(NEW_SERIES, {
        onCompleted: () => {
            setCompleted(true)
            window.location.reload();
        }
    });


    return (
        <form className="form-new-series" onSubmit={event => {
            event.preventDefault();
            newSeries({variables: {
                ...values
            }});
        }}>
            <div className="form-group">
                <div className="form-field">
                    <label htmlFor="kinopoiskId" className="label">Введите айди сериала на кинопоиске:</label>
                    <input 
                        className="required" 
                        id="kinopoiskId"
                        name="kinopoiskId" 
                        placeholder="Kinopoisk id" 
                        type="text" 
                        onChange={onChange}
                    />
                </div>
                <div className="field-submit">
                    <button className="btn solid" type="submit">
                        <span>Добавить</span>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default NewSeriesForm;