const { checker } = require("@herbsjs/herbs")

function usecase2diagram(usecase) {
    if (checker.isEmpty(usecase)) return null

    let flowChat = `graph TD
        A([Update User Account])
        B(Validate given User Account information)
        C(Is User expired?)
        D{If User is expired}
        E(Then Activate User)
        F(Else Do nothing)
        G(Save User Account)
        A --> B
        B --> C
        C --> D
        D --> E
        D --> F
        E --> G
        F --> G
    `

    return flowChat
}

module.exports = usecase2diagram