const changeVisibility = (newVisibility: 'flex' | 'none') => {
  const loaderElement = document.getElementById('global-loader');
  if (loaderElement) {
    loaderElement.style.display = newVisibility;
  }
};

// Not putting the functions in the component so they always have the same reference.
const showLoading = () => {
  changeVisibility('flex');
};
const hideLoading = () => {
  changeVisibility('none');
};

export default () => ({ showLoading, hideLoading });
