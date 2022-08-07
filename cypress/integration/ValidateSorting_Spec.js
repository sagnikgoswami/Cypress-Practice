/// <reference types = "Cypress" />

import homePage from '../support/pageObjects/homePage'

const  hp = new homePage()


describe("Sauce Demo Tests - Sorting Function", function () {

    beforeEach(()=>{
        cy.exec('npm cache clear --force')
        cy.clearCookies()
        //Login into the application
        cy.Login();
        
    })

    it("Verify if the filter is available", function () {

        //Verifying if the filter option is available
        hp.filterField().should('exist')
        
    })

    it("Verify the sorting operation by selecting the filter option", function () {

        //Selecting to sort the price from low to high
        hp.filterOption().select('lohi')

        //Verifying if sorting is working
        hp.itemPrice().each(($item,count)=>{ //
            hp.itemPrice().eq(`${count}`).invoke('text').then((text1)=>{
                let value = text1.split('$')  //Removing the $ symbol from the text
                let price = parseFloat(value[1]) //Converting the text to float value
                if(count>0){
                    hp.itemPrice().eq(`${count-1}`).invoke('text').then((text2)=>{
                        let value2 = text2.split('$') //Removing the $ symbol from the text
                        let price2 = parseFloat(value2[1]) //Converting the text to float value
                        if(price2==price){ //Safecase if there are multiple same values
                            expect(price).to.equal(price2)
                        }
                        else{
                            expect(price).to.be.greaterThan(price2) //Assert for comparison
                        }
                    })
                }
            })
        })
    })
})