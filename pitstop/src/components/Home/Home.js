import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as routes from '../../constants/routes'
import Header from '../Layout/Header'
import VehicleSwitch from '../Vehicle/VehicleSwitch'
import EventLog from '../Event/EventLog'

class HomePage extends Component {

    render() {
        return (

            <div className="page">
                <Header/>
                {Object.keys(this.props.vehicles.vehicles).length ? (
                    <React.Fragment>
                        {this.props.notifications.active &&
                            <div className={'notification notification--standalone notification--' + this.props.notifications.type}>
                                <p>{this.props.notifications.message}</p>
                            </div>
                        }
                        <div className="content">
                            <VehicleSwitch {...this.props} />
                        </div>
                        <div className="content">
                            <EventLog {...this.props} />
                        </div>
                    </React.Fragment>
                ) : (
                    <div className="content">No vehicles found. <Link to={routes.ADD_VEHICLE}>Go and add one!</Link></div>
                )}
            </div>

        )
    }

    componentWillUnmount() {
        this.props.removeNotification()
    }
}

export default HomePage
