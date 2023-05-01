const { reject } = require("bcrypt/promises");

var users = [];
class UserManager {
    addUser(email,password) {
        try{
            var id = Object.keys(users).length;
            users.push({id: id, email: email, password: password, category: []});
            return 'User added successfully';
        }
        catch (err) {
            return `Error: ${err}`;
        }
    };
    getUser(email){
        return new Promise((resolve,reject) =>{
            var user = users.find(user => user.email == email);
            if(!user){
                reject('User not found');
            }
            else{
                resolve(user);
            }
        });
    };
    addCategory(id,category){
        var user = users.find(user => user.id == id);
        user.category.push(category);
        return 'Category added';
    };
    getCategory(id){
        var user = users.find(user => user.id == id);
        return user.category;
    };
}
var userManager = new UserManager();
module.exports = userManager;