const {Markup} =  require("telegraf")
const db = require("../db/db")
const shuffle = require("../utils/shuffle")
const cache = require('./cache')


// [
//     {
//         question: `I ______ bus on Mondays.?`,
//         variants: ["'m going to work with", "'m going to work by", 'go to work with', "go to work by"],
//         correct: 3,
//         keyboard: function (){
//             let result = []
//             this.variants.forEach((el, id) => {
//                 result.push({
//                     text: el,
//                     callback_data: this.correct == id ? 'yes' : 'no'
//                 })
//             })
//             return Markup.inlineKeyboard(result, {columns: 1}).resize()
//         }
//     },

//     {
//         question: `Sorry, but this chair is ______.`,
//         variants: ['me', "mine", 'my', "our"],
//         correct: 1,
//         keyboard: function (){
//             let result = []
//             this.variants.forEach((el, id) => {
//                 result.push({
//                     text: el,
//                     callback_data: this.correct == id ? 'yes' : 'no'
//                 })
//             })
//             return Markup.inlineKeyboard(result, {columns: 1}).resize()
//         }
//     },

//     {
//         question: `'How old ______?' 'I ______ .'`,
//         variants: ['are you / am 20 years old.', "have you / have 20 years old", 'are you / am 20 years.', "do you have / have 20 years."],
//         correct: 0,
//         keyboard: function (){
//             let result = []
//             this.variants.forEach((el, id) => {
//                 result.push({
//                     text: el,
//                     callback_data: this.correct == id ? 'yes' : 'no'
//                 })
//             })
//             return Markup.inlineKeyboard(result, {columns: 1}).resize()
//         }
//     },

//     {
//         question: `I ______ to the cinema.`,
//         variants: ['not usually go', "don't usually go", "don't go usually", "do not go usually"],
//         correct: 1,
//         keyboard: function (){
//             let result = []
//             this.variants.forEach((el, id) => {
//                 result.push({
//                     text: el,
//                     callback_data: this.correct == id ? 'yes' : 'no'
//                 })
//             })
//             return Markup.inlineKeyboard(result, {columns: 1}).resize()
//         }
//     },

//     {
//         question: `Where ______ ?`,
//         variants: ['your sister works', "your sister work", 'does your sister work', "do your sister work"],
//         correct: 2,
//         keyboard: function (){
//             let result = []
//             this.variants.forEach((el, id) => {
//                 result.push({
//                     text: el,
//                     callback_data: this.correct == id ? 'yes' : 'no'
//                 })
//             })
//             return Markup.inlineKeyboard(result, {columns: 1}).resize()
//         }
//     },

// ]



// module.exports = async function(ctx, bot) {
//     try{
//         const db_data = await db.get()
//         const tasks = shuffle(db_data).slice(0, 10).map(task => addKeyboard(task))
//         let corr_answers = 0
//         console.log(tasks)
//         ctx.replyWithHTML(`<b>Question ${tasks.indexOf(tasks[0]) + 1}.</b> ${tasks[0].question}`, tasks[0].keyboard())
//     } catch(e) {
//         console.log(e)
//     }
// }