/// <reference types = "Cypress" />

import homePage from '../support/pageObjects/homePage'

const  hp = new homePage()


describe("Sauce Demo Tests - Sorting Function", function () {

    it("Verify if the filter is available", function () {
        
        //Login into the application
        cy.Login();

        //Verifying if the filter option is available
        hp.filterField().should('exist')
        
    })

    it("Verify the sorting operation by selecting the filter option", function () {
        
        //Login into the application
        cy.Login();

        //Selecting to sort the price from high to low
        hp.filterOption().select('hilo')

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
                            expect(price2).to.be.greaterThan(price) //Assert for comparison
                        }
                    })
                }
            })
        })
    })
})