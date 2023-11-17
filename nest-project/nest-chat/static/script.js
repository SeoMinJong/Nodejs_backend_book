const socket = io('http://localhost:3000/chat');
const nickname = prompt('please write nickname')

function sendMessage(){
    const message = $('#message').val();
    $('#chat').append(`<div>나 : ${message}</div>`)
    socket.emit('message', {message, nickname});
}

socket.on('connect', ()=>{
    console.log('connected');
});

socket.on('message', (message)=>{
    $('#chat').append(`<div>${message}</div>`);
});