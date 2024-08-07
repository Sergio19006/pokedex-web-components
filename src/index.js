import './index.less';
import'./grid/index.js';
import './assets/images/favicon.ico'


var isMobile = (/iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent) || screen.availWidth < 480)

document.body.className =  isMobile ? 'mobile' : 'desktop';

document.addEventListener('DOMContentLoaded', () => {
    const goToTopButton = document.createElement('button');
    goToTopButton.classList.add('go-to-top');
    goToTopButton.innerHTML = '&#8593;';
    goToTopButton.style.display = 'none';

    goToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(goToTopButton);

    document.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            goToTopButton.style.display = 'block';
        } else {
            goToTopButton.style.display = 'none';
        }
    });
});