import db from "../Database/index.js";

function ModuleRoutes(app) {
    // Route that handles an HTTP PUT request with the module's ID embedded in the path and that updates in the HTTP body.
    // Parse the module's ID from the request parameters, find the module in the database, and then update corresponding module
    // with values in the request body.
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex((m) => m._id === mid);
        db.modules[moduleIndex] = {...db.modules[moduleIndex], ...req.body};
        if (!db.modules) {
            res.status(404).json({ message: `Unable to update Module with ID ${id}` });
        }
        res.sendStatus(204);
    });

    // Route that handles an HTTP DELETE method with the module's ID embedded in the URL.
    // mid request parameter is used to filter out the module from the modules array in the database.
    // Respond with a 200 status signifying success.
    // Return a 404 if the module is not found.
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        db.modules = db.modules.filter((m) => m._id !== mid);
        if (!db.modules) {
            res.status(404).json({ message: `Unable to delete Module with ID ${id}` });
        }
        res.sendStatus(200);
    });
    
    // Route that receives a new module posted from the React.js client application embedded in the Request body.
    // Create a new module object setting its source property to the cid path parameter and push it to the db.modules array.
    // Reply to client with the newly created module.
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.modules.push(newModule);
        res.send(newModule);
    });    

    // Route that retrieves the modules for the course ID encoded in the path (cid).
    // The course ID is parsed from the path and then used to filter the modules for that course.
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules.filter((m) => m.course === cid);
        res.send(modules);
    });
}
export default ModuleRoutes;