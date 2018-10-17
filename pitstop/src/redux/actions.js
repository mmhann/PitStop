import { database, auth } from '../database/config'

// Create user on firebase, then save user to database, then dispatch setUser action
export function startCreatingUser(user) {
    return (dispatch) => {
        return auth.createUserWithEmailAndPassword(user.email, user.password).then(authUser => {
            database.ref(`users/${authUser.user.uid}`).set({
                username: user.username,
                email: user.email
            }).then((response) => {
                dispatch(createUserSuccess(response))
            })
        }).catch((error) => {
            dispatch(createUserFail(error));
        })
    }
}

// Sign in user on firebase, then dispatch setUser action
export function startLoginUser(user) {
    return (dispatch) => {
        return auth.signInWithEmailAndPassword(user.email, user.password).then(authUser => {
            console.log('eingeloggt!')
            dispatch(authUser(authUser))
        }).catch((error) => {
            alert(error)
        })
    }
}

// Sign out user on firebase
export function signOutUser() {
    return (dispatch) => {
        return auth.signOut().then(user => {
            console.log('ausgeloggt!')
            dispatch(authUser(user))
        }).catch((error) => {
            alert(error)
        })
    }
}

// Check if user is signed in
export function verifyUser() {
    return (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                // If user is signed in, save user to redux store and load his vehicles
                dispatch(authUser(user))
                dispatch(startLoadingVehicles(user.uid))
            } else {
                console.log('kein user gefunden')
                dispatch(signOutUser())
            }
        })
    }
}

// Save vehicle to current user in database, then dispatch addVehicle action
export function startAddingVehicle(vehicle) {
    return (dispatch) => {
        return database.ref(`users/${auth.currentUser.uid}/vehicles`).push(vehicle).then(() => {
            dispatch(addVehicle(vehicle))
        }).catch((error) => {
            alert(error)
        })
    }
}

// Load vehicles from database, then dispatch loadVehicles action
export function startLoadingVehicles(userid) {
    return (dispatch) => {
        return database.ref(`users/${userid}/vehicles`).once('value').then((snapshot) => {
            let vehicles = []
            snapshot.forEach(childSnapshot => {
                vehicles.push(childSnapshot.val())
            })
            dispatch(loadVehicles(vehicles))
        })
    }
}

export function startSettingVehicleId(vehicleId) {
    return (dispatch) => {
        return dispatch(setVehicleId(vehicleId))
    }
}

export function createUserSuccess(response) {
    return {
        type: 'CREATE_USER_SUCCESS',
        user: response
    }
}

export function createUserFail(error) {
    return {
        type: 'CREATE_USER_FAIL',
        error: error
    }
}

export function addVehicle(vehicle) {
    return {
        type: 'ADD_VEHICLE',
        vehicle: vehicle
    }
}

export function loadVehicles(vehicles) {
    return {
        type: 'LOAD_VEHICLES',
        vehicles: vehicles
    }
}

export function setVehicleId(vehicleId) {
    return {
        type: 'SET_VEHICLE_ID',
        vehicleId: vehicleId
    }
}

export function authUser(user) {
    return {
        type: 'AUTH_USER',
        user
    }
}