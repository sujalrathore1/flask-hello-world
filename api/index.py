from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Utility function to check if a number is prime
def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

# Route to serve the frontend
@app.route('/')
def home():
    return render_template('index.html')

# Route for handling the API request
@app.route('/bfhl', methods=['POST'])
def bfhl():
    try:
        data = request.json
        input_data = data.get("data", [])

        # Separate numbers and alphabets
        numbers = [item for item in input_data if item.isdigit()]
        alphabets = [item for item in input_data if item.isalpha()]

        # Check if any numbers are prime
        primes_found = any(is_prime(int(num)) for num in numbers)

        # Response structure
        response = {
            "is_success": True,
            "user_id": "Sujal_Rathore_18092003",  # Replace with your details
            "email": "sujalrathore71@gmail.com",
            "roll_number": "2110DMTCSE10169",
            "numbers": numbers,
            "alphabets": alphabets,
            "is_prime_found": primes_found,
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 400


if __name__ == '__main__':
    app.run()
