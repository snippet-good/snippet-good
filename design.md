## Design

### Steven
- Login authentication
- Find out how the hell to get this code editor to work
- Update database models and seed data

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
   - The admin can change the status of an ``scheduled`` stretch into an ``open`` stretch.

- Need a ``CohortStretch`` reducer for this functionality
<br/>

When an admin clicks on the ``New Stretch`` button:
### Kevin
   1. The admin is able to view all pre-existing stretches.
	   - Add the selected stretch to ``StretchCohort`` model
   2. The admin is able to create test cases for the stretch.
   3. The admin is able to create a new stretch using a new Stretch form.
	   - The new Stretch form will have a code and text editor (Quill.js).
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
<br/>

After a stretch is completed:
- The status of the stretch changes from ``open`` to ``closed``.
- The admin is able to live-code the solution and users being able to watch the admin solve the stretch.
	- If the admin
- The admin is able to view a report of how well the cohort did for the particular stretch.
- The user is able to view if they passed or not.


***

#### Proposals:
- Admins have a calendar UI.
- Admin is able to set a time for when the stretch will automatically open.
- Ability for user to favorite ``Snippet`` solutions
- Admin is able to test solution code when creating a new stretch from an existing stretch
- Have a field in ``Stretch`` model that indicates whether the stretch requires a coded answer or another type of answer