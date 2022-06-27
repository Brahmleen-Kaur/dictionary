const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("input");
const synonyms = wrapper.querySelector(".synonyms .list");
const classSynonyms = wrapper.querySelector(".synonyms");
const example = wrapper.querySelector(".example");
const infoText = wrapper.querySelector(".info-text");
const volumeIcon = wrapper.querySelector(".speaker_icon");
let audio;
function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    }
    else {
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0];
        let synonym = result[0].meanings[0];
        let phonetics = `${result[0].meanings[0].partOfSpeech} ${result[0].phonetics[0].text}`;
        audio = new Audio(result[0].phonetics[0].audio);
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        if (definitions.example == undefined) {
            example.style.display = "none";
        }
        else{
            example.style.display = "block";
            document.querySelector(".example span").innerText = definitions.example;
        }

        if (synonym.synonyms[0] == undefined) {
            classSynonyms.style.borderStyle = "none";
            classSynonyms.style.padding = "0px";
            classSynonyms.style.marginTop = "0px";
            synonyms.parentElement.style.display = "none";
        }
        else {
            synonyms.parentElement.style.display = "block";
            classSynonyms.style.borderTop = "1px solid #ccc";
            classSynonyms.style.paddingTop = "14px";
            classSynonyms.style.marginTop = "17px";
            synonyms.innerHTML = "";
            for (let i = 0; i < synonym.synonyms.length; i++) {
                let tag = `<span onclick=search('${synonym.synonyms[i]}')>${synonym.synonyms[i]} </span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
    console.log(result);
}

function fetchApi(word) {
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }
});

volumeIcon.addEventListener("click", function () {
    audio.play();
});

function search(word){
    searchInput.value = word;
    fetchApi(word);
}