const questionBank = [
  {
    question: "salut",
    answer: " Salut ! Îmi pare bine de cunoștiință.",
  },
  {
    question: "cine esti",
    answer: "Sunt un simplu ChatBot creat utilizând JavaScript !",
  },
  {
    question: "ce stii sa faci",
    answer:
      "Mă pricep la HTML, CSS, JavaScript, design responsiv si framework-uri precum React si Next.js",
  },
  {
    question: "unde locuiesti",
    answer:
      "Mă localizez în România, aparțin de Facultatea de Informatică a Universității de Vest din Timișoara.",
  },
  {
    question: "ce este acest site?",
    answer:
      "Acest site este un portofoliu personal și totodată o temă la Elemente de Web Design",
  },
];

const chatForm = document.getElementById("chat-form");

const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const userMessage = userInput.value.trim().toLowerCase();
  if (userMessage === "") {
    return;
  }
  userInput.value = "";
  addMessage(userMessage, "user");
  let botReply = "Scuze, nu am inteles ce ai vrut sa spui!";
  for (let item of questionBank) {
    if (userMessage.includes(item.question)) {
      botReply = item.answer;
      break;
    }
  }
  setTimeout(() => {
    addMessage(botReply, "bot");
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 300);
});

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message");
  message.classList.add(sender);
  message.textContent = text;
  chatBox.appendChild(message);
}
