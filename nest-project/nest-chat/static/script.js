const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');
const nickname = prompt('please write nickname');
let currentRoom = "";


socket.on('connect', ()=>{
    console.log('connected');
});

socket.on('message', (message)=>{
    $('#chat').append(`<div>${message}</div>`);
});

socket.on('notice', (data)=>{
    $('#notice').append(`<div>${data.message}</div>`)
})

roomSocket.on("rooms", (data)=>{
    console.log(data);
    $('#rooms').empty();
    data.forEach((room)=>{
        $('#rooms').append(`<li>${room} <button onclick="joinRoom('${room}')">join</button></li>`);
    });
});

roomSocket.on("message", (data)=>{
    console.log(data);
    $('#chat').append(`<div>${data.message}</div>`);
});


function sendMessage(){
    if (currentRoom===''){
        alert('please select room')
        return;
    }
    const message = $('#message').val();
    const data = {message, nickname, room: currentRoom}
    $('#chat').append(`<div>나 : ${message}</div>`)
    roomSocket.emit('message', data);
    return false;
}

function joinRoom(room){
    roomSocket.emit('joinRoom', {room, nickname, toLeaveRoom: currentRoom});
    $('#chat').html('');
    currentRoom = room;
}

function createRoom(){
    const room = prompt('please write room name')
    roomSocket.emit('createRoom', {room, nickname})
}
