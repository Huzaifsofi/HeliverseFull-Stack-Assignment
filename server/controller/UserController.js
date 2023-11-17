const User = require('../models/userModel')
const fs = require('fs')
const path = require('path')

const ViewUsers = async (req, res) => {
    let datas;
    let isdata_avialable;
    try {
        isdata_avialable = await User.countDocuments();
        console.log(isdata_avialable)
        if (isdata_avialable === 0) {
            const filePath = path.resolve(__dirname, '../heliverse_mock_data.json') 
            const jsonData = fs.readFileSync(filePath, 'utf-8')
            const data = JSON.parse(jsonData)
            await User.insertMany(data)
        }

        datas = await User.find()

    } catch (err) {
        console.log(err)
    }
    if (!datas || datas.length === 0) {
        return res.json({ "message": "no data aviable" })
    }
    return res.json({ datas })
    
}


const ViewUserById = async (req, res) => {
    const id = req.params.id
    let users;
    try {   
        users = await User.findOne({_id:id})
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.json({ "message": "no data aviable" })
    }
    return res.json({ users })

}


const CreateUser = async (req, res) => {
    const { first_name, last_name, email, gender, Female, avatar, domain, available } = req.body;

    let users;
    try {   
        users = new User({
            first_name, last_name, email, gender, Female, avatar, domain, available
        })
        await users.save()
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.json({ "message": "no data aviable" })
    }
    return res.json({ "message":"sucessfully created" })

}


const UpdateUser = async (req, res) => {

    const id = req.params.id

    let users;
    try {   
        users = await User.findByIdAndUpdate(
            {_id: id},
            req.body
        )
        users.save()
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.json({ "message": "unable to update" })
    }
    return res.json({ "message":"sucessfully updated", users })

}


const DeleteUser = async (req, res) => {
    const id = req.params.id;

    let users;
    try {   
        users = await User.findByIdAndRemove({ _id: id })
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.json({ "message": "unable to update" })
    }
    return res.json({ "message":"sucessfully deleted"})
}


exports.ViewUsers = ViewUsers
exports.ViewUserById = ViewUserById
exports.CreateUser = CreateUser
exports.UpdateUser = UpdateUser
exports.DeleteUser = DeleteUser