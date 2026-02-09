require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

app.get("/", (req, res) => {
    res.send("Backend is running");
});


app.post("/generate-description", async (req, res) => {

    try {

        const { productName, features } = req.body;

        const prompt = `
Write a professional ecommerce product description.

Product Name: ${productName}
Features: ${features}
`;

        const response = await openai.chat.completions.create({

            model: "openai/gpt-4o-mini",

            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],

        });

        res.json({
            success: true,
            description: response.choices[0].message.content,
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error generating description",
        });

    }

});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
