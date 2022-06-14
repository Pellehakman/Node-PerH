0. GET APIKEY in Body
http://localhost:8000/api/menu/key
use in header "api-key"

1. FETCH MENU FROM JSON in Body
GET http://localhost:8000/api/menu

2. TO ADD PRODUCT - POST in Body
{
    "id": 9,
    "title": "Red Bull",
    "desc": "Red Bull ger dig viiiingar!",
    "price": 25
}
3. TO REMOVE PRODUCT - POST in Body
{
	"title": "Red Bull"
}
