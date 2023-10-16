const DB=[];

function saveDB(user){
    const oldDBSize = DB.length + 1;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return new Promise((resolve, reject)=>{
        if (DB.length > oldDBSize){
            resolve(user)
        }else{
            reject(new Error("Save DB ERROR!"));
        }
    });
};

function sendEmail(user){
    console.log(`email to ${user.email}`);
    return new Promise((resolve)=>{
        resolve(user);
    });
};

function getResult(user){
    return new Promise((resolve)=>{
        resolve(`success register ${user.name}`);
    });
};

function registerByPromise(user){
    const result = saveDB(user).then(sendEmail).then(getResult)
        .catch(error => new Error(error))
        .finally(() => console.log("end!"));
    console.log(result);
    return result;
};

const myUser = {email:"andy@naver.com", password:"1234", name:"andy"};
const result = registerByPromise(myUser);
// result.then(console.log);

// allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
// allResult.then(console.log);