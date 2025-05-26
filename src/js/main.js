// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Reproductor de audio completo
    const audioPlayers = [];
    let currentAudio = null;
    
    document.querySelectorAll('.release-card').forEach((card, index) => {
        const audio = card.querySelector('audio');
        const playButton = card.querySelector('.play-button');
        const player = {
            audio,
            playButton,
            isPlaying: false
        };
        
        audioPlayers.push(player);
        
        playButton.addEventListener('click', () => {
            if(currentAudio && currentAudio !== player) {
                currentAudio.audio.pause();
                currentAudio.isPlaying = false;
                currentAudio.playButton.innerHTML = '<i class="fas fa-play"></i>';
            }
            
            if(player.isPlaying) {
                audio.pause();
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                audio.play();
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
                updateProgressBar(audio);
            }
            player.isPlaying = !player.isPlaying;
            currentAudio = player;
        });
    });

    // Formulario del Newsletter funcional
    const newsletterForm = document.querySelector('.newsletter-form');
    const modalContent = document.querySelector('.modal-content');
    
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input');
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        
        modalContent.innerHTML = '';
        modalContent.appendChild(spinner);
        showModal();
        
        try {
            // Simular envío a API
            await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailInput.value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            
            modalContent.innerHTML = `
                <h2>¡Gracias por unirte!</h2>
                <p>Hemos enviado un correo de confirmación a ${emailInput.value}</p>
                <button onclick="closeModal()">Cerrar</button>
            `;
        } catch (error) {
            modalContent.innerHTML = `
                <h2>Error</h2>
                <p>No pudimos completar tu suscripción. Intenta nuevamente.</p>
                <button onclick="closeModal()">Cerrar</button>
            `;
        }
        
        emailInput.value = '';
    });

    // Redes Sociales actualizadas
    document.querySelectorAll('.social-links a').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Controlador de audio global
    const audioControls = document.createElement('div');
    audioControls.className = 'audio-controls';
    audioControls.innerHTML = `
        <button class="play-pause"><i class="fas fa-play"></i></button>
        <div class="progress-bar">
            <div class="progress"></div>
        </div>
        <span class="time">0:00</span>
    `;
    document.body.appendChild(audioControls);
    
    function updateProgressBar(audio) {
        const progress = audioControls.querySelector('.progress');
        const timeDisplay = audioControls.querySelector('.time');
        
        const updateTime = () => {
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            progress.style.width = (audio.currentTime / audio.duration * 100) + '%';
        };
        
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('ended', () => {
            currentAudio.playButton.innerHTML = '<i class="fas fa-play"></i>';
            currentAudio.isPlaying = false;
            audioControls.classList.remove('active');
        });
        
        audioControls.classList.add('active');
        audioControls.querySelector('.play-pause').addEventListener('click', () => {
            if(audio.paused) {
                audio.play();
                audioControls.querySelector('.play-pause i').className = 'fas fa-pause';
            } else {
                audio.pause();
                audioControls.querySelector('.play-pause i').className = 'fas fa-play';
            }
        });
        
        const progressBar = audioControls.querySelector('.progress-bar');
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * audio.duration;
        });
    }
});

// Funciones del modal (mantener igual)
function showModal() { /* ... */ }
function closeModal() { /* ... */ }