# CodeSession Tracker

CodeSession Tracker is a React time tracking app that allows you to track different coding sessions. It enables you to start and stop time-tracked segments with descriptions, and provides a view of all the tracked times.

This project was developed in collaboration with OpenAI's ChatGPT, an AI language model, and Pelayo Méndez.

## Demo

https://code-session-tracker.vercel.app/

## Features

- Start and stop time-tracked segments with descriptions.
- Display a list of tracked times with the ability to delete entries.
- View the duration of each tracked session in HH:MM:SS format.
- Filter the tracked times by selecting a specific date.
- Responsive UI design with Ant Design components.
- Data persistence using LokiJS.

## Development Process

During the development of CodeSession Tracker, the following steps were taken in collaboration with OpenAI's ChatGPT:

1. Set up the initial project structure with React and Ant Design components.
2. Implemented the time tracking functionality using functional components and hooks.
3. Integrated LokiJS as the database for storing the tracked times.
4. Created the TrackedTimesList component to display the list of tracked times.
5. Enhanced the UI with formatting of start and end times, and duration in HH:MM:SS format.
6. Added the ability to delete tracked times from the list.
7. Implemented data persistence using localStorage to maintain the data on page refresh.
8. Added the ability to filter the tracked times by selecting a specific date using Ant Design DatePicker component.
9. Refactored the TrackedTimesList component to separate the footer into a separate component.
10. Deployed the application to Vercel for hosting.

## Getting Started

To run CodeSession Tracker locally, follow these steps:

1. Clone the repository: `git clone https://github.com/pelayomendez/code-session-tracker.git`
2. Navigate to the project directory: `cd code-session-tracker`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit: `http://localhost:3000`

## Contributing

CodeSession Tracker is an open-source project, and contributions are welcome. If you have any suggestions, improvements, or bug fixes, please submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

## Author

- [Pelayo Méndez](https://github.com/pelayomendez) - Frontend Developer
- OpenAI's ChatGPT - AI Language Model

