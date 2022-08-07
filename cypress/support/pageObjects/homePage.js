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

    shoppingCartBadge()
    {
        return cy.get('.shopping_cart_badge')
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

    cartButton()
    {
        return cy.get('.shopping_cart_link')
    }

    cartItemName()
    {
        return cy.get('.inventory_item_name')
    }

    cartItemDesc()
    {
        return cy.get('.inventory_item_desc')
    }

    cartItemPrice()
    {
        return cy.get('.item_pricebar >div')
    }

    cartItemQuan()
    {
        return cy.get('.cart_quantity')
    }

    filterField()
    {
        return cy.get('select[data-test="product_sort_container"]')
    }

    filterOption()
    {
        return cy.get('.product_sort_container')
    }

    linkedInButton()
    {
        return cy.get('.social_linkedin >a')
    }

    linkedInTitle()
    {
        return cy.get('.authwall-join-form__title')
    }

    linkedInUN()
    {
        return cy.get('input[name*="email-or-phone"]')
    }

    linkedInPW()
    {
        return cy.get('#password')
    }


}
export default homePage;