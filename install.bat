@echo off
echo ========================================
echo IoT Hydration Dashboard - Setup
echo ========================================
echo.

echo Checking Node.js version...
node --version
echo.

echo Checking npm version...
npm --version
echo.

echo ========================================
echo Installing dependencies...
echo This may take a few minutes...
echo ========================================
echo.

npm install

echo.
echo ========================================
echo Installation complete!
echo ========================================
echo.
echo To start the development server, run:
echo     npm run dev
echo.
echo Then open: http://localhost:5173
echo.
pause
