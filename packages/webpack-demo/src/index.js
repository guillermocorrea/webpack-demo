// import _ from 'lodash';
// import printMe from './print.js';

import './style.css';
import Icon from './icon.svg';
import XmlData from './data.xml';
import JsonData from './data.json';
// import(/* webpackPrefetch: true, webpackChunkName: "print" */ './print');
import './another-module.js';

console.log('XmlData', XmlData);
console.log('JsonData', JsonData);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registerd', registration);
      })
      .catch((err) => console.log('SW registration failde:', err));
  });
}

const component = async (_) => {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  btn.innerHTML = 'Click me and check the console';
  // const { default: printMe } = await import(
  //   /* webpackChunkName: "print" */ './print.js'
  // );

  // btn.onclick = printMe;
  btn.onclick = async (e) => {
    const { defualt: print } = await import(
      /* webpackChunkName: "print" */ './print'
    );
    print();
  };
  element.appendChild(btn);

  const { numToWord, wordToNum } = await import(
    /* webpackChunkName: "webpack-numbers" */ 'webpack-numbers'
  );
  console.log('numToWord(3)', numToWord(3));
  console.log('wordToNum("four")', wordToNum('Four'));
  return element;
};

// document.body.appendChild(component());

const getComponent = async () => {
  const { subtract, add } = await import(
    /* webpackChunkName: "@org/typed-lib" */ '@org/typed-lib'
  );

  console.log(add(1, 3));
  console.log(subtract(1, 3));

  const { default: _ } = await import(
    /* webpackChunkName: "lodash" */ 'lodash'
  );
  return component(_);
};

getComponent().then((component) => {
  document.body.appendChild(component);
});
