# Whims

Whims is a collaborative idea board designed to help you and your friends organize events and activities you're interested in. Whether you're planning a party, a trip, or just looking for fun things to do, Whims helps you share and explore ideas together.

## Features

- **Grouping**: Create or join groups with your friends to collaborate on ideas.
- **Whim Card Creation**: Easily create and display your interests and ideas in a fun, visual format.
- **Filtering**: Quickly sift through your ideas and find the perfect activity.

# EVAN NOTES and files to go through (TO DO LIST)

- cardData is a child structure of groupData! THIS NEEDS TO CHANGE FOR SQL
- remove random colors for whim cards (or move it to its own file) it makes files longer and is a lot of data being generated and passed
- cards need to be homogenized, there are two different kinds (i think) [do we need to totally redo cards because of the booboo?]
- group components that use the same state data and make reducers for those components thay can all access easily

1. Denote the structure of how the data is stored
   1a. CSV file format is a must
2. Denote the structure of how groups are stored
   2a. again, csv file format preffered
3. Denote the structures used to allow these two things to communicate
   3a. get a list of the files used to bride these together
4. Create a unified card system that uses one singular structure
   4a. Change card structure to be csv file formatted
5. Create a unified group system that works with the cards
   5a. this is a complete overhaul, teamwork needed here
6. Prepare both for the new database

## Components

#### Auth

- Login.tsx []

#### card

- card.tsx []

#### functional

- comment.tsx []
- createCard.tsx []
- dateInput.tsx []
- group.tsx []
- groupManagement.tsx []
- likeDislike.tsx []
- sorting.tsx []

#### general

- button.tsx []
- dropdown.tsx []
- input.tsx []
- popWindow.tsx []

#### navigation

- account.tsx []
- header.tsx []
- settings.tsx []
- sidebar.tsx []
- tray.tsx []

#### routes

- dashboard.tsx []

#### types

- cardData.ts []
- groupData.ts []

#### userInput

- inputForm.tsx []

#### customHooks

- useLikeAndDislike.tsx

## Technologies Used

- **Frontend**: [React](https://reactjs.org/) with TypeScript
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore for data storage)
- **Authentication**: Firebase Authentication

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/CaramonH/Whims.git
   cd Whims
   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Setup Firebase

   - Create a new Firebase project and set up Firestore and Authentiation.
   - Copy the Firebase configuration into a `firebaseConfic.tsx` file.

4. Run the Application

   ```bash
   cd frontend
   npm run dev
   ```

## Usage

Once the application is running, you can:

1. **Sign Up / Log In**: Create an account or log in using your existing credentials.
2. **Create a Group**: Start a new group with your friends or join an existing one.
3. **Add Whims**: Create Whim cards to share your ideas and interests.
4. **Explore and Filter**: Use the filtering options to find specific ideas or activities.

## Authors

**[Cason Bobo](https://github.com/casonbobo)**  
_GitHub: [casonbobo](https://github.com/casonbobo)_  
_LinkedIn: [cason-bobo](https://www.linkedin.com/in/cason-bobo)_

**[Caramon Hofstetter](https://github.com/CaramonH)**  
_GitHub: [CaramonH](https://github.com/CaramonH)_  
_LinkedIn: [caramonhofstetter](https://www.linkedin.com/in/caramonhofstetter)_

**[Evan Newman-Chock](https://github.com/gumquat)**  
_GitHub: [gumquat](https://github.com/gumquat)_  
_LinkedIn: [evan-newman-chock](https://www.linkedin.com/in/evan-newman-chock)_

**[Karis Richardson](https://github.com/krisCrossApplesauce)**  
_GitHub: [kriscrossApplesauce](https://github.com/krisCrossApplesauce)_  
_LinkedIn: [karisrichardson](https://www.linkedin.com/in/karisrichardson)_

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
