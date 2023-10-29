document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var errors = [];
    var pseudo = document.getElementById("pseudo").value;
    var role = document.getElementById("role").value;
    var classe = document.getElementById("classe").value;


    // Vérifier si le champ "Pseudo" est rempli
    if (!pseudo) {
        errors.push("Veuillez saisir votre pseudo.");
    }

    // Vérifier si le rôle a été sélectionné
    if (!role) {
        errors.push("Veuillez sélectionner un rôle.");
    }

    // Vérifier si la classe a été sélectionnée si un rôle est sélectionné
    if (role && !classe) {
        errors.push("Veuillez sélectionner une classe.");
    }

    // Afficher les messages d'erreur
    var errorMessages = document.getElementById("errorMessages");
    errorMessages.innerHTML = errors.join("<br>");

    // Si aucune erreur, stocker les réponses dans un objet JSON
    if (errors.length === 0) {
        var response = {
            pseudo: pseudo,
            role: role,
            classe: classe
        };

        // Envoyer les réponses à un serveur (Node.js) via une requête POST
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
        })
        .then(response => response.json())
        .then(data => {
            // Afficher un message de confirmation
            errorMessages.innerHTML = "Formulaire soumis avec succès!";
            // Réinitialiser le formulaire
            document.getElementById("myForm").reset();
        });
    }
});

// Mettre à jour les options du sélecteur de classe en fonction du rôle sélectionné
var roleSelect = document.getElementById("role");
var classeContainer = document.getElementById("classeContainer");
var classeSelect = document.getElementById("classe");

roleSelect.addEventListener("change", function() {
    var selectedRole = roleSelect.value;
    if (selectedRole) {
        classeContainer.style.display = "block"; // Afficher le conteneur de la classe
        classeSelect.innerHTML = ""; // Effacer les anciennes options

        // Ajouter les nouvelles options basées sur le rôle sélectionné
        var options;
        if (selectedRole === "heal") {
            options = ["Holy Paladin", "Discipline Priest", "Restoration Shaman", "Restoration Druid", "Preservation Evoker", "Mistweaver Monk", "Holy Priest"];
        } else if (selectedRole === "tank") {
            options = ["Guardian Druid", "Vengeance Demon Hunter", "Protection Paladin", "Blood Death Knight", "Protection Warrior", "Brewmaster Monk"];
        } else if (selectedRole === "dps-distance") {
            options = ["Augmentation Evoker", "Shadow Priest", "Fire Mage", "Balance Druid", "Destruction Warlock", "Frost Mage", "Devastation Evoker", "Elemental Shaman", "Beast Mastery Hunter", "Affliction Warlock", "Arcane Mage", "Demonology Warlock"];
        } else if (selectedRole === "dps-cac") {
            options = ["Enhancement Shaman", "Subtlety Rogue", "Fury Warrior", "Retribution Paladin", "Frost Death Knight", "Havoc Demon Hunter", "Marksmanship Hunter", "Arms Warrior", "Survival Hunter", "Outlaw Rogue", "Windwalker Monk", "Feral Druid", "Assassination Rogue", "Unholy Death Knight"];
        }

        options.forEach(function(option) {
            var newOption = document.createElement("option");
            newOption.text = option;
            classeSelect.add(newOption);
        });
    } else {
        classeContainer.style.display = "none"; // Masquer le conteneur de la classe si aucun rôle n'est sélectionné
        classeSelect.innerHTML = ""; // Vider les options de la classe
    }
});
