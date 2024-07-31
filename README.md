# Whims

Whims is a collaborative idea board designed to help you and your friends organize events and activities you're interested in. Whether you're planning a party, a trip, or just looking for fun things to do, Whims helps you share and explore ideas together.

## Features

- **Grouping**: Create or join groups with your friends to collaborate on ideas.
- **Whim Card Creation**: Easily create and display your interests and ideas in a fun, visual format.
- **Filtering**: Quickly sift through your ideas and find the perfect activity.

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
