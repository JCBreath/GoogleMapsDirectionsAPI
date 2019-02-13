# GoogleMapsDirectionsAPI

## Request URL
`/maps/dir/locationA/locationB/locationC...`

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

## Reference
[Directions API - Google Developers](https://developers.google.com/maps/documentation/directions/start)
