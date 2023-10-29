document.addEventListener('DOMContentLoaded', function() {
    fetch('/responses')
        .then(response => response.json())
        .then(data => {
            // Remplir le tableau des utilisateurs
            const userTable = document.getElementById('userTable');
            Object.keys(data).forEach(role => {
                data[role].forEach(user => {
                    const row = userTable.insertRow();
                    row.insertCell().textContent = user.pseudo;
                    row.insertCell().textContent = role;
                    row.insertCell().textContent = user.classe;
                });
            });

            // Remplir le nombre de joueurs par rôle
            document.getElementById('tankCount').textContent = data.tank.length;
            document.getElementById('healCount').textContent = data.heal.length;
            document.getElementById('dpsCount').textContent = data['dps-distance'].length + data['dps-cac'].length;
        })
        .catch(error => console.error('Erreur :', error));
});
