const model = require('../models/user.model')
const fs = require('fs').promises
const axios = require('axios')

const getFilters = (req, res) => {
    try {
        require('fs').readFile("./categories.json", function (err, data) {
            if (err) {
                console.log(err)
                return res.status(401).json("Can't get filters")
            }
            return res.status(200).json(JSON.parse(data))
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json("Error")
    }
}

const getData = async (req, res) => {
    try {
        const { name } = req.body;
        const data = await model.findOne({ "name": name })
        console.log(data)
        if (data) return res.status(200).json(data)
        else return res.status(401).json("Error")
    } catch (err) {
        console.log(err)
        return res.status(400).json("Error")
    }
}

const saveEmail = async (req, res) => {
    try {
        const { name, email } = req.body;
        const data = await model.findOneAndUpdate({ "name": name }, { "email": email }, { new: true })
        console.log(data)
        return res.status(200).json("Success")
    } catch (err) {
        console.log(err)
        return res.status(400).json("Error")
    }
}

const recommend = async (req, res) => {
    try {
        const { name, query } = req.body;

        // Find user by name
        const user = await model.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prepare request payload
        const payload = {
            query,
            user_history: user.history || [],
        };

        try {
            // Send recommendation request
            const response = await axios.post("http://localhost:5000/recommend", payload);

            // Check if the query already exists in history
            const exists = user.history.some(item => item.title === query);
            if (!exists) {
                user.history.push({ title: query });
                await user.save(); // Update MongoDB
            }

            // Read dataset.json asynchronously
            const data = await fs.readFile("./dataset.json", "utf-8");
            const dataset = JSON.parse(data);

            // Extract recommended IDs from response
            const recommendedIds = response.data.recommended_titles.map(paper => paper.id);

            // Filter dataset for matching papers
            const recommendedPapers = dataset
                .filter(paper => recommendedIds.includes(paper.id))
                .reduce((unique, paper) => {
                    if (!unique.some(p => p.id === paper.id)) {
                        unique.push(paper);
                    }
                    return unique;
                }, []);

            return res.status(200).json({ message: "Success", recommendation: recommendedPapers });
        } catch (err) {
            console.error("Axios Error:", err.message);
            return res.status(500).json({ message: "Recommendation service error" });
        }

    } catch (err) {
        console.error("Server Error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { getFilters, getData, saveEmail, recommend }