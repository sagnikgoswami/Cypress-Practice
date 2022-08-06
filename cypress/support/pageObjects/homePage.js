class homePage
{

    inventoryItems()
    {
        return cy.get('div.inventory_item')
    }

    itemPrice()
    {
        return cy.get('div.inventory_item > div > div.pricebar > div')
    }

    addddToCartOption()
    {
        return cy.get('div.inventory_item > div > div.pricebar > button')
    }

    itemName()
    {
        return cy.get('div.inventory_item > div > div > a >div')
    }

    itemDesc()
    {
        return cy.get('div.inventory_item > div > div  >div.inventory_item_desc')
    }
    addToCartButton(num)
    {   
        cy.get('div.inventory_item > div > div.pricebar > button').eq(num).click()
    }

    

}
export default homePage;