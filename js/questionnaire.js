// Récupérez les éléments du formulaire et du bouton "Commencer"
const quizForm = document.getElementById("quizForm");
const startButton = document.getElementById("startButton");

// Écoutez l'événement de clic sur le bouton "Commencer"
startButton.addEventListener("click", () => {
    // Masquez le bouton "Commencer"
    startButton.style.display = "none";
    // Affichez le formulaire
    quizForm.style.display = "block";
});

// Sélectionne toutes les questions du formulaire
const questions = document.querySelectorAll(".question");

// Initialise la question actuelle à 0 (la première question)
let currentQuestion = 0;

// Sélectionne les boutons de navigation
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

// Fonction pour afficher une question spécifique
function showQuestion(questionNumber) {
    // Masque toutes les questions
    questions.forEach((question) => question.classList.remove("active"));
    // Affiche la question spécifique
    questions[questionNumber].classList.add("active");
}

// Fonction pour mettre à jour l'état des boutons de navigation
function updateButtons() {
    // Le bouton "Précédent" est désactivé si nous sommes sur la première question
    prevBtn.disabled = currentQuestion === 0;

    // Le bouton "Suivant" est désactivé si nous sommes sur la dernière question
    nextBtn.disabled = currentQuestion === questions.length - 1;

    if (currentQuestion === questions.length - 1){
        // Le bouton "Suivant" est retiré si nous sommes déjà sur la dernière question
        nextBtn.classList.add("none");
    }else{
        // Le bouton "suivant" est réaffiché si nous sommes déjà sur la première question
        nextBtn.classList.remove("none");
    }



    // Le bouton "Envoyer" est désactivé si nous ne sommes pas sur la dernière question
    submitBtn.disabled = currentQuestion !== questions.length - 1;
}

function canProceed() {
    const currentQuestionInputs =
        questions[currentQuestion].querySelectorAll('input[name^="q"]');
    // Vérifie si au moins l'une des réponses a été cochée
    const answered = Array.from(currentQuestionInputs).some(
        (input) => input.checked
    );
    return answered;
}
// Gestionnaire d'événement pour le bouton "Précédent"
prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        // Décrémente le numéro de la question actuelle
        currentQuestion--;
        // Affiche la question précédente
        showQuestion(currentQuestion);
        // Met à jour l'état des boutons de navigation
        updateButtons();
    }
});

// Gestionnaire d'événement pour le bouton "Suivant"
nextBtn.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        // Incrémente le numéro de la question actuelle
        currentQuestion++;
        // Affiche la question suivante
        showQuestion(currentQuestion);
        // Met à jour l'état des boutons de navigation
        updateButtons();
    }
});


const textAlerte = document.getElementById("alerte");
// Gestionnaire d'événement pour le bouton "Envoyer"
submitBtn.addEventListener("click", () => {
    // Validation du formulaire
    const answers = [];
    questions.forEach((question) => {
        const selectedOption = question.querySelector('input[name^="q"]:checked');
        if (selectedOption) {
            answers.push(selectedOption.value);
        }
    });

    if (answers.length === questions.length) {
        textAlerte.innerHTML = ""
        // Affiche les réponses si toutes les questions ont été répondues
        alert("Réponses enregistrées : " + answers.join(", "));
        
    } else {
        textAlerte.innerHTML = "il vous manque des réponse à cochet"
    }
});

// Affiche la première question et met à jour les boutons de navigation
showQuestion(currentQuestion);
updateButtons();
