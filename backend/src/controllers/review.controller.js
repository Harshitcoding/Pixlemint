import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



exports.review = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            res.status(400).json({ message: "code is not given yet" })
        }

        const model = genAi.getGenerativeModel({
            model: 'gemini-1.5-flash',
        })

        const result = await model.generateContent(
            `Review the following code and provide improvements
            ${code}
            `
        )
        const reviewTest = result.response.text()

        return res.json({ review: reviewTest })



    } catch (error) {
        console.error("Review error:", error);
        return res.status(500).json({ message: "AI Review failed" });
    }

}