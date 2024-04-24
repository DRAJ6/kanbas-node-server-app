import * as dao from "./dao.js";
import * as enrollmentsDao from "../enrollments/dao.js";
import * as coursesDao from "../courses/dao.js";
import { v4 as uuidv4 } from 'uuid';


export default function UserRoutes(app) {
    // Fetch users for grades based on enrollments.
    const fetchUsersForGrades = async (req, res) => {
        try {
            // Find enrollments for the given course.
            const cid = req.params.cid;
            const enrollments = await enrollmentsDao.findEnrollmentsForCourse(cid);

            // Extract user ids from enrollments.
            const userIds = enrollments.map(enrollment => enrollment.user);

            // Find users based on user id.
            const users = await dao.fetchUsersForGrades(userIds);
            res.json(users);
        } catch (e) {
            console.log("Error fetching users for grades: " + e);
            res.status(400).send("Error fetching users for grades");
        }
    };

    const findAllUsers = async (req, res) => {
        try {        
            // Check to make sure not just anyone can access all users.
            const currentUser = req.session["currentUser"];
            console.log("findAllUseres. currentUser = " + JSON.stringify(currentUser));
            if (!currentUser || currentUser.role !== "ADMIN") {
                console.log("!currentUser'");
                res.status(401).send("Unauthorized");
                return;
            }

            // Parse the role from the query string, 
            // and then users the DAO to retrieve users
            // with that particular role.
            const { role } = req.query;
            console.log("Filter ROLE = " + role);
            if (role) {
                const users = await dao.findUsersByRole(role);
                res.json(users);
                return;
            }
    
            const users = await dao.findAllUsers();
            res.json(users);
            return;
        } catch (e) {
            console.log("Error getting all the users: " + e);
            res.status(400).send("Error getting all the users");
        }
    };

    const findUserById = async (req, res) => { 
        try {
            const userId = req.params.userId;
            const user = await dao.findUserById(userId);
            res.send(user);
        } catch (e) {
            console.log("Error getting a user: " + e);
            res.status(400).send("Error getting a user");
        }
    };

    const createUser = async (req, res) => { 
        try {
            const user = req.body;
            // Get rid of id, to avoid error.
            delete user._id;
            console.log("user to create = " + JSON.stringify(user));
            const newUser = await dao.createUser(user);
            res.json(newUser);
        } catch (e) {
            console.log("Error adding user: " + e);
            res.status(400).send("Error adding user");
        }
    };

    const updateUser = async (req, res) => { 
        try {
            const id = req.params.id;
            console.log("updateUser. id = " + id);
            console.log("updateUser. typeof(id) = " + typeof(id));
            const user = req.body;
            console.log("user = " + JSON.stringify(user));
            // Get rid of id, to avoid error.
            delete user._id;

            const currentUser = req.session["currentUser"];
            console.log("currentUser = " + JSON.stringify(currentUser));
            console.log("currentUser._id = " + currentUser._id);
            console.log("typeof(currentUser._id) = " + typeof(currentUser._id));
            console.log("id = " +id);
            console.log("typeof(id) = " + typeof(id));

            // Sometimes the _id comes back as an object. So this is just here as a safety precaution.
            const currentUserIDString = String(currentUser._id);
    
            // If the current user is logged in and has updated their profile,
            // update the current user information. 
            // Only update the current user
            // if it is the user. If the user is an Admin and is updating some other
            // user, do not switch current user.
            if (currentUserIDString.localeCompare(id) == 0) {
                console.log("in if (currentUserIDString.localeCompare(id) == 0) . user = " + JSON.stringify(user));
                req.session["currentUser"] = { ...user, _id: currentUser._id };
                console.log("in if (currentUserIDString.localeCompare(id) == 0) . req.session.currentUser = " + JSON.stringify(req.session.currentUser));
            }
    
            const status = await dao.updateUser(id, user);
            res.json(status);
        } catch (e) {
            console.log("Error updating a user: " + e);
            res.status(400).send("Error updating user");
        }
    };

    const deleteUser = async (req, res) => {
        try {
            const id = req.params.id;
            const status = await dao.deleteUser(id);
            res.send(status);
        } catch (e) {
            console.log("Error deleting a user: " + e);
            res.status(400).send("Error deleting user");
        }
    };

    // The register API retrieves the username and password from the request body.
    // If there's already a user with that username, then we responds with an error.
    // Otherwise we create the new user and store it in the session's currentUser 
    // property so we can remember that this new user is now the currently logged in user.
    const registerUser = async (req, res) => {
        console.log("[1] register");
        const { username, password } = req.body;
        console.log("[2] username, password", username, password);

        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already taken" });
            return;
        }

        const existingUser = await dao.findUserByCredentials(username, password);
        console.log("[3] existingUser", existingUser);

        if (existingUser) {
            res.status(400).send("User already exists");
            return;
        }
        
        try {
            const _id = uuidv4();
            const newUser = await dao.createUser({ _id, username, password });            console.log("[4] newUser", newUser);
            req.session["currentUser"] = newUser;
            console.log("[5] req.session", req.session);
            res.send(newUser);
        } catch (e) {
            console.log("Error creating user: " + e);
            res.status(400).send("Error creating user");
        }
    };

    // Profile does not use the database. It is all with the session remembering
    // from one session to the next -- who is logged in.
    // If a user has already logged in, we can retrieve the current user by using the profile API.
    const profile = async (req, res) => { 
        console.log("[6] profile");
        console.log("[7] req.session", req.session);

        if (!req.session.currentUser) {
            console.log("[8] Not logged in");
            res.status(401).send("Not logged in");
            return;
        }

        console.log("[9] req.session.currentUser", req.session.currentUser);
        res.send(req.session.currentUser);
    };

    // Does not have to do with the database.
    const logout = async (req, res) => {
        req.session.destroy();          // Logout users by destroying the session.
        res.send("Logged out");
    };

    // An existing user can identify themselves by providing their credentials as username and password. 
    // The login API below looks up the user by their credentials and responds with the user if they exist. 
    // Otherwise we respond with an error.
    const login = async (req, res) => {
        const { username, password } = req.body;
        console.log("username = " + username + ", password = " + password);
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session.currentUser = currentUser;
            console.log("req.session.currentUser = " + req.session.currentUser);
            res.send(currentUser);
        } else {
            res.status(401).send("Invalid credentials");
        }
    };

    const findUserCourses = async (req, res) => {
        const userId = req.params.userId;
        try {
            // Find all enrollments for the given user.
            const userEnrollments = await enrollmentsDao.findAllEnrollmentsForUser(userId);

            // Extract course ids from user's enrollments.
            const courseIds = userEnrollments.map(enrollment => enrollment.course);

            // Find course details for the extracted course ids.
            const userCourses = await coursesDao.findListOfCourses(courseIds);
            console.log("Found all the courses the user is enrolled in!");
            console.log("usersCourses = " + JSON.stringify(userCourses));

            res.json(userCourses);
        } catch (e) {
            console.error('Error finding user courses:', e);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    app.get("/api/courses/:cid/grades/users", fetchUsersForGrades);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.post("/api/users", createUser);
    app.put("/api/users/:id", updateUser);
    app.delete("/api/users/:id", deleteUser);
    app.post("/api/users/register", registerUser);
    app.post("/api/users/profile", profile);    
    app.post("/api/users/logout", logout);
    app.post("/api/users/login", login);
    app.get("/api/users/:userId/courses", findUserCourses);
};