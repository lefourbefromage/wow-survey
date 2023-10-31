document.getElementById('role').addEventListener('change', function() {
  var role = this.value;
  var classOptions = document.getElementById('class');
  classOptions.innerHTML = '';

  if (role === 'heal') {
    addOptions(classOptions, ['Holy Paladin', 'Discipline Priest', 'Restoration Shaman', 'Druid of Restoration', 'Evoker of Preservation', 'Monk of Mist Weaving', 'Holy Priest']);
  } else if (role === 'tank') {
    addOptions(classOptions, ['Druid Guardian', 'Avenging Demon Hunter', 'Paladin of Protection', 'Blood Knight of Death', 'Warrior of Protection', 'Brewing Monk']);
  } else if (role === 'dps_distance') {
    addOptions(classOptions, ['Evoker augmentation', 'Shadow Priest', 'Fire Mage', 'Druid of Balance', 'Warlock Destruction', 'Frost Mage', 'Evoker of Devastation', 'Elemental Shaman', 'Beast Master Hunter', 'Warlock Affliction', 'Arcane Mage', 'Warlock Demonology']);
  } else if (role === 'dps_cac') {
    addOptions(classOptions, ['Shaman Enhancement', 'Rogue Subtlety', 'Warrior of Fury', 'Paladin of Retribution', 'Knight of Frost Death', 'Havoc Demon Hunter', 'Precision Hunter', 'Weapons Warrior', 'Survival Hunter', 'Rogue Outlaw', 'Wind Walker Monk', 'Fierce Druid', 'Rogue Assassin', 'Unholy Death Knight']);
  }

  // Reset class selector if no role is selected
  if (role === '') {
    classOptions.innerHTML = '';
  }
});

function addOptions(selectElement, options) {
  options.forEach(function(option) {
    var optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.text = option;
    selectElement.appendChild(optionElement);
  });
}

document.getElementById('characterForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  var pseudo = document.getElementById('pseudo').value;
  var role = document.getElementById('role').value;
  var className = document.getElementById('class').value;

  if (!pseudo || !role || !className) {
    document.getElementById('error-message').textContent = 'All fields are mandatory.';
    return;
  } else {
    document.getElementById('error-message').textContent = '';
  }

  var characterData = {
    pseudo: pseudo,
    role: role,
    class: className
  };

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(characterData)
    });

    if (response.ok) {
      // Clear the form
      document.getElementById('pseudo').value = '';
      document.getElementById('role').value = '';
      document.getElementById('class').innerHTML = '';
      document.getElementById('error-message').textContent = 'Form submitted successfully!';
    } else {
      document.getElementById('error-message').textContent = 'Error submitting the form. Please try again later.';
    }
  } catch (error) {
    console.error(error);
    document.getElementById('error-message').textContent = 'Error submitting the form. Please try again later.';
  }
});
