export const storyData = {
  cinematicIntro: {
    lines: [
      "The stars seem brighter tonight...",
      "They are whispering about someone special today...",
      "Yes... that's you.",
      "Today, you are the center of the world."
    ],
    title: "BIRTHDAY JOURNEY for Luuxyy"
  },

  birthdayStation: {
    id: 'birthday-station',
    title: 'Birthday Station',
    icon: '🚉',
    description: 'A cheerful journey filled with birthday wishes and happy moments.',
    steps: [
      {
        id: 'welcome',
        type: 'text',
        content: "🚂 Welcome aboard the Birthday Station Express! I'm so happy you're here.",
        delay: 3000
      },
      {
        id: 'welcome2',
        type: 'text',
        content: "Before this train leaves... I'd like to ask you a few things.",
        delay: 2500
      },
      {
        id: 'smile_check',
        type: 'choice',
        content: "😊 Have you smiled today?",
        choices: [
          { id: 'smile_yes', label: '😊 Of course!', value: 'smile_yes' },
          { id: 'smile_no', label: '🙈 Not yet.', value: 'smile_no' }
        ],
        responses: {
          smile_yes: "That's wonderful! Keep that smile going—it looks beautiful on you! 🌟",
          smile_no: "That's okay... just remember, the world always looks a little brighter with your smile in it. 💫"
        }
      },
      {
        id: 'birthday_wish',
        type: 'choice',
        content: "🎁 If you could receive ONE thing this year... What would it be?",
        choices: [
          { id: 'wish_happiness', label: '✨ Happiness', value: 'wish_happiness' },
          { id: 'wish_adventure', label: '🌍 Adventure', value: 'wish_adventure' },
          { id: 'wish_peace', label: '🌸 Peace', value: 'wish_peace' },
          { id: 'wish_success', label: '🎓 Success', value: 'wish_success' }
        ],
        responses: {
          wish_happiness: "Happiness is the warmest gift. May your days be filled with joy and laughter! ☀️",
          wish_adventure: "Adventure awaits! May this year bring you exciting journeys and beautiful discoveries! 🗺️",
          wish_peace: "Peace is precious. May your heart find calm and your mind find rest. 🕊️",
          wish_success: "Success is yours to claim! May your hard work bloom into beautiful achievements. 🌱"
        }
      },
      {
        id: 'advice',
        type: 'choice',
        content: "💭 Can I tell you something?",
        choices: [
          { id: 'advice_yes', label: '✨Yes ', value: 'advice_yes' },
          { id: 'advice_listen', label: "I'm listening 👀", value: 'advice_listen' }
        ],
        responses: {
          advice_yes: "Here's a little secret... 💫",
          advice_listen: "Thank you for listening... 🌙"
        },
        followUp: {
          type: 'text',
          content: "Don't spend too much time worrying about things you can't control.\n\nKeep laughing.\n\nKeep being yourself.",
          delay: 4000
        }
      },
      {
        id: 'fun_question',
        type: 'choice',
        content: "🐼 Which describes you today?",
        choices: [
          { id: 'fun_sleepy', label: '🐼 Sleepy', value: 'fun_sleepy' },
          { id: 'fun_cute', label: '🐱 Cute', value: 'fun_cute' },
          { id: 'fun_hungry', label: '🦦 Hungry', value: 'fun_hungry' },
          { id: 'fun_all', label: '🐧 All of them 😂', value: 'fun_all' }
        ],
        responses: {
          fun_sleepy: "Same here! Let's get you a cozy blanket and some warm tea. 🛏️",
          fun_cute: "Aww, you're adorable! Don't let anyone tell you otherwise. 🌸",
          fun_hungry: "I know the perfect place... let's get you some cake! 🍰",
          fun_all: "You're a whole mood and I love it! Multitasking at its finest! 😂✨"
        }
      },
      {
        id: 'final',
        type: 'text',
        content: "🎯 The train has reached its destination.\n\nYour first journey is complete.\n\nBut...\n\nOne mystery remains.\n\nA door is waiting for you.",
        delay: 5000
      }
    ]
  },

  secretDoor: {
    id: 'secret-door',
    title: 'Secret Door',
    icon: '🚪',
    description: 'A journey into the beauty of who you are.',
    steps: [
      {
        id: 'welcome',
        type: 'text',
        content: "🌙 You found the secret door.\n\nNot everyone gets this far.",
        delay: 3000
      },
      {
        id: 'door_open',
        type: 'text',
        content: "🚪 The door slowly opens... revealing a world of wonder just for you.",
        delay: 2500
      },
      {
        id: 'compliments',
        type: 'choice',
        content: "🔑 Choose a key to reveal a compliment about YOU.",
        choices: [
          { id: 'key_gold', label: '🔑 Gold', value: 'key_gold' },
          { id: 'key_silver', label: '🔑 Silver', value: 'key_silver' },
          { id: 'key_crystal', label: '🔑 Crystal', value: 'key_crystal' }
        ],
        responses: {
          key_gold: "Your heart is pure gold. The kindness you carry is rare and beautiful. You make the world a warmer place just by being in it. 💛",
          key_silver: "Like moonlight, you bring gentle light to everyone around you. Your presence is calming and your soul is truly beautiful. 🌙",
          key_crystal: "Your soul is crystal clear and full of genuine beauty. There's something so pure and authentic about you that draws people in. 💎"
        }
      },
      {
        id: 'what_makes_you_special',
        type: 'choice',
        content: "💫 What makes your heart so beautiful?",
        choices: [
          { id: 'special_kindness', label: '🌹 Your kindness', value: 'special_kindness' },
          { id: 'special_strength', label: '🌟 Your strength', value: 'special_strength' },
          { id: 'special_compassion', label: '💫 Your compassion', value: 'special_compassion' },
          { id: 'special_soul', label: '🦋 Your gentle soul', value: 'special_soul' }
        ],
        responses: {
          special_kindness: "Your kindness is like a warm hug for the soul. You have a way of making everyone feel seen and loved. That's a gift that not everyone has. 🌹",
          special_strength: "Your strength is quiet but powerful. You've been through things and still choose to be kind. That's what makes you extraordinary. 🌟",
          special_compassion: "Your compassion runs deep. You feel things deeply and care genuinely. The world needs more hearts like yours. 💫",
          special_soul: "Your gentle soul is rare and precious. You bring peace wherever you go. Never change who you are. 🦋"
        }
      },
      {
        id: 'what_you_love',
        type: 'choice',
        content: "🌷 What do you love most about yourself?",
        choices: [
          { id: 'love_care', label: '🌷 Your ability to care for others', value: 'love_care' },
          { id: 'love_spirit', label: '🦋 Your beautiful spirit', value: 'love_spirit' },
          { id: 'love_heart', label: '🌙 Your gentle heart', value: 'love_heart' },
          { id: 'love_kindness', label: '💖 Your unwavering kindness', value: 'love_kindness' }
        ],
        responses: {
          love_care: "Your ability to care for others is one of the most beautiful things about you. You give so much love, and it comes back to you in wonderful ways. 🌷",
          love_spirit: "Your spirit is like a beautiful butterfly—free, graceful, and full of color. You light up every room you enter. 🦋",
          love_heart: "Your gentle heart is what makes you so special. You feel things deeply and love with your whole being. Never stop being soft. 🌙",
          love_kindness: "Your kindness is your superpower. You choose to be good even when it's hard. That's the mark of a truly beautiful soul. 🌟"
        }
      },
      {
        id: 'promise',
        type: 'choice',
        content: "🤝 Promise me you'll never forget...",
        choices: [
          { id: 'promise_amazing', label: '🌸 How amazing you truly are', value: 'promise_amazing' },
          { id: 'promise_matter', label: '🌟 How much you matter to this world', value: 'promise_matter' },
          { id: 'promise_shine', label: '✨ How brightly you shine', value: 'promise_shine' },
          { id: 'promise_enough', label: '🌙 That you are enough, just as you are', value: 'promise_enough' }
        ],
        responses: {
          promise_amazing: "I'm so glad you promised. Because you ARE amazing—in every single way. Don't ever let anyone make you feel less. 🌸",
          promise_matter: "You matter more than you know. Your presence in this world makes it a better place. Never forget that. 💖",
          promise_shine: "Your light is unique and beautiful. When you shine, you give others permission to shine too. Keep being bright. ✨",
          promise_enough: "You are enough. You've always been enough. Just as you are, right now, in this moment. Perfectly, beautifully enough. 🌙"
        }
      }
    ]
  },

  userChoices: {
    birthdayStation: {},
    secretDoor: {}
  },

  getResponse: (path, choiceId) => {
    const pathData = path === 'station' ? storyData.birthdayStation : storyData.secretDoor
    for (const step of pathData.steps) {
      if (step.choices && step.choices.some(c => c.id === choiceId)) {
        if (step.responses && step.responses[choiceId]) {
          return step.responses[choiceId]
        }
      }
    }
    return null
  },

  getPersonalizedLetter: (choices) => {
    const stationChoices = choices.birthdayStation || {}
    const secretChoices = choices.secretDoor || {}
    
    let personalizedMessage = []
    
    if (stationChoices.smile_check) {
      const smileMap = {
        'smile_yes': "Your smile lights up the world. Keep sharing it! ✨",
        'smile_no': "I hope I've given you a reason to smile. You deserve all the happiness! 💫"
      }
      if (smileMap[stationChoices.smile_check]) {
        personalizedMessage.push(smileMap[stationChoices.smile_check])
      }
    }
    
    if (secretChoices.promise) {
      const promiseMap = {
        'promise_amazing': "Never forget how truly amazing you are. 💖",
        'promise_matter': "You matter more than words can ever say. 🌟",
        'promise_shine': "Your light is needed in this world. Keep shining! ✨",
        'promise_enough': "You are enough. Always have been, always will be. 🌙"
      }
      if (promiseMap[secretChoices.promise]) {
        personalizedMessage.push(promiseMap[secretChoices.promise])
      }
    }
    
    return personalizedMessage.length > 0 ? personalizedMessage : null
  }
}

export default storyData