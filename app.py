from flask import Flask, render_template, request, jsonify
import pyotp
import time

app = Flask(__name__)

# Hardcoded token (same as in your scripts)
SECRET_TOKEN = "A3DH2B26SS4DNUW23NSU44NS2NS6B332"

def generate_totp(token, interval=30):
    totp = pyotp.TOTP(token, interval=interval)
    return totp.now(), int(time.time() % interval)

def validate_totp(token, user_input):
    totp = pyotp.TOTP(token)
    return totp.verify(user_input)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate')
def generate():
    return render_template('generate.html')

@app.route('/api/generate', methods=['GET'])
def api_generate():
    code, time_left = generate_totp(SECRET_TOKEN)
    return jsonify({'code': code, 'time_left': time_left})

@app.route('/validate')
def validate():
    return render_template('validate.html')

@app.route('/api/validate', methods=['POST'])
def api_validate():
    user_input = request.form.get('code')
    if not user_input or not user_input.isdigit():
        return jsonify({'success': False, 'message': 'Invalid input. Enter a numerical code.'})
    is_valid = validate_totp(SECRET_TOKEN, user_input)
    return jsonify({
        'success': is_valid,
        'message': 'TOTP code is valid' if is_valid else 'TOTP code is invalid'
    })

if __name__ == '__main__':
    app.run(debug=True)