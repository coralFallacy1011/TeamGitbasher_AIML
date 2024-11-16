import http.client

host = 'jooble.org'
key = 'a0fac0ff-95d5-4117-9e14-76b2e1e903c7'

connection = http.client.HTTPConnection(host)
#request headers
headers = {"Content-type": "application/json"}
#json query
body = '{ "keywords": "software developer", "location": "India"}'
connection.request('POST','/api/' + key, body, headers)
response = connection.getresponse()
print(response.status, response.reason)
print(response.read())
