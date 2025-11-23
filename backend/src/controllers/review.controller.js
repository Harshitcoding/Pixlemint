const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



exports.review = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            res.status(400).json({ message: "code is not given yet" })
        }

        const model = genAi.getGenerativeModel({
            model: 'gemini-2.5-flash',
        })

        const result = await model.generateContent(
            `You are a code optimizer. 
Whenever I give you messy, unoptimized, low-quality, badly written code, 
your response should ONLY contain:

1. The fully optimized, refactored, clean version of the code.
2. Keep the logic same unless broken.
3. Do not explain anything.
4. No bullet points, no paragraphs, no descriptions.
5. Only give me the final improved code.

If the input code has issues, fix them silently.
If naming is bad, improve names silently.
If performance is bad, optimize silently.
If structure is bad, rewrite it cleanly.

Your entire response must only be optimized code.

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