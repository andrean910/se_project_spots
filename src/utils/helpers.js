export function setButtonText(btn, isLoading, defaultText = "Save") {
  let loadingText = defaultText.slice(0, -1) + "ing ...";

  if (isLoading) {
    btn.textContent = `${loadingText}`;
  } else {
    btn.textContent = `${defaultText}`;
  }
}
