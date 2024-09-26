from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS for the app
CORS(app)  # You can also pass specific configurations to CORS


# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///waste_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# Define the waste entry model
class WasteEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    waste_type = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'waste_type': self.waste_type,
            'quantity': self.quantity,
            'location': self.location
        }

# Create the database tables
with app.app_context():
    db.create_all()

# Define API routes
@app.route('/hello_world', methods=['GET'])
def hello_world():
    message = "Hello Waste Warriors"
    return jsonify(message)

@app.route('/waste', methods=['GET'])
def get_waste_entries():
    entries = WasteEntry.query.all()
    return jsonify([entry.to_dict() for entry in entries])

@app.route('/waste', methods=['POST'])
def add_waste_entry():
    data = request.json
    print(data)
    new_entry = WasteEntry(
        waste_type=data['waste_type'],
        quantity=data['quantity'],
        location=data['location']
    )
    db.session.add(new_entry)
    db.session.commit()
    return jsonify(new_entry.to_dict()), 201

# New endpoint to get a specific waste entry by its ID
@app.route('/waste/<int:id>', methods=['GET'])
def get_waste_entry(id):
    entry = WasteEntry.query.get(id)
    if not entry:
        return abort(404, description="Waste entry not found")
    return jsonify(entry.to_dict())

if __name__ == '__main__':
    app.run(debug=True)
