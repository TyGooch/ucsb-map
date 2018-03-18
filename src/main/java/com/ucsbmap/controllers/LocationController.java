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
        return locationRepository.findAll();
    }

    @PostMapping("/locations")
    public Location createLocation(@Valid @RequestBody Location location) {
        return locationRepository.save(location);
    }

    

}
