const currentRes = document.querySelector('#current')
const previousRes = document.querySelector('#previous')
const buttons = document.querySelectorAll('.buttons button')


const solveOperation = (operator, value1, value2) => {
    let result = null
    if(value1.includes(',') || value2.includes(',')){
        value1 = value1.replace(',', '.')
        value2 = value2.replace(',', '.')
    }
    switch(operator){
        case '+':
            result = parseFloat(value1) + parseFloat(value2)
            break
        case '-':
            result = parseFloat(value1) - parseFloat(value2)
            break
        case 'x':
            result = parseFloat(value1) * parseFloat(value2)
            break
        case '÷':
            result = parseFloat(value1) / parseFloat(value2)
            break
    }
    return result.toString().replace('.', ',')
}

const formatNumberPainel = (number) => {
    let numberPainel = currentRes.innerText
    console.log(number)
    console.log(numberPainel)
    const lengthNumber = numberPainel.length
    console.log(lengthNumber)
    if (lengthNumber == 3){
        return numberPainel.slice(0, 1) + '.' + numberPainel.slice(1)
    }else{
        return number
    }
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => { //e = event = evento
        const value = e.target.innerText
        const id = e.target.id
        // console.log(value)
        
        switch(id){
            case 'number':
                if(currentRes.innerText == 0) currentRes.innerText = formatNumberPainel(value)
                else currentRes.innerText += formatNumberPainel(value)
                break
            case 'clear':
                if(value === 'C'){
                    currentRes.innerText = 0
                    previousRes.innerText = ''
                }else currentRes.innerText = 0
                break
            case 'sign':
                if(currentRes.innerText != 0){
                    if(currentRes.innerText.includes('-')) currentRes.innerText = currentRes.innerText.slice(1)
                    else currentRes.innerText = '-' + currentRes.innerText
                    break
                }
            case 'float':
                if(!currentRes.innerText.includes(',')) currentRes.innerText += ',' 
                break
            case 'operator':
                const listPrevious = previousRes.innerText.split(' ')
                previousRes.innerText = `${currentRes.innerText} ${value}`
                currentRes.innerText = 0
                break
            case 'equal':
                if(previousRes.innerText === '') previousRes.innerText = `${currentRes.innerText} ${value}`
                else if(previousRes.innerText.includes('=')) previousRes.innerText = `${currentRes.innerText} ${value}`
                else{
                    const result = solveOperation(previousRes.innerText.slice(-1), previousRes.innerText, currentRes.innerText)
                    previousRes.innerText += ` ${currentRes.innerText}`
                    currentRes.innerText = result
                }
                break
        }
    })
})


