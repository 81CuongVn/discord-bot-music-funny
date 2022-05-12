import express from "express"
export const webPageCheck = () => {
    const app = express()
    app.get("/", (req, res) => {
        res.send("Hello World!")
    }
    )
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}!`);
    });
}