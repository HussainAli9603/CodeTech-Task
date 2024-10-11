# CodeTeck

# Backend
npm run dev

# unit testing
 npm test -- --detectOpenHandles

# api end points GET and POST MEthod
POST =  http://localhost:4000/api/vehicles

GET  = http://localhost:4000/api/vehicles

# request body
{
    "make": 'Toyota',
    "models": 'Corolla',
    "year": 2020,
    "color": 'Blue',
    "vin": '1HGCM82633A123456',
    "mileage": 10000
} 

# response body
{
    "success": true,
    "statusCode": 201,
    "message": "Vehicle created successfully",
    "data": {
       "uid": "6708964a9683cc6168c873cc",
       "make": 'Toyota',
       "models": 'Corolla',
       "year": 2020,
       "color": 'Blue',
       "vin": '1HGCM82633A123456',
       "mileage": 10000
    }   
} 


