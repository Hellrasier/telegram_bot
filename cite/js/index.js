function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

function getTasks() {
    window.fetch('/api/tasks')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log($('#edit #list'))
            data.forEach(task => {
                $('#edit #list').append(`<li class="list-group-item" dbid="${task.id}">
                <p>Question: <span class="btn-outline-dark" contenteditable>${task.question}</span></p>
                ${task.variants.map((val, id) => `<p>Variant ${id+1}: <span class="btn-outline-dark" contenteditable="true">${val}</span></p>`).join('\n')}
                <p>Correct: <select class="form-select">
                    <option ${task.correct == 0 ? 'selected' : ''} value="0">0</option>
                    <option ${task.correct == 1 ? 'selected' : ''} value="1">1</option>
                    <option ${task.correct == 2 ? 'selected' : ''} value="2">2</option>
                    <option ${task.correct == 3 ? 'selected' : ''} value="3">3</option>
                    </select></span></p>
                <p>Level: <select class="form-select">
                    <option selected></option>
                    <option ${task.english_level == 'A1' ? 'selected' : ''} value="A1">A1</option>
                    <option ${task.english_level == 'A2' ? 'selected' : ''} value="A2">A2</option>
                    <option ${task.english_level == 'B1' ? 'selected' : ''} value="B1">B1</option>
                    <option ${task.english_level == 'B2' ? 'selected' : ''} value="B2">B2</option>
                    <option ${task.english_level == 'C1' ? 'selected' : ''} value="C1">C1</option>
                    </select></p>
                <a href="#" class="btn btn-outline-secondary card-link edit-task">Edit task</a>
                <a href="#" class="btn btn-outline-danger card-link del-task">Delete task</a>
            </li>`)
            })
            $('.del-task').each(function(id, el) {
                console.log(this)
                console.log(el)
                $(this).click(function() {
                    const element = $(this).parent()
                    const which_id = $(element).attr('dbid')
                    window.fetch('/api/tasks', {
                        headers: {
                            'Content-Type': 'text/plain'
                        }, 
                        method: 'DELETE',
                        body: which_id
                    }).then((res) => {
                        $(element).remove()
                        res.json().then(data =>{
                            console.log(data)
                        })
                    })
                    .catch(err => console.log(err))
                })
            })            
        })
        .catch(err => console.log(err))
}


$(async function() {
    $('#edit').hide()
    await getTasks()
})

$('#to-create').click(() => {
    $('#edit').hide()
    $('#create').show()
})

$('#to-edit').click(() => {
    $('#create').hide() 
    $('#edit').show()
})


$('form').submit(function(e) {
    e.preventDefault()
    const form_data = $(this).serializeArray()
    const data = {variants: []}
    console.log(form_data)
    form_data.forEach(input => {
        if (input.name.includes('variant')) {
            data.variants.push(input.value)
        } else {
            data[input.name] = input.value
        }
    })
    const correct = data.variants[0]
    data.variants = shuffle(data.variants)
    data.correct = data.variants.indexOf(correct)
    console.log(data)

    window.fetch('/api/tasks', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(res => {
        console.log(res)
        getTasks()
    })
    location.reload()
})