import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as routes from '../../constants/routes'

import EventLogItem from './EventLogItem'

class EventLog extends Component {

    componentDidMount() {
        if (this.props.vehicles.activeVehicle && this.props.user.user.uid) {
            this.props.startLoadingEvents(this.props.user.user.uid, this.props.vehicles.activeVehicle, 'desc')
        }
    }

    render() {
        const events = this.props.events.events
        let eventlog

        if (Object.keys(events).length !== 0) {
            eventlog = Object.entries(events).map((event, index) => <EventLogItem key={index} eventId={event[0]} event={event[1]} />)
        } else {
            eventlog = <p>No events found for this vehicle. <Link to={routes.EVENT_TYPE}>Go and add some!</Link></p>
        }

        return (

            <div className="event-log">
                {Object.keys(events).length !== 0 && <div className="event-log-line"></div>}
                {eventlog}
            </div>

        )
    }
}

export default EventLog
