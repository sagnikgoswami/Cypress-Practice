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

    //Function to generate random unique numbers in a range 
    //Parameter: Digits - number of digits required
    static generate_random_number(digits){
        let Up = Math.pow(10, digits+1) - 1
        let Low = Math.pow(10, digits)
        let number = Math.floor((Math.random()* Up) + Low)
        return number
    }

    //Function to conver the numbers into amount 
    static numberWithCommas(Num) {
        let Amt = Num.toFixed(2)
        return Amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

    //Function to Delete Roles in Admin Add or Edit Role page
    //Parameters: ur: const for UserRoleAndAccessPage Delete Role Page object, List of Roles to be added
    static delRole(ur, role){
        const roles = role.split(",")
        for (let i = 0; i < roles.length; i++) {
            ur.filterTextBox().type(roles[i])            
            ur.SelectRoles().click()            
            ur.filterTextBox().clear()
          }
    }

    //Function to dismiss window warning alert pop-up
    static windowAlertDismiss(crtsul){
        cy.on('window:confirm',(crtsul)=>     
        {
            expect(crtsul).to.contain('Please click Save draft/create version to save the calculation details')
            return false; 
        })
    }

    //Function to accept/confirm window warning alert pop-up
    static windowAlertAccept(crtsul){
        cy.on('window:confirm',(crtsul)=>     
        {
            expect(crtsul).to.contain('Please click Save draft/create version to save the calculation details')
        })

        //cy.on('window:confirm',()=> true)
    }

    //Function to convert the date of mm/dd/yyyy to Month dd, yyyy
    //ActDate date input in the mm/dd/yyyy format
    static dateformatchange(ActDate){
        var formatdate = ActDate.replace(/\//g,' ') //Replacing the "/" from the text with space
        var dArray = formatdate.split(" ") //Splitting the string using the spaces
        //Defining an array for the Months of a year
        var MonthArray = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        var mm = Number(dArray[0]) //Converting the month string got from split into number
        var month = MonthArray[mm] //Getting the corresponding month of the from the number
        var day = dArray[1] //Getting the day after the split string
        var year = dArray[2] //Getting the year after the split string

        var nd = month.concat(" ", day) //Joining the month and day 
        var newdate = nd.concat(", ", year);//joining the month day and year 
        return newdate;
    }


    //Function to get the Data count of the sections in the menu 
    //as- Advance search Page ; FNum- The position of the field
    //FName - the field name ; check - (for verifying the count of the elements appearing)
    static menuDataCount(as,FNum,FName,check){
        if(check==1){
            as.resultSectionData().eq(FNum).contains(FName)
            .invoke('text')
            .then((text1)=>{
                var amt = text1.split(" (")
                var amount = amt[1].replace(")","")
                cy.log(amount)
                for(var i=0; i<=amount; i++){
                    if(i==amount){
                        as.checkData().eq(i).should('contain', '')
                    }
                    else{
                        as.checkData().eq(i)
                        .invoke('text')
                        .then((text2)=>{
                            expect([text2]).not.to.be.empty
                        })
                    } 
                }
            })
        }
        else{
            as.resultSectionData().eq(FNum).contains(FName)
            .invoke('text')
            .then((text1)=>{
                var field = text1
                var dc = field.split(" (")
                var count = dc[1]
                var DataCount = count.replace(")","")
                cy.log(DataCount)
                
            })
        }
    }

    //Function to verify if the user is able to navigate to next page and then to the previous page
    //cp - Is the page object for commonpage.js **has to be imported if used in other page tests**
    //Import these -  import commonPage from '../../pageObjects/commonPage'
    //const cp = new commonPage()
    //Pagename - can be passed manually or derived from where we are checking
    static checkPagination(cp,PageName){
        cy.log("Page Name - ", [PageName])
        cp.currentPage()
        .invoke('text')
        .then((text1)=>{
            cy.log(text1)
            cp.nextButton().click()
            cy.wait(2000)
            cp.currentPage()
            .invoke('text')
            .then((text2)=>{
                if(expect(text1).not.equal(text2)){
                    cy.log('**Page Changed from **', [text1], '** to **',  [text2], '** of Page **' ,[PageName])
                }
                else{
                    cy.log('**Page not Changed**')
                }
            })
        })
        cp.currentPage()
        .invoke('text')
        .then((text1)=>{
            cy.log(text1)
            cp.previousButton().click()
            cy.wait(2000)
            cp.currentPage()
            .invoke('text')
            .then((text2)=>{
                if(expect(text1).not.equal(text2)){
                    cy.log('**Page Changed from **', [text1], '** to **',  [text2], '** of Page **' ,[PageName])
                }
                else{
                    cy.log('**Page not Changed**')
                }
            })
        })
    }

    //Function to verify if the textboxes appear after clicking on filters option
    //And to verify if the filter is actully working 
    //as - page object of Advance search
    static filterVerification(as){
        as.filtersOption().click()
        as.filterTextBox().each(($iten,count)=>{
            as.filterTextBox().eq(`${count}`).should('exist')
        })

            //Get values from table
            const Fields = []
                as.filterTextBox().each(($item,count)=>{
                    as.searchInputField().eq(count)
                    .invoke('text')
                    .then((text1)=>{
                        Fields[count] = text1
                    })
                })
         
        as.filterTextBox().each(($item,count)=>{
            var search = Fields[count]
            if(search=== ''){   
                cy.log('Empty Field')
            }
            else{
                //Checking if the correct value is getting verified
                as.filterTextBox().eq(`${count}`).type(search)
                as.searchedField().eq(`${count}`).contains(search)
                as.filterTextBox().eq(`${count}`).clear()

                //Checking while filtering with wrong data gets verified
                var Check = Library.generate_random_string(6)
                as.filterTextBox().eq(`${count}`).type(Check)
                as.searchedField().eq(`${count}`).should('contain', '')
                as.filterTextBox().eq(`${count}`).clear()
            }

        })
    }

    //Function to verify the Monetary format of test in the application - 1,111,111,111.00 (Format)
    //price - The retreived text for which you want to verify the format
    static verifyMonetaryFormat(price){
        if(price===''){
            cy.log('**Field is Empty**')
        }
        else{
            cy.log(price)
            var dec = price
            var decimal = dec.split('.')
            var dp = decimal[1].length
            if(expect(dp).to.equal(2)){
                if(decimal[0].length<=3){
                    cy.log('**THE AMOUNT IS NOT ABOVE THOUSANDS AND CORRECT FORMAT**')
                }
                else{
                    var amt = decimal[0].split(',')
                    let length = amt.length
                    for(let i=0; i<amt.length; i++){
                        if(i===0){
                            if(expect(amt[i].length).to.be.lessThan(4)){
                                // cy.log('**IN PROPER FORMAT**')
                            }
                            else{
                                cy.log('**NOT IN PROPER FORMAT**')
                            }
                        }
                        else{
                            if(expect(amt[i].length).to.equal(3)){
                                // cy.log('**IN PROPER FORMAT**')
                            }
                            else{
                                cy.log('**NOT IN PROPER FORMAT**')
                            }
                        }
                    }
                    cy.log('**THE COLUMN IS IN THE CORRECT MONETARY FORMAT**')
                }
            }
            else{
                cy.log('**THE COLUMN IS NOT IN THE CORRECT MONETARY FORMAT**')
            }
        }
    }

    //Function to check the monetary calculations in tables
    //cp - Is the page object for commonpage.js **has to be imported if used in other page tests**
    //Import these -  import commonPage from '../../pageObjects/commonPage'
    //const cp = new commonPage()
    //table_Index - which table are we going to refer [0,1,2....]
    //column - Which column data are we going to verify [0,1,2....]
    //column_Name - Name of the column which we are trying to verify
    static calculateMoney(cp,table_Index,column,column_Name){
        var sum = 0
        var Total = 0
        cp.table().eq(table_Index).find(".rt-tr-group")
        .each(($item,count)=>{
            cp.table().eq(table_Index).find(".rt-tr-group").eq(count).find(".rt-tr .rt-td").eq(column)
            .invoke('text')
            .then((text1)=>{
                var Amt = text1
                if(count===0){
                    if(Amt.trim()===''){
                        cy.log('**Field is Empty**')
                    }
                    else{
                        var TA = Amt.replaceAll(',','')
                        Total = parseFloat(TA)
                        cy.log('Total amount is: ' +Total)
                    }
                }
                else if(count===1){
                    expect(Amt).to.equal(column_Name)
                }
                else{
                    if(Amt.trim()===''){
                        cy.log('**Field is Empty**')
                    }
                    else{
                        var Number = Amt.replaceAll(',','')
                        sum = sum + parseFloat(Number)
                        // var add = parseFloat(sum).toFixed(2)
                        var add= sum
                        cy.log('Amount in column is ' +Number)
                        if(parseInt(Total) > parseInt(add)){
                            cy.log(add)
                            cy.log('**All the data has not been added**')
                            cy.log(sum)
                        }
                        else if((parseInt(Total)===parseInt(add))||(Total===add)){
                            // expect(add).to.equal(Total)
                            cy.log('**CALCULATION IS CORRECT**')
                            cy.log(Total)
                        }
                        else if(parseInt(Total)<parseInt(add)){
                            expect(add).to.equal(Total)
                        }
                    }
                }
            })
                
        })
    }

    //Function to check if the following text is found in the tables or not
    //cp - Is the page object for commonpage.js **has to be imported if used in other page tests**
    //Import these -  import commonPage from '../../pageObjects/commonPage'
    //const cp = new commonPage()
    //req - Table number where we are search for [0,1,2....]
    static verifySpareandTSULReq(cp,req){
        cp.getTable().eq(req).find(".ReactTable .rt-tbody .rt-tr >div:nth-child(1)")
        .each(($item,count)=>{
            cy.get('.acc-matrix >ul >li').eq(req).find(".ReactTable .rt-tbody .rt-tr >div:nth-child(1)").eq(`${count}`)
            .invoke('text')
            .then((text1)=>{
                if(text1===''){
                }
                else{
                    expect(text1).not.contains('EXP-S')
                    expect(text1).not.contains('ASM-S')
                    expect(text1).not.contains('EXP-T')
                }
            })
        })

    }

    //Function to verify the percentage format of the text
    //percent - the text which we have to test to verify the format ' 00.00% '
    static verifyPercentFormat(percent){
        if(percent===''){
            cy.log('**Field is Empty**')
        }
        else{
            cy.log(percent)
            var div = percent.split(' ')
            expect(div[1]).to.deep.equal('(%)')
            var num = div[0]
            var dec = num.split('.')
            expect(dec[1].length).to.equal(2)
            expect(dec[0].length).to.be.lessThan(4)
        } 
    }
    
    //Function to verify if the user is able to navigate to next page and then to the previous page
    //cp - Is the page object for commonpage.js **has to be imported if used in other page tests**
    //Import these -  import commonPage from '../../pageObjects/commonPage'
    //const cp = new commonPage()
    static checkPaginationToggle(cp,eq){
        var num = parseInt(eq)
        cp.totalPages().eq(num)
            .invoke('text')
            .then((text1)=>{
                cy.log(text1)
                if(text1==1){
                    cy.log('**Only one Page is available**')
                    cp.previousButton().eq(num).should('be.disabled')
                    cp.nextButton().eq(num).should('be.disabled')
                }
                else{
                    cp.pageNumber().eq(num).invoke('val').then(val=>{
                        var pg = parseInt(val)
                        cp.nextButton().eq(num).click()
                        cp.pageNumber().eq(num).invoke('val').then(val2=>{
                            var pg2 = parseInt(val2)
                            expect(pg).to.be.lessThan(pg2)
                            cp.previousButton().eq(num).click()
                            cp.pageNumber().eq(num).invoke('val').then(val3=>{
                                var pg3 = parseInt(val3)
                                expect(pg2).to.be.greaterThan(pg3)
                            })
                        })
                    })
                    
                }
            })
    }
}