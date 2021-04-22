module.exports.profile = (req, res) => {
    return res.json({
        data: "Profile",
        user: req.user.username
    })
}