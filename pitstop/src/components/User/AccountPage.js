import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as routes from '../../constants/routes'

import VehicleList from '../Vehicle/VehicleList'
import SignOutButton from './SignOut'

class AccountPage extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="page page--account">
                <h1>Account Page</h1>

                <Link to={routes.ADD_VEHICLE}>Add Vehicle</Link>

                <div><VehicleList {...this.props} /></div>

                <div><SignOutButton {...this.props} /></div>

            </div>
        )
    }
}

export default AccountPage
