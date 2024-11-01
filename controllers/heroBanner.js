class ControllerHeroBanner {
 static async createHeroBanner(req, res) {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
 }
}

module.exports = ControllerHeroBanner;