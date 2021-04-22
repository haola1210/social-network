module.exports.index = (req, res) => {
    return res.json({ 
        data: "form login"
    })
}

module.exports.login = (req, res) => {
    return res.json({ 
        data: "login"
    })
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect("/auths")
}

module.exports.loginGoogle = (req, res) => {
    res.redirect("/users/profile")
    // return res.json({
    //     message: "Login successfully with Google account",
    //     data: req.user,
    // })
}