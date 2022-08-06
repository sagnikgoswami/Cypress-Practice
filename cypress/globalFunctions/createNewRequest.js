import Library from '../globalFunctions/library.js'

export default class newReq {

//------Common functions to Create New Request (Assessment and Export)------//

    //Function to upload a BOQ File
    //cnr - createNewReqPage.js
    //validFile - the name of the file we are going to upload
    static uploadBOQFile(cnr,validFile){
        cnr.uploadBoQBtn().click()
        Library.fileUpload(validFile, cnr) 
        cy.wait(2000)
        cnr.fileUploadDoneBtn().click({ force: true })
        cy.wait(5000)
        if(cnr.warningBoQWindowHeader().should('be.visible'))
        {
            cnr.warningBoQWindowHeader().should('contain.text','BoQ Import Warnings')
            cnr.warningBoQWindowContinueBtn().should('be.enabled').click()
        }
        cnr.uploadBoQMessage().should('contain.text','BoQ report uploaded at')
        cy.wait(2000)
        cnr.nextBtn().click()
        cy.wait(2000)
    }

    //Function to save the Assessment Request / Order
    //cnr - createNewReqPage.js
    //des - Input for Request description textbox
    //type- Input for Request type textbox
    //opp - Input for Opportunity ID textbox
    //curr - Input for Currency Type textbox
    //price - Input for Price textbox
    static createOrder(cnr,des,type,cust,opp,curr,price){
        cnr.asmReqDesc().type(des)
        cnr.asmReqType().type(type)
        cnr.dropDownSelectMenu().click()
        cnr.asmCustName().type(cust)
        cnr.dropDownSelectMenu().click()
        cnr.asmOppID().type(opp)
        cnr.dropDownSelectMenu().click()
        cnr.asmCurrency().type(curr)
        cnr.dropDownSelectMenu().click()
        cnr.asmHWPrice().type(price)
        cnr.asmSWPrice().type(price)
        cnr.nextBtn().click()
        cy.wait(1000)
        cnr.asmConfirmOKBtn().click()
        cnr.nextBtn().click()
    }

    //Function to upload Contract data
    //cnr - createNewReqPage.js
    //conFile - the name of the file we are going to upload
    static conDataUpload(cnr,conFile){
        cnr.conPageUploadConBtn().click()
        cy.wait(1000)
        cnr.indataConButton().should('be.visible')
        Library.fileUpload(conFile, cnr) 
        cy.wait(2000)
        cnr.fileUploadDoneBtn().click({ force: true })
        cnr.warningBoQWindowContinueBtn().click()
        cy.wait(2000)
        cnr.conUploadOKBtn().click()
        cy.wait(2000)
        cnr.conResultGrid().should('contain.text', 'Contract data uploaded at')
        cnr.nextBtn().click()
        cy.wait(2000)
    }

    //Function to upload ECCN Data
    //cnr - createNewReqPage.js
    //hanaFile - the name of the file we are going to upload
    static eccnDataUpload(cnr,hanaFile){
        cnr.eccnPageUploadECCNBtn().click()
        cy.wait(1000)
        cnr.indataConButton().should('be.visible')
        Library.fileUpload(hanaFile, cnr) 
        cy.wait(2000)
        cnr.fileUploadDoneBtn().click({ force: true })
        cy.wait(2000)   
        cnr.eccnUploadOKBtn().click()
        cy.wait(2000)
        cnr.eccnResultGrid().should('contain.text', 'ECCN report uploaded at')
        cnr.nextBtn().click()
        cy.wait(2000)
    }

    //Function to upload Source Data
    //cnr - createNewReqPage.js
    //hanaFile - the name of the file we are going to uploa
    static sourceDataUpload(cnr,hanaFile){
        cnr.sourcePageUploadSourceBtn().click()
        cy.wait(1000)
        cnr.indataConButton().should('be.visible')
        Library.fileUpload(hanaFile, cnr) 
        cy.wait(2000)
        cnr.fileUploadDoneBtn().click({ force: true })
        cy.wait(2000)   
        cnr.sourceUploadOKBtn().click()
        cy.wait(2000)
        cnr.sourceResultGrid().should('contain.text', 'Source report uploaded at')
        cnr.nextBtn().click()
        cy.wait(2000)
    }
}
