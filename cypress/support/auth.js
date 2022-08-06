import authsettings from "./authsettings.json"

const{
    apiScopes,
    authority,
    grant_type,
    client_id,
    client_secret,
    resource,
    username,
    password
} = authsettings;

const injectTokens = (tokenResponse) => {
    const idToken = decode(tokenResponse.id_token)
    const realm = idToken.tid
    //const homeAccountID = '${homeAccountIdentifier}'
    const homeAccountID = '${realm}'
    const username = idToken.preferred_username
    const name = idToken.name

    const accountKey = '${homeAccountID}-${realm}'
    const accountEntity = buildAccountEntity(homeAccountID, realm, username, name)
}

export const login = () => {
    return cy.visit("/").request({
        url: authority + "/oauth2/v2.0/token",
        method: "POST",
        body: {
            grant_type: "password",
            client_id: client_id,
            client_secret: client_secret,
            username: username,
            password: password,
            scope: ["openid profile"].concat(apiScopes).join(" "),
        },
        form: true
    }).then((response)=>{
        injectTokens(response.body)
    }).reload();
}