export default function dragMessages() {
    if(document.querySelector(".messages")) {
        let messageBox = document.querySelector(".messages");
        let messageItem = document.querySelectorAll(".messages__item");
        let messageContainer = document.querySelectorAll(".messages__container");

        let currentX;
        let initialX;
        let xOffset = 0;

        let startDrag = (e) => {
            initialX = e.touches[0].clientX - xOffset;
        }

        let endDrag = () => {
            initialX = currentX;
        }

        let drag = (message) => {
            message.preventDefault();
            currentX = message.touches[0].clientX - initialX;
        }

        let setTranslate = (xPos, el) => {
            if(currentX < 90 && currentX > -120) {
                el.style.left = xPos + "px";
            }
        }

        let removeTranslate = (xPos, el) => {
            if(currentX > -90 && currentX < 90 || currentX < 90 || currentX > -90) {
                el.style.left = 0;
            }
        }

        let deleteMessage = (currentMessage) => {
            currentMessage.remove();
        }

        let readMessage = (currentMessage) => {
            if(currentMessage.classList.contains("read-message")){
                currentMessage.classList.remove("read-message");
            } else {
                currentMessage.classList.toggle("read-drag-message");
            }
        }

        messageItem.forEach(message => {
            message.addEventListener("touchstart", startDrag);
        
            message.addEventListener("touchend", (messageItem) => {
                if(!messageBox.classList.contains("edit")) {
                    endDrag();
                    removeTranslate(currentX, message);
    
                    messageContainer.forEach(container => {
                        container.addEventListener("touchend", (e) => {
                            if(e === messageItem && currentX < -90) {
                                container.classList.add("delete");
        
                                setTimeout(() => {
                                    deleteMessage(container);
    
                                    currentX = 0;
                                }, 1000);
                            }
        
                            if (e === messageItem && currentX > 80) {
                                readMessage(container);
                                currentX = 0;
                            }
                        });
                    });
                } 
            });

            message.addEventListener("touchmove", (messageItem) => {
                if(!messageBox.classList.contains("edit")) {
                    drag(messageItem);
                    setTranslate(currentX, message);
                }
            });
        }); 
    }
}