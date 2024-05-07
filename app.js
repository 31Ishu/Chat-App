const ishaSelectorBtn = document.querySelector('#isha-selector')
const anuSelectorBtn = document.querySelector('#anu-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessagesElement = (message) => `
    <div class="messages ${message.sender === 'isha' ? 'blue-bg' : 'gray-bg'}">
                <div class="message-sender">${message.sender}</div> 
                <div class="message-text">${message.text}</div> 
                <div class="message-timestamp">${message.timestamp}</div> 

     </div>   
`

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessagesElement(message)
    })
}
let MessageSender = 'isha'

const updateMessageSender = (name) => {
    MessageSender = name
    chatHeader.innerText = `${MessageSender} chatting...`
    chatInput.placeholder = `Type here, ${MessageSender}`

    if(name === 'isha') {
        ishaSelectorBtn.classList.add('active-person')
        anuSelectorBtn.classList.add('active-person')
    }
    if(name === 'anu') {
        anuSelectorBtn.classList.add('active-person')
        ishaSelectorBtn.classList.add('active-person')
    }
    
    chatInput.focus()
}

ishaSelectorBtn.onclick = () => updateMessageSender('isha')
anuSelectorBtn.onclick = () => updateMessageSender('anu')


const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    const message = {
        sender: MessageSender,
        text: chatInput.Value,
        timestamp,
    }
    messages.push(message)
    localStorage.setItem('message', JSON.stringify(messages))
    chatMessages.innerHTML += createChatMessagesElementt(message)

    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}


chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})