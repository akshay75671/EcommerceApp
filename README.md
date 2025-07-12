# EcommerceApp

1. Prerequisites
    Before you begin, ensure you have the following installed:

    Node.js (LTS version recommended): Download Node.js

    npm (comes with Node.js) or Yarn:

    Bash

    npm install --global yarn
    React Native CLI: Follow the official React Native CLI Quickstart Guide for setting up your development environment, including:

    Java Development Kit (JDK)

    Android Studio (with Android SDK, platform tools, and an AVD/emulator setup)

    Xcode (for iOS development, macOS only)

    CocoaPods (for iOS development, macOS only)

2. Setup and Installation
    Follow these steps to get the project up and running on your local machine:

    Clone the Repository:

    Bash

    git clone <your-github-repo-link>
    cd AwesomeEcomApp # Or whatever your project folder is named
    Install Dependencies:
    Using npm:

    Bash

    npm install
    Using Yarn:

    Bash

    yarn install
    Install CocoaPods (for iOS development on macOS):
    After npm install or yarn install, navigate into the ios directory and install pods:

    Bash

    cd ios
    pod install
    cd ..
    If pod install fails, ensure you have CocoaPods installed (sudo gem install cocoapods) and run pod repo update.

3. Running the Project
    To run the application on an emulator/simulator or a physical device:

    Start the Metro Bundler:
    Open a new terminal window in the project root (AwesomeEcomApp/) and run:

    Bash

    npm start
    # or yarn start
    This will start the development server. Keep this terminal window open.

    Run on Android:
    Open another terminal window in the project root (AwesomeEcomApp/) and run:

    Bash

    npm run android
    # or yarn android
    Ensure you have an Android emulator running (via Android Studio AVD Manager) or a physical Android device connected with USB debugging enabled.

    Run on iOS (macOS only):
    Open another terminal window in the project root (AwesomeEcomApp/) and run:

    Bash

    npm run ios
    # or yarn ios
    Ensure you have an iOS Simulator running (via Xcode) or a physical iOS device connected.

4. Architecture and Design Decisions
    The application follows a modular and component-based architecture for better maintainability, scalability, and readability.

    Project Structure
    The project is organized into logical directories within the src/ folder:

    src/api/: Contains functions for interacting with the FakeStoreAPI. This centralizes all API calls.

    src/components/: Houses reusable UI components (e.g., ProductCard, SearchBar, CartItem, Header).

    src/navigation/: Defines the app's navigation stack using React Navigation.

    src/screens/: Holds the main screens of the application (ProductListScreen, ProductDetailScreen, CartScreen).

    src/store/: Contains the Zustand store definition for managing global application state, specifically the cart.

    src/types/: (If using TypeScript) Defines interfaces for data structures like Product and CartItem for type safety.

    App.tsx: The root component that sets up the navigation.