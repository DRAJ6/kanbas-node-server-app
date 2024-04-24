import * as dao from "./dao.js";

function ModuleRoutes(app) {
    // Route that retrieves the modules for the course ID encoded in the path (cid).
    // The course ID is parsed from the path and then used to filter the modules for that course.
    const findModulesForCourse = async (req, res) => {
        try {
            const courseId = req.params.cid;
            if (!courseId) {
                return res.status(400).json({ error: "Course id is required" });
            }

            const modules = await dao.findModulesForCourse(courseId);
            res.status(200).json( {modules} );
        } catch (e) {
            console.log("Error getting all the modules: " + e);
            res.status(400).send("Error getting all the modules");
        }
    };

    const findModuleById = async (req, res) => {
        try {
            const moduleId = req.params.moduleId;
            if (!moduleId) {
                return res.status(400).json({ error: "Module id is required" });
            }

            const module = await dao.findModuleById(moduleId);
            if (!module) {
                return res.status(404).json({ error: "Module not found" });
            }
            res.status(200).json({ module });
        } catch (e) {
            console.log("Error getting a module: " + e);
            res.status(400).send("Error getting a module");
        }
    };

    // Route that receives a new module posted from the React.js client application embedded in the Request body.
    // Create a new module object setting its source property to the cid path parameter and push it to the db.modules array.
    // Reply to client with the newly created module.
    const createModule = async (req, res) => {
        console.log("in createModule routes.js");
        const module = req.body;
        // Get rid of id, to avoid error.
        delete module._id;
        console.log("module = " + JSON.stringify(module));
        const newModule = await dao.createModule(module);
        console.log("newModule = " + JSON.stringify(newModule));
        res.send(newModule);
    };

    // Route that handles an HTTP PUT request with the module's ID embedded in the path and that updates in the HTTP body.
    // Parse the module's ID from the request parameters, find the module in the database, and then update corresponding module
    // with values in the request body.
    const updateModule = async (req, res) => {
        try {
            const mid = req.params.mid;
            if (!mid) {
                return res.status(400).json({ error: "Module id is required" });
            }
    
            const module = req.body;
            if (!module) {
                return res.status(400).json({ error: "Updated module data is required" });
            }
            // Get rid of id, to avoid error.
            delete module._id;
    
            const status = await dao.updateModule(mid, module);
            res.json(status);
        } catch (e) {
            console.log("Error updating a module: " + e);
            res.status(400).send("Error updating module");
        }
    };

    // Route that handles an HTTP DELETE method with the module's ID embedded in the URL.
    // mid request parameter is used to filter out the module from the modules array in the database.
    // Respond with a 200 status signifying success.
    // Return a 404 if the module is not found.
    const deleteModule = async (req, res) => {
        try {
            const mid = req.params.mid;
            if (!mid) {
                return res.status(400).json({ error: "Module id is required" });
            }

            const status = await dao.deleteModule(mid);
            res.send(status);
        } catch (e) {
            console.log("Error deleting a module: " + e);
            res.status(400).send("Error deleting module");
        }
    };
    
    app.get("/api/courses/:cid/modules", findModulesForCourse);
    app.get("/api/courses/:cid/modules/:moduleId", findModuleById)
    app.post("/api/courses/:cid/modules", createModule);  
    app.put("/api/modules/:mid", updateModule);
    app.delete("/api/modules/:mid", deleteModule);
}
export default ModuleRoutes;