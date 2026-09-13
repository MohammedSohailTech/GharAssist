import Contact from "../models/Contact.js";


// Create a new contact
export const createContact = async (req, res) => {

    try {

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            message
        });

        res.status(201).json({
            message: "Contact submitted successfully",
            contact
        });

    } catch (error) {
    res.status(500).json({
        message: "Server error",
        error: error.message
    });
}
};

// Get all contacts
export const getAllContacts = async (req,res)=>{
    try {
        const contacts = await Contact.find()
        if(contacts.length === 0){
           return res.status(404).json({
                message:"No contact founnd"
            })
        }
        res.status(200).json({
            message:"All contacts fetched....",contacts
        })


    } catch (error) {
         res.status(500).json({ message: "Server error" })
    }
}

// Get a single contact by ID
export const getContactById = async (req,res)=>{
    try {
        const {id} = req.params;
        const contact = await Contact.findById(id)
        if(!contact){
         return   res.status(404).json({
                message:"No data found"
            })
        }
        res.status(200).json({
            message:"Contact Fetched",contact
        })
    } catch (error) {
          res.status(500).json({ message: "Server error" })
    }
}

//delete a contact by ID
export const deleteContactById = async (req,res)=>{
    try {
        const {id} = req.params;
        const contact = await Contact.findByIdAndDelete(id)
        if(!contact){
             return res.status(404).json({
                message:"NO data found"
            })
        }
        res.status(200).json({
            message:"Contact deleted successfuly.."
        })
    } catch (error) {
         res.status(500).json({ message: "Server error" })
    }
}