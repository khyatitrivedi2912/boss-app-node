const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const FormData = require("form-data");
const fs = require("fs");

const app = express();
// app.use(cors());
app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());




// GET Users
app.get("/api/users", async (req, res) => {
    try {
        const response = await axios.get(
            "https://postkiyaapp.shivanshastrology.in/newproject/public/api/users"
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error fetching users",
            error: error.response?.data || error.message
        });
    }
});


// POST Register
const axios = require("axios");

app.post("/api/register", async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            mobile,
            email,
            password,
            current_location,
            native_location
        } = req.body;

        const response = await axios.post(
            "https://postkiyaapp.shivanshastrology.in/newproject/api/auth/signup.php",
            {
                first_name: first_name,
                last_name: last_name,
                mobile: mobile,
                email: email,
                password: password,
                current_location: current_location,
                native_location: native_location
            }
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error calling Laravel API",
            error: error.response?.data || error.message
        });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const response = await axios.post(
            "https://postkiyaapp.shivanshastrology.in/newproject/api/auth/login.php",
            {
                email: email,
                password: password
            }
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error calling Laravel API",
            error: error.response?.data || error.message
        });
    }
});

app.post("/api/address-update", async (req, res) => {
    try {
        const {
            id,
            email,
            latitude,
            longitude,
            current_location,
            native_location
        } = req.body;

        const response = await axios.post(
            "https://postkiyaapp.shivanshastrology.in/newproject/api/auth/address_update.php",
            {
                id: id,
                email:email,
                latitude: latitude,
                longitude: longitude,
                current_location: current_location,
                native_location: native_location
            }
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error calling Laravel API",
            error: error.response?.data || error.message
        });
    }
});

// app.post("/api/edit-profile", async (req, res) => {
//     try {
//         const {
//             id,
//             first_name,
//             last_name,
//             mobile,
//             email,
//             profile_image
//         } = req.body;

//         const response = await axios.post(
//             "https://postkiyaapp.shivanshastrology.in/newproject/api/auth/edit_profile.php",
//             {
//                 id: id,
//                 first_name: first_name,
//                 last_name: last_name,
//                 mobile: mobile,
//                 email: email,
//                 profile_image: profile_image
//             }
//         );

//         res.status(response.status).json(response.data);

//     } catch (error) {
//         res.status(error.response?.status || 500).json({
//             message: "Error calling Laravel API",
//             error: error.response?.data || error.message
//         });
//     }
// });
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

app.post("/api/edit-profile", upload.single("profile_image"), async (req, res) => {
    try {

        const form = new FormData();

        form.append("id", req.body.id);
        form.append("first_name", req.body.first_name);
        form.append("last_name", req.body.last_name);
        form.append("mobile", req.body.mobile);
        form.append("email", req.body.email);

        if (req.file) {
            form.append("profile_image", fs.createReadStream(req.file.path));
        }

        const response = await axios.post(
            "https://postkiyaapp.shivanshastrology.in/newproject/api/auth/edit_profile.php",
            form,
            { headers: form.getHeaders() }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            message: "Error calling PHP API",
            error: error.message
        });

    }
});
// GET Categories
app.get("/api/categories", async (req, res) => {
    try {
        const response = await axios.get(
            "https://postkiyaapp.shivanshastrology.in/newproject/api/categories/list.php"
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error fetching users",
            error: error.response?.data || error.message
        });
    }
});

// GET Categories
app.get("/api/sub-categories", async (req, res) => {
    try {
        const response = await axios.get(
            "https://postkiyaapp.shivanshastrology.in/newproject/api/subcategories/list.php"
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error fetching users",
            error: error.response?.data || error.message
        });
    }
});

app.get("/api/forgot-password", async (req, res) => {
    try {

        const { email } = req.query;

        const response = await axios.get(
            "https://postkiyaapp.shivanshastrology.in/newproject/api/auth/forgot_password.php",
            {
                params: {
                    email: email
                }
            }
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error calling PHP API",
            error: error.response?.data || error.message
        });
    }
});

app.get("/api/products-list", async (req, res) => {
    try {
        // Get params from frontend
        const { category_id, subcategory_id } = req.query;

        // Validate (both required)
        // if (!category_id || !subcategory_id) {
        //     return res.status(400).json({
        //         status: false,
        //         message: "category_id and subcategory_id are required"
        //     });
        // }

        // Call PHP API with params
        const response = await axios.get(
            "https://postkiyaapp.shivanshastrology.in/newproject/api/products/list.php",
            {
                params: {
                    category_id,
                    subcategory_id
                }
            }
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error fetching products",
            error: error.response?.data || error.message
        });
    }
});
app.post("/api/add-product", upload.single("main_image"), async (req, res) => {
    try {

        const form = new FormData();

        // Basic fields
        form.append("user_id", req.body.user_id);
        form.append("category_id", req.body.category_id);
        form.append("subcategory_id", req.body.subcategory_id);
        form.append("title", req.body.title);
        form.append("description", req.body.description);
        form.append("price", req.body.price);
        form.append("stock", req.body.stock);

        // Image
        if (req.file) {
            form.append("main_image", fs.createReadStream(req.file.path));
        }

        // Attributes (IMPORTANT 🔥)
        if (req.body.attributes) {
            form.append("attributes", req.body.attributes); 
            // send as JSON string
        }

        // Call PHP API
        const response = await axios.post(
            "https://postkiyaapp.shivanshastrology.in/newproject/api/products/add.php",
            form,
            { headers: form.getHeaders() }
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({
            message: "Error calling PHP API",
            error: error.response?.data || error.message
        });
    }
});
app.post("/api/check-user-status", async (req, res) => {
    try {
        const { email } = req.body;

        const response = await axios.post(
            "https://postkiyaapp.shivanshastrology.in/newproject/api/auth/check_user_status.php",
            {
                email: email
            }
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error calling PHP API",
            error: error.response?.data || error.message
        });
    }
});
app.listen(5000, "0.0.0.0", () => {
    console.log("Server running");

});



















