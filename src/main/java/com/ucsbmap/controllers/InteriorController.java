package com.ucsbmap.controllers;

import javax.validation.Valid;
import com.ucsbmap.models.Interior;
import com.ucsbmap.repositories.InteriorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class InteriorController {

    @Autowired
    InteriorRepository interiorRepository;

    @GetMapping("/interiors")
    public List<Interior> getAllInteriors() {
        return interiorRepository.findAll();
    }

    @PostMapping("/interiors")
    public Interior createInterior(@Valid @RequestBody Interior interior) {
        return interiorRepository.save(interior);
    }

}
