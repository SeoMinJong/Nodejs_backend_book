const DB=[];

function register(user){
    return saveDB(user, function(user){
        return sendEmail(user, function(user){
            return getResult(user);
        });
    });
};

function saveDB(user, callback){
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return callback(user);
};

function sendEmail(user, callback){
    console.log(`email to ${user.email}`);
    return callback(user);
};

function getResult(user){
    return `success reguster ${user.name}`;
};

const result = register({email:"andy@naver.com", password:"1234", name:"andy"});
console.log(result)