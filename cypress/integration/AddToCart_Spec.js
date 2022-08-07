/// <reference types = "Cypress" />

import homePage from '../support/pageObjects/homePage'

const  hp = new homePage()

describe("Sauce Demo Tests - Add To Cart Function", function () {

    beforeEach(()=>{
        cy.exec('npm cache clear --force')
        cy.clearCookies()
        //Login into the application
        cy.Login();
    })

    it("Verify the price and Add to cart button is available for all the items ", function () {

        hp.inventoryItems().each(($item,count)=>{ //Number of items being displayed
            //Checking if price is available for all items
            hp.itemPrice().eq(`${count}`).invoke('text').then((text1)=>{ 
                var price = text1.split("$")
                //Validating the price
                expect(price[1]).to.not.equal('0.00')
                expect(price[1]).not.to.be.null
            })
            //Checking if Add to cart button is available for all items
            hp.addddToCartOption().eq(`${count}`).invoke('text').then((text1)=>{
                expect(text1).to.contain('Add to cart')
            })
        })
    })


    it.only("Add the item with the Highest price to the cart", function(){
        
        const prices = [] //Declaring array to store the prices
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
                    hp.itemDesc().eq(`${count}`).invoke('text').then((text1)=>{
                        desc = text1 //Storing the value for later comparison
                        cy.log("Description of the item is: "  +text1)
                    })
                    hp.itemPrice().eq(`${count}`).invoke('text').then((text2)=>{
                        value = text2 //Storing the value for later comparison
                        cy.log("The value of item is: " +text2) 
                    })
                    hp.addToCartButton(`${count}`)
                    //Validating if the Add to cart button has changed to remove after being clicked on
                    hp.itemPrice().eq(`${count}`).siblings('button').should('contain', 'Remove')
                    hp.shoppingCartBadge().should('exist')
                }            
            })
        })

        //Verify if the item is added correctly
        hp.cartButton().click()
        //Comparing the Name of the item added to the cart and the one in cart
        hp.cartItemName().invoke('text').then((text1)=>{
            expect(text1).to.equal(name)
        })
        //Comparing the Description of the item added to the cart and the one in cart
        hp.cartItemDesc().invoke('text').then((text1)=>{
            expect(text1).to.equal(desc)
        })
        //Comparing the Price of the item added to the cart and the one in cart  
        hp.cartItemPrice().invoke('text').then((text1)=>{
            expect(text1).to.equal(value)
        })
        //Checking if the item count is avialble or not
        hp.cartItemQuan().invoke('text').then((text1)=>{
            let q = parseInt(text1) //Parsing the value for assertion
            expect(q).to.be.greaterThan(0)
        })
    })
})