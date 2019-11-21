// Require the packages we will use:
const http = require("http"),
	socketio = require("socket.io"),
    fs = require("fs"),
    mime = require('mime');
    
// Listen for HTTP connections.  This is essentially a miniature static file server that only serves our one file, client.html:
var app = http.createServer(function(req, resp){
	// This callback runs when a new connection is made to our HTTP server.
	
	// Modified from https://www.dotnetcurry.com/nodejs/1144/nodejs-html-static-pages-website
    // Check request for index, otherwise serve file

    if (req.url.toString() === "/") {
        fs.readFile("hfs/build/index.html", function(err, data){
			if(err) return resp.writeHead(500);
			resp.writeHead(200);
			resp.end(data);
		});
    }
    else {
        const filename = `hfs/build/${req.url.toString().substring(1)}`;
        const type = mime.getType(filename);
		fs.readFile(filename, function(err, data){
			if(err){
				resp.writeHead(500);
                resp.end(`File at ${req.url.toString().substring(1)} not found`);
                console.log(`File at ${req.url.toString().substring(1)} not found`);
			}
			else{
				resp.writeHead(200, {'Content-Type': type});
				resp.end(data);
			}
		});
	}
});
app.listen(3456);
console.log('Server running at http://localhost:3456/');

let users = []; // [{username, socketId, currentRoomId}]
// Not sure if we need the rooms array
let rooms = []; // [{id, user1, user2}]
let currId = 0;


// Do the Socket.IO magic:
var io = socketio.listen(app);
io.sockets.on("connection", function (socket) {
	// set the username for the current socket
	socket.on(events.Events.SET_USERNAME, function (username, errorFunc) {
		if (users.find(user => user.username === username)) {
			errorFunc("That username is taken.");
		} else {
			users.push({ username: username, socketId: socket.id, currentRoomId: null });
			errorFunc(null);
		}
	});

	// Find a room
	socket.on(events.Events.FIND_ROOM, function (errorFunc) {
		let currentUser = users.find(user => user.socketId === socket.id);
		if (!currentUser) {
			errorFunc("User has been logged out.");
			return;
		}

		let isUser1 = false;
		let user1 = rooms.filter(room => room.user1 === currentUser.username);
		if (user1) {
			isUser1 = true;
			// They were user1 in their room: they get to stay
			// Need to kick the other user
		}
		else {
			// Randomly find an empty room for the user
			let openRooms = rooms.filter(room => room.user1 === null || room.user2 === null);
			let randomIndex = Math.floor(Math.random() * openRooms.length);
			let room = openRooms[randomIndex];
			if (room) {
				// remove user from old room
				let oldRoom = rooms.find(room => room.id === currentUser.currentRoomId);
				if (oldRoom) {
					oldRoom.user2 = null;
					socket.leave(oldRoom.id);
					let usernames = [oldRoom.user1, oldRoom.user2];
					io.to(oldRoom.id).emit(events.Events.ROOM_MEMBERS_CHANGED, usernames);
				}

				// we are good to go, add them to the room
				room.user2 = currentUser.username;
				socket.join(room.id);
				currentUser.currentRoomId = room.id;
				let usernames = [room.user1, room.user2];
				socket.emit(events.Events.ROOM_CHANGED, usernames);
				io.to(room.id).emit(events.Events.ROOM_MEMBERS_CHANGED, usernames);
			} else {
				// make a new room for the person to sit in by themself for now
				rooms.push({ id: currId, user1: currentUser, user2: null});
				currId = currId + 1;
				let usernames = [room.user1, room.user2];
				io.to(room.id).emit(events.Events.ROOM_MEMBERS_CHANGED, usernames);
			}
		}
	})

	// Send a message
	socket.on(events.Events.SEND_MESSAGE, function (message, recipientUsername, errorFunc) {
		let currentUser = users.find(user => user.socketId === socket.id);
		if (!currentUser) {
			errorFunc("User has been logged out.");
			return;
		}
		// send it to the current room
		io.to(currentUser.currentRoomId).emit(events.Events.NEW_MESSAGE, message);
	});

	socket.on(events.Events.SEND_IMAGE_MESSAGE, function (imageDataUrl, errorFunc) {
		let currentUser = users.find(user => user.socketId === socket.id);
		if (!currentUser) {
			errorFunc("User has been logged out.");
			return;
		}
		io.to(currentUser.currentRoomId).emit(events.Events.NEW_IMAGE_MESSAGE, imageDataUrl, currentUser.username);
	});

	socket.on(events.Events.DISCONNECT, function (reason) {
		if (reason === "transport close") {
			// remove user from room
			let currentUser = users.find(user => user.socketId === socket.id);
			if (currentUser) {
				let oldRoom = rooms.find(room => room.id === currentUser.currentRoomId);
				if (oldRoom) {
					if (oldRoom.user1 === currentUser) {
						oldRoom.user1 = null;
					}
					else {
						oldRoom.user2 = null;
					}
					socket.leave(oldRoom.id);
					let usernames = [oldRoom.user1, oldRoom.user2];
					io.to(oldRoom.id).emit(events.Events.ROOM_MEMBERS_CHANGED, usernames);
				}
				users = users.filter(user => user.socketId !== socket.id);
			}
		}
	})
});
