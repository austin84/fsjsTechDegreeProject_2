// Global Variables
// List of students pulled from HTML
const studentItemsHTML = document.getElementsByClassName('student-item');
const studentItems = Array.from(studentItemsHTML);

// Maximum number of students to show on the page at a time
const toShow = 10;

/**
 *
 * @param {Array} list - List of Students in the form of an array
 * @param {Number} page  - Which page to display, window loads on page 1
 *  - A Function to display a maximum number of students
 */
function showPage(list, page) {
  // calculate which list items to show
  const startIndex = page * toShow - toShow;
  const endIndex = page * toShow;
  // set display properties appropriately to either show or hide list items
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
  const ul = document.createElement('ul');
  const pagesRequired = Math.ceil(list.length / toShow);
  const navs = document.getElementsByClassName('nav');
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination');

  // Create HTML structure for navigation
  for (let i = 0; i < pagesRequired; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
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

  // Event Listener Loop for navigation
  for (let i = 0; i < navs.length; i++) {
    navs[i].addEventListener('click', (e) => {
      const newPage = e.target.textContent;
      for (let i = 0; i < navs.length; i++) {
        navs[i].classList.remove('active');
      }
      e.target.classList.add('active');
      showPage(studentItems, newPage);
    });
  }
}

/**
 *
 * @param {Array} list - Filtered List of Students in the form of an array that is only {display:block;} students
 *  - A function to update the pagination navigation after a search
 */
function upatePageLinks(list) {
  const div = document.querySelector('.pagination');
  div.innerHTML = '';
  const ul = document.createElement('ul');
  const pagesRequired = Math.ceil(list.length / toShow);
  const navs = document.getElementsByClassName('nav');

  // Create HTML structure for navigation
  for (let i = 0; i < pagesRequired; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('nav');
    a.innerHTML = `${i + 1}`;
    if (i === 0) {
      a.classList.add('active');
    }
    li.appendChild(a);
    ul.appendChild(li);
  }
  div.appendChild(ul);

  // Event Listener Loop for navigation
  for (let i = 0; i < navs.length; i++) {
    navs[i].addEventListener('click', (e) => {
      const newPage = e.target.textContent;
      for (let i = 0; i < navs.length; i++) {
        navs[i].classList.remove('active');
      }
      e.target.classList.add('active');
      showPage(studentItems, newPage);
    });
  }
}

/**
 *  - A function to dynamically create the search bar
 */
function appendSearch() {
  const container = document.querySelector('.page-header');
  const div = document.createElement('div');
  div.classList.add('student-search');
  const input = document.createElement('input');
  input.placeholder = 'Search for students...';
  const button = document.createElement('button');
  button.innerHTML = 'Search';

  div.appendChild(input);
  div.appendChild(button);
  container.appendChild(div);
  inputListen();
}

// Search functionality

function inputListen() {
  const input = document.querySelector('input');
  const container = document.querySelector('.student-list');
  const div = document.createElement('div');
  div.style.display = 'none';
  const h3 = document.createElement('h3');
  h3.innerHTML = 'That search returned zero results...';
  div.appendChild(h3);
  container.appendChild(div);

  input.addEventListener('keyup', (e) => {
    for (let i = 0; i < studentItems.length; i++) {
      const name =
        studentItems[i].firstElementChild.firstElementChild.nextElementSibling
          .innerHTML;
      if (name.includes(input.value)) {
        studentItems[i].style.display = 'block';
      } else {
        studentItems[i].style.display = 'none';
      }
    }

    const studentItemsFiltered = studentItems.filter(
      (student) => student.style.display == 'block'
    );

    showPage(studentItemsFiltered, 1);
    upatePageLinks(studentItemsFiltered);

    if (studentItemsFiltered.length === 0) {
      div.style.display = 'block';
    } else {
      div.style.display = 'none';
    }
  });
}

// Call Functions to show the paginated list and add the navigation

showPage(studentItems, 1);
appendPageLinks(studentItems);
appendSearch();
