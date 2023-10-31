document.addEventListener('DOMContentLoaded', async function() {
    const characterTable = document.getElementById('characterTable').getElementsByTagName('tbody')[0];
    
    try {
      const response = await fetch('/characters');
      if (response.ok) {
        const data = await response.json();
        data.characters.forEach(character => {
          const row = characterTable.insertRow();
          row.insertCell().textContent = character.pseudo;
          row.insertCell().textContent = character.role;
          row.insertCell().textContent = character.class;
        });
      } else {
        console.error('Error fetching character data');
      }
    } catch (error) {
      console.error(error);
    }
  });
  