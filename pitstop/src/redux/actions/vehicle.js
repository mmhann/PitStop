import { database, auth } from './../../database/config'
import { history } from './../../history'
import * as routes from './../../constants/routes'
import moment from 'moment'

// ASYNC ACTIONS
// -----------------------------------------------------

// Save vehicle to current user in database, then dispatch editVehicle action with key of new vehicle item in database and vehicle data
export function startAddingVehicle(vehicle) {
    return (dispatch) => {
        vehicle._created = moment().format('DD.MM.YYYY HH:mm:ss')
        return database.collection(`users/${auth.currentUser.uid}/vehicles`).push(vehicle).then((response) => {
            const vehicleId = response.key
            dispatch(editVehicle(vehicleId, vehicle))
            history.push(routes.ACCOUNT)
        }).catch((error) => {
            alert(error)
        })
    }
}

// Edit vehicle in database, then dispatch editVehicle action with key of vehicle and vehicle data
export function startEditingVehicle(vehicleId, vehicle) {
    return (dispatch) => {
        vehicle._modified = moment().format('DD.MM.YYYY HH:mm:ss')
        return database.collection(`users/${auth.currentUser.uid}/vehicles/${vehicleId}`).update(vehicle).then(() => {
            dispatch(editVehicle(vehicleId, vehicle))
            history.push(routes.ACCOUNT)
        }).catch((error) => {
            alert(error)
        })
    }
}

// Delete vehicle
export function startRemovingVehicle(vehicleId) {
    return (dispatch) => {
        return database.collection(`users/${auth.currentUser.uid}/vehicles/${vehicleId}`).remove().then(() => {
            history.push(routes.ACCOUNT)
            dispatch(removeVehicle(vehicleId))
        }).catch((error) => {
            alert(error)
        })
    }
}

// Load vehicles from database, then dispatch loadVehicles action
export function startLoadingVehicles(userId) {
    console.info('startloadingvehicle');
    return (dispatch) => {
        return database.collection(`users`).doc(userId).get().then(snapshot => {
            console.log('snap', snapshot);
            const vehicles = snapshot.val()
            dispatch(loadVehicles(vehicles))
        }).catch(err => {
            console.log("Error getting document", err);
        });
    }
}

// Save vehicle as active in database and dispatch action to save it to store
export function saveVehicleAsActive(vehicleId) {
    return (dispatch) => {
        dispatch(setVehicleAsActive(vehicleId))
        database.collection(`users/${auth.currentUser.uid}/active_vehicle`).set(vehicleId)
    }
}

export function saveActualMileage(vehicleId, mileage) {
    return (dispatch) => {
            dispatch(setActualMileage(vehicleId, mileage))
            database.collection(`users/${auth.currentUser.uid}/vehicles/${vehicleId}/actual_mileage`).set(mileage)
    }
}


// REGULAR ACTIONS
// -----------------------------------------------------

export function editVehicle(vehicleId, vehicle) {
    return {
        type: 'EDIT_VEHICLE',
        vehicleId,
        vehicle
    }
}

export function updateVehicle(vehicleId, vehicle) {
    return {
        type: 'UPDATE_VEHICLE',
        vehicleId,
        vehicle
    }
}

export function removeVehicle(vehicleId) {
    return {
        type: 'REMOVE_VEHICLE',
        vehicleId
    }
}

export function loadVehicles(vehicles) {
    return {
        type: 'LOAD_VEHICLES',
        vehicles
    }
}

export function setVehicleAsActive(vehicleId) {
    return {
        type: 'SET_VEHICLE_AS_ACTIVE',
        vehicleId
    }
}

export function setActualMileage(vehicleId, mileage) {
    return {
        type: 'SET_ACTUAL_MILEAGE',
        vehicleId,
        mileage
    }
}

export function resetVehicleLoading() {
    return {
        type: 'RESET_VEHICLE_LOADING'
    }
}
