const {Markup} =  require("telegraf")

module.exports = function() {
    return Markup.keyboard([
        ['Start daily test']
    ]).resize()
}
