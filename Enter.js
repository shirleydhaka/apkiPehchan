document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("languageSelect");
    const textDisplay = document.getElementById("textDisplay");
    // Function to display text based on selected language
    function displayText(language) {
      switch (language) {
        case "english":
          textDisplay.textContent = "Please Download your audios and then select and upload them";
          break;
        case "hindi":
          textDisplay.textContent = "कृपया अपने ऑडियो डाउनलोड करें और फिर उन्हें चुनें और अपलोड करें";
          break;
        default:
          textDisplay.textContent = "Text not available for selected language.";
      }
    }
    // Event listener for language selection change
    languageSelect.addEventListener("change", function() {
      const selectedLanguage = languageSelect.value;
      displayText(selectedLanguage);
    });
    // Initial display of text based on default selected language
    const defaultLanguage = languageSelect.value;
    displayText(defaultLanguage);
  });
  const mic_btn = document.querySelector('#mic');
          const playback = document.querySelector('.playback');
          let can_record = false;
          let is_recording = false;
          let recorder = null;
          let chunks = [];
          async function setupAudio() {
              try {
                  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                  setupStream(stream);
              } catch (err) {
                  console.error('Error accessing microphone:', err);
              }
          }
          setupAudio();
          // function setupStream(stream) {
          //     recorder = new MediaRecorder(stream);
          //     recorder.ondataavailable = e => {
          //         chunks.push(e.data);
          //     };
          //     recorder.onstop = e => {
          //         const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });
          //         chunks = [];
          //         const audioURL = window.URL.createObjectURL(blob);
          //         playback.src = audioURL;
          //     };
          //     can_record = true;
          // }
          function setupStream(stream) {
            recorder = new MediaRecorder(stream);
        
            recorder.ondataavailable = e => {
                chunks.push(e.data);
            };
  
            recorder.onstop = e => {
                const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });
                chunks = [];
  
                const audioURL = window.URL.createObjectURL(blob);
                playback.src = audioURL;
                const rollNumber = document.getElementById("rollNumber").value;
                const radioButtonValue = document.querySelector('input[name="namePresentYes"]:checked').value;
                const filename = rollNumber + radioButtonValue + '.wav';
  
                const saveFile = () => {
                    const a = document.createElement('a');
                    const url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = filename; 
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    }, 0);
                };
  
                saveFile();
            };


            can_record = true;
        }

        function toggleMic() {
            if (!can_record) return;
            is_recording = !is_recording;
            if (is_recording) {
                recorder.start();
                mic_btn.textContent = "Stop Recording";
                mic_btn.classList.add("is-recording");
            } else {
                recorder.stop();
                mic_btn.textContent = "Start Recording";
                mic_btn.classList.remove("is-recording");
            }
        }
        mic_btn.addEventListener('click', toggleMic);
