import { Server } from "socket.io";
//      origin: ['http://localhost:5000']
const io = new Server({
    cors: {
        origin: "*",
    }
});

const generateMessagesId = () => Math.random().toString(36).substring(2,10); 

let chatRooms = [
    {
        roomId: 'GL-01', 
        roomName: 'General Chat', 
        description: 'The Chat room for any and everything', 
        messages: [
            {
                id: 1, 
                content: 'welcome to the general chat!', 
                sent: 'N/A', 
                user: 'Admin'
            }, 
            {
                id: 2, 
                content: 'Big sale for Memorial Day', 
                sent: 'N/A', 
                user: 'Admin'
            }, 
            {
                id: 7, 
                content: 'Test post for Twerb', 
                sent: 'N/A', 
                user: 'Admin'
            }
        ]
    }
]; 

console.log('TWERB SERVER STARTED'); 

//a comment added to test push
io.on('connection', (socket) => {
    console.log(`connect: ${socket.id}`, socket.request.headers)

    socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`);
    }); 

    socket.on('getRooms', () => {
        console.log(`returning room list: `, chatRooms); 
        socket.emit('returnRooms', chatRooms)
    });

    socket.on('connectRoom', (id) => {
        let chosenRoom = chatRooms.filter((room) => room.roomId == id); 
        socket.join(chosenRoom[0].roomName); 
        console.log('joined room: ', chosenRoom[0].roomName); 
        socket.emit('joinedRoom', chosenRoom[0].messages);
    }); 

    socket.on('newPost', (data) => {
        const {userMessage, room_id, sender, messageTime} = data; 
        let selectedRoom = chatRooms.filter((room) => room.roomId == room_id); 
        const addMessage = {
            id: generateMessagesId(), 
            content: userMessage, 
            sent: messageTime, 
            user: sender,
        }
        console.log('New post', addMessage); 
        socket.to(selectedRoom[0].roomName).emit('channelMessage', addMessage); 
        selectedRoom[0].messages.push(addMessage); 
        io.to(selectedRoom[0].roomName).emit('newMessage', selectedRoom[0].messages); 
        console.log('Emit new message', addMessage); 
    });
})

io.listen(3000);