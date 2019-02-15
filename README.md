# GoogleMapsDirectionsAPI

## Request URL
#### Simple
`/maps/dir/locationA/locationB/locationC...`
#### Google Maps API Formatting
`https://maps.googleapis.com/maps/api/directions/outputFormat?parameters`
```
https://maps.googleapis.com/maps/api/directions/json?
origin=Boston,MA&destination=Concord,MA
&waypoints=Charlestown,MA|Lexington,MA
&key=YOUR_API_KEY
```

## Response
```js
{
  "distance" : {"text":, "value":}
  "duration" : {"text":, "value":}
}
```
## Demo Console Output

```js
locList = ['kemper+hall','mandro+teahouse', 'target', 'silo'];
```

```
Start Point: Kemper Hall, 545 Bainer Hall Dr, Davis, CA 95616
Destination 1: Mandro Teahouse, 1260 Lake Blvd, Davis, CA 95616
Destination 2: Target, 4601 2nd St, Davis, CA 95618
Destination 3: Silo, 420 Hutchison Dr, Davis, CA 95616
Fastest Route: Arlington Blvd
Distance: 18.4 miles
Duration: 37 min
```

### Google Maps
![Demo Reference](https://raw.githubusercontent.com/JCBreath/GoogleMapsDirectionsAPI/master/demo_ref.png "DEMO Reference")

## Reference
[Directions API - Google Developers](https://developers.google.com/maps/documentation/directions/start)
[Direction Requests Format](https://developers.google.com/maps/documentation/directions/intro#DirectionsRequests)
