// Require the packages we will use:
const https = require("https"),
	socketio = require("socket.io"),
	fs = require("fs"),
	mime = require('mime'),
	events = require("./events"),
	filters = require("./filters");
	
// https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/

const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};

// Listen for HTTP connections.  This is essentially a miniature static file server that only serves our one file, client.html:
var app = https.createServer(options, function(req, resp){
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
app.listen(8000);
console.log('Server running at http://localhost:8000/');

let users = []; // [{username, socketId, currentRoomId, totalPoints, totalRatings, currentFilter, lastPartnerUsername}]
// Not sure if we need the rooms array
let rooms = []; // [{id, users:[]}]

// Do the Socket.IO magic:
var io = socketio.listen(app);
io.sockets.on("connection", function (socket) {
	console.log("connected to socket");

	// set the username for the current socket
	socket.on(events.Events.SET_USERNAME, function (username, interest, errorFunc) {
		if (users.find(user => user.username === username)) {
			errorFunc("That username is taken.");
		} else {
			users.push({ username, socketId: socket.id, currentRoomId: null, totalPoints: 0, totalRatings: 0, interest, lastPartnerUsername: null });
			errorFunc(null);
		}
	});

	// Exit room - called when you click the "next person" button or disconnect
	// Removes you and the other user from your current room (if it exists) and deletes the current room
	socket.on(events.Events.EXIT_ROOM, function (errorFunc){
		const currentUser = users.find(user => user.socketId === socket.id);
		if (!currentUser) {
			errorFunc("User has been logged out.");
			return;
		}

		const currentRoom = rooms.find(room => room.id === currentUser.currentRoomId);
		if (!currentRoom) {
			errorFunc("User is not currently in a room.")
			return;
		}

		// find the other user in the room
		const otherUser = currentRoom.users.find(user => user.username !== currentUser.username);

		// remove both from the room
		currentUser.currentRoomId = null;
		otherUser.currentRoomId = null;

		// delete the room
		rooms = rooms.filter(room => room.id !== currentRoom.id);

		// notify both users
		io.to(currentUser.socketId).emit(events.Events.ROOM_CHANGED, null, null);
		io.to(otherUser.socketId).emit(events.Events.ROOM_CHANGED, null, null);
	})

	// Find a room for a user who's not in one already.
	socket.on(events.Events.FIND_ROOM, function (errorFunc) {
		const currentUser = users.find(user => user.socketId === socket.id);
		if (!currentUser) {
			errorFunc("User has been logged out.");
			return;
		}

		if (currentUser.currentRoomId) {
			errorFunc("User is already in a room.");
			return;
		}

		let openUsers = users.filter(user => user.currentRoomId === null && user.username !== currentUser.username && user.username !== currentUser.lastPartnerUsername);
		if (openUsers.length === 0) {
			// they wil have to try again soon
			errorFunc("No open users", 1);
			return;
		}

		let newChatPartner;
		let sharedInterest = null;

		// check if any of them have the same interest
		let interestUsers = openUsers.filter(user => user.interest !== null && user.interest === currentUser.interest);
		if (interestUsers.length === 0) {
			// randomly select one of any unmatched users
			const randomIndex = Math.floor(Math.random() * openUsers.length);
			newChatPartner = openUsers[randomIndex];
		} else {
			// randomly select one of these users with the same interest 
			const randomIndex = Math.floor(Math.random() * interestUsers.length);
			newChatPartner = interestUsers[randomIndex];
			sharedInterest = currentUser.interest;
		}

		// create the new room for both users, the id is their usernames squished together
		const newRoomId = currentUser.username + newChatPartner.username;
		const newRoom = { id: newRoomId, users: [currentUser, newChatPartner] };
		rooms.push(newRoom);
		currentUser.currentRoomId = newRoomId;
		newChatPartner.currentRoomId = newRoomId;

		let currentUserRating = 0;
		if (currentUser.totalRatings !== 0) {
			currentUserRating = currentUser.totalPoints / currentUser.totalRatings;
			currentUserRating = Math.round(currentUserRating * 10) / 10;
		}
		let currentUserResp = { username: currentUser.username, rating: currentUserRating, filter: currentUser.filter }
		
		let newChatRating = 0;
		if (newChatPartner.totalRatings !== 0) {
			newChatRating = newChatPartner.totalPoints / newChatPartner.totalRatings;
			newChatRating = Math.round(newChatRating * 10) / 10;
		}
		let newChatPartnerResp = { username: newChatPartner.username, rating: newChatRating, filter: newChatPartner.filter }

		// tell both users that they are in a room
		io.to(currentUser.socketId).emit(events.Events.ROOM_CHANGED, newRoomId, newChatPartnerResp, sharedInterest);
		io.to(newChatPartner.socketId).emit(events.Events.ROOM_CHANGED, newRoomId, currentUserResp, sharedInterest);
	})

	// Send a message
	socket.on(events.Events.SEND_MESSAGE, function (message, errorFunc) {
		let currentUser = users.find(user => user.socketId === socket.id);
		if (!currentUser) {
			errorFunc("User has been logged out.");
			return;
		}
		// get the current room
		const currentRoom = rooms.find(room => room.id === currentUser.currentRoomId);
		if (!currentRoom) {
			errorFunc("User is not currently in a room.");
			return;
		}

		// send it to the current room
		currentRoom.users.forEach(user => {
			io.to(user.socketId).emit(events.Events.NEW_MESSAGE, message, currentUser.username);
		});
	});

	socket.on(events.Events.SET_FILTER, function (filter) {
		let currentUser = users.find(user => user.socketId === socket.id);
		if (!currentUser) {
			//errorFunc("User has been logged out.");
			console.log("Can't find user");
			return;
		}
		currentUser.filter = filter;
		// get the current room
		const currentRoom = rooms.find(room => room.id === currentUser.currentRoomId);
		if (!currentRoom) {
			//errorFunc("User is not currently in a room.");
			console.log("can't find room")
			return;
		}

		// send it to the current room
		currentRoom.users.forEach(user => {
			io.to(user.socketId).emit(events.Events.FILTER_CHANGED, currentUser.username, filter);
		});
	});

	socket.on(events.Events.RATE_USER, function (rating) {
		let currentUser = users.find(user => user.socketId === socket.id);
		if (!currentUser) {
			//errorFunc("User has been logged out.");
			console.log("Can't find user");
			return;
		}
		// get the current room
		const currentRoom = rooms.find(room => room.id === currentUser.currentRoomId);
		if (!currentRoom) {
			//errorFunc("User is not currently in a room.");
			console.log("can't find room")
			return;
		}
		console.log("sent " + rating);
		let otherUser = currentRoom.users.find(user => user.username !== currentUser.username);
		otherUser.totalPoints = otherUser.totalPoints + parseInt(rating);
		otherUser.totalRatings = otherUser.totalRatings + 1;
	});

	socket.on(events.Events.DISCONNECT, function (reason) {
		if (reason === "transport close") {
			// remove user from room
			let currentUser = users.find(user => user.socketId === socket.id);
			if (currentUser) {
				let oldRoom = rooms.find(room => room.id === currentUser.currentRoomId);
				if (oldRoom) {
					// find the other user in the room
					const otherUser = oldRoom.users.find(user => user.username !== currentUser.username);

					// remove him from the room
					otherUser.currentRoomId = null;

					// delete the room
					rooms = rooms.filter(room => room.id !== oldRoom.id);

					// notify both users
					io.to(otherUser.socketId).emit(events.Events.ROOM_CHANGED, null, null);
				}
				users = users.filter(user => user.socketId !== socket.id);
			}
		}
	})
});
