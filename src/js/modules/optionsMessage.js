export default function optionsMessages() {
    if(document.querySelector(".edit-message")) {
        let editMessage = document.querySelector(".edit-message");
        let messageContainer = document.querySelector(".messages");
        let header = document.querySelector(".header-message .container");

        editMessage.addEventListener("click", () => {
            messageContainer.classList.toggle("edit");
            header.classList.toggle("edit-active");

            let btnReadMessage = document.querySelector(".read-message");
            let btnSelectAllMessage = document.querySelector(".select-all-message");
            let btnDeleteMessage = document.querySelector(".delete-message");

            let messages = document.querySelectorAll(".messages__container");
            let checkboxMessages = document.querySelectorAll(".checkbox input[type='checkbox']");

            if(messageContainer.classList.contains("edit")) {
                editMessage.innerText = "Cancelar";
            } else {
                editMessage.innerText = "Editar";
                
                messages.forEach(message => {
                    message.classList.remove("checked");
                });
    
                checkboxMessages.forEach(checkbox => {
                    checkbox.checked = false;
                });
            }

            let messagesCheckbox = document.querySelectorAll(".messages__checkbox");

            messagesCheckbox.forEach(checkbox => {
                checkbox.addEventListener("click", (e) => {
                    e.target.closest(".messages__container").classList.toggle("checked");
                });
            });

            let deleteMessage = () => {
                messages.forEach(message => {
                    if(message.classList.contains("checked")) {
                        message.classList.add("delete");
                        
                        setTimeout(() => {
                            message.remove();
                        }, 1000);
                    }
                });
            }

            let readMessage = () => {
                messages.forEach(message => {
                    if(message.classList.contains("checked") && !message.classList.contains("read-drag-message")) {
                        message.classList.add("read-message");
                    }
                });
            }

            let selectAllMessage = () => {
                messages.forEach(message => {
                    message.classList.add("checked");
                });

                checkboxMessages.forEach(checkbox => {
                    checkbox.checked = true;
                });
            }

            btnSelectAllMessage.addEventListener("click", selectAllMessage);
            btnReadMessage.addEventListener("click", readMessage);
            btnDeleteMessage.addEventListener("click", deleteMessage);
        });
    }
}