export const Statements = [
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
    industy: '',
    logo: '',
    sdgGoals: ['goal3', 'goal9']
  },
  {
    id: '12',
    psid: 'PS-AI12',
    title: 'AI-Driven Innovations for a Smarter Financial Fraud Detection',
    objective: 'Build AI models for fraud detection, based on transaction patterns, and migrate from rule-based to LLM-based approaches.',
    background: 'The aim is to develop AI systems that enhance the security of financial institutions by identifying fraudulent activities through smart alerts and analyzing transaction patterns with advanced AI models.',
    industy: '',
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
  },
    {
      id:'14',
      psid: 'PS-AR1',
      title: 'Revolutionizing Architectural Design and Visualization',
      objective: 'Develop a comprehensive AR/VR solution for visualizing large-scale architectural projects in real-world contexts.',
      background: 'Current architectural visualization techniques rely heavily on 2D plans and small-scale models, which do not fully convey the spatial experience of a design. AR/VR can enable architects and clients to explore full-scale, immersive models of buildings within their intended environments.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal11', 'goal9']
    },
    {
      id:'15',
      psid: 'PS-AR2',
      title: 'Optimizing Industrial Training Programs',
      objective: 'Create an AR/VR solution to simulate hazardous or complex industrial environments for training purposes.',
      background: 'Traditional training methods in industrial settings often lack realism and fail to adequately prepare trainees for real-world scenarios. AR/VR can simulate dangerous or complex industrial environments, allowing trainees to gain practical experience in a safe, controlled setting.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal8', 'goal4']
    },
    {
      id:'16',
      psid: 'PS-AR3',
      title: 'Enhancing Psychological Therapies with VR',
      objective: 'Develop a VR therapy platform that creates customizable, immersive environments for the treatment of PTSD, anxiety, phobias, and other psychological conditions.',
      background: 'Conventional therapeutic approaches can be limited in their ability to simulate the situations and stimuli necessary for exposure therapy. VR can create controlled, immersive environments tailored to individual therapeutic needs.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal3', 'goal4']
    },
    {
      id:'17',
      psid: 'PS-AR4',
      title: 'Improving Remote Education with AR/VR',
      objective: 'Create an AR/VR educational platform that provides immersive, interactive learning environments for a wide range of subjects, incorporating hands-on simulations and collaborative tools.',
      background: 'Traditional online learning platforms fail to provide the immersive, interactive experiences that are critical for subjects such as science, engineering, and the arts. AR/VR can transform remote education by offering fully immersive, interactive learning environments.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal4', 'goal9']
    },
    {
      id:'18',
      psid: 'PS-AR5',
      title: 'Advancing Human-Computer Interaction',
      objective: 'Develop novel HCI frameworks and interaction techniques that leverage AR/VR to provide more intuitive, immersive, and spatially aware digital experiences.',
      background: 'Traditional HCI relies on flat screens and limited input methods, which do not leverage the full potential of spatial computing. AR/VR can redefine HCI by introducing new paradigms that integrate spatial awareness and natural user interactions.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal9', 'goal4']
    },
    {
      id:'19',
      psid: 'PS-AR6',
      title: 'Facilitating Complex Data Visualization',
      objective: 'Create an AR/VR data visualization platform that enables immersive, interactive exploration of complex, multidimensional datasets, facilitating better analysis and decision-making.',
      background: 'Existing data visualization methods are limited by their two-dimensional nature, which can obscure patterns and relationships in complex datasets. AR/VR can enable immersive, three-dimensional data visualization, allowing for more intuitive exploration and analysis.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal9', 'goal4']
    },
    {
      id:'20',
      psid: 'PS-AR7',
      title: 'Revolutionizing Urban Planning and Development',
      objective: 'Develop an AR/VR solution to simulate and visualize the impact of new urban developments on existing cityscapes and infrastructure.',
      background: 'Traditional planning tools often fail to capture the full spatial and environmental context of urban development projects. AR/VR can offer immersive simulations of proposed developments, allowing for comprehensive impact assessments.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal11', 'goal9']
    },
    {
      id: '21',
      psid: 'PS-AR8',
      title: 'VR-Based Factory Layout Optimization',
      objective: 'Develop a VR application that helps factory managers optimize their plant/ground layout.',
      background: 'The application should allow users to simulate different configurations of machinery, workstations, and storage areas in a virtual factory environment, evaluating factors such as workflow efficiency, safety, and space utilization.',
      industy: 'Nokia',
      logo: '/logos/nokia.png',
      sdgGoals: ['goal9', 'goal12']
    },
    {
      id: '22',
      psid: 'PS-AR9',
      title: 'AR-Based Assembly Line Assistance',
      objective: 'Create an AR application designed to assist factory workers on assembly lines.',
      background: 'The app should provide real-time, step-by-step instructions overlaid on the actual components, ensuring accuracy and speed in assembling complex products.',
      industy: 'Nokia',
      logo: '/logos/nokia.png',
      sdgGoals: ['goal8', 'goal9']
    },
    {
      id: '23',
      psid: 'PS-CS1',
      title: 'Detecting and Preventing Ransomware Attacks',
      objective: 'Develop a comprehensive software solution aimed at detecting and preventing ransomware attacks.',
      background: 'This solution should incorporate advanced threat detection mechanisms and proactive measures to safeguard systems against ransomware threats.',
      industy: 'Alibi',
      logo: '/logos/alibi.jpg',
      sdgGoals: ['goal9', 'goal16']
    },
    {
      id: '24',
      psid: 'PS-CS2',
      title: 'OSINT for Target Information Gathering',
      objective: 'Create a software tool that effectively gathers information about a target using Open Source Intelligence (OSINT) techniques.',
      background: 'This tool should be capable of aggregating data from various public sources to provide a detailed profile of the target.',
      industy: 'Alibi',
      logo: '/logos/alibi.jpg',
      sdgGoals: ['goal9', 'goal16']
    },
    {
      id: '25',
      psid: 'PS-CS3',
      title: 'Forensic Triage on Computers and Mobile Devices',
      objective: 'Design a forensic triage software capable of analyzing computers and mobile devices to identify malware, cryptocurrency transactions, and dark web activities.',
      background: 'The tool should streamline the process of discovering and documenting digital evidence related to malicious activities.',
      industy: 'Alibi',
      logo: '/logos/alibi.jpg',
      sdgGoals: ['goal9', 'goal16']
    },
    {
      id: '26',
      psid: 'PS-CS4',
      title: 'Bulk IP Analysis with VoIP Calls, Tor, VPN and Proxy Detection',
      objective: 'Develop a robust bulk IP analysis solution that includes the capability to detect VoIP calls and identify Tor network usage.',
      background: 'This tool should facilitate the efficient analysis of large sets of IP addresses, providing insights into potential security threats and anonymized network traffic.',
      industy: 'Alibi',
      logo: '/logos/alibi.jpg',
      sdgGoals: ['goal9', 'goal16']
    },
    {
      id: '27',
      psid: 'PS-WAD1',
      title: 'Real-time Multilingual Translation and Localization for Global Web Applications',
      objective: 'Create a web application framework that integrates real-time NLP and localization tools, providing seamless, contextually accurate translations and culturally adapted content for users worldwide.',
      background: 'Real-time translation requires sophisticated natural language processing (NLP) algorithms capable of handling idiomatic expressions, slang, and context-specific nuances. Localization goes beyond translation, requiring adaptation of content, design, and functionality to fit cultural norms and user expectations.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal4', 'goal8']
    },
    {
      id: '28',
      psid: 'PS-WAD2',
      title: 'Interactive 3D Web Experiences with Real-Time Physics and Animation',
      objective: 'Develop a web platform that seamlessly integrates 3D graphics, real-time physics engines, and responsive animations, providing immersive and interactive experiences while ensuring optimal performance and cross-device compatibility.',
      background: 'Traditional web technologies struggle to deliver high-quality 3D graphics and physics simulations in real-time. Achieving this involves leveraging WebGL, Web Assembly, and modern GPU capabilities while maintaining compatibility and performance across various devices and browsers.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal9', 'goal11']
    },
    {
      id: '29',
      psid: 'PS-WAD3',
      title: 'Intelligent Web Assistants with Real-Time Decision Support',
      objective: 'Create web applications that incorporate intelligent assistants capable of providing real-time decision support and personalized recommendations based on complex data analysis.',
      background: 'Intelligent assistants need to process and analyze vast amounts of data in real-time, leveraging machine learning algorithms to provide contextually relevant recommendations and support. This involves integrating natural language processing, predictive analytics, and user behavior analysis.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal9', 'goal4']
    },
    {
      id: '30',
      psid: 'PS-WAD4',
      title: 'Virtual Reality (VR) Web Portals with Immersive User Experiences',
      objective: 'Design web portals that provide fully immersive virtual reality (VR) experiences accessible through standard web browsers.',
      background: 'VR experiences typically require specialized hardware and software. Integrating VR into web portals involves overcoming technical limitations related to rendering, interaction, and compatibility while ensuring a seamless and immersive user experience.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal11', 'goal9']
    },
    {
      id: '31',
      psid: 'PS-WAD5',
      title: 'Real-time Interactive Storytelling with Personalized User Narratives',
      objective: 'Develop web platforms that offer real-time interactive storytelling experiences, dynamically adapting narratives based on user choices and behavior.',
      background: 'Interactive storytelling requires complex narrative structures that adapt in real-time, providing users with unique and personalized experiences. This involves integrating AI-driven content generation, user behavior analysis, and dynamic narrative branching.',
      industy: 'SabytheNoob',
      logo: '/logos/sabbythenoob.png',
      sdgGoals: ['goal4', 'goal8']
    },
    {
      id: '32',
      psid: 'PS-WAD6',
      title: 'Workforce Management System',
      objective: 'Develop a web-based application for managing and scheduling factory workers.',
      background: 'The system should include features like shift scheduling, real-time attendance tracking, and performance metrics, allowing managers to optimize workforce allocation and productivity.',
      industy: 'Nokia',
      logo: '/logos/nokia.png',
      sdgGoals: ['goal8', 'goal9']
    },
    {
      id: '33',
      psid: 'PS-WAD7',
      title: 'Production Monitoring Platform',
      objective: 'Create a web application that provides factory managers with a real-time dashboard of production metrics.',
      background: 'The dashboard should display key performance indicators (KPIs) such as production rates, machine utilization, and downtime, enabling data-driven decision-making and timely interventions.',
      industy: 'Nokia',
      logo: '/logos/nokia.png',
      sdgGoals: ['goal9', 'goal12']
    },
    {
        id : '34',
        psid: 'PS-OPEN',
    }
  ];
  