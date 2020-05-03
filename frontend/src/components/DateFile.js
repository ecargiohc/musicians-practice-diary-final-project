import React from 'react';

export default class DateFile extends React.Component {
    constructor() {
        super();

        var today = new Date(),
            date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

        this.state = {
            date: date
        };
    }

    render() {
        return (
            <div className='date'>
                {/* <FontAwesome name='calendar' /> */}
                {this.state.date}
            </div>
        );
    }
}