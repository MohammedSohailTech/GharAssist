import express from "express";
import { createContact, getAllContacts, getContactById, deleteContactById } from "../controllers/contactController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// @api routes
// @api desc :- Create contact
// @api method :- POST
// @api endpoint :- /api/contacts/create

router.post("/create", createContact);


// @api desc :- Get all contacts
// @api method :- GET
// @api endpoint :- /api/contacts/

router.get("/", authMiddleware, adminMiddleware, getAllContacts);

// @api desc :- Get a contact byId
// @api method :- GET
// @api endpoint :- /api/contacts/:id
router.get("/:id", authMiddleware, adminMiddleware, getContactById)

// @api desc :- Delete a contact byId
// @api method :- DELETE
// @api endpoint :- /api/contacts/:id
router.delete("/:id", authMiddleware, adminMiddleware, deleteContactById)

export default router;