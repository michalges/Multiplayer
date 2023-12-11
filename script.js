import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSMD8i4Za5GFRbFrvZHlWPi8Elg6q8WwQ",
  authDomain: "multiplayer-710e7.firebaseapp.com",
  databaseURL: "https://multiplayer-710e7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "multiplayer-710e7",
  storageBucket: "multiplayer-710e7.appspot.com",
  messagingSenderId: "1086236138698",
  appId: "1:1086236138698:web:54b4d987b302fd97ee2833",
  measurementId: "G-Z5MTHQQW6T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// User-specific data
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
  // User-specific data with random x and y
const userData = {
    color: '#7127cc',
    x: getRandomNumber(0, 100), // Adjust the range based on canvas size
    y: getRandomNumber(0, 100)  // Adjust the range based on canvas size
};
  

// Create a unique user ID (you might have a better way to generate user IDs)
const userId = generateUserId();

// Reference to the location in the database where you want to store the user data
const userRef = ref(database, `players/${userId}`);

// Set the user data
set(userRef, userData);

// Log the user ID
console.log('User ID:', userId);

// Listen for changes to the user data
onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        console.log('User data changed:', data);
    }
});

// Remove user data when the page is closed
window.addEventListener('unload', async () => {
  // Remove the user data
    await remove(userRef);
});

function generateUserId() {
  // Implement your logic to generate a unique user ID
  // For simplicity, you can use a timestamp-based ID
    return Date.now().toString();
}

function drawPlayers(players) {
    // Clear the canvas
    ctx_pl.clearRect(0, 0, canvas_width, canvas_height);
  
    // Draw a square for each player
    for (const playerId in players) {
        const player = players[playerId];
        ctx_pl.fillStyle = player.color;
        ctx_pl.fillRect(player.x, player.y, 20, 20); // Adjust the size as needed
    }
}

const playersRef = ref(database, 'players');
onValue(playersRef, (snapshot) => {
    const playersData = snapshot.val();
    if (playersData) {
        drawPlayers(playersData);
    }
});


const player = {
    up: false,
    down: false,
    left: false,
    right: false
}

function update(){
    const speed = 1;
    const userRef = ref(database, `players/${userId}`);

    if(player.up == true){
        userData.y -= speed;
    }
    if(player.down == true){
        userData.y += speed;
    }
    if(player.left == true){
           userData.x -= speed;
    }
    if(player.right == true){
        userData.x += speed;
    }

    // Update the user data in the database
    set(userRef, userData);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);


window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            player.left = true;
            break;
        case 'ArrowRight':
            e.preventDefault();
            player.right = true;
            break;
        case 'ArrowUp':
            e.preventDefault();
            player.up = true;
            break;
        case 'ArrowDown':
            e.preventDefault();
            player.down = true;
            break;
            
        case 'a':
            e.preventDefault();
            player.left = true;
            break;
        case 'd':
            e.preventDefault();
            player.right = true;
            break;
        case 'w':
            e.preventDefault();
            player.up = true;
            break;
        case 's':
            e.preventDefault();
            player.down = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            player.left = false;
            break;
        case 'ArrowRight':
            player.right = false;
            break;
        case 'ArrowUp':
            player.up = false;
            break;
        case 'ArrowDown':
            player.down = false;
            break;
            
        case 'a':
            player.left = false;
            break;
        case 'd':
            player.right = false;
            break;
        case 'w':
            player.up = false;
            break;
        case 's':
            player.down = false;
            break;
    }
});