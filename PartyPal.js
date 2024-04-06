/* Thank you for using Party Pal v1.0 */

/* Created by Sharty Themes https://github.com/ShartyThemes */
/* Ported to Soyjak Wiki by User:Fowl */

// CSS-CHECK

const version = 'V1.0.2'
const checkPhrase = 'CSS-'+version+'-CHECK';
const userCssStorage = "user_css";
const currentCSS = localStorage.getItem(userCssStorage);
const cssCode = '@import "https://cdn.jsdelivr.net/gh/userfowlsoy/Party-Pal---Wiki-Port/style.css";';

function importCSS() {
  var element = document.createElement('style');
  element.innerHTML = cssCode;
  document.head.appendChild(element)
};

importCSS();

async function getImportedCss() {
  const cssUrl = "https://cdn.jsdelivr.net/gh/userfowlsoy/Party-Pal---Wiki-Port/style.css";
  try {
    const response = await fetch(cssUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSS: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching CSS:", error);
    return null;
  }
};

// Start Screen

let timeLastCall = 99999999999999999999;

function createBootup() {
  const bootScreen = document.createElement('div');
  bootScreen.id = "boot-screen";
  bootScreen.innerHTML = `
    <p>Initializing Code...</p>
  `;
  document.body.appendChild(bootScreen);
  const line2 = document.createElement('p');
  const line3 = document.createElement('p');
  line2.innerHTML = 'Installing Dataminers...';
  line3.innerHTML = 'Starting Party Pal Version 1.0.2-alpha-wikiport...';
  setTimeout(() => {
    bootScreen.appendChild(line2);
  }, 2000);
  setTimeout(() => {
    bootScreen.appendChild(line3);
  }, 4000);
  setTimeout(() => {
    hideBootScreen();
  }, 7000);
};

createBootup();

const bootScreen = document.getElementById("boot-screen");

function resetBootHidden() {
  localStorage.removeItem("bootUp");
};

const startupSound = new Audio("https://wiki.soyjak.party/images/c/c1/Startup.mp3");
const isBootUp = localStorage.getItem("bootUp");

function hideBootScreen() {
  bootScreen.classList.add('hidden');
  localStorage.setItem("bootUp", true);
  if (!isBootUp) {
    startupSound.play();
    setTimeout(() => {
      showReadyPopup();
    }, 6000);
  }
};

if (!isBootUp) {
  bootScreen.classList.remove("hidden");
} else {
  bootScreen.classList.add("hidden");
  timeLastCall = 0;
};

// popup 

function createPopup() {
  const popup = document.createElement('div');
  popup.id = "popup";
  popup.classList.add('hidden');
  popup.classList.add('popup-styles');
  document.body.appendChild(popup);
};

createPopup();

const popup = document.getElementById('popup');

function playPopup() {
  const popSound = new Audio("https://wiki.soyjak.party/images/8/8d/Popup.mp3");
  const pulsateAnimation = popup.getAnimations()[0];
  if (pulsateAnimation) {
    pulsateAnimation.cancel();
    pulsateAnimation.play();
  }
  popSound.play();
};

// Position Popup

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

const movePopup = (event) => {
  if (!isDragging) return;
  const newX = event.clientX - offsetX;
  const newY = event.clientY - offsetY;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const limitedX = Math.min(Math.max(newX, 0), windowWidth - popup.offsetWidth);
  const limitedY = Math.min(Math.max(newY, 0), windowHeight - popup.offsetHeight);

  popup.style.left = `${limitedX}px`;
  popup.style.top = `${limitedY}px`;
};

const startDrag = (event) => {
  offsetX = event.clientX - popup.offsetLeft;
  offsetY = event.clientY - popup.offsetTop;
  isDragging = true;
  popup.style.cursor = "grabbing";
  document.addEventListener("mousemove", movePopup);
  document.addEventListener("mouseup", stopDrag);
};

const stopDrag = () => {
  isDragging = false;
  popup.style.cursor = "default";
  document.removeEventListener("mousemove", movePopup);
  document.removeEventListener("mouseup", stopDrag);
};

popup.addEventListener("mousedown", startDrag);

// Eye 

function createEyeContainer() {
  const eyeContainer = document.createElement('div');
  eyeContainer.id = "eye-container";
  eyeContainer.innerHTML = `
    <input id="eye" type="button">
    <img id="pupil" src="https://wiki.soyjak.party/images/7/7c/Pupil.svg">
  `;
  document.getElementById('The_Eye').appendChild(eyeContainer);
};

createEyeContainer();

document.addEventListener('mousemove', (event) => {
  const eye = document.getElementById('eye-container');
  const pupil = document.getElementById('pupil');
  const eyeRect = eye.getBoundingClientRect();
  const eyeCenterX = eyeRect.left + eyeRect.width / 2;
  const eyeCenterY = eyeRect.top + eyeRect.height / 2;
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const deltaX = mouseX - eyeCenterX;
  const deltaY = mouseY - eyeCenterY;
  const maxPupilMove = (eyeRect.width - pupil.offsetWidth) / 2;
  const angle = Math.atan2(deltaY, deltaX);
  const distance = Math.hypot(deltaX, deltaY);
  const threshold = 10;
  let pupilX, pupilY;

  if (distance < threshold) {
    pupilX = (deltaX / threshold) * maxPupilMove * -1;
    pupilY = (deltaY / threshold) * maxPupilMove * -1;
  } else {
    pupilX = maxPupilMove * Math.cos(angle) * -1;
    pupilY = maxPupilMove * Math.sin(angle) * -1;
  }

  pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
});

// Boardlist pal

function createBoardlistPal() {
  const BoardlistPal = document.createElement('li');
  BoardlistPal.id = "n-pal-boardlist";
  BoardlistPal.innerHTML = `<a style="display: inline-block; color: #34345C; margin:0;">Party Pal</a>`;
  const boardlist = document.getElementsByClassName('pBody')[3].querySelector('ul');
  boardlist.appendChild(BoardlistPal);
  BoardlistPal.setAttribute("class", "sub");
  BoardlistPal.setAttribute("data-description", "13");
};

createBoardlistPal();

// Options 

function createOptionsContainer() {
  const optionsContainer = document.createElement('div');
  optionsContainer.id = "options-container";
  optionsContainer.innerHTML = `
    <div class="options-background"></div>
  `;
  optionsContainer.classList.add('hidden');
  document.body.appendChild(optionsContainer);
};

createOptionsContainer();

function createOptionsPopup() {
  const optionsPopup = document.createElement('div');
  optionsPopup.id = "options-popup";
  optionsPopup.classList.add('popup-styles');
  document.querySelector('#options-container').appendChild(optionsPopup);
};

createOptionsPopup();

// Options popup

const OptionsPopupSound = new Audio("https://wiki.soyjak.party/images/4/40/Options.mp3");

const optionsContainer = document.getElementById('options-container');
const optionsPopup = document.getElementById('options-popup');

function showOptionsPopup() {
  optionsPopup.innerHTML = `
    <p>How may I help you?</p>
    <div class="popup-btn-container">
      <button id="sharty-btn">Sharty</button>
      <button id="ru-btn">'Ru</button>
      <button id="music-btn">Music</button>
      <button id="options-ok-btn">Ok</button>
    </div>
  `;
  optionsContainer.classList.remove('hidden');
  popup.classList.add('hidden');
  document.getElementById('options-ok-btn').addEventListener('click', hideOptionsPopup);
  document.getElementById('sharty-btn').addEventListener('click', () => updateOptionsToSharty());
  document.getElementById('ru-btn').addEventListener('click', () => updateOptionsToRu());
  document.getElementById('music-btn').addEventListener('click', () => updateOptionsToMusic());
  updateDanceAnimation();
  checkActive = false;
  computeCheck.pause();
};

function updateOptionsToSharty() {
  optionsPopup.innerHTML = `
    <iframe src="https://soyjak.party/" style="width: 300px; height: 150px;"></iframe>
    <button id="options-back-btn">Back</button>
    <button id="options-ok-btn">Ok</button>
  `;
  document.getElementById('options-ok-btn').addEventListener('click', hideOptionsPopup);
  document.getElementById('options-back-btn').addEventListener('click', showOptionsPopup);
  updateDanceAnimation();
};

function updateOptionsToRu() {
  optionsPopup.innerHTML = `
    <iframe src="https://booru.soy/" style="width: 300px; height: 150px;"></iframe>
    <button id="options-back-btn">Back</button>
    <button id="options-ok-btn">Ok</button>
  `;
  document.getElementById('options-ok-btn').addEventListener('click', hideOptionsPopup);
  document.getElementById('options-back-btn').addEventListener('click', showOptionsPopup);
  updateDanceAnimation();
};

let currentPlaying = null;
let lastClickedButton = null;

function updateOptionsToMusic() {
  optionsPopup.innerHTML = `
    <p>Care for some tunes?</p>
    <button class="music-btns" style="background-color:red;" id="song1-btn">1</button>
    <button class="music-btns" style="background-color:blue;" id="song2-btn">2</button>
    <button class="music-btns" style="background-color:lime;" id="song3-btn">3</button>
    <button class="music-btns" style="background-color:yellow;" id="song4-btn">4</button>
    <button class="music-btns" style="background-color:white;" id="song5-btn">5<sub> (NEW!)</sub></button>
    <button class="music-btns" style="background-color:purple;" id="song6-btn">6<sub> (NEW!)</sub></button>
    <button id="options-back-btn">Back</button>
    <button id="options-ok-btn">Ok</button>
  `;
  updateDanceAnimation();
  document.getElementById('options-ok-btn').addEventListener('click', hideOptionsPopup);
  document.getElementById('options-back-btn').addEventListener('click', showOptionsPopup);
  document.getElementById('song1-btn').addEventListener('click', () => 
    toggleSong('https://wiki.soyjak.party/images/6/6d/I-Fucking-Love-Science.mp3', 'song1-btn'));
  document.getElementById('song2-btn').addEventListener('click', () => 
    toggleSong('https://wiki.soyjak.party/images/6/6c/Cobman.mp3', 'song2-btn'));
  document.getElementById('song3-btn').addEventListener('click', () => 
    toggleSong('https://wiki.soyjak.party/images/8/86/Papers-Please-Theme-Song.mp3', 'song3-btn'));
  document.getElementById('song4-btn').addEventListener('click', () => 
    toggleSong('https://wiki.soyjak.party/images/0/00/Own_nothing.mp3', 'song4-btn'));
  document.getElementById('song5-btn').addEventListener('click', () => 
    toggleSong('https://wiki.soyjak.party/images/f/f2/Dr.fauci.mp3', 'song5-btn'));
  document.getElementById('song6-btn').addEventListener('click', () => 
    toggleSong('https://wiki.soyjak.party/images/3/3b/Papers-Please-Death-Theme.mp3', 'song6-btn'));

};

function toggleSong(selectedSong, buttonId) {
  if (lastClickedButton === buttonId) {
    if (currentPlaying && !currentPlaying.paused) {
      currentPlaying.pause();
      toggleDanceAnimation(false);
    } else if (currentPlaying) {
      currentPlaying.play();
      toggleDanceAnimation(true);
    }
    return;
  }
  if (currentPlaying) {
    currentPlaying.pause();
    currentPlaying.currentTime = 0;
    toggleDanceAnimation(false);
  }

  currentPlaying = new Audio(selectedSong);
  currentPlaying.play();
  toggleDanceAnimation(true);
  lastClickedButton = buttonId;
  
  currentPlaying.addEventListener('ended', () => {
    toggleDanceAnimation(false);
  });
  currentPlaying.addEventListener('pause', () => {
    toggleDanceAnimation(false);
  });

  currentPlaying.addEventListener('play', () => {
    toggleDanceAnimation(true);
  });
};

function toggleDanceAnimation(isPlaying) {
  const pal = document.querySelectorAll('.popup-styles p');
  pal.forEach(element => {
    if (isPlaying) {
      element.classList.add('dance');
    } else {
      element.classList.remove('dance');
    }
  });
};

function updateDanceAnimation() {
  const isPlaying = currentPlaying && !currentPlaying.paused;
  toggleDanceAnimation(isPlaying);
};

function hideOptionsPopup() {
  optionsContainer.classList.add('hidden');
};

document.getElementById('n-pal-boardlist').addEventListener('click', showOptionsPopup);
document.getElementById('n-pal-boardlist').addEventListener('click', () => { OptionsPopupSound.play();});

// Ready 

function showReadyPopup() {
  popup.innerHTML = `
    <p>Hi, I'm Party Pal! Ready to take your Soyjak Wiki experience to the next level?</p> 
    <div class="popup-btn-container">
      <button id="yes-btn">Yes</button>
    </div>
  `;
  document.getElementById('yes-btn').addEventListener('click', updateReadyPopupToOK);
  popup.classList.remove('hidden');
  playPopup();
  updateDanceAnimation();
}

function updateReadyPopupToOK() {
  popup.innerHTML = `
    <p>As you browse the site, I'll offer helpful tips whenever I think you might need them!</p>
    <div class="popup-btn-container">
      <button id="ok-btn">OK</button>
    </div>
  `;
  document.getElementById('ok-btn').addEventListener('click', hidePopupInit);
  updateDanceAnimation();
}

// Help 

let isPopupActive = false;

let allowSelectionCheck = true;

const delay = 3000;

function showPopup(text, yesText, popupType = 0) {
  let timeNow = Date.now();
  if (timeNow - timeLastCall >= delay) {
    popup.innerHTML = `
      <p>${text}</p> 
      <button id="yes-btn">Yes</button>
      <button id="no-btn">No</button>
    `;
    document.getElementById('yes-btn').addEventListener('click', () => updatePopupToOK(yesText, popupType));
    document.getElementById('no-btn').addEventListener('click', hidePopup);
    popup.classList.remove('hidden');
    isPopupActive = true;
    playPopup();
    updateDanceAnimation();
    checkActive = false;
    computeCheck.pause();
    timeLastCall = timeNow;
  }
};

function hidePopupInit() {
  popup.classList.add('hidden');
  isPopupActive = false;
  allowSelectionCheck = true;
  isTextSelected();
  timeLastCall = 0;
};

function hidePopup() {
  popup.classList.add('hidden');
  isPopupActive = false;
  allowSelectionCheck = true;
  isTextSelected();
};

function redirectAccessDenied() {
  window.location.href = "https://wiki.soyjak.party/ACCESS_DENIED"
}; 

function updatePopupToOK(yesText, popupType = 0) {
  const newContent = `
    <p>${yesText}</p> 
    <button id="ok-btn">OK</button>
  `;
  popup.innerHTML = newContent;
  document.getElementById('ok-btn').addEventListener('click', hidePopup);
  if (popupType == 2) {
    redirectAccessDenied()
  }
  updateDanceAnimation();
};

// Fact Check 

let checkActive = false;

const computeCheck = new Audio("https://wiki.soyjak.party/images/1/1a/Compute.mp3");
const computeDone = new Audio("https://wiki.soyjak.party/images/2/2f/Done.mp3");

function showFactCheckPopup(resultImage, selectedText) {
  popup.innerHTML = `
    <p>I see you've highlighted some text. Would you like to run a fact check?</p> 
    <button id="yes-btn">Yes</button>
    <button id="no-btn">No</button>
  `;
  document.getElementById('yes-btn').addEventListener('click', () => updatePopupToCheckResult(resultImage, selectedText));
  document.getElementById('no-btn').addEventListener('click', hideCheckPopup);
  popup.classList.remove('hidden');
  playPopup();
  updateDanceAnimation();
  checkActive = false;
  computeCheck.pause();
};

function hideCheckPopup() {
  popup.classList.add('hidden');
  isPopupActive = false;
  allowSelectionCheck = false;
  computeCheck.pause();
  computeDone.pause();
  checkActive = false;
};

function updatePopupToCheckResult(resultImage, selectedText) {
  const FactImageContent = `
    <img id="fact-check-image" src="${resultImage}" alt="Fact Check Image" />
    <p class="selected-text">"${selectedText}"</p>
    <button id="ok-btn">OK</button>
  `;
  popup.innerHTML = FactImageContent;
  document.getElementById('ok-btn').addEventListener('click', hideCheckPopup);
  updateDanceAnimation();
  const factCheckResult = document.getElementById('fact-check-image');
  factCheckResult.style['max-width'] = '60px';
  allowSelectionCheck = false;
  computeDone.currentTime=0;
  computeCheck.currentTime=0;
  computeCheck.play();
  checkActive = true;
  setTimeout(() => {
    if (factCheckResult) {
      const imageUrls = [
        'https://wiki.soyjak.party/images/b/b3/Accurate_smug_wholesome.png',
        'https://wiki.soyjak.party/images/8/8d/Unsubstantiated_smug_wholesome.png',
        'https://wiki.soyjak.party/images/1/17/Misleading_smug_wholesome.png', 
        'https://wiki.soyjak.party/images/e/ed/False_smug_wholesome.png' 
      ];
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      factCheckResult.style['max-width'] = '150px';
      factCheckResult.src = imageUrls[randomIndex];
      computeCheck.pause();
      setTimeout(() => {
        playComputeDone();
      }, 200)
    }
  }, 3000)
};

function playComputeDone() {
  if (checkActive) {
    computeDone.play();
  }
}

document.addEventListener('mouseup', function() {
  const selectedText = window.getSelection().toString();
  if (selectedText.length > 4 && !isPopupActive) {
    showFactCheckPopup('https://wiki.soyjak.party/images/d/d0/Pal_Loading.gif', selectedText);
    isPopupActive = true;
  }
});

function isTextSelected() {
  const selectedText = window.getSelection().toString();
  if (selectedText.length > 4 && allowSelectionCheck) {
    showFactCheckPopup('https://wiki.soyjak.party/images/d/d0/Pal_Loading.gif', selectedText);
    isPopupActive = true;
  }
};

// Help texts 

const eyeClick = document.querySelectorAll('#eye-container');
eyeClick.forEach(element => {
  element.addEventListener('click', () => showPopup("Are you trying to investigate the red eye?", `YOU WILL BURN IN THE NAME OF FRQQT</p><script id="eyeClickRedirect">document.getElementById('ok-btn').addEventListener('mouseover', () => redirectAccessDenied());</script><p>`, 2));
});

const postImageHover = document.querySelectorAll('.mw-file-description, .mw-file-description img');
postImageHover.forEach(element => {
  element.addEventListener('mouseover', () => showPopup("It looks like you're trying to view an image. Would you like some help with that?", "Images provide a visual element to articles. Images within articles provide more visual information on a subject described within the article. Tip: try clicking on an image to enlarge it."));
});

const referenceHover = document.querySelectorAll('.external, .reference, .mw-cite-backlink');
referenceHover.forEach(element => {
  element.addEventListener('mouseover', () => showPopup("It looks like you're trying to view the article's citations. Would you like some help with that?", 'The contents of a Wiki can be sourced from other peer-reviewed and thoroughly fact-checked websites. These other sources, as they are called, are all conveniently linked in the article whenever necessary. References and citations are marked with a small bracketed number. While browsing outside the Wiki, beware of any viruses that you may find!'));
});

const templateHover = document.querySelectorAll('.mw-parser-output table:not(.wikitable), .mw-parser-output div:not(.mw-collapsible, .gallerytext, .toc, .thumb), .noexcerpt, .catlinks');
templateHover.forEach(element => {
  element.addEventListener('mouseover', () => showPopup("I see you're checking the templates. Would you like some help with that?", "Users can add templates to an article to place them in a category. Categories group articles with similar content and style together. Templates themselves visually provide meta information about an article, such as the quality of the article itself."));
});

const selflinkHover = document.querySelectorAll('.tocnumber, .toctext, .mw-selflink-fragment');
selflinkHover.forEach(element => {
  element.addEventListener('mouseover', () => showPopup("I see you're trying to navigate within an article. Would you like some help with that?", "The Table of Contents and other selflinks help you navigate around an article easier. Clicking on these links instantly takes you to the related section of the article."));
});

const editButtonHover = document.querySelectorAll('#ca-edit, #ca-ve-edit, #ca-viewsource, .mw-editsection, .ca-history');
editButtonHover.forEach(element => {
  element.addEventListener('mouseover', () => showPopup("It looks like you're trying to edit this article. Would you like some help with that?", "Editing this article allows you to add information you deem important to a Wiki article. Always be sure to check that your edits are peer-reviewed and fact checked before submitting. Remember to also follow the rules of the Wiki."));
});

const talkButtonHover = document.querySelectorAll('#ca-talk');
talkButtonHover.forEach(element => {
  element.addEventListener('mouseover', () => showPopup("It looks like you're trying to discuss with others about this article. Would you like some help with that?", "Each article on this Wiki has a talk page. Civilised and well-mannered discussion by professional writers, editors and fact checkers about the article you're on are held there."));
});

const boardlistHover = document.querySelectorAll('.mw-list-item a');
boardlistHover.forEach(element => {
  element.addEventListener('mouseover', () => showPopup("It looks like you're trying to navigate the wiki. Would you like some help with that?", "The navigation box provides a list available Wiki services for you to visit. Try clicking on one of them to see what that service is about."));
});

const articleHover = document.querySelectorAll('.mw-parser-output p:not(.external), .wikitable:not(.external), .gallery:not(.external), pre:not(.external)');
articleHover.forEach(element => {
  element.addEventListener('mouseover', () => showPopup("I see you're reading an article. Would you like some help with that?", "Articles are a source of pure facts, written by users like you and peer-reviewed and fact checked by the jannies (that do it for free). Articles generally contain plenty of truthful information on a subject."));
});

const titleHover = document.querySelectorAll('.mw-page-title-main, #siteSub');
titleHover.forEach(element => {
  element.addEventListener('mouseover', () => showPopup("I see you're reading the page title. Would you like some help with that?", "The page title quickly states what the article is about. Note the subtitle, it states that this article is on the Soyjak Wiki, The Free Soycyclopedia. That's because this website is the most free Soycyclopedia on the internet. And you VILL not question it, chuddy!"));
});
