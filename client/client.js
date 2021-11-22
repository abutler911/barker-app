const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const whisperElement = document.querySelector('.whispers');
const API_URL = 'http://localhost:5000/whispers';

loadingElement.style.display = '';

listAllWhispers();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name= formData.get('name');
    const content = formData.get('content');

    const whisper = {
        name, 
        content
    };
    console.log(whisper);
    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(whisper),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdWhisper => {
        form.reset();
        form.style.display = '';
        listAllWhispers();
        loadingElement.style.display = 'none';
    });
    
});

function listAllWhispers() {
    whisperElement.innerHTML = ' ';
    fetch(API_URL)
    .then(response => response.json())
    .then(whispers => {
        console.log(whispers);
        whispers.reverse();
        whispers.forEach(whisper => {
            const div = document.createElement('div');
            
            const header = document.createElement('h3');
                header.textContent = whisper.name;

            const contents = document.createElement('p');
                contents.textContent = whisper.content;

            const date = document.createElement('small');
            date.textContent = new Date(whisper.created);
            
            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);
            
            whisperElement.appendChild(div);
        });
        loadingElement.style.display='none';
    });
}
