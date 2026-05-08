// Звуковая система
const SoundSystem = {
    audioContext: null,
    soundEnabled: true,

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    playSound(type) {
        if (!this.soundEnabled) return;

        try {
            this.init();

            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            gainNode.gain.value = 0.2;

            switch(type) {
                case 'correct':
                    oscillator.frequency.value = 880;
                    oscillator.start();
                    gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 0.3);
                    oscillator.stop(this.audioContext.currentTime + 0.3);
                    break;
                case 'wrong':
                    oscillator.frequency.value = 440;
                    oscillator.start();
                    gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 0.3);
                    oscillator.stop(this.audioContext.currentTime + 0.3);
                    break;
                case 'flip':
                    oscillator.frequency.value = 600;
                    oscillator.start();
                    gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 0.1);
                    oscillator.stop(this.audioContext.currentTime + 0.1);
                    break;
                case 'match':
                    oscillator.frequency.value = 700;
                    oscillator.start();
                    gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 0.15);
                    oscillator.stop(this.audioContext.currentTime + 0.15);
                    setTimeout(() => {
                        if (this.soundEnabled) {
                            const osc2 = this.audioContext.createOscillator();
                            const gain2 = this.audioContext.createGain();
                            osc2.connect(gain2);
                            gain2.connect(this.audioContext.destination);
                            osc2.frequency.value = 880;
                            gain2.gain.value = 0.2;
                            osc2.start();
                            gain2.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 0.15);
                            osc2.stop(this.audioContext.currentTime + 0.15);
                        }
                    }, 100);
                    break;
                case 'win':
                    const notes = [523.25, 659.25, 783.99, 1046.50];
                    notes.forEach((freq, idx) => {
                        setTimeout(() => {
                            if (this.soundEnabled) {
                                const oscN = this.audioContext.createOscillator();
                                const gainN = this.audioContext.createGain();
                                oscN.connect(gainN);
                                gainN.connect(this.audioContext.destination);
                                oscN.frequency.value = freq;
                                gainN.gain.value = 0.2;
                                oscN.start();
                                gainN.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 0.4);
                                oscN.stop(this.audioContext.currentTime + 0.4);
                            }
                        }, idx * 200);
                    });
                    break;
                case 'start':
                    const startNotes = [523.25, 587.33, 659.25];
                    startNotes.forEach((freq, idx) => {
                        setTimeout(() => {
                            if (this.soundEnabled) {
                                const oscS = this.audioContext.createOscillator();
                                const gainS = this.audioContext.createGain();
                                oscS.connect(gainS);
                                gainS.connect(this.audioContext.destination);
                                oscS.frequency.value = freq;
                                gainS.gain.value = 0.2;
                                oscS.start();
                                gainS.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 0.2);
                                oscS.stop(this.audioContext.currentTime + 0.2);
                            }
                        }, idx * 150);
                    });
                    break;
            }
        } catch(e) {
            console.log('Sound error:', e);
        }
    }
};

// Глобальные функции
function playSound(type) {
    SoundSystem.playSound(type);
}

function toggleSound() {
    SoundSystem.soundEnabled = !SoundSystem.soundEnabled;
    const btns = document.querySelectorAll('.sound-toggle-btn');
    btns.forEach(btn => {
        btn.textContent = SoundSystem.soundEnabled ? '🔊 Звук вкл' : '🔇 Звук выкл';
    });
}

// Активация звука при первом клике
document.addEventListener('click', function initSound() {
    SoundSystem.init();
    document.removeEventListener('click', initSound);
}, { once: true });