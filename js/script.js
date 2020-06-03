/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Global Variables
const studentItems = document.getElementsByClassName('student-item');
const toShow = 10;
let newPage = 1;

/**
 *
 * @param {Array} list - List of Students in the form of an array
 * @param {Number} page  - Which page to display, window loads on page 1
 *  - A Function to display a maximum number of students
 */
function showPage(list, page) {
  const startIndex = page * toShow - toShow;
  const endIndex = page * toShow;
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }
}

/**
 *
 * @param {Array} list - List of Students in the form of an array
 *  - A function to dynamically create the pagination navigation
 */
function appendPageLinks(list) {
  const page = document.querySelector('.page');
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination');
  const ul = document.createElement('ul');

  const pagesRequired = Math.ceil(list.length / toShow);

  for (let i = 0; i < pagesRequired; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.classList.add('nav');
    a.innerHTML = `${i + 1}`;
    if (i === 0) {
      a.classList.add('active');
    }
    li.appendChild(a);
    ul.appendChild(li);
  }
  paginationDiv.appendChild(ul);
  page.appendChild(paginationDiv);

  const navs = document.getElementsByClassName('nav');
  for (let i = 0; i < navs.length; i++) {
    navs[i].addEventListener('click', (e) => {
      newPage = e.target.textContent;
      for (let i = 0; i < navs.length; i++) {
        navs[i].classList.remove('active');
      }
      e.target.classList.add('active');
      showPage(studentItems, newPage);
    });
  }
}

showPage(studentItems, newPage);
appendPageLinks(studentItems);
