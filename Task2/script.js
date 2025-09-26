document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const emailError = document.getElementById('email-error');
    const nameError = document.getElementById('name-error');
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    contactForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        emailError.textContent = '';
        nameError.textContent = '';
        let isValid = true;

        if (nameInput.value.trim() === ''){
            nameError.textContent = 'Name is required.';
            isValid = false;
        }

        if (emailInput.value.trim() === ''){
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!validateEmail(emailInput.value)){
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (isValid){
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });

    addTaskBtn.addEventListener('click',()=>{
        const taskText = newTaskInput.value.trim();

        if (taskText !== ''){
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';

            deleteButton.addEventListener('click',()=>{
                taskList.removeChild(listItem);
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
            newTaskInput.value = '';
        }
    });
});