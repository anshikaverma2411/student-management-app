# Student Management App

A CRUD application for managing student information, built with Next.js and MongoDB.

## Features

- Create, Read, Update, and Delete (CRUD) operations for student records
- MongoDB integration for data persistence
- Search functionality based on student names
- Responsive user interface

## Development Journey

1. **Basic CRUD Implementation**
   - Created initial application with simple student schema (name and brief detail)
   - Implemented Add and Edit functionalities
   - Tested successfully through browser interface and Postman

2. **Extended Functionality**
   - Added Delete feature to remove student records
   - Implemented Get feature to fetch student details

3. **Schema Enhancement**
   - Updated database schema to include more comprehensive student details
   - Modified Add Student and Update Student forms to accommodate new schema

4. **UI Updates**
   - Redesigned Add Student and Update Student forms
   - Note: After UI updates, Add and Update functionalities encountered issues in the browser interface (still functional via Postman)
   - Delete functionality remains operational in the browser

5. **Search Feature**
   - Implemented search functionality based on student names

## Current Status

- Add Student and Update Student operations are functional via Postman but encountering issues in the browser interface
- Delete operation is working correctly in both browser and Postman
- Get and Search functionalities are operational

## Data Format

To add or update a student record via Postman, use the following JSON format in a post request on the url `http://localhost:3000/api/students`

```json
{
  "fullName": "Anshika",
  "dateOfBirth": "2002-11-24",
  "Class": "12th Grade",
  "subjects": [
    {
      "name": "Mathematics",
      "marks": 95
    },
    {
      "name": "Physics",
      "marks": 85
    },
    {
      "name": "Chemistry",
      "marks": 90
    }
  ],
  "percentage": 90,
  "grade": "A+"
}
