import { where } from 'sequelize';
import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //lưu ý, truyền vào đúng password cần hash
            // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
            let hashPassWord = await bcrypt.hashSync(password, salt);

            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }

    })
}
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['id','email', 'roleId', 'password','firstName','lastName'],
                    where: { email: email },
                    raw: true,

                });
                if (user) {
                    //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
                    // Cách 1: dùng asynchronous (bất đồng bộ)
                    let check = await bcrypt.compare(password, user.password);


                    // Cách 2: dùng synchronous  (đồng bộ)
                    // let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';

                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}
let getAllUsers = (userId)=>{
    return new Promise(async(resolve, reject) => {
        try{
            let users = '';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }

                });
            }
            if(userId && userId !=='ALL'){
                users = await db.User.findOne({
                    where: {id : userId},
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
             
            resolve(users)

        }catch(e){
            console.error("Error in getAllUsers:", e); // Log lỗi chi tiết
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.password) { // Kiểm tra password trước khi hash
                resolve({
                    errCode: 2,
                    errMessage: 'Missing password'
                });
                return;
            }

            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already used'
                });
            } else {
                let hashPassWordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassWordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                });
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            
            if (!user) {
                return resolve({
                    errCode: 2,
                    errMessage: 'The user does not exist'
                });
            }

            await user.destroy();
            resolve({
                errCode: 0,
                message: 'The user has been deleted'
            });
        } catch (e) {
            reject(e); // Báo lỗi nếu có ngoại lệ xảy ra
        }
    });
};

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            });

            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'The user does not exist'
                });
            } else {
                // Cập nhật thông tin người dùng
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
             

                await user.save(); // lưu các thay đổi vào DB

                resolve({
                    errCode: 0,
                    errMessage: 'The user has been updated successfully'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser:deleteUser,
    editUser: editUser
};
