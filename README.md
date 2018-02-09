<p align="center">
    <img src="https://vectr.com/tygooch/cwliL01Vy.svg?width=1612.6211386287864&height=499.67313762929007&select=k1rqVfLtjJ,bg058HDeJ&source=selection"
        height="50%" width="50%">
</p>

<p align="center">
Interactive UCSB Campus Map built using Spring Boot, React, and Leaflet
</p>

<p align="center">
    <a href="https://travis-ci.org/TyGooch/ucsb-map">
        <img src="https://travis-ci.org/TyGooch/ucsb-map.svg?branch=master" />
    </a>
</p>

#

## View on Heroku

![Heroku](http://heroku-badge.herokuapp.com/?app=angularjs-crypto&style=flat&svg=1)

http://ucsb-map.herokuapp.com

## Build locally using Maven
```
git clone https://github.com/TyGooch/ucsb-map.git
cd ucsb-map
mvn clean package
java -jar target/ucsb-map-0.0.1-SNAPSHOT.jar
```
Then navigate to localhost:8080

## TODO
* Redux
* Convert to vanilla Leaflet
* Add google maps base layer with custom styling (http://snazzymaps.com)
* Add hover and "selection" styling to polygons
* Add react component (e.g. a pane) that renders building info on onClick
* Search
