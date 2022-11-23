import requests
# from getpass import getpass

# auth_endpoint = 'http://localhost:8000/authtoken/'

# username = input('What is your usrename?\n')
# password = getpass('What is your password"\n')

# auth_response = requests.post(auth_endpoint, json={'username': username, 'password':password})
# print(auth_response.json())

# if auth_response.status_code == 200:
endpoint = 'http://localhost:8000/cart/'
# token = auth_response.json()['token']

# headers = {
#     'Authorization': f'Bearer {token}' 
# }

get_response = requests.get(endpoint)
print(get_response.json())