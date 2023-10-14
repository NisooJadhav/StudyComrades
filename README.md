# 📚🤝StudyComrades - we study together 

## Introduction

**StudyComrades** is a web-based platform designed to facilitate collaborative studying among students. It provides features such as note sharing(images), real-time chat, and the ability to search and add fellow comrades.

### Technologies Used

- React
- Vite
- Firebase (Authentication, Firestore)
- JavaScript (JS)
- HTML
- CSS (with SASS)
- Node.js
- Bulma

## Getting Started

Follow these steps to set up and run the project locally:

### Step 1: Clone the Repository

```bash
git clone https://github.com/nisoojadhav/studycomrades.git
cd studycomrades
```

### Step 2: Install Dependencies

```bash
yarn install
```

### Step 3: Configure Firebase

1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
2. Obtain the Firebase configuration object (apiKey, authDomain, projectId, etc.).
3. Replace the configuration in `src/firebase.js` with your own.

### Step 4: Run the Development Server

```bash
yarn run dev
```

## Usage

### Authentication

- Sign up for an account on the StudyComrades platform.
- Log in with your credentials.

### Chatting with Comrades

- Just select your friend to talk with.
- Type the message and just click send.

### Real-time Chat

- Head over to the "Chat" section.
- Add comrades using their usernames.
- Engage in private, real-time conversations.

### Searching and Adding Comrades

- Use the search bar to find fellow comrades.
- Click on their profiles and send a request to add them.

### Logging Out

- Click on your profile icon and select "Log Out" from the dropdown menu.

## Hosting and Deployment

- The platform is hosted at [https://studycomrades.netlify.app/](https://studycomrades.netlify.app/).
- The site uses Netlify for hosting and sends requests to Firebase for various functionalities.

## Additional Information

- The codebase can be found at [https://github.com/nisoojadhav/studycomrades/](https://github.com/nisoojadhav/studycomrades/).
- Firebase Functions are integrated with React JS to handle various operations.
- The bundling is handled by Vite JS, a minimal package builder for React JS sites. The build command is generated using `yarn build`.
