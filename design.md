
# Design

### Steven

- Login authentication
- Find out how the hell to get this code editor to work
- Update database models and seed data

***
### Shared Components
- Text prompt with code editor for a stretch

***
### Functionality


#### Admins can:

- Create, read, update, and delete a stretch

- Add a user to a cohort

- Add a new cohort

- Leave a comment on a user stretch answer



Stretch Workflow:

1. Admin creates a new stretch

2. Scheduled Stretch

3. Open Stretch

4. Students work on open stretch

5. Stretch is completed



When an admin clicks on ``My Stretches`` tab:

### Dan

- The admin is able to view all ``open``, ``scheduled``, and ``closed`` stretches.
	- Shared components
		- category
		- difficulty
		-  prompts _(code and text)_
		- solution for the particular stretch
	- ``Closed`` view
		- Stats about how each student did _(pass/fail?)_, time completed?
	- ``Scheduled`` view
		- Scheduled date
		- Ability to edit the solution or date ???
		- Ability to delete stretch
		- Ability to change the status to ``open``
	- ``Open`` view
		- Redirects to the "room" where the stretch is being solved
		- Ability to see how much time is left
		- Number of students that solved the stretch

- Need a ``CohortStretch`` reducer for this functionality

<br/>



When an admin clicks on the ``New Stretch`` button:

### Kevin

1. The admin is able to view all pre-existing stretches.

	- Add the selected stretch to ``StretchCohort`` model
		- Admin is able to view all solutions for the particular stretch and choose the one they would like to present to their cohort.

3. The admin is able to create a new stretch using a new Stretch form.

	- The new Stretch form will have:
		- text editor for the code prompt _(Quill.js)_
		- a code editor for the code prompt
		- another code editor for their solution to the stretch

	- The stretch will be assigned to cohort(s).

- Once the stretch is created successfully, the stretch will have the status of ``scheduled``.

<br/>



When a stretch is opened:

- All users in the cohort are notified that the stretch is opened.

- Users, or students, are able to accept the invitation to solve the stretch.

- The user is redirected to a page that displays:

- the stretch's prompt

- a code editor

- The admin has a ``Disable/Enable Code`` toggle, which either allows or prohibits students from running code.

- Users have a ``Submit`` button.

- The stretch displays a timer.

- Once the timer is up, all user functionality is disabled and user's solution is automatically submitted.

<br/>



While the stretch is being completed:

- The admin can see how many students passed the test cases for the stretch.

- The admin's view has all of the students' code editors
<br/>



After a stretch is completed:

- The status of the stretch changes from ``open`` to ``closed``.

- The admin is prompted with a dialog box: _"Would you like to live-code the solution?"_
	- If yes, then the admin is able to live-code the solution and users being able to watch the admin solve the stretch.
	- If no, the picked solution is loaded on the code editor.

- **The admin is able to live-code the solution and override their pre-existing solution if they choose.**

- The admin is able to view a report of how well the cohort did for the particular stretch.

- The user is able to view if they passed or not.

***
When a student clicks on ``My Past Stretches`` tab:
- The application lists all of the past completed stretches
- Visualization component that displays meta data of all completed stretches
	- Average time it took to complete a stretch
	- Average lines of code???
<br/>
- A student can click on an individual stretch to view:
	- When they completed the stretch
	- The cohort, professor, other meta data
	- The amount of time it took to complete the stretch
	- Ability to favorite the stretch and add it to their favorites list


***



#### Proposals:

- Admins have a calendar UI.

- Admin is able to set a time for when the stretch will automatically open.

- Ability for user to favorite ``Snippet`` solutions

- Admin is able to test solution code when creating a new stretch from an existing stretch

- Have a field in ``Stretch`` model that indicates whether the stretch requires a coded answer or another type of answer

- The admin is able to create test cases for the stretch.

***

### Stage 0
- Have replays for each student's solution