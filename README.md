# Animal Shelter Adoption Interest Queue

## Project Overview

The Animal Shelter Adoption Interest Queue is a lightweight web application built for animal shelter staff. It helps staff manage adoption interest requests digitally instead of relying on paper records and spreadsheets.

The application uses HTML, CSS, and Vanilla JavaScript. It is designed to be simple, responsive, accessible, and easy to maintain.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript ES6+
- Browser localStorage
- Google Chrome for testing

## Main Features

### Adoption Request Management

- Add new adoption interest requests.
- Store applicant name, email, animal name, and animal type.
- Assign new requests the Pending status.
- Update request status to In Review or Completed.
- Update summary counts automatically.

### Search and Filtering

- Search requests by applicant name or animal name.
- Filter requests by status.
- Display a helpful message when no matching records are found.
- Clear search and filter selections when required.

### Form Validation

- All required fields must be completed.
- Applicant and animal names are limited to 80 characters.
- Email addresses are limited to 254 characters and validated.
- Animal types are restricted to Dog, Cat, Rabbit, and Other.
- Invalid fields are highlighted, and helpful error messages are displayed.
- Focus moves to the first invalid field after an unsuccessful submission.

### Data Safety and Storage

- Adoption requests are stored in the current browser using localStorage.
- Saved records are validated before they are displayed.
- Malformed or unreadable saved data is handled without crashing the application.
- Storage failures display a warning, and the application remains usable for the current session where possible.
- User-provided text is rendered using safe DOM methods such as textContent to reduce XSS risks.

### Accessibility and Responsive Design

- Semantic HTML elements and properly labeled form controls.
- Keyboard navigation with visible focus indicators.
- Accessible validation messages and status feedback.
- Responsive layouts for desktop, tablet, and mobile screens.
- Reduced-motion preferences are respected.

### Analytics Simulation

Successful request additions and status updates log the following message in the browser console.

[Analytics] User interacted with Adoption Interest Queue

This is a simulated analytics message only. It does not send network requests or applicant information to an analytics service.

## Project Structure

```text
animal-shelter-adoption-queue/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── styles.css
└── js/
    ├── app.js
    ├── storage.js
    ├── validation.js
    └── analytics.js
```

## File Responsibilities

### index.html

Contains the page structure, adoption request form, summary cards, search field, status filter, request list, and accessible feedback areas.

### css/styles.css

Contains the monochromatic design system, layout, form styling, request cards, focus indicators, validation states, and responsive breakpoints.

### js/app.js

Manages application state, form submission, request rendering, search, status filtering, status updates, and summary counts.

### js/storage.js

Handles reading and saving adoption requests through localStorage. It also handles malformed data and storage failures.

### js/validation.js

Validates applicant information, email addresses, animal types, and records loaded from local storage.

### js/analytics.js

Provides the simulated analytics console message for successful primary actions.

## How to Use the Application

1. Open the application in a web browser.
2. Enter the applicant name and email address.
3. Enter the animal name and select the animal type.
4. Select Add to Queue.
5. Search for requests or filter them by status.
6. Update request status when necessary.
7. Refresh the page to verify saved records.

## Privacy and Limitations

This is a browser-based application without a backend or shared database.

Requests are stored in the current browser and are not synchronized between devices. Browser storage is not encrypted by this application. Use fictional data during testing and follow the shelter's data-handling policies before using real applicant information.

Clearing browser data may remove saved requests.

## Testing Summary

The following checks were reported as passing during project testing.

- Initial interface and browser console
- Empty form validation
- Invalid email validation
- Valid request submission
- Search and status filtering
- Status changes and persistence after refresh
- XSS test using an HTML event-handler payload
- Malformed local storage recovery
- Responsive layout and keyboard navigation
- Analytics console message

Testing should be repeated after changes to application code.

## Lighthouse Results

The following desktop Lighthouse results were reported from Chrome testing on October 22, 2026.

| Category | Target Score | Reported Result |
|---|---|---|
| Performance | 100 out of 100 | 100 out of 100 |
| Accessibility | 100 out of 100 | 100 out of 100 |
| Best Practices | 100 out of 100 | 100 out of 100 |
| SEO | 100 out of 100 | 100 out of 100 |

These results describe the reported test run. Scores can vary depending on the browser, environment, and application changes. Run Lighthouse again after any significant code changes.

## Definition of Done

- Application runs without fatal errors.
- Form validation and error messages work correctly.
- Search and status filters return the correct results.
- Saved records remain available after a browser refresh when storage works.
- XSS test input is rendered as text rather than executable HTML.
- Keyboard navigation and responsive layouts work as expected.
- Analytics simulation logs the required message.
- No real API keys or sensitive personal information are hardcoded.
- Lighthouse results are recorded after testing the final build.

## Project Status

The project has completed the reported functional testing and desktop Lighthouse checks. Further changes should be tested before final submission.

## Ticket Information

Ticket ID: ENG-22666

Project: Adoption Interest Queue for Animal Shelter

NAME-ANKIT KUMAR

ID- PDIT-FTE-11472