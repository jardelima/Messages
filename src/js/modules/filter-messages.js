export default function filterMessages() {
    if(document.querySelector(".filter-message")) {
        let inputRadio = document.querySelectorAll(".input-radio");
        let filterMessages = document.querySelector(".filter");

        let noReadMessages = () => {
            let messages = document.querySelectorAll(".messages__container");

            messages.forEach(message => {
                message.classList.remove("filter-no-read");

                if(message.classList.contains("read-message") || message.classList.contains("read-drag-message")) {
                    message.classList.add("filter-no-read");
                }
            });
        }

        let allMessages = () => {
            let messages = document.querySelectorAll(".messages__container");

            messages.forEach(message => {
                message.classList.remove("filter-no-read");
            });
        }   

        let readMessages = () => {
            let messages = document.querySelectorAll(".messages__container");

            messages.forEach(message => {
                message.classList.remove("filter-no-read");
                
                if(!message.classList.contains("read-drag-message") && !message.classList.contains("read-message")) {
                    message.classList.add("filter-no-read");
                }
            });
        }

        filterMessages.addEventListener("click", () => {
            inputRadio.forEach(input => {
                if(input.children[0].checked === true) {
                    if(input.children[0].id === "no-read") {
                        noReadMessages();
                    }

                    if(input.children[0].id === "all") {
                        allMessages();
                    }

                    if(input.children[0].id === "read") {
                        readMessages();
                    }
                }
            });
        });
    }
}