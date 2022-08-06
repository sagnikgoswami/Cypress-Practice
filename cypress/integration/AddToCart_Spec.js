/// <reference types = "Cypress" />

import homePage from '../support/pageObjects/homePage'

const  hp = new homePage()

describe("Sauce Demo Tests - Add To Cart Function", function () {

    it("Verify the price is available for all the items ", function () {
        
        //Login into the application
        cy.Login();

        hp.inventoryItems().each(($item,count)=>{
            hp.itemPrice().eq(`${count}`).invoke('text').then((text1)=>{
                var price = text1.split("$")
                expect(price[1]).to.not.equal('0.00')
                expect(price[1]).not.to.be.null
                cy.log("The price is: " +price[1])
            })
        })
    })

    it("Verify the Add to cart button for all the items", function(){
        
        //Login into the application
        cy.Login();

        hp.inventoryItems().each(($item,count)=>{
            hp.addddToCartOption().eq(`${count}`).invoke('text').then((text1)=>{
                expect(text1).to.contain('Add to cart')
            })
        })
    })

    it("Add the item with the Highest price to the cart", function(){
        
        //Login into the application
        cy.Login();
        
        const prices = []
        hp.inventoryItems().each(($item,count)=>{
            hp.itemPrice().eq(`${count}`).invoke('text').then((text1)=>{
                var price = text1.split("$")    //Removing the $ symbol from the price 
                prices[count] = price[1]        //Storing the item values in the array         
            })
        })

        let value = ''
        let name = ''
        let desc = ''
        hp.inventoryItems().each(($item,count)=>{
            var max = Math.max(...prices) //Finding the max value item from the array
            hp.itemPrice().eq(`${count}`).invoke('text').then((text1)=>{
                var price = text1.split("$") //Removing the $ symbol from the price 
                if(price[1]==max) { //Comparing the count value of the element to the ones stored in array
                    hp.itemName().eq(`${count}`).invoke('text').then((text1)=>{
                        name = text1 //Storing the value for later comparison
                        cy.log("Max price item Name is: "  +text1)
                    })
                    hp.itemDesc()    .eq(`${count}`).invoke('text').then((text1)=>{
                        desc = text1 //Storing the value for later comparison
                        cy.log("Description of the item is: "  +text1)
                    })
                    hp.itemPrice().eq(`${count}`).invoke('text').then((text2)=>{
                        value = text2 //Storing the value for later comparison
                        cy.log("The value of item is: " +text2) 
                    })
                    hp.addToCartButton(`${count}`)
                }            
            })
        })

        //Verify if the item is added correctly
        cy.get('.shopping_cart_link').click()
        //Comparing the Name of the item added to the cart and the one in cart
        cy.get('.inventory_item_name').invoke('text').then((text1)=>{
            expect(text1).to.equal(name)
        })
        //Comparing the Description of the item added to the cart and the one in cart
        cy.get('.inventory_item_desc').invoke('text').then((text1)=>{
            expect(text1).to.equal(desc)
        })
        //Comparing the Price of the item added to the cart and the one in cart  
        cy.get('.item_pricebar >div').invoke('text').then((text1)=>{
            expect(text1).to.equal(value)
        })
    })
})