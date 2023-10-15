let username = "andy";

async function myName(username){
    return `${username}님 입장입니다.`
};

async function showName(username){
    const name = await myName(username);
    console.log(name);
};

console.log(showName(username));