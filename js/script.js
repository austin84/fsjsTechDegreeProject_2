// Global Variables
// List of students pulled from HTML
const studentItems = document.getElementsByClassName('student-item');

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

// Seearch functionality

function inputListen() {
  const input = document.querySelector('input');

  input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      for (let i = 0; i < studentItems.length; i++) {
        const name = studentItems[i].firstChild.nextSibling.textContent;
        if (name.includes(input.value)) {
          studentItems[i].style.display = 'block';
        } else {
          studentItems[i].style.display = 'none';
        }
      }
    } else if (name.includes(input.value)) {
      console.log('nailed it');
    }
  });
}

// ! ^^^^^^^   Currently Working Above ^^^^^^^^^^^^^

// ! trying to implement eventlisteners, strugggling to traverse directly to the name, but email should be okay too

// Call Functions to show the paginated list and add the navigation

showPage(studentItems, 1);
appendPageLinks(studentItems);
appendSearch();
