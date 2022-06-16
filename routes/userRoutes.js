const express = require('express')
const userModel = require('../model/userModel')
const router = express.Router()

//Get all user detail
router.get('/', async (req, res) => {
    const allUsers = await userModel.find()
    res.json(allUsers)
})

//get user detail by id
// router.get('/:id', async (req, res) => {
//     const user = await userModel.findById(req.params.id)
//     res.json(user)
// })

//get user detail by id
router.get('/:id', getUser, (req, res) => {
    res.json(req.user)
})

//To add a user
router.post('/', async (req, res) => {
    const addNewUser = new userModel({
        name: req.body.name,
        occupation: req.body.occupation,
        place: req.body.place,
        joiningDate: req.body.joiningDate
    })
    try {
        const newUser = await addNewUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Edit user detail
// router.patch('/:id', async (req, res) => {
//     try {
//         const updateUser = await userModel.findById(req.params.id)
//         if (updateUser == null) {
//             res.json({ errorMessage: `User with id ${req.params.id} not found` })
//         }
//         else {
//             updateUser.name = req.body.name
//             updateUser.occupation = req.body.occupation
//             updateUser.place = req.body.place
//             updateUser.joiningDate = req.body.joiningDate
//             updateUser.save()
//             res.json({ "Updated user detail": updateUser })
//         }
//     } catch (err) {
//         console.log("Error in patch request\n", err.message)
//     }
// })

//Edit User detail
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null)
        res.user.name = req.body.name
    if (req.body.occupation != null)
        res.user.occupation = req.body.occupation
    if (req.body.place != null)
        res.user.place = req.body.place
    if (req.body.joiningDate != null)
        res.user.joiningDate = req.body.joiningDate
    try {
        const updateUser = await res.user.save()
        return res.json(updateUser)
    } catch (error) {
        return res.json({ "message": error.message })
    }
})

//Delete user by id
// router.delete('/:id', async (req, res) => {
//     try {
//         const deleteUser = await userModel.findById(req.params.id)
//         if (deleteUser == null) {
//             res.json({ errorMessage: `User with id ${req.params.id} not found` })
//         }
//         else {
//             deleteUser.remove()
//             res.json({ "Deleted user detail": deleteUser })
//         }
//     } catch (err) {
//         console.log("Error in patch request\n", err.message)
//     }
// })

//Delete user by id
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: "User Deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Middleware function which compares the user id in request with the existing user id"
function getUser(req, res, next) {
    return new Promise(async (resolve, reject) => {
        let user = await userModel.findById(req.params.id)
        if (user == null) {
            reject(res.status(401).json({ "message": "User not found" }))
        }
        else {
            resolve(res.status(201).json({ "UserFound": user }))
        }
        res.user = user
        next()
    })
}

module.exports = router