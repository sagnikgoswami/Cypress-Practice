export default class Library {

    ///// COMMON FUNCTIONS //////

    //Function to generate random unique string
    //Parameter: Length of the desired string
    static generate_random_string(string_length) {
        let random_string = '';
        let random_ascii;
        for (let i = 0; i < string_length; i++) {
            random_ascii = Math.floor((Math.random() * 25) + 97)
            random_string += String.fromCharCode(random_ascii)
        }
        return random_string
    }

    //Function to upload a file
    //Parameter: File Name and the Page Object of file upload field
    static fileUpload(Actualfile, imf) {
        cy.fixture(Actualfile, 'binary').then(Cypress.Blob.binaryStringToBlob).then(function (fileContent) {
            imf.fileUploadField().attachFile({ fileContent, fileName: Actualfile, mimeType: 'application/octet-stream', encoding: 'utf-8' }, { subjectType: 'drag-n-drop' });
        })
    }

    //Function to login and verify the browser header
    //Parameters: LoginPage and HomePage objects for the POM
    static signIn(lp, hp){
        cy.visit(Cypress.env('baseUrl'))
        cy.wait(1000)

        //Click on Sign-In button
        if (lp.clickSignIn()) {
            lp.clickSignIn().click({ force: true })
            cy.wait(2000)
        }
        else {
            hp.homeTitle();
        }            
    }

    //Function to Add Roles in Admin Add or Edit Role page
    //Parameters: Add/Edit Role Page object, List of Roles to be added
    static addRole(ar, role) {
        const roles = role.split(",")
        for (let i = 0; i < roles.length; i++) {
            ar.availableRoleFilter().type(roles[i])            
            ar.roleSelectCheckBox().click()            
            ar.addBtn().click()
            ar.availableRoleFilter().clear()
          }
    }

}