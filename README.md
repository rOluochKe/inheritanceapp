# Inheritance Catalog App

The Inheritance Catalog App is a mobile application feature designed to help users catalog items that will be part of an inheritance process. It allows users to add, describe, categorize, and upload images of items, facilitating equitable property division during family transitions. The app aims to provide a user-friendly experience, particularly for an older demographic, by offering a responsive and intuitive interface.

## Installation

1. Clone the repository:
```
git clone git@github.com:rOluochKe/inheritanceapp.git
```

2. Navigate to the project directory:
```
cd inheritanceapp
```

3. Configure backend API URL:
```
Go to: hooks/rootUrl.js and update to your local/remote endpoint
```

4. Install dependencies:
```
npm install
```

5. Start the development server:
```
npm start
```

6. Open the application in your mobile device emulator or scan the QR code with the Expo Go app.

## Features

- <b>Add Items:</b> Users can add new items to the catalog, providing descriptions and categorizing them based on various attributes.
- <b>View Items:</b> Users can view a list of all cataloged items with their descriptions and uploaded images.
- <b>Upload Images:</b> Users can upload images of items directly from their device's camera or photo library.
- <b>Categorization:</b> Items can be categorized based on attributes such as heirloom value, monetary value

## Technologies Used

- <b>React Native:</b> Front-end framework for building the mobile app.
- <b>Expo:</b> Development toolchain and platform for building React Native applications.
- <b>Python:</b> Back-end runtime environment for executing Django code.
- <b>Django:</b> Web application framework for building the back-end server.
- <b>PostgreSQL:</b> SQL database for storing item data.

## Design Decisions

- <b>Accessibility:</b> The UI design prioritizes accessibility by using large fonts, clear contrast, and intuitive navigation, making it easy for older users to interact with the app.
- <b>Simplicity:</b> The app features a clean and straightforward layout, minimizing clutter and complexity to ensure ease of use for all users.
- <b>Image Handling:</b> To optimize performance and user experience, images are resized and compressed before uploading to the server, ensuring fast loading times and efficient storage utilization.

## Assumptions

- Users have basic knowledge of how to use a mobile device and navigate through mobile applications.
- Users have access to a stable internet connection for uploading images and accessing the back-end server.

## Future Enhancements

- Further mplement user authentication and authorization to secure user data and ensure privacy.
- Enhance categorization features with customizable tags and filters for organizing items more effectively.
- Integrate OCR (Optical Character Recognition) technology to extract text from item images, automating the cataloging process.
- Implement offline support to allow users to access and add items even without an internet connection.
