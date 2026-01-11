import secrets
import base64
import string
import random

def generate_django_secret_key():
    """Generate a secure Django secret key."""
    return ''.join(secrets.choice(string.ascii_letters + string.digits + string.punctuation) for _ in range(50))

def generate_jwt_secret_key():
    """Generate a secure JWT secret key."""
    return base64.b64encode(secrets.token_bytes(32)).decode('utf-8')

def generate_secure_password(length=32):
    """Generate a secure password."""
    alphabet = string.ascii_letters + string.digits + string.punctuation
    return ''.join(secrets.choice(alphabet) for _ in range(length))

if __name__ == "__main__":
    print("\n=== Secure Keys Generation ===\n")
    
    print("1. Django Secret Key:")
    print(generate_django_secret_key())
    print("\n2. JWT Secret Key:")
    print(generate_jwt_secret_key())
    print("\n3. Secure Password (32 chars):")
    print(generate_secure_password())
    print("\n4. Secure Password (64 chars):")
    print(generate_secure_password(64))
    print("\n=== End of Generation ===\n") 