# Django-React-JWT

This project demonstrates how to implement user authentication in Django with communication to frontend technologies like React using JSON Web Tokens (JWT).

# Getting Started
## Clone the Repository

```bash
git clone https://github.com/sinasezza/django-react-jwt.git
cd django-react-jwt
```

# Setup
##### Prerequisites

Make sure you have Python and Node.js installed on your system.


## Install Dependencies

Install pipenv if you haven't already:

```bash
pip install pipenv
```

Set up the Python environment and install Python dependencies:

```bash
pipenv shell
pipenv install
```

## Configure Frontend Settings
### Install or Update Dependencies

To install or update frontend dependencies, use the provided management command:

Install dependencies:

```bash
pipenv run python manage.py npm install
```

Update dependencies:

```bash
pipenv run python manage.py npm update
```

### Run the Frontend Server

To run the frontend server for development:

```bash
pipenv run python manage.py npm start
```

### Build the Frontend for Production

To build the frontend for production:

```bash
pipenv run python manage.py npm build
```

### Serve the Production Build

To serve the production build of the frontend:

```bash
pipenv run python manage.py npm serve
```

## Start the Django HTTP Server

Apply migrations:

```bash
pipenv run python manage.py makemigrations
pipenv run python manage.py migrate
```

Run the Django development server:

```bash
pipenv run python manage.py runserver
```