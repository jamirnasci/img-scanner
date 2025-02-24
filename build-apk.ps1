ionic build
ionic capacitor sync android
cd android
.\gradlew clean
.\gradlew assembleDebug
adb install .\app\build\outputs\apk\debug\app-debug.apk
cd ..
