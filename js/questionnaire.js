const quizForm = document.getElementById("quizForm");
const textResult = document.getElementById("text_result");
const startButton = document.getElementById("startButton");

// Gestionnaire d'événement pour le bouton "Commencer"
startButton.addEventListener("click", () => {
    // Masquer le bouton "Commencer"
    startButton.style.display = "none";
    // Afficher le formulaire
    quizForm.style.display = "block";
});

// Sélectionner toutes les questions du formulaire
const questions = document.querySelectorAll(".question");

// Initialiser la question actuelle à 0 (la première question)
let currentQuestion = 0;

// Sélectionner les boutons de navigation
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

// Fonction pour afficher une question spécifique
function showQuestion(questionNumber) {
    // Masquer toutes les questions
    questions.forEach((question) => question.classList.remove("active"));
    // Afficher la question spécifique
    questions[questionNumber].classList.add("active");
}

// Fonction pour mettre à jour l'état des boutons de navigation
function updateButtons() {
    // Le bouton "Précédent" est désactivé si nous sommes sur la première question
    prevBtn.disabled = currentQuestion === 0;

    // Le bouton "Suivant" est désactivé si nous sommes sur la dernière question
    nextBtn.disabled = currentQuestion === questions.length - 1;

    if (currentQuestion === questions.length - 1) {
        nextBtn.classList.add("none");
    } else {
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
        // Décrémenter le numéro de la question actuelle
        currentQuestion--;
        // Afficher la question précédente
        showQuestion(currentQuestion);
        // Mettre à jour l'état des boutons de navigation
        updateButtons();
    }
});

// Gestionnaire d'événement pour le bouton "Suivant"
nextBtn.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        // Incrémenter le numéro de la question actuelle
        currentQuestion++;
        // Afficher la question suivante
        showQuestion(currentQuestion);
        // Mettre à jour l'état des boutons de navigation
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
        textAlerte.innerHTML = "";

        var lastAnswer = answers.pop();

        // Utilisation de la méthode 'reduce' pour calculer la somme
        const total = answers.reduce((accumulator, currentValue) => {
            // Convertir les valeurs actuelles en nombres (parseFloat)
            const currentNumber = parseFloat(currentValue);
            // Ajouter la valeur convertie à l'accumulateur
            return accumulator + currentNumber;
        }, 0);

        if (total <= 10) {
            var taux = 3;
        } else if (total <= 15) {
            var taux = 2.74;
        } else if (total <= 25) {
            var taux = 2.52;
        } else if (total <= 33) {
            var taux = 2.10;
        } else {
            var taux = 1.85;
        }

        var lastAnswerFloat = parseFloat(lastAnswer);
        const result = taux + lastAnswerFloat;

        quizForm.classList.add('none');
        textResult.classList.remove('none');
        const divResult = document.getElementById("result");

        // retour avec toute les information
        divResult.innerHTML = "<h1>Vos frais s'élèvent à : " + result + "%</h1> <p>Vous avez atteint le score de : <b>" + total + "/40</b> soit <b>" + total/2 + "/20</b>";
    } else {
        textAlerte.innerHTML = "Il vous manque des réponses à cocher";
    }
});

const restartBtn = document.getElementById("restartBtn");

// Gestionnaire d'événement pour le bouton "Recommencer"
restartBtn.addEventListener("click", () => {
    // Masquer le résultat
    textResult.classList.add("none");

    // Réinitialiser la question actuelle à 0
    currentQuestion = 0;

    // Décocher toutes les réponses
    questions.forEach((question) => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        inputs.forEach((input) => {
            input.checked = false;
        });
    });

    quizForm.classList.remove('none');

    // Afficher la première question
    showQuestion(currentQuestion);

    // Mettre à jour les boutons de navigation
    updateButtons();
});

// Afficher la première question et mettre à jour les boutons de navigation
showQuestion(currentQuestion);
updateButtons();
