/// <reference types = "Cypress" />

import homePage from '../support/pageObjects/homePage'

const  hp = new homePage()

describe("Sauce Demo Tests - Verify LinkedIn Login", function () {

    it("Verify if the LinkedIn Button is available", function () {
        
        //Login into the application
        cy.Login();

        cy.get('.social_linkedin >a')
        .scrollIntoView()
        .should('have.attr', 'href')
        .and('equal', 'https://www.linkedin.com/company/sauce-labs/')
    })

    it("Verify if clicking on LinkedIn Button navigates to the Linked in page", function () {
        
        //Login into the application
        cy.Login()

        //Changing the attribute value from _blank to _self (As cypress handle multiple tabs)
        cy.get('footer > ul > li > a').last()
        .invoke('attr' , 'target' , '_self')
        .should('have.attr', 'target', '_self').click()

        //Cy.origin will help us in handling the cross origin (as the domain has changed)
        cy.origin('https://linkedin.com', () => {
            cy.get('.authwall-join-form__title').should('have.text','Join LinkedIn')
            cy.get('input[name*="email-or-phone"]').should('exist')
            cy.get('#password').should('exist')
        })
    })
})