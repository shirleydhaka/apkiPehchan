const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});


$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY>20){
            $('.navbar').addClass("sticky")

        }else{
            $('.navbar').removeClass("sticky")

        }
})
});




document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("languageSelect");
    const textDisplay = document.getElementById("textDisplay");
  
    // Function to display text based on selected language
    function displayText(language) {
      switch (language) {
        case "english":
          textDisplay.textContent = "The towels had been hanging from the rod for years. They were stained and worn, and quite frankly, just plain ugly.Debra didn't want to touch them but she really didn't have a choice. It was important for her to see what was living within them.";
          break;
        case "hindi":
          textDisplay.textContent = "तौलिए वर्षों से रॉड से लटके हुए थे। वे दागदार और घिसे-पिटे थे, और स्पष्ट रूप से, बिल्कुल बदसूरत थे। डेबरा उन्हें छूना नहीं चाहती थी लेकिन उसके पास वास्तव में कोई विकल्प नहीं था। उनके लिए यह देखना महत्वपूर्ण था कि उनके भीतर क्या रह रहा है।";
          break;
        case "spanish":
          textDisplay.textContent = "Las toallas llevaban años colgadas de la barra. Estaban manchadas y desgastadas y, francamente, simplemente feas. Debra no quería tocarlos pero realmente no tenía otra opción. Para ella era importante ver lo que vivía dentro de ellos.";
          break;
        case "french":
          textDisplay.textContent = "Les serviettes étaient suspendues à la tringle depuis des années. Ils étaient tachés et usés et, franchement, tout simplement laids. Debra ne voulait pas les toucher mais elle n'avait vraiment pas le choix. Il était important pour elle de voir ce qui vivait en eux.";
          break;
        // Add cases for other languages as needed
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
  
  
  
  
  
