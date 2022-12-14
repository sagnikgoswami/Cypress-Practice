// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
//import './functions'

// Alternatively you can use CommonJS syntax:
// require('./commands')

require('cypress-xpath')
require('cypress-plugin-tab');

import "cypress-ag-grid";

import 'cypress-mochawesome-reporter/register';

// cy.random_data ={
// generate_random_string: () =>
// {
//     var string_length = 8;
//     let random_string='';
//     let random_ascii;
//     for(let i = 0; i<string_length; i++)
//     {
//         random_ascii = Math.floor((Math.random()*25)+97)
//         random_string += String.fromCharCode(random_ascii)
//     }
//     return (random_string)
// }}
