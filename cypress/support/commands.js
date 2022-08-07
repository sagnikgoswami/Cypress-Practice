// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// import { size } from "cypress/types/lodash";

// import 'cypress-file-upload';


// //Command to access web elements whose parent is hidden
// Cypress.Commands.add('isVisible', {
//   prevSubject: true
// }, (subject) => {
//   const isVisible = (elem) => !!(
//     elem.offsetWidth ||
//     elem.offsetHeight ||
//     elem.getClientRects().length
//   )
//   expect(isVisible(subject[0])).to.be.true
// })


// //Sign In function
// Cypress.Commands.add('signIn', (lp, hp) => {
//   cy.visit(Cypress.env('baseUrl'))
//   cy.wait(1000)

//   //Click on Sign-In button
//   if (lp.clickSignIn()) {
//     lp.clickSignIn().click({ force: true })
//     cy.wait(2000)
//   }
//   else {
//     hp.homeTitle();
//   }
// })

// //File Upload function
// Cypress.Commands.add('fileUpload', (Actualfile, imf) => {
//   cy.fixture(Actualfile, 'binary').then(Cypress.Blob.binaryStringToBlob).then(function (fileContent) {
//     imf.fileUploadField().attachFile({ fileContent, fileName: Actualfile, mimeType: 'application/octet-stream', encoding: 'utf-8' }, { subjectType: 'drag-n-drop' });
//   })
// })

// //Windows alert accept function
// Cypress.Commands.add('windowAlertAccept', (crtsul) => {

//   cy.on('window:confirm',(crtsul)=>     
//   {
//       expect(crtsul).to.contain('Please click Save draft/create version to save the calculation details')
//   })

// })

Cypress.Commands.add("Login", () => {

  const server = Cypress.env("baseUrl")
  const usr = Cypress.env("username")
  const pw = Cypress.env("password")
  
  expect(usr).not.to.be.null
  expect(pw).not.to.be.null
  cy.clearCookie('react').clearCookie('angular');

  cy.visit(server);
  cy.get('input[data-test*="username"]').type(usr)
  cy.get('input[data-test*="password"]').type(pw)
  cy.get('#login-button').click()

});









