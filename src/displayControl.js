let loadingAnimationStart = () => {
  let animationModal = document.querySelector('.animation-modal');
  let animator = document.querySelector('.animator');
  animationModal.style.display = 'flex';
};

let loadingAnimationEnd = () => {
  let animationModal = document.querySelector('.animation-modal');
  animationModal.style.display = 'none';
};

let createDOMdisplay = data => {
  nextSevenDaysDisplay(data);
};

let nextSevenDaysDisplay = data => {
  let weeklyContainer = document.querySelector('.weekly-display');
  for (let i = 1; i <= 7; i++) {
    console.log(data.daily[i]);
  }
};

export { loadingAnimationStart, loadingAnimationEnd, createDOMdisplay };
