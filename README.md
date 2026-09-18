# GalleryApp

A React Native mobile gallery application built with Expo and TypeScript.

## Features

* User registration with form validation
* User login with locally stored credentials
* Persistent login session
* Gallery using Picsum Photos API
* Search images by author
* A-M and N-Z author filters
* Pull-to-refresh
* Infinite scroll pagination
* Add and remove favorite images
* Persistent favorites using AsyncStorage
* Favorites search
* Image details screen
* Full-screen image preview
* Download images to device gallery
* Profile view and edit
* Gender selection
* Profile validation
* Logout
* Debounced search
* Image loading indicators

## Technologies

* React Native
* Expo
* TypeScript
* React Navigation
* Zustand
* AsyncStorage
* Axios
* Expo Media Library
* Expo File System
* React Native Picker

## API

Gallery images are fetched from:

https://picsum.photos/v2/list?page=1&limit=50

## Project Structure

```text
src/
├── api/
├── components/
├── hooks/
├── navigation/
├── screens/
│   ├── Auth/
│   └── Main/
├── store/
├── types/
└── utils/
```

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

## TypeScript Check

Run:

```bash
npx tsc --noEmit
```

## Main Screens

* Login
* Register
* Gallery
* Favorites
* Image Details
* Profile

## Data Persistence

AsyncStorage is used to persist:

* Registered user credentials
* Login session
* Favorite images

## Author

Developed as part of a React Native internship assignment.
