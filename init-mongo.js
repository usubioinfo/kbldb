db = connect("mongodb://localhost:27017/kbl");
// Create collection "uptimes" if it doesn't exist
db.createCollection("uptimes");
db.createCollection("appointments");
db.createCollection("people");
db.createCollection("newsarticles");
