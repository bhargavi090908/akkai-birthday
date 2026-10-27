// Floating hearts background
function createHearts() {
  const container = document.getElementById('heartsContainer');

  if (!container) return;

  const heartEmojis = ['💖', '🌸', '✨', '💕', '🌷', '🫶🏻'];

  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');

    heart.className = 'floating-heart';
    heart.textContent =
      heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = (Math.random() * 5) + 's';

    container.appendChild(heart);
  }
}

createHearts();

// Screen navigation
function goToScreen(screenId) {
  const target = document.getElementById(screenId);

  if (!target) return;

  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  target.classList.add('active');

  if (screenId === 'screen-letter') {
    target.scrollTop = 0;

    const card = target.querySelector('.card');
    if (card) card.scrollTop = 0;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Password check
function checkPasscode() {
  const input = document
    .getElementById('passcodeInput')
    .value.trim();

  const errorMsg = document.getElementById('passcodeError');

  if (input === '2008') {
    errorMsg.textContent = '';
    goToScreen('screen-welcome');
  } else {
    errorMsg.textContent =
      'Oops! Not quite right 🥹 Hint: The year we met for the first time ❤️';
  }
}

// Press Enter to unlock
document.getElementById('passcodeInput').addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    checkPasscode();
  }
});

// Four personal birthday wishes
const balloonWishes = {
  1: `🥹❤️ Can we go back to our childhood?

Malli nee tho school ki vellali, remote kosam godava padali, nuvvu naaku snacks konivvadam kosam wait cheyyali.

Appudu aa moments normal anukunna, kaani ippudu avi naa favourite memories ayipoyayi. I wish I could be that little kid again, with you beside me. 🫶🏻`,

  2: `😂❤️ Oye Akka, naa chinna headache!

Naa childhood lo naaku toys kanna ekkuva fights, chocolates kanna ekkuva memories ichindhi nuvve!

Remote kosam kottukunnam, chinna chinna vishayalaki aligam, malli konchem sepatike kalisipoyam. Appudu nuvvu naa biggest headache… ippudu nuvvu naa favourite memory!

First best friend nuvve, first enemy kuda nuvve! 😂💗`,

  3: `🥹❤️ Akka, manam chinnappudu entha close ga unde vaallamo gurthosthe ippatiki chaala miss avuthanu.

Ippudu konni things valla mundhu laaga maatladukokapovachu, kaani mana childhood memories ni marchipolenu.

Nuvvu naatho daily maatladakapoyina, naa life lo nee place eppatiki special eh.

Manam malli old us avvalani korukuntunna… because I miss my sister, my childhood partner, and my safe place. 🫂💕`,

  4: `🎂❤️ Happy Birthday, naa Thingari Buchi!

Time maarindhi, manam perigam, mana madhya konni distances kuda vachayi. Kaani okati maatram maaraledhu — nuvvu naa akka vi, naa childhood lo oka beautiful part vi, eppatiki naa own person vi.

Nuvvu happy ga undali, nee dreams anni fulfil avvali. Mana madhya unna chinna misunderstandings anni mellaga tholagipoyi, manam malli chinnappati laaga navvukune roju raavali ani korukuntunna.

Love you always, Akka. No matter what. ❤️🫂`
};

let poppedCount = 0;

// Pop a balloon and display its wish
function popBalloon(number) {
  const balloon = document.querySelector(`.balloon-${number}`);

  if (!balloon || balloon.classList.contains('popped')) return;

  balloon.classList.add('popped');
  balloon.disabled = true;

  const wishBox = document.getElementById('balloonWishBox');
  const wishText = document.getElementById('balloonWishText');

  wishText.textContent = balloonWishes[number];
  wishBox.classList.remove('hidden');

  poppedCount++;

  const remaining = 4 - poppedCount;
  const progress = document.getElementById('balloonProgress');

  if (remaining > 0) {
    progress.textContent =
      `${remaining} more ${remaining === 1 ? 'surprise' : 'surprises'} waiting for you! 💗`;
  } else {
    progress.textContent = 'You unlocked all four wishes! 🥹❤️';
    document.getElementById('balloonsNextBtn').classList.remove('hidden');
  }
}

// Close current wish
function closeWish() {
  document.getElementById('balloonWishBox').classList.add('hidden');
}

// Blow out the candle
function blowCandle() {
  const flame = document.getElementById('flame');
  const status = document.getElementById('candleStatus');
  const nextBtn = document.getElementById('candleNextBtn');

  if (flame.classList.contains('out')) return;

  flame.classList.add('out');

  status.textContent =
    '✨ May all your beautiful wishes come true, Akka! Happy Birthday! ❤️';

  nextBtn.classList.remove('hidden');
}

// Replay the surprise
function restartSurprise() {
  poppedCount = 0;

  // Reset balloons
  document.querySelectorAll('.balloon').forEach(balloon => {
    balloon.classList.remove('popped');
    balloon.disabled = false;
  });

  // Reset wishes
  document.getElementById('balloonWishBox').classList.add('hidden');

  document.getElementById('balloonProgress').textContent =
    '4 little surprises are waiting for you! 💗';

  document.getElementById('balloonsNextBtn').classList.add('hidden');

  // Reset candle
  document.getElementById('flame').classList.remove('out');

  document.getElementById('candleStatus').textContent =
    'Your wish is waiting! Tap the flame 🔥';

  document.getElementById('candleNextBtn').classList.add('hidden');

  // Reset password field
  document.getElementById('passcodeInput').value = '';
  document.getElementById('passcodeError').textContent = '';

  // Return to welcome screen
  goToScreen('screen-welcome');
}
