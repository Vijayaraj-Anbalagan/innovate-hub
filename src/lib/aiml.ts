export const aimlStatements = [
  {
    id: '1',
    psid: 'PS-AI1',
    title: 'Tokenization Strategy for Tamil Language',
    objective: 'Create a tokenization strategy based on transformer tokenization for the Tamil language.',
    background: 'To learn how bad the current tokenization methods are, refer to https://huggingface.co/spaces/Xenova/the-tokenizer-playground. The performance metric is the number of tokens the tokenizer can construct. Too few or too many tokens mean poor tokenization.',
    company: 'Buddi.ai',
    logo: '/logos/buddi_ai.jpeg',
    sdgGoals: ['goal4', 'goal9']
  },
  {
    id: '2',
    psid: 'PS-AI2',
    title: 'Image Caption Generator with Tamil Captions',
    objective: 'Build an image caption generator with Tamil captions.',
    background: 'You may use public-domain image-caption datasets in English, which can be translated to Tamil using any translator (Google, Bhashini, or the like). Consider using CLIP modeling to solve this problem.',
    company: 'Buddi.ai',
    logo: '/logos/buddi_ai.jpeg',
    sdgGoals: ['goal4', 'goal9']
  },
  {
    id: '3',
    psid: 'PS-AI3',
    title: 'Enhanced TensorFlow Playground',
    objective: 'Create a website like https://playground.tensorflow.org/, but it should provide more features.',
    background: 'For instance, add more datasets; support more feature transformations besides x^2, sin(x); support 1-d datasets; allow dropouts, etc. Alternatively, create a website like https://poloclub.github.io/ganlab/, but for VAE style of learning the data distribution.',
    company: 'Buddi.ai',
    logo: '/logos/buddi_ai.jpeg',
    sdgGoals: ['goal4', 'goal9']
  },
  {
    id: '4',
    psid: 'PS-AI4',
    title: 'Colorizing B/W Images',
    objective: 'Using public domain models and code, create a portal to colorize older B/W images.',
    background: 'You may extend the idea to colorizing B/W movies.',
    company: 'Buddi.ai',
    logo: '/logos/buddi_ai.jpeg',
    sdgGoals: ['goal4', 'goal9']
  },
  {
    id: '5',
    psid: 'PS-AI5',
    title: 'Facial Expressions Prediction and Body Posture Suggestions',
    objective: 'Predict facial expressions and provide body posture suggestions, including grooming and hairstyle.',
    background: 'Use AI to analyze facial expressions and suggest improvements in grooming and body posture.',
    company: 'Interain Intelligence',
    logo: '/logos/interain_logo.jpeg',
    sdgGoals: ['goal3', 'goal4']
  },
  {
    id: '6',
    psid: 'PS-AI6',
    title: 'Sentence Suggestions for HR Questions',
    objective: 'Provide words or sentence suggestions after answering a question.',
    background: 'For example, after an HR asks a question, the AI model should suggest the goodness of the sentence and provide better answers.',
    company: 'Interain Intelligence',
    logo: '/logos/interain_logo.jpeg',
    sdgGoals: ['goal4', 'goal8']
  },
  {
    id: '7',
    psid: 'PS-AI7',
    title: 'Voice Intensity and Nervousness Detection',
    objective: 'Detect voice intensity or nervousness using AI and provide suggestions.',
    background: 'Use AI to analyze voice intensity (sound, not words) or nervousness and provide suggestions for improvement.',
    company: 'Interain Intelligence',
    logo: '/logos/interain_logo.jpeg',
    sdgGoals: ['goal3', 'goal4']
  }
];
