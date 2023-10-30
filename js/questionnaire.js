const quizForm = document.getElementById("quizForm");
const textResult = document.getElementById("text_result");
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

        var lastAnswer = answers.pop();
        
        // Utilisation de la méthode 'reduce' pour calculer la somme
        const total = answers.reduce((accumulator, currentValue) => {
            // Convertir les valeurs actuelles en nombres (parseInt)
            const currentNumber = parseFloat(currentValue, 10);
            // Ajouter la valeur convertie à l'accumulateur
            return accumulator + currentNumber;
        }, 0);

        if (total <= 10) {
            var taux = 3;
        }else if (total <= 15) {
            var taux = 2.74;
        }else if (total <= 25) {
            var taux = 2.52;
        }else if (total <= 33) {
            var taux = 2.10;
        }else {
            var taux = 1.85;
        }
        var lastAnswer = parseFloat(lastAnswer, 10);
        const result = taux + lastAnswer;

        quizForm.classList.add('none')
        textResult.classList.remove('none')
        const divResult = document.getElementById("result");
        divResult.innerHTML = "<h1>Vos frais s'élève à : " + result + "%</h1> <p>vous avez atteint le score de : <b>" + total + "/40</b> soit <b>" + total/2 +"/20</b>"
    } else {
        textAlerte.innerHTML = "il vous manque des réponse à cochet"
    }
});

const restartBtn = document.getElementById("restartBtn");

restartBtn.addEventListener("click", () => {
    // Masquez le résultat
    textResult.classList.add("none");
    
    // Réinitialisez la question actuelle à 0
    currentQuestion = 0;

    // Décochez toutes les réponses
    questions.forEach((question) => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        inputs.forEach((input) => {
            input.checked = false;
        });
    });

    quizForm.classList.remove('none')
    
    // Affichez la première question
    showQuestion(currentQuestion);

    // Mettez à jour les boutons de navigation
    updateButtons();
});



// Affiche la première question et met à jour les boutons de navigation
showQuestion(currentQuestion);
updateButtons();