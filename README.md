# App

GymPass-style app.

## Functional Requirements

- [x] It should be possible to sign up;
- [x] It should be possible to authenticate;
- [x] It should be possible to obtain the user profile;
- [x] It should be possible to obtain the amount of check-ins by the logged user;
- [x] It should be possible for the user to obtain their check-in history;
- [x] It should be possible for the user to search for the nearest gyms (up to 10km);
- [x] It should be possible for the user to find gyms by name;
- [x] It should be possible for the user to check into a gym;
- [x] It should be possible to validate a user check-in;
- [x] It should be possible to register a gym;

## Business Rules

- [x] The user must not be able to sign up with an existing e-mail;
- [x] The user must not be able to check-in twice per day;
- [x] The user must not be able to check-in if he is too far (100m+) from the gym;
- [x] The check-in can only be validated within 20 minutes of creation;
- [x] The check-in can only be validated by admins;
- [x] The gym can only be registered by admins

## Non-functional Requirements

- [x] The user password must be stored encrypted;
- [x] The application data must must be stored in a PostgreSQL database;
- [x] Every list of data must be paginated with 20 results per page;
- [x] The user must be identified by a JWT (JSON Web Token);