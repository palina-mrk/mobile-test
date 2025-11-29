// Функция для загрузки JSON-файла
async function loadJSON(langCode) {
  try {
    const response = await fetch(`/languages/${langCode}.json`);
    if (!response.ok) throw new Error('Failed to load translation file.');
    return await response.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

// Устанавливаем текстовые значения согласно данным из JSON
function setTranslations(translations) {
  document.getElementById('title-unlimited-access').innerHTML = translations['Get Unlimited <br>Access'];
  document.getElementById('title-art-creation').innerHTML = translations['Unlimited Art <br>Creation'];
  document.getElementById('title-exclusive-styles').innerHTML = translations['Exclusive <br>Styles'];
  document.getElementById('title-magic-avatars').innerHTML = translations['Magic Avatars <br>With 20% Off'];

  document.getElementById('title-yearly-access').innerHTML = translations['YEARLY ACCESS'];
  document.getElementById('best-offer-label').innerHTML = translations['BEST OFFER'];
  document.getElementById('yearly-price-template').innerHTML = translations['Just {{price}} per year'].replace('{{price}}', '$99');

  document.getElementById('title-weekly-access').innerHTML = translations['WEEKLY ACCESS'];
  document.getElementById('weekly-price-template').innerHTML = translations['{{price}} <br>per week'].replace('{{price}}', '$9.99');

  document.getElementById('terms-link').innerHTML = translations['Terms of Use'];
  document.getElementById('policy-link').innerHTML = translations['Privacy Policy'];
  document.getElementById('restore-btn').innerHTML = translations['Restore'];
  document.getElementById('continue-btn').innerHTML = translations['Continue'];
}

// Основная логика запуска
window.onload = async () => {
  const langParam = new URLSearchParams(window.location.search).get('lang') || 'en';
  const translations = await loadJSON(langParam);
  if (translations) {
    setTranslations(translations);
  } else {
    alert('Translation not found for this language!');
  }
};