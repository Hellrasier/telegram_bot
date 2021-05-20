require('dotenv').config()
const { session, Telegraf }  = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const main_menu = require('./bot_menu')
const startTest = require('./test.js')
const cache = {}
const db = require('../db/db')
const shuffle = require("../utils/shuffle")
const {Markup} =  require("telegraf")


const addKeyboard = function (task) {
    task.keyboard = function() {
        let result = []
        task.variants.forEach((el, id) => {
            result.push({
                text: el,
                callback_data: task.correct == id ? 'yes' : 'no'
            })
        })
        return Markup.inlineKeyboard(result, {columns: 1}).resize()
    }
    return task
}



module.exports = async () => {

    bot.start(ctx => {
        console.log(ctx.from)
        ctx.replyWithHTML(`
            Hi, ${ctx.from.first_name}!! This is <b>Relaxing English</b> bot.\nLet me test your English level and follow your personal progress.
        `, main_menu())
    })

    bot.hears('Start daily test', async ctx => {
       try{
            ctx.reply("So be ready.\nYou need to answer on 10 questions, and I'll check it and put you a mark")
            const db_data = await db.get()
            const tasks = shuffle(db_data).slice(0, 10).map(task => addKeyboard(task))
            let corr_answers = 0
            cache[ctx.from.id] = {
                tasks: tasks,
                number: 1,
                correct_answered: 0
            }
            ctx.replyWithHTML(`<b>Question ${tasks.indexOf(tasks[0]) + 1}.</b> ${tasks[0].question}`, tasks[0].keyboard())
       } catch(e) {
           console.log(e)
       }
    })

    bot.action('yes', ctx => {
        let {tasks, number} = cache[ctx.from.id]
        ctx.replyWithHTML(`<b>Good job!</b> Correct answer is "${tasks[number-1].variants[tasks[number-1].correct]}"`)
        cache[ctx.from.id].number++
        number++
        setTimeout(() => {
            if (number <= 10) {
                cache[ctx.from.id].correct_answered++
                ctx.replyWithHTML(`<b>Question ${number}.</b> ${tasks[number-1].question}`, tasks[number-1].keyboard())
                ctx.editMessageReplyMarkup()
            } else {
                ctx.replyWithHTML(`<b>Test is over, well done!</b> Your result is <b>${cache[ctx.from.id].correct_answered}/10</b>`)
                ctx.editMessageReplyMarkup()
            }
        }, 50)
    })

    bot.action('no', ctx => {
        let {tasks, number} = cache[ctx.from.id]
        ctx.replyWithHTML(`<b>Wrong!</b> Correct answer is "${tasks[number-1].variants[tasks[number-1].correct]}"`)
        cache[ctx.from.id].number = number + 1
        number++
        if (number <= 10) {
            ctx.replyWithHTML(`<b>Question ${number}.</b> ${tasks[number-1].question}`, tasks[number-1].keyboard())
            ctx.editMessageReplyMarkup()
        } else {
            ctx.replyWithHTML(`<b>Test is over, well done!</b> Your result is <b>${cache[ctx.from.id].correct_answered}/10</b>`)
            ctx.editMessageReplyMarkup()
        }
    })

    bot.launch()


    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}