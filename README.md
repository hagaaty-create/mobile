# TechVault Mobiles - Release Instructions

Congratulations! Your Android App Bundle (.aab) has been successfully built.

## How to download your build
1. Go to the **Actions** tab in this repository.
2. Click on the latest successful workflow run.
3. Scroll down to the **Artifacts** section.
4. Click on `app-release` to download the zip file.
5. Extract the zip to get your `app-release.aab` file.

## How to upload to Google Play Store
1. Log in to your [Google Play Console](https://play.google.com/console).
2. Select your app or create a new one.
3. Navigate to **Release > Production**.
4. Click **Create new release**.
5. Upload the `.aab` file you downloaded.
6. Follow the on-screen instructions to complete the store listing and rollout.

## App Signing
This build is a standard release bundle. If you haven't configured a Keystore yet, Google Play App Signing will handle the distribution key for you upon the first upload.

---
Built with Firebase Studio.