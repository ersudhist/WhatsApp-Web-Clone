document.addEventListener("DOMContentLoaded", function () {
    const chatBoxes = document.querySelectorAll(".chat-box");
    const chatTitle = document.querySelector(".chat-title h4");
    const userImage = document.querySelector(".chat-title .user-img img");
    const messageContent = document.querySelector(".message-content");
    const searchInput = document.getElementById("searchInput");

    chatBoxes.forEach(function (chatBox) {
        chatBox.addEventListener("click", function () {
            const name = chatBox.querySelector("h4").innerText;
            const imageSrc = chatBox.querySelector(".chat-img img").src;

            chatTitle.innerText = name;
            userImage.src = imageSrc;

            // Fetch and display chat messages for the selected user
            fetchChatMessages(name); // You need to implement this function
            
            // Update last message with time dynamically
            updateLastMessageWithTime(chatBox, name); // You need to implement this function
        });
    });

    function fetchChatMessages(userName) {
        // Here you should implement logic to fetch chat messages associated with the selected user
        // This could involve making an AJAX request to a server-side endpoint or accessing local storage or database
        // For demonstration, let's assume you have an array of chat messages for each user
        const chatMessages = getChatMessagesForUser(userName);

        // Clear existing chat messages in messageContent
        messageContent.innerHTML = '';

        // Display fetched chat messages in messageContent
        chatMessages.forEach(function (messageObj) {
            const messageElement = document.createElement('p');
            messageElement.classList.add('chat-message');
            
            
            // Check if the message is sent or received
            if (messageObj.sender === userName) {
                // Sent message
                messageElement.classList.add('chat-send');
                messageElement.textContent = messageObj.message;
            } else {
                // Received message
                messageElement.textContent = messageObj.message;
                const timestampElement = document.createElement('span');
                timestampElement.classList.add('chat-timestamp');
                timestampElement.textContent = messageObj.time;
                messageElement.appendChild(document.createElement('br'));
                messageElement.appendChild(timestampElement);
            }
            
            messageContent.appendChild(messageElement);
        });
    }

    function updateLastMessageWithTime(chatBox, userName) {
        // Here you should implement logic to retrieve the last message and its timestamp for the selected user
        // For demonstration, let's assume you have an array of chat messages for each user
        const chatMessages = getChatMessagesForUser(userName);

        // Find the last message and its timestamp
        const lastMessage = chatMessages[chatMessages.length - 1];
        const lastMessageText = lastMessage ? lastMessage.message : '';
        const lastMessageTime = lastMessage ? lastMessage.time : '';

        // Update chat-info with the last message and its timestamp
        const chatInfo = chatBox.querySelector('.chat-info');
        const chatTime = chatBox.querySelector('.chat-time');
        chatInfo.innerHTML = '<h4>' + userName + '</h4><p>' + lastMessageText + '</p>';
        chatTime.innerHTML = '<p>' + lastMessageTime + '</p>';

        // Store last message and its timestamp in localStorage
        localStorage.setItem(userName + '_lastMessage', lastMessageText);
        localStorage.setItem(userName + '_lastMessageTime', lastMessageTime);
    }

    // Function to get chat messages for a specific user (you need to implement this according to your data structure)
    function getChatMessagesForUser(userName) {
        // Dummy data for demonstration
        const chatMessages = {
            "Abhay Sagar": [
                { message: "Hi", sender: "You", time: "10:00 AM" },
                { message: "Hello", sender: "Abhay Sagar", time: "10:05 AM" },
                { message: "what are you doing?", sender: "You", time: "10:00 AM" },
                { message: "Nothing, what happen?", sender: "Abhay Sagar", time: "10:05 AM" },
                { message: "Be ready, coming to pick you", sender: "You", time: "10:00 AM" },
                { message: "okay, where we are going?", sender: "Abhay Sagar", time: "10:05 AM" },
                // Add more messages as needed
            ],
            "Prabhat Kumar": [
                { message: "Hey", sender: "Prabhat Kumar", time: "11:00 AM" },
                { message: "What's up?", sender: "You", time: "11:05 AM" },
                // Add more messages as needed
            ],

            "Aditya": [
                { message: "Hey", sender: "Aditya", time: "11:00 AM" },
                { message: "What's up?", sender: "You", time: "11:05 AM" },
                // Add more messages as needed
            ],
            // Add more users and their chat messages as needed
        };

        return chatMessages[userName] || [];
    }

    // Retrieve last message and its timestamp from localStorage and update chat-info sections
    chatBoxes.forEach(function (chatBox) {
        const userName = chatBox.querySelector("h4").innerText;
        const lastMessageText = localStorage.getItem(userName + '_lastMessage');
        const lastMessageTime = localStorage.getItem(userName + '_lastMessageTime');
        const chatInfo = chatBox.querySelector('.chat-info');
        const chatTime = chatBox.querySelector('.chat-time');
        chatInfo.innerHTML = '<h4>' + userName + '</h4><p>' + lastMessageText + '</p>';
        chatTime.innerHTML = '<p>' + lastMessageTime + '</p>';
    });

    // Search functionality
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.trim().toLowerCase();

        chatBoxes.forEach(function (chatBox) {
            const name = chatBox.querySelector("h4").innerText.toLowerCase();
            const messageText = chatBox.querySelector(".chat-info p").innerText.toLowerCase();
            const timestamp = chatBox.querySelector(".chat-time p").innerText.toLowerCase();

            if (name.includes(searchTerm) || messageText.includes(searchTerm) || timestamp.includes(searchTerm)) {
                chatBox.style.display = "flex";
            } else {
                chatBox.style.display = "none";
            }
        });
    });
});





