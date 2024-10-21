 ## Employee Management App
This is a simple React-based application for managing employee records. It allows users to register new employees, edit existing employee information, delete employees, and search through the employee list. The app uses Axios to interact with a JSON server for backend data management.

## Features
Employee Registration: Add new employees with details like first name, last name, ID, position, phone number, email, and avatar.
Edit Employee: Update existing employee details.
Delete Employee: Remove an employee from the list.
Search Functionality: Search employees based on any field.
Data Persistence: Uses Axios for HTTP requests to interact with a JSON server.
## Tech Stack
Frontend: React.js, JavaScript, CSS
Backend: JSON Server (as a mock REST API)
HTTP Client: Axios
Prerequisites
Before running the app, ensure you have the following installed:

Node.js
npm or yarn
JSON Server
Getting Started
1. Clone the repository:
bash
Copy code
git clone https://github.com/your-username/employee-management-app.git
cd employee-management-app
2. Install dependencies:
bash
Copy code
npm install
or with yarn:

bash
Copy code
yarn install
3. Start the JSON Server:
Create a file named db.json with the following content to set up a basic JSON Server backend:

json
Copy code
{
  "employees": []
}
Run the JSON Server on port 5000:

bash
Copy code
npx json-server --watch db.json --port 5000
4. Start the React app:
bash
Copy code
npm start
or with yarn:

bash
Copy code
yarn start
The app will be available at http://localhost:3000.

App Structure
App.js: The main component that contains the form for adding and editing employees, the search bar, and the list of employees.
App.css: The styling for the app.
db.json: The JSON file used by JSON Server to store employee data.
Available Scripts
In the project directory, you can run:

npm start: Starts the development server.
npm run build: Builds the app for production.
npx json-server --watch db.json --port 5000: Starts the JSON Server on port 5000.
Functionality Details
1. Employee Registration
Users can fill out the form to register a new employee.
Fields include first name, last name, ID (13 digits), position, phone number (10 digits), email, and avatar (image upload).
Validations:
First and last names must be at least 2 letters and only contain letters.
ID must be 13 digits.
Phone number must be 10 digits.
2. Edit Employee
Users can edit any registered employee's details.
Clicking the "Edit" button populates the form with the selected employee's details for modification.
3. Delete Employee
Users can remove an employee by clicking the "Remove" button.
Confirmation ensures that the deletion is intentional.
4. Search Functionality
Users can search for employees by typing in the search bar.
The search filters the employee list in real-time based on any field.
5. Data Persistence
Employee data is fetched from and saved to the JSON server using Axios.
Known Issues
Uploaded avatar images are only stored locally and may not persist on a real backend.
Future Enhancements
Add user authentication for secured access.
Implement form validation with libraries like Formik or Yup.
Enhance the UI with more advanced styling and animations.
Add pagination for large employee lists.
License
This project is licensed under the MIT License. See the LICENSE file for details.