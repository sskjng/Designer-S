if (document.readyState !== 'loading') { initExtensions(); }
else { document.addEventListener('DOMContentLoaded', event => initExtensions()); }

function initExtensions() {
  const board = document.querySelector('.board');
  board.addEventListener('click', event => {
    board.classList.toggle('-static');
  });
}
