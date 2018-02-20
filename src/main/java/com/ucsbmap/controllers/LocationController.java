package com.ucsbmap.controllers;

import javax.validation.Valid;
import com.ucsbmap.models.Location;
import com.ucsbmap.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class LocationController {

    @Autowired
    LocationRepository locationRepository;

    @GetMapping("/locations")
    public List<Location> getAllLocations() {
        Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createdAt");
        return locationRepository.findAll(sortByCreatedAtDesc);
    }

    @PostMapping("/locations")
    public Location createLocation(@Valid @RequestBody Location location) {
        return locationRepository.save(location);
    }

    // @GetMapping(value="/locations/{id}")
    // public ResponseEntity<Location> getLocationById(@PathVariable("id") String id) {
    //     Location location = locationRepository.findOne(id);
    //     if(location == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     } else {
    //         return new ResponseEntity<>(location, HttpStatus.OK);
    //     }
    // }
    // 
    // @PutMapping(value="/locations/{id}")
    // public ResponseEntity<Location> updateLocation(@PathVariable("id") String id,
    //                                        @Valid @RequestBody Location location) {
    //     Location locationData = locationRepository.findOne(id);
    //     if(locationData == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     locationData.setTitle(location.getTitle());
    //     locationData.setCompleted(location.getCompleted());
    //     Location updatedLocation = locationRepository.save(locationData);
    //     return new ResponseEntity<>(updatedLocation, HttpStatus.OK);
    // }
    // 
    // @DeleteMapping(value="/locations/{id}")
    // public void deleteLocation(@PathVariable("id") String id) {
    //     locationRepository.delete(id);
    // }
}
