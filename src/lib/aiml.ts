export const aimlStatements = [
  {
    id: '1',
    psid: 'PS-AI1',
    title: 'Tokenization Strategy for Tamil Language',
    objective: 'Create a tokenization strategy based on transformer tokenization for the Tamil language.',
    background: 'To learn how bad the current tokenization methods are, refer to https://huggingface.co/spaces/Xenova/the-tokenizer-playground. The performance metric is the number of tokens the tokenizer can construct. Too few or too many tokens mean poor tokenization.',
    industy: 'Buddi.ai',
    logo: '/logos/buddi_ai.jpeg',
    sdgGoals: ['goal4', 'goal9']
  },
  {
    id: '2',
    psid: 'PS-AI2',
    title: 'Image Caption Generator with Tamil Captions',
    objective: 'Build an image caption generator with Tamil captions.',
    background: 'You may use public-domain image-caption datasets in English, which can be translated to Tamil using any translator (Google, Bhashini, or the like). Consider using CLIP modeling to solve this problem.',
    industy: 'Buddi.ai',
    logo: '/logos/buddi_ai.jpeg',
    sdgGoals: ['goal4', 'goal9']
  },
  {
    id: '3',
    psid: 'PS-AI3',
    title: 'Enhanced TensorFlow Playground',
    objective: 'Create a website like https://playground.tensorflow.org/, but it should provide more features.',
    background: 'For instance, add more datasets; support more feature transformations besides x^2, sin(x); support 1-d datasets; allow dropouts, etc. Alternatively, create a website like https://poloclub.github.io/ganlab/, but for VAE style of learning the data distribution.',
    industy: 'Buddi.ai',
    logo: '/logos/buddi_ai.jpeg',
    sdgGoals: ['goal4', 'goal9']
  },
  {
    id: '4',
    psid: 'PS-AI4',
    title: 'Colorizing B/W Images',
    objective: 'Using public domain models and code, create a portal to colorize older B/W images.',
    background: 'You may extend the idea to colorizing B/W movies.',
    industy: 'Buddi.ai',
    logo: '/logos/buddi_ai.jpeg',
    sdgGoals: ['goal4', 'goal9']
  },
  {
    id: '5',
    psid: 'PS-AI5',
    title: 'Facial Expressions Prediction and Body Posture Suggestions',
    objective: 'Predict facial expressions and provide body posture suggestions, including grooming and hairstyle.',
    background: 'Use AI to analyze facial expressions and suggest improvements in grooming and body posture.',
    industy: 'Interain Intelligence',
    logo: '/logos/interain_logo.jpeg',
    sdgGoals: ['goal3', 'goal4']
  },
  {
    id: '6',
    psid: 'PS-AI6',
    title: 'Sentence Suggestions for HR Questions',
    objective: 'Provide words or sentence suggestions after answering a question.',
    background: 'For example, after an HR asks a question, the AI model should suggest the goodness of the sentence and provide better answers.',
    industy: 'Interain Intelligence',
    logo: '/logos/interain_logo.jpeg',
    sdgGoals: ['goal4', 'goal8']
  },
  {
    id: '7',
    psid: 'PS-AI7',
    title: 'Voice Intensity and Nervousness Detection',
    objective: 'Detect voice intensity or nervousness using AI and provide suggestions.',
    background: 'Use AI to analyze voice intensity (sound, not words) or nervousness and provide suggestions for improvement.',
    industy: 'Interain Intelligence',
    logo: '/logos/interain_logo.jpeg',
    sdgGoals: ['goal3', 'goal4']
  },
   {
    id: '8',
    psid: 'PS-AI8',
    title: 'Predictive Text Editor',
    objective: 'Build a text editor that predicts and suggests the next word or phrase as the user types, based on the context of the written text.',
    background: 'This project requires collecting large text datasets, training a predictive language model, and integrating this functionality into a text editing interface.',
    industy: 'Guvi',
    logo: '/logos/guvi.png',
    sdgGoals: ['goal4', 'goal9']
  },
  {
    id: '9',
    psid: 'PS-AI9',
    title: 'Emotion Recognition from Text',
    objective: "Build an application that analyzes text input (e.g., social media posts, messages) to determine the writer's mood or emotional state.",
    background: 'This requires collecting text data, preprocessing for sentiment analysis, training a model to recognize emotions, and integrating this into an application.',
    industy: 'Guvi',
    logo: '/logos/guvi.png',
    sdgGoals: ['goal3', 'goal4']
  },
  {
    id: '10',
    psid: 'PS-AI10',
    title: 'Mental Health Support Chatbot',
    objective: 'Build a chatbot that provides mental health support and resources based on the user\'s expressed feelings and concerns.',
    background: 'This involves training a model on empathetic response generation and integrating it into a chat platform, ensuring user privacy and data security.',
    industy: 'Guvi',
    logo: '/logos/guvi.png',
    sdgGoals: ['goal3', 'goal4']
  },
  {
    id: '11',
    psid: 'PS-AI11',
    title: 'AI in Healthcare: Pioneering the Future of Health and Wellness',
    objective: 'Create AI tools for diagnosing diseases from medical images, personalized treatment recommendations, or remote patient monitoring systems.',
    background: 'This project focuses on leveraging AI to revolutionize healthcare through the development of tools that can assist in disease diagnosis, personalized treatment planning, and continuous patient monitoring. The goal is to improve patient outcomes and healthcare efficiency.',
    industy: 'AI Based Solutions',
    logo: '',
    sdgGoals: ['goal3', 'goal9']
  },
  {
    id: '12',
    psid: 'PS-AI12',
    title: 'AI-Driven Innovations for a Smarter Financial Fraud Detection',
    objective: 'Build AI models for fraud detection, based on transaction patterns, and migrate from rule-based to LLM-based approaches.',
    background: 'The aim is to develop AI systems that enhance the security of financial institutions by identifying fraudulent activities through smart alerts and analyzing transaction patterns with advanced AI models.',
    industy: ' AI Based Solutions',
    logo: '',
    sdgGoals: ['goal9', 'goal16']
  },
  {
    id: '13',
    psid: 'PS-AI13',
    title: 'Developing an Automatic Speech Recognition (ASR) System for Code-Mixed Tamil-English Language',
    objective: 'Create an Automatic Speech Recognition (ASR) system that can accurately transcribe code-mixed Tamil-English speech. The goal is to improve transcription accuracy for audio recordings where speakers frequently switch between Tamil and English within a single sentence.',
    background: 'Code-mixing, the practice of alternating between two or more languages within a conversation, is common in many multilingual communities. Existing ASR systems often struggle to accurately transcribe code-mixed speech, leading to significant errors. An effective ASR system for code-mixed Tamil-English speech would be highly beneficial for various applications, including automated subtitling, voice-activated assistants, and educational tools.',
    industy: 'Atna',
    logo: '/logos/atna.jpeg',
    sdgGoals: ['goal4', 'goal9']
  }
];
